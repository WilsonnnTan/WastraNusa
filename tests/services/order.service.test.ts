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
});
