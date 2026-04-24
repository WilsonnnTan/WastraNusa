import { ApiError } from '@/lib/error';
import { articleRepository } from '@/repositories/article.repository';
import { productRepository } from '@/repositories/product.repository';
import { productService } from '@/services/product.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.unmock('@/services/product.service');

const mockProductRepo = vi.mocked(productRepository);
const mockArticleRepo = vi.mocked(articleRepository);

// ─── Shared mock shapes ────────────────────────────────────────────────────────

const MOCK_VARIANT = {
  id: 'variant-1',
  name: 'Size L',
  type: 'size' as const,
  price: { toNumber: () => 250000 },
  stock: 20,
  sku: 'BPK-L',
};

const MOCK_PRODUCT_RAW = {
  id: 'prod-1',
  articleId: 'article-1',
  article: { title: 'Batik Pekalongan' },
  name: 'Premium Batik Shirt',
  slug: 'premium-batik-shirt',
  description: 'A nice shirt.',
  price: { toNumber: () => 250000 },
  stock: 50,
  sku: 'BPK-001',
  weight: 300,
  island: 'Jawa',
  province: 'Jawa Tengah',
  clothingType: 'batik',
  gender: 'male' as const,
  status: 'active' as const,
  sold: 0,
  variants: [MOCK_VARIANT],
  updatedAt: new Date('2026-01-01'),
};

