import type { PaymentTransactionStatus } from '@/generated/prisma/client';
import { ApiError } from '@/lib/error';
import { createMidtransTransaction, verifySignatureKey } from '@/lib/midtrans';
import { logger } from '@/logger/logger';
import { paymentRepository } from '@/repositories/payment.repository';
import type {
  CheckoutInput,
  MidtransNotificationInput,
} from '@/schemas/payment.schema';

/**
 * Generates a unique order number: ORD-{timestamp}-{random4chars}
 */
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

export const paymentService = {
  checkout: async (input: CheckoutInput, userId: string) => {
    // Look up the product
    const product = await paymentRepository.findProductById(input.productId);
    if (!product) {
      throw new ApiError('Product not found', 404);
    }
    if (product.status !== 'active') {
      throw new ApiError('Product is not available', 400);
    }

    // Optionally look up the variant
    let variantName: string | null = null;
    let productPrice = Number(product.price);

    if (input.variantId) {
      const variant = await paymentRepository.findVariantById(input.variantId);
      if (!variant) {
        throw new ApiError('Product variant not found', 404);
      }
      if (variant.productId !== product.id) {
        throw new ApiError('Variant does not belong to this product', 400);
      }
      variantName = variant.name;
      // Use variant price if set, otherwise fall back to product price
      if (variant.price !== null) {
        productPrice = Number(variant.price);
      }

      // Check variant stock
      if (variant.stock < input.quantity) {
        throw new ApiError('Insufficient variant stock', 400);
      }
    } else {
      // Check product stock
      if (product.stock < input.quantity) {
        throw new ApiError('Insufficient product stock', 400);
      }
    }

    const subtotal = productPrice * input.quantity;
    const totalAmount = subtotal + input.shippingCost;

    const orderId = crypto.randomUUID();
    const orderNumber = generateOrderNumber();
    const paymentTransactionId = crypto.randomUUID();

    await paymentRepository.createOrder({
      id: orderId,
      orderNumber,
      userId,
      productId: input.productId,
      variantId: input.variantId ?? null,
      productName: product.name,
      variantName,
      quantity: input.quantity,
      productPrice,
      shippingAddressId: input.shippingAddressId,
      courier: input.courier,
      courierService: input.courierService,
      estimatedDelivery: input.estimatedDelivery ?? null,
      subtotal,
      shippingCost: input.shippingCost,
      totalAmount,
      customerNotes: input.customerNotes ?? null,
    });

    if (input.variantId) {
      await paymentRepository.decrementVariantStock(
        input.variantId,
        input.quantity,
      );
    }
    await paymentRepository.decrementProductStock(
      input.productId,
      input.quantity,
    );

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

    await paymentRepository.createPaymentTransaction({
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
    });

    return {
      orderId,
      orderNumber,
      token: midtransResponse.token,
      redirect_url: midtransResponse.redirect_url,
    };
  },

  /**
   * Handles Midtrans webhook notification.
   */
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
      await paymentRepository.updatePaymentStatus(order_id, {
        status: 'failed',
      });
      await paymentRepository.updateOrderPaymentStatus(order_id, {
        paymentStatus: 'failed',
      });
      return;
    }

    const paymentTxStatus = mapTransactionStatus(transaction_status);
    const paymentStatus = mapPaymentStatus(transaction_status);
    const isPaid =
      transaction_status === 'settlement' || transaction_status === 'capture';
    const paidAt = isPaid ? new Date() : null;

    await paymentRepository.updatePaymentStatus(order_id, {
      status: paymentTxStatus,
      paidAt,
    });

    await paymentRepository.updateOrderPaymentStatus(order_id, {
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
