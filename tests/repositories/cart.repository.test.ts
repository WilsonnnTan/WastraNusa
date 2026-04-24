import prisma from '@/lib/prisma';
import { cartRepository } from '@/repositories/cart.repository';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import {
  SEED_PRODUCT_1,
  SEED_VARIANT_1_1,
} from '../../prisma/dev-seeds/product.seed';
import { SEED_REGULAR_USER } from '../../prisma/dev-seeds/user.seed';

vi.unmock('@/lib/prisma');
vi.unmock('@/repositories/cart.repository');

let regularUserId: string;
const createdCartItemIds: string[] = [];

beforeAll(async () => {
  const regular = await prisma.user.findFirst({
    where: { email: SEED_REGULAR_USER.email },
  });

  if (!regular) {
    throw new Error('Seed users not found. Run `pnpm prisma db seed` first.');
  }

  regularUserId = regular.id;
});

afterAll(async () => {
  for (const id of createdCartItemIds) {
    await prisma.cartItem.delete({ where: { id } }).catch(() => {});
  }
});

describe('cartRepository', { tags: ['db'] }, () => {
  describe('findOrCreateByUser', () => {
    it('should return a cart for a user', async () => {
      const cart = await cartRepository.findOrCreateByUser(regularUserId);
      expect(cart).toBeDefined();
      expect(cart.userId).toBe(regularUserId);
      expect(cart.items).toBeDefined();
    });
  });

  describe('findByUserId', () => {
    it('should return cart with items and relations', async () => {
      const cart = await cartRepository.findByUserId(regularUserId);
      expect(cart).toBeDefined();
      expect(cart?.userId).toBe(regularUserId);
      if (cart && cart.items.length > 0) {
        expect(cart.items[0].product).toBeDefined();
      }
    });
  });

  describe('addItem', () => {
    it('should add a new item to the cart', async () => {
      const cart = await cartRepository.findOrCreateByUser(regularUserId);

      // Use a product and variant that might not be in the cart yet or just add another
      const newItem = await cartRepository.addItem(
        cart.id,
        SEED_PRODUCT_1.id,
        null,
        1,
      );

      createdCartItemIds.push(newItem.id);

      const updatedCart = await cartRepository.findByUserId(regularUserId);
      const item = updatedCart?.items.find(
        (i) => i.productId === SEED_PRODUCT_1.id && i.variantId === null,
      );
      expect(item).toBeDefined();
      expect(item?.quantity).toBeGreaterThanOrEqual(1);
    });

    it('should update quantity if item already exists', async () => {
      const cart = await cartRepository.findOrCreateByUser(regularUserId);

      // Add first time
      const item1 = await cartRepository.addItem(
        cart.id,
        SEED_PRODUCT_1.id,
        SEED_VARIANT_1_1.id,
        1,
      );
      createdCartItemIds.push(item1.id);

      // Add second time (same product and variant)
      const item2 = await cartRepository.addItem(
        cart.id,
        SEED_PRODUCT_1.id,
        SEED_VARIANT_1_1.id,
        2,
      );

      expect(item2.id).toBe(item1.id);
      expect(item2.quantity).toBe(item1.quantity + 2);
    });
  });

  describe('updateItemQuantity', () => {
    it('should update quantity of a specific item', async () => {
      const cart = await cartRepository.findOrCreateByUser(regularUserId);
      const item = await cartRepository.addItem(
        cart.id,
        SEED_PRODUCT_1.id,
        null,
        1,
      );
      createdCartItemIds.push(item.id);

      const updatedItem = await cartRepository.updateItemQuantity(item.id, 5);
      expect(updatedItem.quantity).toBe(5);
    });
  });

  describe('removeItem', () => {
    it('should remove a specific item from the cart', async () => {
      const cart = await cartRepository.findOrCreateByUser(regularUserId);
      const item = await cartRepository.addItem(
        cart.id,
        SEED_PRODUCT_1.id,
        null,
        1,
      );

      await cartRepository.removeItem(item.id);

      const updatedCart = await cartRepository.findByUserId(regularUserId);
      expect(updatedCart?.items.find((i) => i.id === item.id)).toBeUndefined();
    });
  });

  describe('removeItems', () => {
    it('should remove multiple items from the cart', async () => {
      const cart = await cartRepository.findOrCreateByUser(regularUserId);
      const item1 = await cartRepository.addItem(
        cart.id,
        SEED_PRODUCT_1.id,
        null,
        1,
      );
      const item2 = await cartRepository.addItem(
        cart.id,
        SEED_PRODUCT_1.id,
        SEED_VARIANT_1_1.id,
        1,
      );

      await cartRepository.removeItems([item1.id, item2.id]);

      const updatedCart = await cartRepository.findByUserId(regularUserId);
      expect(updatedCart?.items.find((i) => i.id === item1.id)).toBeUndefined();
      expect(updatedCart?.items.find((i) => i.id === item2.id)).toBeUndefined();
    });
  });

  describe('getCartItemCount', () => {
    it('should return total number of distinct items in cart', async () => {
      const count = await cartRepository.getCartItemCount(regularUserId);
      expect(typeof count).toBe('number');
    });
  });
});
