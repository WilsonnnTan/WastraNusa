import { ApiError } from '@/lib/error';
import { createMidtransTransaction, verifySignatureKey } from '@/lib/midtrans';
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
      productId: 'prod-1',
      variantId: 'var-1',
      quantity: 2,
      shippingAddressId: 'addr-1',
      courier: 'JNE',
      courierService: 'REG',
      shippingCost: 15000,
    };

    it('should successfully checkout with variant', async () => {
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
      vi.mocked(productRepository.findProductById).mockResolvedValue(null);

      await expect(
        paymentService.checkout(mockInput, mockUserId),
      ).rejects.toThrow(new ApiError('Product not found', 404));
    });

    it('should throw error if insufficient stock', async () => {
      vi.mocked(productRepository.findProductById).mockResolvedValue({
        id: 'prod-1',
        status: 'active',
        price: 100000,
        stock: 1, // Only 1 in stock
      } as never);

      await expect(
        paymentService.checkout(
          { ...mockInput, variantId: undefined },
          mockUserId,
        ),
      ).rejects.toThrow(new ApiError('Insufficient product stock', 400));
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
