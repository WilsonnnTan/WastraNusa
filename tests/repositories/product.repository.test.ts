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

const createTestProduct = async (
  overrides: Partial<{
    name: string;
    slug: string;
    price: number;
    stock: number;
    sku: string;
    island: string;
    province: string;
    clothingType: string;
    gender: 'male' | 'female';
    status: 'active' | 'inactive' | 'out_of_stock';
  }> = {},
) => {
  const id = crypto.randomUUID();
  createdProductIds.push(id);

  return productRepository.create({
    id,
    articleId: SEED_ARTICLE_1.id,
    name: overrides.name ?? `Repo Test Product ${id.slice(0, 8)}`,
    slug: overrides.slug ?? `repo-test-product-${id.slice(0, 8)}`,
    description: 'Repository test product',
    price: overrides.price ?? 100000,
    stock: overrides.stock ?? 10,
    sku: overrides.sku ?? `REPO-SKU-${id.slice(0, 8)}`,
    weight: 250,
    island: overrides.island ?? SEED_ARTICLE_1.island,
    province: overrides.province ?? SEED_ARTICLE_1.province,
    clothingType: overrides.clothingType ?? SEED_ARTICLE_1.clothingType,
    gender: overrides.gender ?? SEED_ARTICLE_1.gender,
    status: overrides.status ?? 'active',
  });
};

const toNumber = (value: unknown): number => {
  if (typeof value === 'number') {
    return value;
  }
  if (value && typeof value === 'object' && 'toNumber' in value) {
    return (value as { toNumber: () => number }).toNumber();
  }
  return Number(value);
};

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

    it('should filter products by island and clothing type', async () => {
      const products = await productRepository.findAll({
        filters: {
          island: SEED_PRODUCT_1.island,
          clothingType: SEED_PRODUCT_1.clothingType,
        },
      });

      expect(products.length).toBeGreaterThanOrEqual(1);
      expect(products.some((p) => p.id === SEED_PRODUCT_1.id)).toBe(true);
      expect(products.every((p) => p.island === SEED_PRODUCT_1.island)).toBe(
        true,
      );
      expect(
        products.every((p) => p.clothingType === SEED_PRODUCT_1.clothingType),
      ).toBe(true);
    });

    it('should filter out-of-stock products when inStock is false', async () => {
      const created = await createTestProduct({
        name: 'Repo Out Of Stock Product',
        slug: `repo-out-of-stock-${crypto.randomUUID().slice(0, 8)}`,
        stock: 0,
        status: 'out_of_stock',
      });

      const products = await productRepository.findAll({
        filters: { inStock: false },
      });

      expect(products.some((p) => p.id === created.id)).toBe(true);
      expect(products.every((p) => p.stock === 0)).toBe(true);
    });

    it('should sort products by price ascending and descending', async () => {
      const ascProducts = await productRepository.findAll({
        filters: { sortBy: 'price_asc' },
      });
      const descProducts = await productRepository.findAll({
        filters: { sortBy: 'price_desc' },
      });

      expect(ascProducts.length).toBeGreaterThanOrEqual(2);
      expect(descProducts.length).toBeGreaterThanOrEqual(2);

      const ascFirst = toNumber(ascProducts[0].price);
      const ascLast = toNumber(ascProducts[ascProducts.length - 1].price);
      const descFirst = toNumber(descProducts[0].price);
      const descLast = toNumber(descProducts[descProducts.length - 1].price);

      expect(ascFirst).toBeLessThanOrEqual(ascLast);
      expect(descFirst).toBeGreaterThanOrEqual(descLast);
    });
  });

  describe('countAll', () => {
    it('should return total product count', async () => {
      const count = await productRepository.countAll();
      expect(count).toBeGreaterThanOrEqual(2);
    });

    it('should count products with filters', async () => {
      const count = await productRepository.countAll({
        island: SEED_PRODUCT_1.island,
        clothingType: SEED_PRODUCT_1.clothingType,
      });

      expect(count).toBeGreaterThanOrEqual(1);
    });
  });

  describe('aggregation helpers', () => {
    it('should group product counts by clothing type', async () => {
      const grouped = await productRepository.countByClothingType();

      expect(grouped.length).toBeGreaterThan(0);
      expect(
        grouped.some(
          (item) =>
            item.clothingType === SEED_PRODUCT_1.clothingType &&
            item._count.clothingType >= 1,
        ),
      ).toBe(true);
    });

    it('should group product counts by island', async () => {
      const grouped = await productRepository.countByIsland();

      expect(grouped.length).toBeGreaterThan(0);
      expect(
        grouped.some(
          (item) =>
            item.island === SEED_PRODUCT_1.island && item._count.island >= 1,
        ),
      ).toBe(true);
    });

    it('should group product counts by province', async () => {
      const grouped = await productRepository.countByProvince();

      expect(grouped.length).toBeGreaterThan(0);
      expect(
        grouped.some(
          (item) =>
            item.province === SEED_PRODUCT_1.province &&
            item._count.province >= 1,
        ),
      ).toBe(true);
    });

    it('should group product counts by gender', async () => {
      const grouped = await productRepository.countByGender();

      expect(grouped.length).toBeGreaterThan(0);
      expect(
        grouped.some(
          (item) =>
            item.gender === SEED_PRODUCT_1.gender && item._count.gender >= 1,
        ),
      ).toBe(true);
    });

    it('should group product counts by status including inactive items', async () => {
      await createTestProduct({
        name: 'Repo Inactive Product',
        slug: `repo-inactive-${crypto.randomUUID().slice(0, 8)}`,
        status: 'inactive',
      });

      const grouped = await productRepository.countByStatus();

      expect(grouped.length).toBeGreaterThan(0);
      expect(
        grouped.some(
          (item) => item.status === 'inactive' && item._count.status >= 1,
        ),
      ).toBe(true);
    });

    it('should return min and max price from filtered products', async () => {
      const clothingType = `RangeTest-${crypto.randomUUID().slice(0, 8)}`;
      await createTestProduct({
        name: 'Repo Range Min',
        slug: `repo-range-min-${crypto.randomUUID().slice(0, 8)}`,
        price: 111111,
        clothingType,
      });
      await createTestProduct({
        name: 'Repo Range Max',
        slug: `repo-range-max-${crypto.randomUUID().slice(0, 8)}`,
        price: 333333,
        clothingType,
      });

      const range = await productRepository.getPriceRange({ clothingType });

      expect(range.min).toBe(111111);
      expect(range.max).toBe(333333);
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
