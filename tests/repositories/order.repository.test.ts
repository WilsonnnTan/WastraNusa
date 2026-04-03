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
});
