import prisma from '@/lib/prisma';
import { productRepository } from '@/repositories/product.repository';
import { describe, expect, it, vi } from 'vitest';

import { SEED_PRODUCT_1 } from '../../prisma/dev-seeds/product.seed';

vi.unmock('@/lib/prisma');
vi.unmock('@/repositories/product.repository');

describe('productRepository', { tags: ['db'] }, () => {
  describe('findProductById', () => {
    it('should find product by ID', async () => {
      const product = await productRepository.findProductById(
        SEED_PRODUCT_1.id,
      );
      expect(product).toBeDefined();
      expect(product?.id).toBe(SEED_PRODUCT_1.id);
      expect(product?.name).toBe(SEED_PRODUCT_1.name);
    });

    it('should return null for non-existent ID', async () => {
      const product = await productRepository.findProductById(
        '00000000-0000-0000-0000-000000000000',
      );
      expect(product).toBeNull();
    });
  });

  describe('decrementProductStock', () => {
    it('should decrement product stock', async () => {
      const before = await prisma.product.findUnique({
        where: { id: SEED_PRODUCT_1.id },
      });

      await productRepository.decrementProductStock(SEED_PRODUCT_1.id, 2);

      const after = await prisma.product.findUnique({
        where: { id: SEED_PRODUCT_1.id },
      });

      expect(after!.stock).toBe(before!.stock - 2);

      // Restore stock for other tests
      await prisma.product.update({
        where: { id: SEED_PRODUCT_1.id },
        data: { stock: before!.stock },
      });
    });
  });
});
