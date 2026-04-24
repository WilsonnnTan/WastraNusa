import { ApiError } from '@/lib/error';
import { orderRepository } from '@/repositories/order.repository';
import { orderService } from '@/services/order.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.unmock('@/services/order.service');

const mockRepo = vi.mocked(orderRepository);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('orderService', { tags: ['backend'] }, () => {
  describe('getUserOrders', () => {
    it('should call repository methods with correct skip and take', async () => {
      mockRepo.findOrdersByUserId.mockResolvedValue([
        {
          id: '1',
          orderNumber: 'ORD-1',
          userId: 'user-1',
          orderStatus: 'pending',
          paymentStatus: 'unpaid',
          createdAt: new Date('2025-03-14T00:00:00.000Z'),
          totalAmount: 100000, // BigInt representation
          quantity: 1,
          product: {
            name: 'Batik',
            province: 'Solo',
            clothingType: 'batik',
          },
        },
      ] as never);
      mockRepo.countOrdersByUserId.mockResolvedValue(1);

      const result = await orderService.getUserOrders(
        'user-1',
        undefined,
        2,
        5,
      );

      expect(mockRepo.findOrdersByUserId).toHaveBeenCalledWith(
        'user-1',
        {},
        5,
        5,
      ); // page 2 limit 5 => skip 5, take 5
      expect(mockRepo.countOrdersByUserId).toHaveBeenCalledWith('user-1', {});

      expect(result.data).toHaveLength(1);
      expect(result.data[0].id).toBe('ORD-1');
      expect(result.data[0].orderId).toBe('1');
      expect(result.data[0].status).toBe('Menunggu Bayar');

      expect(result.meta.page).toBe(2);
      expect(result.meta.limit).toBe(5);
      expect(result.meta.total).toBe(1);
      expect(result.meta.totalPages).toBe(1);
    });

    it('should map filter statuses correctly', async () => {
      mockRepo.findOrdersByUserId.mockResolvedValue([] as never);
      mockRepo.countOrdersByUserId.mockResolvedValue(0);

      await orderService.getUserOrders('user-1', 'Dikonfirmasi', 1, 10);

      expect(mockRepo.findOrdersByUserId).toHaveBeenCalledWith(
        'user-1',
        { orderStatus: 'confirmed' },
        0,
        10,
      );
    });
  });

  describe('getUserOrderDetail', () => {
    it('should return formatted order detail', async () => {
      mockRepo.findOrderDetailByIdentifier.mockResolvedValue({
        id: 'order-id-1',
        orderNumber: 'ORD-1',
        orderStatus: 'confirmed',
        paymentStatus: 'paid',
        paymentMethod: 'bank_transfer',
        subtotal: 120000,
        shippingCost: 30000,
        totalAmount: 150000,
        productPrice: 120000,
        quantity: 1,
        courier: 'JNE',
        courierService: 'REG',
        trackingNumber: 'RESI-1',
        estimatedDelivery: null,
        customerNotes: null,
        createdAt: new Date('2025-03-14T00:00:00.000Z'),
        product: {
          id: 'prod-1',
          name: 'Batik',
          province: 'Solo',
          clothingType: 'batik',
        },
        shippingAddress: {
          recipientName: 'User',
          phone: '0812',
          province: 'Jawa Tengah',
          city: 'Solo',
          district: 'Laweyan',
          subdistrict: null,
          postalCode: '57147',
          fullAddress: 'Jl. Mawar No. 1',
        },
        paymentTransactions: [
          {
            id: 'trx-1',
            status: 'success',
            paymentUrl: null,
            vaNumber: '123456',
            paidAt: null,
            createdAt: new Date('2025-03-14T00:00:00.000Z'),
          },
        ],
      } as never);

      const result = await orderService.getUserOrderDetail('user-1', 'ORD-1');

      expect(mockRepo.findOrderDetailByIdentifier).toHaveBeenCalledWith(
        'user-1',
        'ORD-1',
      );
      expect(result.orderId).toBe('order-id-1');
      expect(result.orderNumber).toBe('ORD-1');
      expect(result.orderStatus).toBe('Dikonfirmasi');
      expect(result.paymentStatus).toBe('paid');
      expect(result.totals.totalAmount).toContain('Rp');
    });

    it('should throw ApiError when order not found', async () => {
      mockRepo.findOrderDetailByIdentifier.mockResolvedValue(null);

      await expect(
        orderService.getUserOrderDetail('user-1', 'ORD-404'),
      ).rejects.toThrow(ApiError);
    });
  });

  describe('getAdminOrders', () => {
    it('should return paginated admin order list', async () => {
      mockRepo.findOrdersForAdmin.mockResolvedValue([
        {
          id: 'order-id-1',
          orderNumber: 'ORD-1',
          orderStatus: 'processing',
          paymentStatus: 'paid',
          trackingNumber: null,
          quantity: 1,
          totalAmount: 150000,
          createdAt: new Date('2025-03-14T00:00:00.000Z'),
          user: {
            id: 'user-1',
            name: 'User',
            email: 'user@example.com',
          },
          product: {
            id: 'prod-1',
            name: 'Batik',
            province: 'Solo',
            clothingType: 'batik',
          },
        },
      ] as never);
      mockRepo.countOrdersForAdmin.mockResolvedValue(1);

      const result = await orderService.getAdminOrders(1, 10, {
        orderStatus: 'processing',
      });

      expect(mockRepo.findOrdersForAdmin).toHaveBeenCalledWith(
        { orderStatus: 'processing' },
        0,
        10,
      );
      expect(result.items).toHaveLength(1);
      expect(result.items[0].orderNumber).toBe('ORD-1');
      expect(result.meta.totalItems).toBe(1);
    });
  });

  describe('updateOrderForAdmin', () => {
    it('should update order and return mapped result', async () => {
      const order = {
        id: 'order-id-1',
        orderNumber: 'ORD-1',
        orderStatus: 'processing',
        paymentStatus: 'unpaid',
        trackingNumber: null,
        quantity: 1,
        totalAmount: 150000,
        createdAt: new Date('2025-03-14T00:00:00.000Z'),
        user: {
          id: 'user-1',
          name: 'User',
          email: 'user@example.com',
        },
        product: {
          id: 'prod-1',
          name: 'Batik',
          province: 'Solo',
          clothingType: 'batik',
        },
        shippingAddress: {
          recipientName: 'User',
          phone: '0812',
          province: 'Jawa Tengah',
          city: 'Solo',
          district: 'Laweyan',
          subdistrict: null,
          postalCode: '57147',
          fullAddress: 'Jl. Mawar No. 1',
        },
      };

      mockRepo.findOrderForAdminByIdentifier.mockResolvedValue(order as never);
      mockRepo.updateOrderForAdmin.mockResolvedValue({
        ...order,
        orderStatus: 'shipped',
        paymentStatus: 'paid',
        trackingNumber: 'RESI-123',
      } as never);

      const result = await orderService.updateOrderForAdmin('ORD-1', {
        orderStatus: 'shipped',
        trackingNumber: 'RESI-123',
      });

      expect(mockRepo.updateOrderForAdmin).toHaveBeenCalledWith(
        'ORD-1',
        expect.objectContaining({
          orderStatus: 'shipped',
          trackingNumber: 'RESI-123',
        }),
      );
      expect(result.orderStatus).toBe('shipped');
      expect(result.paymentStatus).toBe('paid');
      expect(result.trackingNumber).toBe('RESI-123');
    });

    it('should throw ApiError when order not found', async () => {
      mockRepo.findOrderForAdminByIdentifier.mockResolvedValue(null);

      await expect(
        orderService.updateOrderForAdmin('ORD-404', { orderStatus: 'shipped' }),
      ).rejects.toThrow(ApiError);
    });
  });
});
