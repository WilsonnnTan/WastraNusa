import prisma from '@/lib/prisma';
import { orderRepository } from '@/repositories/order.repository';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { SEED_ADDRESS_USER } from '../../prisma/dev-seeds/address.seed';
import { SEED_PRODUCT_1 } from '../../prisma/dev-seeds/product.seed';
import { SEED_REGULAR_USER } from '../../prisma/dev-seeds/user.seed';

vi.unmock('@/lib/prisma');
vi.unmock('@/repositories/order.repository');

describe('orderRepository', { tags: ['db'] }, () => {
  let userId: string;
  const orderIds: string[] = [];

  beforeAll(async () => {
    const user = await prisma.user.findFirst({
      where: { email: SEED_REGULAR_USER.email },
    });
    if (!user) {
      throw new Error(
        'Seed user not found. Run `npm run prisma-seed:dev` first.',
      );
    }
    userId = user.id;
  });

  afterAll(async () => {
    for (const id of orderIds) {
      await prisma.order.delete({ where: { id } }).catch(() => {});
    }
  });

  describe('createOrder', () => {
    it('should create order successfully', async () => {
      const id = crypto.randomUUID();
      orderIds.push(id);

      const orderData = {
        id,
        orderNumber: `TEST-ORD-${id.slice(0, 8)}`,
        userId,
        productId: SEED_PRODUCT_1.id,
        productName: SEED_PRODUCT_1.name,
        quantity: 1,
        productPrice: Number(SEED_PRODUCT_1.price),
        shippingAddressId: SEED_ADDRESS_USER.id,
        courier: 'JNE',
        courierService: 'REG',
        subtotal: Number(SEED_PRODUCT_1.price),
        shippingCost: 15000,
        totalAmount: Number(SEED_PRODUCT_1.price) + 15000,
      };

      const order = await orderRepository.createOrder(orderData);
      expect(order.id).toBe(id);
      expect(order.orderNumber).toBe(orderData.orderNumber);
      expect(order.orderStatus).toBe('pending');
      expect(order.paymentStatus).toBe('unpaid');
    });
  });

  describe('updateOrderPaymentStatus', () => {
    it('should update payment status and method', async () => {
      const id = crypto.randomUUID();
      orderIds.push(id);

      await orderRepository.createOrder({
        id,
        orderNumber: `TEST-ORD-${id.slice(0, 8)}`,
        userId,
        productId: SEED_PRODUCT_1.id,
        productName: SEED_PRODUCT_1.name,
        quantity: 1,
        productPrice: Number(SEED_PRODUCT_1.price),
        shippingAddressId: SEED_ADDRESS_USER.id,
        courier: 'JNE',
        courierService: 'REG',
        subtotal: Number(SEED_PRODUCT_1.price),
        shippingCost: 15000,
        totalAmount: Number(SEED_PRODUCT_1.price) + 15000,
      });

      const updated = await orderRepository.updateOrderPaymentStatus(id, {
        paymentStatus: 'paid',
        paymentMethod: 'credit_card',
        paidAt: new Date(),
        orderStatus: 'confirmed',
      });

      expect(updated.paymentStatus).toBe('paid');
      expect(updated.paymentMethod).toBe('credit_card');
      expect(updated.orderStatus).toBe('confirmed');
    });
  });

  describe('findOrdersByUserId', () => {
    it('should correctly pass skip, take, and filters to prisma', async () => {
      const spy = vi.spyOn(prisma.order, 'findMany').mockResolvedValue([]);

      const filters = { orderStatus: 'pending' as const };
      await orderRepository.findOrdersByUserId(userId, filters, 10, 5);

      expect(spy).toHaveBeenCalledWith({
        where: { userId, orderStatus: 'pending' },
        skip: 10,
        take: 5,
        include: {
          product: {
            select: { name: true, province: true, clothingType: true },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      spy.mockRestore();
    });
  });

  describe('findOrderDetailByIdentifier', () => {
    it('should query by user and identifier with required relations', async () => {
      const spy = vi.spyOn(prisma.order, 'findFirst').mockResolvedValue(null);

      await orderRepository.findOrderDetailByIdentifier(userId, 'ORD-1');

      expect(spy).toHaveBeenCalledWith({
        where: {
          userId,
          OR: [{ id: 'ORD-1' }, { orderNumber: 'ORD-1' }],
        },
        include: {
          product: {
            select: {
              id: true,
              name: true,
              province: true,
              clothingType: true,
            },
          },
          shippingAddress: {
            select: {
              recipientName: true,
              phone: true,
              province: true,
              city: true,
              district: true,
              subdistrict: true,
              postalCode: true,
              fullAddress: true,
            },
          },
          paymentTransactions: {
            orderBy: {
              createdAt: 'desc',
            },
            select: {
              id: true,
              status: true,
              paymentUrl: true,
              vaNumber: true,
              paidAt: true,
              createdAt: true,
            },
          },
        },
      });

      spy.mockRestore();
    });
  });

  describe('countOrdersByUserId', () => {
    it('should correctly pass filters to prisma count', async () => {
      const spy = vi.spyOn(prisma.order, 'count').mockResolvedValue(42);

      const filters = { orderStatus: 'confirmed' as const };
      const count = await orderRepository.countOrdersByUserId(userId, filters);

      expect(spy).toHaveBeenCalledWith({
        where: { userId, orderStatus: 'confirmed' },
      });
      expect(count).toBe(42);

      spy.mockRestore();
    });
  });

  describe('findOrdersForAdmin', () => {
    it('should query orders with admin relations and pagination', async () => {
      const spy = vi.spyOn(prisma.order, 'findMany').mockResolvedValue([]);

      const filters = { orderStatus: 'processing' as const };
      await orderRepository.findOrdersForAdmin(filters, 5, 10);

      expect(spy).toHaveBeenCalledWith({
        where: { orderStatus: 'processing' },
        skip: 5,
        take: 10,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
              province: true,
              clothingType: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      spy.mockRestore();
    });
  });

  describe('countOrdersForAdmin', () => {
    it('should pass filters to prisma count', async () => {
      const spy = vi.spyOn(prisma.order, 'count').mockResolvedValue(7);

      const count = await orderRepository.countOrdersForAdmin({
        paymentStatus: 'paid',
      });

      expect(spy).toHaveBeenCalledWith({
        where: { paymentStatus: 'paid' },
      });
      expect(count).toBe(7);

      spy.mockRestore();
    });
  });

  describe('findOrderForAdminByIdentifier', () => {
    it('should query by id/orderNumber with admin relations', async () => {
      const spy = vi.spyOn(prisma.order, 'findFirst').mockResolvedValue(null);

      await orderRepository.findOrderForAdminByIdentifier('ORD-1');

      expect(spy).toHaveBeenCalledWith({
        where: {
          OR: [{ id: 'ORD-1' }, { orderNumber: 'ORD-1' }],
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
              province: true,
              clothingType: true,
            },
          },
          shippingAddress: {
            select: {
              recipientName: true,
              phone: true,
              province: true,
              city: true,
              district: true,
              subdistrict: true,
              postalCode: true,
              fullAddress: true,
            },
          },
        },
      });

      spy.mockRestore();
    });
  });

  describe('updateOrderForAdmin', () => {
    it('should resolve order by identifier then update with admin relations', async () => {
      const findFirstSpy = vi
        .spyOn(prisma.order, 'findFirst')
        .mockResolvedValue({ id: 'order-id-1' } as never);
      const updateSpy = vi.spyOn(prisma.order, 'update').mockResolvedValue({
        id: 'order-id-1',
      } as never);

      await orderRepository.updateOrderForAdmin('ORD-1', {
        orderStatus: 'shipped',
        trackingNumber: 'RESI-123',
      });

      expect(findFirstSpy).toHaveBeenCalledWith({
        where: {
          OR: [{ id: 'ORD-1' }, { orderNumber: 'ORD-1' }],
        },
        select: {
          id: true,
        },
      });

      expect(updateSpy).toHaveBeenCalledWith({
        where: {
          id: 'order-id-1',
        },
        data: {
          orderStatus: 'shipped',
          trackingNumber: 'RESI-123',
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
              province: true,
              clothingType: true,
            },
          },
          shippingAddress: {
            select: {
              recipientName: true,
              phone: true,
              province: true,
              city: true,
              district: true,
              subdistrict: true,
              postalCode: true,
              fullAddress: true,
            },
          },
        },
      });

      findFirstSpy.mockRestore();
      updateSpy.mockRestore();
    });
  });
});
