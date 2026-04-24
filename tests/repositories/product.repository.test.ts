import prisma from '@/lib/prisma';
import { productRepository } from '@/repositories/product.repository';
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';

import { SEED_ARTICLE_1 } from '../../prisma/dev-seeds/article.seed';
import {
  SEED_PRODUCT_1,
  SEED_PRODUCT_2,
} from '../../prisma/dev-seeds/product.seed';

vi.unmock('@/lib/prisma');
vi.unmock('@/repositories/product.repository');

const createdProductIds: string[] = [];

beforeAll(async () => {
  const product = await prisma.product.findFirst({
    where: { id: SEED_PRODUCT_1.id },
  });

  if (!product) {
    throw new Error(
      'Seed products not found. Run `pnpm prisma db seed` first.',
    );
  }
});

afterAll(async () => {
  for (const id of createdProductIds) {
    await prisma.productVariant
      .deleteMany({ where: { productId: id } })
      .catch(() => {});
    await prisma.product.delete({ where: { id } }).catch(() => {});
  }
});

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

  describe('findAll', () => {
    it('should return products with article and variants included', async () => {
      const products = await productRepository.findAll({
        offset: 0,
        limit: 50,
      });

      expect(products.length).toBeGreaterThanOrEqual(1);

      const product = products.find((p) => p.id === SEED_PRODUCT_1.id);
      expect(product).toBeDefined();
      expect(product?.article).toBeDefined();
      expect(product?.variants).toBeDefined();
    });

    it('should respect pagination offset and limit', async () => {
      const page1 = await productRepository.findAll({ offset: 0, limit: 1 });
      const page2 = await productRepository.findAll({ offset: 1, limit: 1 });

      expect(page1).toHaveLength(1);
      expect(page2).toHaveLength(1);
      expect(page1[0].id).not.toBe(page2[0].id);
    });

    it('should return all products when no pagination options given', async () => {
      const products = await productRepository.findAll();
      expect(products.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('countAll', () => {
    it('should return total product count', async () => {
      const count = await productRepository.countAll();
      expect(count).toBeGreaterThanOrEqual(2);
    });
  });

  describe('findByIdOrSlug', () => {
    it('should find product by UUID', async () => {
      const product = await productRepository.findByIdOrSlug(SEED_PRODUCT_1.id);

      expect(product).toBeDefined();
      expect(product?.id).toBe(SEED_PRODUCT_1.id);
      expect(product?.name).toBe(SEED_PRODUCT_1.name);
    });

    it('should find product by slug', async () => {
      const product = await productRepository.findByIdOrSlug(
        SEED_PRODUCT_2.slug,
      );

      expect(product).toBeDefined();
      expect(product?.slug).toBe(SEED_PRODUCT_2.slug);
    });

    it('should include article and variants in the result', async () => {
      const product = await productRepository.findByIdOrSlug(SEED_PRODUCT_1.id);

      expect(product?.article).toBeDefined();
      expect(product?.variants).toBeDefined();
      expect(Array.isArray(product?.variants)).toBe(true);
    });

    it('should return null for non-existent id or slug', async () => {
      const product = await productRepository.findByIdOrSlug(
        '00000000-0000-0000-0000-000000000000',
      );
      expect(product).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a product with article and variants included', async () => {
      const id = crypto.randomUUID();
      createdProductIds.push(id);

      const product = await productRepository.create({
        id,
        articleId: SEED_ARTICLE_1.id,
        name: 'Test Batik Shirt',
        slug: `test-batik-shirt-${id.slice(0, 8)}`,
        description: 'A test batik shirt.',
        price: 100000,
        stock: 10,
        sku: `TEST-SKU-${id.slice(0, 8)}`,
        weight: 250,
        island: SEED_ARTICLE_1.island,
        province: SEED_ARTICLE_1.province,
        clothingType: SEED_ARTICLE_1.clothingType,
        gender: SEED_ARTICLE_1.gender,
        status: 'active',
      });

      expect(product.id).toBe(id);
      expect(product.name).toBe('Test Batik Shirt');
      expect(product.article).toBeDefined();
      expect(product.variants).toBeDefined();
    });
  });

  describe('update', () => {
    it('should update a product by ID and return updated data', async () => {
      const updated = await productRepository.update(SEED_PRODUCT_2.id, {
        name: 'Updated Ulos Scarf',
      });

      expect(updated.name).toBe('Updated Ulos Scarf');

      // Restore original name
      await productRepository.update(SEED_PRODUCT_2.id, {
        name: SEED_PRODUCT_2.name,
      });
    });

    it('should update a product by slug', async () => {
      const updated = await productRepository.update(SEED_PRODUCT_1.slug, {
        stock: 99,
      });

      expect(updated.stock).toBe(99);

      // Restore original stock
      await productRepository.update(SEED_PRODUCT_1.slug, {
        stock: SEED_PRODUCT_1.stock,
      });
    });
  });

  describe('delete', () => {
    it('should delete a product by ID', async () => {
      const id = crypto.randomUUID();

      await productRepository.create({
        id,
        articleId: SEED_ARTICLE_1.id,
        name: 'To Delete Product',
        slug: `to-delete-${id.slice(0, 8)}`,
        description: null,
        price: 50000,
        stock: 5,
        sku: `DEL-SKU-${id.slice(0, 8)}`,
        weight: 100,
        island: SEED_ARTICLE_1.island,
        province: SEED_ARTICLE_1.province,
        clothingType: SEED_ARTICLE_1.clothingType,
        gender: SEED_ARTICLE_1.gender,
        status: 'active',
      });

      const deleted = await productRepository.delete(id);
      expect(deleted.id).toBe(id);

      const found = await productRepository.findByIdOrSlug(id);
      expect(found).toBeNull();
    });
  });
});