const MOCK_ARTICLE = {
  id: 'article-1',
  island: 'Jawa',
  province: 'Jawa Tengah',
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('productService', { tags: ['backend'] }, () => {
  // ── getProducts ──────────────────────────────────────────────────────────────

  describe('getProducts', () => {
    it('should return paginated product list with mapped items', async () => {
      mockProductRepo.findAll.mockResolvedValue([MOCK_PRODUCT_RAW] as never);
      mockProductRepo.countAll.mockResolvedValue(1);

      const result = await productService.getProducts(1, 10);

      expect(mockProductRepo.findAll).toHaveBeenCalledWith({
        offset: 0,
        limit: 10,
      });
      expect(mockProductRepo.countAll).toHaveBeenCalled();
      expect(result.items).toHaveLength(1);
      expect(result.items[0].id).toBe('prod-1');
      expect(result.items[0].price).toBe(250000);
      expect(result.items[0].variantCount).toBe(1);
      expect(result.meta.page).toBe(1);
      expect(result.meta.limit).toBe(10);
      expect(result.meta.totalItems).toBe(1);
      expect(result.meta.hasNextPage).toBe(false);
    });

    it('should clamp limit to max 50', async () => {
      mockProductRepo.findAll.mockResolvedValue([]);
      mockProductRepo.countAll.mockResolvedValue(0);

      await productService.getProducts(1, 200);

      expect(mockProductRepo.findAll).toHaveBeenCalledWith({
        offset: 0,
        limit: 50,
      });
    });

    it('should default to page 1 and limit 10 when called with no arguments', async () => {
      mockProductRepo.findAll.mockResolvedValue([]);
      mockProductRepo.countAll.mockResolvedValue(0);

      await productService.getProducts();

      expect(mockProductRepo.findAll).toHaveBeenCalledWith({
        offset: 0,
        limit: 10,
      });
    });

    it('should compute correct offset for page 2', async () => {
      mockProductRepo.findAll.mockResolvedValue([]);
      mockProductRepo.countAll.mockResolvedValue(0);

      await productService.getProducts(2, 5);

      expect(mockProductRepo.findAll).toHaveBeenCalledWith({
        offset: 5,
        limit: 5,
      });
    });

    it('should map article title and variant count correctly', async () => {
      const rawWithNoArticle = {
        ...MOCK_PRODUCT_RAW,
        article: null,
        variants: [],
      };
      mockProductRepo.findAll.mockResolvedValue([rawWithNoArticle] as never);
      mockProductRepo.countAll.mockResolvedValue(1);

      const result = await productService.getProducts(1, 10);

      expect(result.items[0].articleTitle).toBe('-');
      expect(result.items[0].variantCount).toBe(0);
    });
  });

  // ── getProductDetail ─────────────────────────────────────────────────────────

  describe('getProductDetail', () => {
    it('should return mapped product detail', async () => {
      mockProductRepo.findByIdOrSlug.mockResolvedValue(
        MOCK_PRODUCT_RAW as never,
      );

      const result = await productService.getProductDetail('prod-1');

      expect(mockProductRepo.findByIdOrSlug).toHaveBeenCalledWith('prod-1');
      expect(result.id).toBe('prod-1');
      expect(result.name).toBe('Premium Batik Shirt');
      expect(result.variants).toHaveLength(1);
    });

    it('should accept slug as identifier', async () => {
      mockProductRepo.findByIdOrSlug.mockResolvedValue(
        MOCK_PRODUCT_RAW as never,
      );

      const result = await productService.getProductDetail(
        'premium-batik-shirt',
      );

      expect(mockProductRepo.findByIdOrSlug).toHaveBeenCalledWith(
        'premium-batik-shirt',
      );
      expect(result.slug).toBe('premium-batik-shirt');
    });

    it('should throw ApiError(404) when product not found', async () => {
      mockProductRepo.findByIdOrSlug.mockResolvedValue(null);

      await expect(
        productService.getProductDetail('nonexistent'),
      ).rejects.toThrow(ApiError);

      await expect(
        productService.getProductDetail('nonexistent'),
      ).rejects.toMatchObject({ status: 404 });
    });
  });

  // ── createProduct ────────────────────────────────────────────────────────────

  describe('createProduct', () => {
    const validInput = {
      articleId: 'article-1',
      name: 'New Batik Shirt',
      slug: 'new-batik-shirt',
      price: 200000,
      stock: 20,
      sku: 'NEW-001',
      weight: 300,
      clothingType: 'batik',
      gender: 'male' as const,
    };

    it('should create a product and return mapped output', async () => {
      mockArticleRepo.findByIdOrSlug.mockResolvedValue(MOCK_ARTICLE as never);
      mockProductRepo.create.mockResolvedValue(MOCK_PRODUCT_RAW as never);

      const result = await productService.createProduct(validInput);

      expect(mockArticleRepo.findByIdOrSlug).toHaveBeenCalledWith('article-1');
      expect(mockProductRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          articleId: 'article-1',
          name: 'New Batik Shirt',
          island: 'Jawa',
          province: 'Jawa Tengah',
        }),
      );
      expect(result.id).toBe('prod-1');
    });

    it('should use provided slug when given', async () => {
      mockArticleRepo.findByIdOrSlug.mockResolvedValue(MOCK_ARTICLE as never);
      mockProductRepo.create.mockResolvedValue(MOCK_PRODUCT_RAW as never);

      await productService.createProduct({
        ...validInput,
        slug: 'custom-slug',
      });

      expect(mockProductRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ slug: 'custom-slug' }),
      );
    });

    it('should throw ApiError(404) when article is not found', async () => {
      mockArticleRepo.findByIdOrSlug.mockResolvedValue(null);

      await expect(
        productService.createProduct(validInput),
      ).rejects.toMatchObject({ status: 404 });
    });

    it('should throw ApiError(400) when article has no island/province', async () => {
      mockArticleRepo.findByIdOrSlug.mockResolvedValue({
        id: 'article-1',
        island: '',
        province: '',
      } as never);

      await expect(
        productService.createProduct(validInput),
      ).rejects.toMatchObject({ status: 400 });
    });

    it('should default status to active when not provided', async () => {
      mockArticleRepo.findByIdOrSlug.mockResolvedValue(MOCK_ARTICLE as never);
      mockProductRepo.create.mockResolvedValue(MOCK_PRODUCT_RAW as never);

      await productService.createProduct(validInput);

      expect(mockProductRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ status: 'active' }),
      );
    });
  });

  // ── updateProduct ────────────────────────────────────────────────────────────

  describe('updateProduct', () => {
    it('should update a product and return mapped output', async () => {
      mockProductRepo.findByIdOrSlug.mockResolvedValue(
        MOCK_PRODUCT_RAW as never,
      );
      mockProductRepo.update.mockResolvedValue(MOCK_PRODUCT_RAW as never);

      const result = await productService.updateProduct('prod-1', {
        slug: 'premium-batik-shirt',
        name: 'Updated Batik Shirt',
      });

      expect(mockProductRepo.findByIdOrSlug).toHaveBeenCalledWith('prod-1');
      expect(mockProductRepo.update).toHaveBeenCalledWith(
        'prod-1',
        expect.objectContaining({ name: 'Updated Batik Shirt' }),
      );
      expect(result).toBeDefined();
    });

    it('should validate new articleId if provided', async () => {
      mockProductRepo.findByIdOrSlug.mockResolvedValue(
        MOCK_PRODUCT_RAW as never,
      );
      mockArticleRepo.findByIdOrSlug.mockResolvedValue(null);

      await expect(
        productService.updateProduct('prod-1', {
          slug: 'premium-batik-shirt',
          articleId: 'nonexistent',
        }),
      ).rejects.toMatchObject({ status: 404 });

      expect(mockArticleRepo.findByIdOrSlug).toHaveBeenCalledWith(
        'nonexistent',
      );
    });

    it('should not call articleRepository when articleId is not in update payload', async () => {
      mockProductRepo.findByIdOrSlug.mockResolvedValue(
        MOCK_PRODUCT_RAW as never,
      );
      mockProductRepo.update.mockResolvedValue(MOCK_PRODUCT_RAW as never);

      await productService.updateProduct('prod-1', {
        slug: 'premium-batik-shirt',
        name: 'No Article Change',
      });

      expect(mockArticleRepo.findByIdOrSlug).not.toHaveBeenCalled();
    });

    it('should throw ApiError(404) when product not found', async () => {
      mockProductRepo.findByIdOrSlug.mockResolvedValue(null);

      await expect(
        productService.updateProduct('nonexistent', {
          slug: 'premium-batik-shirt',
          name: 'X',
        }),
      ).rejects.toMatchObject({ status: 404 });
    });
  });

  // ── deleteProduct ────────────────────────────────────────────────────────────

  describe('deleteProduct', () => {
    it('should call repository delete and return deleted product', async () => {
      mockProductRepo.delete.mockResolvedValue(MOCK_PRODUCT_RAW as never);

      const result = await productService.deleteProduct('prod-1');

      expect(mockProductRepo.delete).toHaveBeenCalledWith('prod-1');
      expect(result).toEqual(MOCK_PRODUCT_RAW);
    });
  });
});
