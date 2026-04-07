import prisma from '@/lib/prisma';
import { productVariantRepository } from '@/repositories/productVariant.repository';
import { describe, expect, it, vi } from 'vitest';

import { SEED_VARIANT_1_1 } from '../../prisma/dev-seeds/product.seed';

vi.unmock('@/lib/prisma');
vi.unmock('@/repositories/productVariant.repository');

describe('productVariantRepository', { tags: ['db'] }, () => {
  describe('findVariantById', () => {
    it('should find variant by ID', async () => {
      const variant = await productVariantRepository.findVariantById(
        SEED_VARIANT_1_1.id,
      );
      expect(variant).toBeDefined();
      expect(variant?.id).toBe(SEED_VARIANT_1_1.id);
      expect(variant?.name).toBe(SEED_VARIANT_1_1.name);
    });

    it('should return null for non-existent ID', async () => {
      const variant = await productVariantRepository.findVariantById(
        '00000000-0000-0000-0000-000000000000',
      );
      expect(variant).toBeNull();
    });
  });

  describe('decrementVariantStock', () => {
    it('should decrement variant stock', async () => {
      const before = await prisma.productVariant.findUnique({
        where: { id: SEED_VARIANT_1_1.id },
      });

      await productVariantRepository.decrementVariantStock(
        SEED_VARIANT_1_1.id,
        5,
      );

      const after = await prisma.productVariant.findUnique({
        where: { id: SEED_VARIANT_1_1.id },
      });

      expect(after!.stock).toBe(before!.stock - 5);

      // Restore stock for other tests
      await prisma.productVariant.update({
        where: { id: SEED_VARIANT_1_1.id },
        data: { stock: before!.stock },
      });
    });
  });
});
