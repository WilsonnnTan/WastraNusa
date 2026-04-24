import type { PaymentTransactionStatus } from '@/generated/prisma/client';
import { ApiError } from '@/lib/error';
import { logger } from '@/lib/logger';
import { createMidtransTransaction, verifySignatureKey } from '@/lib/midtrans';
import { addressRepository } from '@/repositories/address.repository';
import { orderRepository } from '@/repositories/order.repository';
import { paymentTransactionRepository } from '@/repositories/paymentTransaction.repository';
import { productRepository } from '@/repositories/product.repository';
import { productVariantRepository } from '@/repositories/productVariant.repository';
import type {
  CheckoutInput,
  MidtransNotificationInput,
} from '@/schemas/payment.schema';

interface CheckoutResolvedItem {
  productId: string;
  variantId: string | null;
  quantity: number;
  productName: string;
  variantName: string | null;
  unitPrice: number;
}

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = crypto.randomUUID().slice(0, 4).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}
/**
 * Maps Midtrans transaction_status to our PaymentTransactionStatus enum.
 */
function mapTransactionStatus(
  transactionStatus: string,
): PaymentTransactionStatus {
  switch (transactionStatus) {
    case 'capture':
    case 'settlement':
      return 'success';
    case 'pending':
      return 'pending';
    case 'deny':
    case 'cancel':
      return 'failed';
    case 'expire':
      return 'expired';
    default:
      return 'pending';
  }
}

/**
 * Maps Midtrans transaction_status to our Order PaymentStatus enum.
 */
function mapPaymentStatus(
  transactionStatus: string,
): 'unpaid' | 'paid' | 'failed' {
  switch (transactionStatus) {
    case 'capture':
    case 'settlement':
      return 'paid';
    case 'deny':
    case 'cancel':
    case 'expire':
      return 'failed';
    default:
      return 'unpaid';
  }
}

function aggregateCheckoutItems(input: CheckoutInput): Array<{
  productId: string;
  variantId: string | null;
  quantity: number;
}> {
  const map = new Map<
    string,
    { productId: string; variantId: string | null; quantity: number }
  >();

  for (const item of input.items) {
    const variantId = item.variantId ?? null;
    const key = `${item.productId}:${variantId ?? 'default'}`;
    const existing = map.get(key);

    if (existing) {
      existing.quantity += item.quantity;
      continue;
    }

    map.set(key, {
      productId: item.productId,
      variantId,
      quantity: item.quantity,
    });
  }

  return Array.from(map.values());
}

