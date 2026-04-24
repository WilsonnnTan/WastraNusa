import { ProductStatus } from '@/generated/prisma/enums';
import { ApiError } from '@/lib/error';
import { logger } from '@/lib/logger';
import { articleRepository } from '@/repositories/article.repository';
import { productRepository } from '@/repositories/product.repository';
import {
  type CreateProductInput,
  type ProductVariantInput,
  type UpdateProductInput,
} from '@/schemas/product.schema';
import {
  type ProductInventoryItem,
  type ProductInventoryListResponse,
} from '@/types/product';

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const mapVariant = (variant: {
  id: string;
  name: string;
  type: 'size' | 'color';
  price: { toNumber(): number } | null;
  stock: number;
  sku: string;
}) => ({
  id: variant.id,
  name: variant.name,
  type: variant.type,
  price: variant.price ? variant.price.toNumber() : null,
  stock: variant.stock,
  sku: variant.sku,
});

const mapProduct = (product: {
  id: string;
  articleId: string;
  article: { title: string } | null;
  name: string;
  slug: string;
  description: string | null;
  price: { toNumber(): number };
  stock: number;
  sku: string;
  weight: number;
  island?: string | null;
  province: string;
  clothingType: string;
  gender: 'male' | 'female';
  status: ProductStatus;
  sold: number;
  variants: {
    id: string;
    name: string;
    type: 'size' | 'color';
    price: { toNumber(): number } | null;
    stock: number;
    sku: string;
  }[];
  updatedAt: Date;
}): ProductInventoryItem => ({
  id: product.id,
  articleId: product.articleId,
  articleTitle: product.article?.title ?? '-',
  name: product.name,
  slug: product.slug,
  description: product.description,
  price: product.price.toNumber(),
  stock: product.stock,
  sku: product.sku,
  weight: product.weight,
  island: product.island ?? '',
  province: product.province,
  clothingType: product.clothingType,
  gender: product.gender,
  status: product.status,
  sold: product.sold,
  variants: product.variants.map(mapVariant),
  variantCount: product.variants.length,
  updatedAt: product.updatedAt.toISOString(),
});

const normalizeVariantsForCreate = (variants?: ProductVariantInput[]) =>
  variants?.map((variant) => ({
    id: variant.id ?? crypto.randomUUID(),
    name: variant.name,
    type: variant.type,
    price: variant.price ?? null,
    stock: variant.stock,
    sku: variant.sku,
  }));

const normalizeVariantsForUpdate = (variants: ProductVariantInput[]) => ({
  deleteMany: {},
  create: variants.map((variant) => ({
    id: variant.id ?? crypto.randomUUID(),
    name: variant.name,
    type: variant.type,
    price: variant.price ?? null,
    stock: variant.stock,
    sku: variant.sku,
  })),
});

export const productService = {
  getProducts: async (
    page: number = 1,
    limit: number = 10,
  ): Promise<ProductInventoryListResponse> => {
    const safeLimit = Math.min(Math.max(1, limit), 50);
    const safePage = Math.max(1, page);
    const offset = (safePage - 1) * safeLimit;

    const [products, totalItems] = await Promise.all([
      productRepository.findAll({ offset, limit: safeLimit }),
      productRepository.countAll(),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));

    return {
      items: products.map(mapProduct),
      meta: {
        page: safePage,
        limit: safeLimit,
        totalItems,
        totalPages,
        hasNextPage: safePage < totalPages,
      },
    };
  },

  getProductDetail: async (idOrSlug: string): Promise<ProductInventoryItem> => {
    const product = await productRepository.findByIdOrSlug(idOrSlug);
    if (!product) {
      throw new ApiError('Product not found', 404);
    }

    return mapProduct(product);
  },

  createProduct: async (
    data: CreateProductInput,
  ): Promise<ProductInventoryItem> => {
    const article = await articleRepository.findByIdOrSlug(data.articleId);
    if (!article) {
      throw new ApiError('Artikel tidak ditemukan', 404);
    }
    const island = article.island?.trim();
    const province = article.province?.trim();
    if (!island || !province) {
      throw new ApiError(
        'Artikel belum memiliki data pulau/provinsi yang valid',
        400,
      );
    }

    const product = await productRepository.create({
      id: crypto.randomUUID(),
      articleId: data.articleId,
      name: data.name,
      slug: data.slug || toSlug(data.name),
      description: data.description ?? null,
      price: data.price,
      stock: data.stock,
      sku: data.sku,
      weight: data.weight,
      island,
      province,
      clothingType: data.clothingType,
      gender: data.gender,
      status: data.status ?? ProductStatus.active,
      variants: data.variants?.length
        ? { create: normalizeVariantsForCreate(data.variants) }
        : undefined,
    });

    logger.info('Product created successfully', { productId: product.id });
    return mapProduct(product);
  },

  updateProduct: async (
    idOrSlug: string,
    data: UpdateProductInput,
  ): Promise<ProductInventoryItem> => {
    const existing = await productRepository.findByIdOrSlug(idOrSlug);
    if (!existing) {
      throw new ApiError('Product not found', 404);
    }

    if (data.articleId) {
      const article = await articleRepository.findByIdOrSlug(data.articleId);
      if (!article) {
        throw new ApiError('Artikel tidak ditemukan', 404);
      }
    }

    const product = await productRepository.update(idOrSlug, {
      articleId: data.articleId,
      name: data.name,
      slug: data.slug,
      description: data.description,
      price: data.price,
      stock: data.stock,
      sku: data.sku,
      weight: data.weight,
      clothingType: data.clothingType,
      gender: data.gender,
      status: data.status,
      variants: data.variants
        ? normalizeVariantsForUpdate(data.variants)
        : undefined,
    });

    logger.info('Product updated successfully', { productId: existing.id });
    return mapProduct(product);
  },

  deleteProduct: async (idOrSlug: string) => {
    const product = await productRepository.delete(idOrSlug);
    logger.info('Product deleted successfully', { productId: product.id });
    return product;
  },
};
