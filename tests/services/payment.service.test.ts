import { ApiError } from '@/lib/error';
import { createMidtransTransaction, verifySignatureKey } from '@/lib/midtrans';
import { addressRepository } from '@/repositories/address.repository';
import { orderRepository } from '@/repositories/order.repository';
import { paymentTransactionRepository } from '@/repositories/paymentTransaction.repository';
import { productRepository } from '@/repositories/product.repository';
import { productVariantRepository } from '@/repositories/productVariant.repository';
import { paymentService } from '@/services/payment.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.unmock('@/services/payment.service');

describe('paymentService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('checkout', () => {
    const mockUserId = 'user-123';
    const mockInput = {
      items: [{ productId: 'prod-1', variantId: 'var-1', quantity: 2 }],
      shippingAddressId: 'addr-1',
      courier: 'JNE',
      courierService: 'REG',
      shippingCost: 15000,
    };

    it('should successfully checkout with variant', async () => {
      vi.mocked(addressRepository.findById).mockResolvedValue({
        id: 'addr-1',
        userId: mockUserId,
      } as never);

      vi.mocked(productRepository.findProductById).mockResolvedValue({
        id: 'prod-1',
        status: 'active',
        price: 100000,
        name: 'Product 1',
        stock: 10,
      } as never);

      vi.mocked(productVariantRepository.findVariantById).mockResolvedValue({
        id: 'var-1',
        productId: 'prod-1',
        name: 'Variant 1',
        price: 120000,
        stock: 5,
      } as never);

      vi.mocked(createMidtransTransaction).mockResolvedValue({
        token: 'snap-token',
        redirect_url: 'https://checkout.midtrans.com/snap-token',
      });

      const result = await paymentService.checkout(mockInput, mockUserId);

      expect(result.token).toBe('snap-token');
      expect(addressRepository.findById).toHaveBeenCalledWith(
        'addr-1',
        mockUserId,
      );
      expect(orderRepository.createOrder).toHaveBeenCalled();
      expect(
        productVariantRepository.decrementVariantStock,
      ).toHaveBeenCalledWith('var-1', 2);
      expect(productRepository.decrementProductStock).toHaveBeenCalledWith(
        'prod-1',
        2,
      );
    });

    it('should throw error if product not found', async () => {
      vi.mocked(addressRepository.findById).mockResolvedValue({
        id: 'addr-1',
        userId: mockUserId,
      } as never);
      vi.mocked(productRepository.findProductById).mockResolvedValue(null);

      await expect(
        paymentService.checkout(mockInput, mockUserId),
      ).rejects.toThrow(new ApiError('Product not found: prod-1', 404));
    });

    it('should throw error if insufficient stock', async () => {
      vi.mocked(addressRepository.findById).mockResolvedValue({
        id: 'addr-1',
        userId: mockUserId,
      } as never);
      vi.mocked(productRepository.findProductById).mockResolvedValue({
        id: 'prod-1',
        status: 'active',
        name: 'Product 1',
        price: 100000,
        stock: 1, // Only 1 in stock
      } as never);

      await expect(
        paymentService.checkout(
          {
            ...mockInput,
            items: [{ productId: 'prod-1', quantity: 2, variantId: undefined }],
          },
          mockUserId,
        ),
      ).rejects.toThrow(
        new ApiError('Insufficient product stock for Product 1', 400),
      );
    });

    it('should fallback to product checkout when variant is not found', async () => {
      vi.mocked(addressRepository.findById).mockResolvedValue({
        id: 'addr-1',
        userId: mockUserId,
      } as never);

      vi.mocked(productRepository.findProductById).mockResolvedValue({
        id: 'prod-1',
        status: 'active',
        price: 100000,
        name: 'Product 1',
        stock: 10,
      } as never);

      vi.mocked(productVariantRepository.findVariantById).mockResolvedValue(
        null,
      );

      vi.mocked(createMidtransTransaction).mockResolvedValue({
        token: 'snap-token',
        redirect_url: 'https://checkout.midtrans.com/snap-token',
      });

      const result = await paymentService.checkout(mockInput, mockUserId);

      expect(result.token).toBe('snap-token');
      expect(orderRepository.createOrder).toHaveBeenCalledWith(
        expect.objectContaining({
          variantId: null,
          variantName: null,
          productPrice: 200000,
          subtotal: 200000,
          totalAmount: 215000,
        }),
      );
      expect(
        productVariantRepository.decrementVariantStock,
      ).not.toHaveBeenCalled();
      expect(productRepository.decrementProductStock).toHaveBeenCalledWith(
        'prod-1',
        2,
      );
    });

    it('should use default address when shippingAddressId is not provided', async () => {
      vi.mocked(addressRepository.findDefaultByUser).mockResolvedValue({
        id: 'addr-default',
        userId: mockUserId,
      } as never);

      vi.mocked(productRepository.findProductById).mockResolvedValue({
        id: 'prod-1',
        status: 'active',
        price: 100000,
        name: 'Product 1',
        stock: 10,
      } as never);

      vi.mocked(productVariantRepository.findVariantById).mockResolvedValue({
        id: 'var-1',
        productId: 'prod-1',
        name: 'Variant 1',
        price: 120000,
        stock: 5,
      } as never);

      vi.mocked(createMidtransTransaction).mockResolvedValue({
        token: 'snap-token',
        redirect_url: 'https://checkout.midtrans.com/snap-token',
      });

      const result = await paymentService.checkout(
        {
          ...mockInput,
          shippingAddressId: undefined,
        },
        mockUserId,
      );

      expect(result.token).toBe('snap-token');
      expect(addressRepository.findDefaultByUser).toHaveBeenCalledWith(
        mockUserId,
      );
      expect(addressRepository.findById).not.toHaveBeenCalled();
      expect(orderRepository.createOrder).toHaveBeenCalledWith(
        expect.objectContaining({
          shippingAddressId: 'addr-default',
        }),
      );
    });
  });

  describe('handleNotification', () => {
    const mockPayload = {
      order_id: 'order-123',
      transaction_id: 'tx-123',
      transaction_status: 'settlement',
      gross_amount: '255000.00',
      signature_key: 'valid-sig',
      status_code: '200',
      payment_type: 'credit_card',
    };

    it('should process successful payment', async () => {
      vi.mocked(verifySignatureKey).mockResolvedValue(true);

      await paymentService.handleNotification(mockPayload);

      expect(
        paymentTransactionRepository.updatePaymentStatus,
      ).toHaveBeenCalledWith(
        'order-123',
        expect.objectContaining({ status: 'success' }),
      );
      expect(orderRepository.updateOrderPaymentStatus).toHaveBeenCalledWith(
        'order-123',
        expect.objectContaining({ paymentStatus: 'paid' }),
      );
    });

    it('should throw error for invalid signature', async () => {
      vi.mocked(verifySignatureKey).mockResolvedValue(false);

      await expect(
        paymentService.handleNotification(mockPayload),
      ).rejects.toThrow(new ApiError('Invalid signature key', 403));
    });

    it('should handle fraud detection', async () => {
      vi.mocked(verifySignatureKey).mockResolvedValue(true);
      const fraudPayload = {
        ...mockPayload,
        transaction_status: 'capture',
        fraud_status: 'challenge',
      };

      await paymentService.handleNotification(fraudPayload);

      expect(
        paymentTransactionRepository.updatePaymentStatus,
      ).toHaveBeenCalledWith(
        'order-123',
        expect.objectContaining({ status: 'failed' }),
      );
    });
  });
});