export const paymentService = {
  checkout: async (input: CheckoutInput, userId: string) => {
    let shippingAddressId: string;

    if (input.shippingAddressId) {
      const shippingAddress = await addressRepository.findById(
        input.shippingAddressId,
      );
      if (!shippingAddress || shippingAddress.userId !== userId) {
        throw new ApiError('Shipping address not found', 404);
      }
      shippingAddressId = shippingAddress.id;
    } else {
      const defaultAddress = await addressRepository.findDefaultByUser(userId);
      if (!defaultAddress) {
        throw new ApiError('Default shipping address not found', 400);
      }
      shippingAddressId = defaultAddress.id;
    }

    const mergedItems = aggregateCheckoutItems(input);
    const resolvedItems: CheckoutResolvedItem[] = [];

    for (const item of mergedItems) {
      const product = await productRepository.findProductById(item.productId);
      if (!product) {
        throw new ApiError(`Product not found: ${item.productId}`, 404);
      }
      if (product.status !== 'active') {
        throw new ApiError(`Product is not available: ${product.name}`, 400);
      }

      let variantName: string | null = null;
      let unitPrice = Number(product.price);
      let resolvedVariantId: string | null = null;

      if (item.variantId) {
        const variant = await productVariantRepository.findVariantById(
          item.variantId,
        );
        if (!variant) {
          logger.warn('Variant not found, fallback to product checkout', {
            productId: product.id,
            requestedVariantId: item.variantId,
          });
        } else {
          if (variant.productId !== product.id) {
            throw new ApiError('Variant does not belong to this product', 400);
          }
          if (variant.stock < item.quantity) {
            throw new ApiError(
              `Insufficient variant stock for ${product.name}`,
              400,
            );
          }

          resolvedVariantId = variant.id;
          variantName = variant.name;
          if (variant.price !== null) {
            unitPrice = Number(variant.price);
          }
        }
      }

      if (product.stock < item.quantity) {
        throw new ApiError(
          `Insufficient product stock for ${product.name}`,
          400,
        );
      }

      resolvedItems.push({
        productId: product.id,
        variantId: resolvedVariantId,
        quantity: item.quantity,
        productName: product.name,
        variantName,
        unitPrice,
      });
    }

    const subtotal = resolvedItems.reduce(
      (acc, item) => acc + item.unitPrice * item.quantity,
      0,
    );
    const totalAmount = subtotal + input.shippingCost;

    const totalQuantity = resolvedItems.reduce(
      (acc, item) => acc + item.quantity,
      0,
    );
    const primaryItem = resolvedItems[0];

    if (!primaryItem) {
      throw new ApiError('No checkout items were provided', 400);
    }

    const orderId = crypto.randomUUID();
    const orderNumber = generateOrderNumber();
    const paymentTransactionId = crypto.randomUUID();

    const itemSnapshot = resolvedItems.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
    }));

    const customerNotes = [
      input.customerNotes,
      resolvedItems.length > 1
        ? `checkout_items=${JSON.stringify(itemSnapshot)}`
        : null,
    ]
      .filter(Boolean)
      .join(' | ');

    await orderRepository.createOrder({
      id: orderId,
      orderNumber,
      userId,
      productId: primaryItem.productId,
      variantId: primaryItem.variantId,
      productName:
        resolvedItems.length === 1
          ? primaryItem.productName
          : `${primaryItem.productName} +${resolvedItems.length - 1} item(s)`,
      variantName: resolvedItems.length === 1 ? primaryItem.variantName : null,
      quantity: totalQuantity,
      productPrice: subtotal,
      shippingAddressId,
      courier: input.courier,
      courierService: input.courierService,
      estimatedDelivery: input.estimatedDelivery ?? null,
      subtotal,
      shippingCost: input.shippingCost,
      totalAmount,
      customerNotes: customerNotes || null,
    });

    for (const item of resolvedItems) {
      if (item.variantId) {
        await productVariantRepository.decrementVariantStock(
          item.variantId,
          item.quantity,
        );
      }
      await productRepository.decrementProductStock(
        item.productId,
        item.quantity,
      );
    }

    let midtransResponse;
    try {
      midtransResponse = await createMidtransTransaction(orderId, totalAmount);
    } catch (error) {
      logger.error('Failed to create Midtrans transaction', {
        orderId,
        error,
      });
      throw new ApiError('Failed to create payment transaction', 502);
    }

    await paymentTransactionRepository.createPaymentTransaction({
      id: paymentTransactionId,
      orderId,
      externalId: orderId,
      amount: totalAmount,
      status: 'pending',
      paymentUrl: midtransResponse.redirect_url,
      createdAt: new Date(),
    });

    logger.info('Checkout completed successfully', {
      orderId,
      orderNumber,
      totalAmount,
      itemCount: resolvedItems.length,
    });

    return {
      orderId,
      orderNumber,
      token: midtransResponse.token,
      redirect_url: midtransResponse.redirect_url,
    };
  },

  handleNotification: async (payload: MidtransNotificationInput) => {
    const {
      order_id,
      transaction_status,
      gross_amount,
      signature_key,
      status_code,
      payment_type,
      fraud_status,
    } = payload;

    const isValid = await verifySignatureKey(
      order_id,
      status_code,
      gross_amount,
      signature_key,
    );

    if (!isValid) {
      logger.warn('Invalid Midtrans signature key', { order_id });
      throw new ApiError('Invalid signature key', 403);
    }

    if (
      transaction_status === 'capture' &&
      fraud_status &&
      fraud_status !== 'accept'
    ) {
      logger.warn('Transaction flagged by fraud detection', {
        order_id,
        fraud_status,
      });
      await paymentTransactionRepository.updatePaymentStatus(order_id, {
        status: 'failed',
      });
      await orderRepository.updateOrderPaymentStatus(order_id, {
        paymentStatus: 'failed',
      });
      return;
    }

    const paymentTxStatus = mapTransactionStatus(transaction_status);
    const paymentStatus = mapPaymentStatus(transaction_status);
    const isPaid =
      transaction_status === 'settlement' || transaction_status === 'capture';
    const paidAt = isPaid ? new Date() : null;

    await paymentTransactionRepository.updatePaymentStatus(order_id, {
      status: paymentTxStatus,
      paidAt,
    });

    await orderRepository.updateOrderPaymentStatus(order_id, {
      paymentStatus,
      paymentMethod: payment_type,
      paidAt,
      ...(isPaid ? { orderStatus: 'confirmed' as const } : {}),
    });

    logger.info('Midtrans notification processed', {
      order_id,
      transaction_status,
      paymentTxStatus,
      paymentStatus,
    });
  },
};
