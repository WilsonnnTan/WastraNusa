import prisma from '@/lib/prisma';
import { orderRepository } from '@/repositories/order.repository';
import { paymentTransactionRepository } from '@/repositories/paymentTransaction.repository';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { SEED_ADDRESS_USER } from '../../prisma/dev-seeds/address.seed';
import { SEED_PRODUCT_1 } from '../../prisma/dev-seeds/product.seed';
import { SEED_REGULAR_USER } from '../../prisma/dev-seeds/user.seed';

vi.unmock('@/lib/prisma');
vi.unmock('@/repositories/paymentTransaction.repository');
vi.unmock('@/repositories/order.repository');

describe('paymentTransactionRepository', { tags: ['db'] }, () => {
  let userId: string;
  let orderId: string;
  let orderNumber: string;
  const txIds: string[] = [];

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

    orderId = crypto.randomUUID();
    orderNumber = `TEST-TX-ORD-${orderId.slice(0, 8)}`;
    await orderRepository.createOrder({
      id: orderId,
      orderNumber,
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
  });

  afterAll(async () => {
    for (const id of txIds) {
      await prisma.paymentTransaction.delete({ where: { id } }).catch(() => {});
    }
    await prisma.order.delete({ where: { id: orderId } }).catch(() => {});
  });

  describe('createPaymentTransaction', () => {
    it('should create payment transaction record', async () => {
      const id = crypto.randomUUID();
      txIds.push(id);

      const tx = await paymentTransactionRepository.createPaymentTransaction({
        id,
        orderId,
        externalId: orderId,
        amount: 250000 + 15000,
        status: 'pending',
        createdAt: new Date(),
      });

      expect(tx.id).toBe(id);
      expect(tx.orderId).toBe(orderId);
      expect(tx.status).toBe('pending');
    });
  });

  describe('updatePaymentStatus', () => {
    it('should update transaction status and paidAt', async () => {
      const id = crypto.randomUUID();
      txIds.push(id);
      const externalId = `EXT-${id.slice(0, 8)}`;

      await paymentTransactionRepository.createPaymentTransaction({
        id,
        orderId,
        externalId,
        amount: 250000 + 15000,
        status: 'pending',
        createdAt: new Date(),
      });

      const updated = await paymentTransactionRepository.updatePaymentStatus(
        externalId,
        {
          status: 'success',
          paidAt: new Date(),
        },
      );

      expect(updated.status).toBe('success');
      expect(updated.paidAt).not.toBeNull();
    });
  });

  describe('findTransactionByExternalId', () => {
    it('should find transaction by externalId', async () => {
      const id = crypto.randomUUID();
      txIds.push(id);
      const externalId = `EXT-FIND-${id.slice(0, 8)}`;

      await paymentTransactionRepository.createPaymentTransaction({
        id,
        orderId,
        externalId,
        amount: 250000 + 15000,
        status: 'pending',
        createdAt: new Date(),
      });

      const found =
        await paymentTransactionRepository.findTransactionByExternalId(
          externalId,
        );

      expect(found).toBeDefined();
      expect(found?.id).toBe(id);
      expect(found?.externalId).toBe(externalId);
    });
  });
});
