import { ApiError } from '@/lib/error';
import { articleRepository } from '@/repositories/article.repository';
import { articleService } from '@/services/article.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.unmock('@/services/article.service');

const mockRepo = vi.mocked(articleRepository);

const MOCK_ARTICLE = {
  id: 'test-id-1',
  title: 'Test Article',
  slug: 'test-article',
  description: 'A test article',
  excerpt: 'A concise test excerpt',
  province: 'Jawa Tengah',
  island: 'Jawa',
  region: 'Pekalongan',
  topic: 'Sejarah & Asal Usul',
  ethnicGroup: 'Javanese',
  clothingType: 'batik',
  motifLabel: 'Batik',
  gender: 'male' as const,
  readMinutes: 6,
  featured: false,
  wikipediaPageId: 'wp-test',
  wikipediaUrl: 'https://en.wikipedia.org/wiki/Test',
  wikimediaImageUrl: null,
  wikimediaVideoUrl: null,
  wikipediaLastSync: null,
  sections: [],
  summary: 'Test summary',
  status: 'published' as const,
  createdBy: 'user-1',
  createdAt: new Date(),
  updatedAt: new Date(),
  creator: { id: 'user-1', name: 'Admin', image: null },
  engagement: {
    id: 'eng-1',
    articleId: 'test-id-1',
    viewCount: 5,
    likeCount: 2,
    updatedAt: new Date(),
  },
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('articleService', { tags: ['backend'] }, () => {
  describe('getArticles', () => {
    it('should call findAll with correct offset and limit', async () => {
      mockRepo.findAll.mockResolvedValue([MOCK_ARTICLE]);
      mockRepo.countAll.mockResolvedValueOnce(1).mockResolvedValueOnce(1);
      mockRepo.countByRegion.mockResolvedValue([
        {
          region: 'Pekalongan',
          _count: { region: 1 },
        },
      ] as never);

      const result = await articleService.getArticles(2, 5);

      expect(result.items).toHaveLength(1);
      expect(result.items[0].title).toBe(MOCK_ARTICLE.title);
      expect(result.meta.page).toBe(2);
      expect(result.meta.limit).toBe(5);
    });

    it('should clamp limit to max 50', async () => {
      mockRepo.findAll.mockResolvedValue([]);
      mockRepo.countAll.mockResolvedValueOnce(0).mockResolvedValueOnce(0);
      mockRepo.countByRegion.mockResolvedValue([]);

      await articleService.getArticles(1, 100);

      expect(mockRepo.findAll).toHaveBeenCalledWith({
        offset: 0,
        limit: 50,
        region: undefined,
      });
    });

    it('should default to page 1 and limit 10', async () => {
      mockRepo.findAll.mockResolvedValue([]);
      mockRepo.countAll.mockResolvedValueOnce(0).mockResolvedValueOnce(0);
      mockRepo.countByRegion.mockResolvedValue([]);

      await articleService.getArticles();

      expect(mockRepo.findAll).toHaveBeenCalledWith({
        offset: 0,
        limit: 10,
        region: undefined,
      });
    });

    it('should apply region filter and return metadata', async () => {
      mockRepo.findAll.mockResolvedValue([MOCK_ARTICLE]);
      mockRepo.countAll.mockResolvedValueOnce(12).mockResolvedValueOnce(20);
      mockRepo.countByRegion.mockResolvedValue([
        {
          region: 'Jawa',
          _count: { region: 8 },
        },
        {
          region: 'Sumatra',
          _count: { region: 4 },
        },
      ] as never);

      const result = await articleService.getArticles(1, 5, { region: 'Jawa' });

      expect(mockRepo.findAll).toHaveBeenCalledWith({
        offset: 0,
        limit: 5,
        region: 'Jawa',
      });
      expect(mockRepo.countAll).toHaveBeenCalledWith({ region: 'Jawa' });
      expect(mockRepo.countAll).toHaveBeenCalledWith();
      expect(result.meta.totalItems).toBe(12);
      expect(result.meta.totalPages).toBe(3);
      expect(result.meta.hasNextPage).toBe(true);
      expect(result.meta.regions).toEqual([
        { name: 'Semua Wilayah', count: 20, active: false },
        { name: 'Jawa', count: 8, active: true },
        { name: 'Sumatra', count: 4, active: false },
      ]);
    });
  });

  describe('getArticleDetail', () => {
    it('should return article and increment view count', async () => {
      mockRepo.findByIdOrSlug.mockResolvedValue(MOCK_ARTICLE);
      mockRepo.incrementViewCount.mockResolvedValue(MOCK_ARTICLE as never);
      mockRepo.findUserLike.mockResolvedValue(null);

      const result = await articleService.getArticleDetail('test-id-1');
      expect(result.title).toBe(MOCK_ARTICLE.title);
      expect(result.author).toBe('Admin');
      expect(result.isLiked).toBe(false);
      expect(mockRepo.findByIdOrSlug).toHaveBeenCalledWith('test-id-1');
      expect(mockRepo.findUserLike).not.toHaveBeenCalled();
      expect(mockRepo.incrementViewCount).toHaveBeenCalledWith('test-id-1');
    });

    it('should include isLiked when userId is provided', async () => {
      mockRepo.findByIdOrSlug.mockResolvedValue(MOCK_ARTICLE);
      mockRepo.findUserLike.mockResolvedValue({
        id: 'like-1',
        articleId: MOCK_ARTICLE.id,
        userId: 'user-1',
        createdAt: new Date(),
      } as never);
      mockRepo.incrementViewCount.mockResolvedValue(MOCK_ARTICLE as never);

      const result = await articleService.getArticleDetail(
        'test-id-1',
        'user-1',
      );

      expect(result.isLiked).toBe(true);
      expect(mockRepo.findUserLike).toHaveBeenCalledWith(
        MOCK_ARTICLE.id,
        'user-1',
      );
    });

    it('should throw ApiError(404) when article not found', async () => {
      mockRepo.findByIdOrSlug.mockResolvedValue(null);

      await expect(
        articleService.getArticleDetail('nonexistent'),
      ).rejects.toThrow(ApiError);

      await expect(
        articleService.getArticleDetail('nonexistent'),
      ).rejects.toMatchObject({ status: 404 });
    });
  });

  describe('getLikedArticles', () => {
    it('should map liked articles for the authenticated user with pagination metadata', async () => {
      mockRepo.countLikedByUser.mockResolvedValue(6);
      mockRepo.findLikedByUser.mockResolvedValue([
        {
          id: 'like-1',
          articleId: MOCK_ARTICLE.id,
          userId: 'user-1',
          createdAt: new Date(),
          article: MOCK_ARTICLE,
        },
      ] as never);

      const result = await articleService.getLikedArticles('user-1', 2, 5);

      expect(mockRepo.findLikedByUser).toHaveBeenCalledWith({
        userId: 'user-1',
        offset: 5,
        limit: 5,
      });
      expect(mockRepo.countLikedByUser).toHaveBeenCalledWith('user-1');
      expect(result).toEqual({
        items: [
          expect.objectContaining({
            id: MOCK_ARTICLE.id,
            slug: MOCK_ARTICLE.slug,
            title: MOCK_ARTICLE.title,
            likes: 2,
            views: '5',
          }),
        ],
        meta: {
          page: 2,
          limit: 5,
          totalItems: 6,
          totalPages: 2,
          hasNextPage: false,
        },
      });
    });
  });

  describe('createArticle', () => {
    it('should generate UUID and slug, then call create', async () => {
      mockRepo.create.mockResolvedValue(MOCK_ARTICLE as never);

      const input = {
        title: 'My New Article',
        excerpt: 'Fresh article excerpt',
        province: 'Bali',
        island: 'Bali',
        region: 'Denpasar',
        topic: 'Teknik Pembuatan',
        clothingType: 'endek',
        motifLabel: 'Endek',
        gender: 'female' as const,
        wikipediaPageId: 'wp-new',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/New',
        sections: [],
      };

      await articleService.createArticle(input, 'user-1');

      expect(mockRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'My New Article',
          slug: 'my-new-article',
          createdBy: 'user-1',
        }),
      );
    });

    it('should use provided slug if given', async () => {
      mockRepo.create.mockResolvedValue(MOCK_ARTICLE as never);

      const input = {
        title: 'My Article',
        slug: 'custom-slug',
        excerpt: 'Custom article excerpt',
        province: 'Bali',
        island: 'Bali',
        region: 'Denpasar',
        topic: 'Motif & Simbolisme',
        clothingType: 'endek',
        motifLabel: 'Endek',
        gender: 'female' as const,
        wikipediaPageId: 'wp-custom',
        wikipediaUrl: 'https://en.wikipedia.org/wiki/Custom',
        sections: [],
      };

      await articleService.createArticle(input, 'user-1');

      expect(mockRepo.create).toHaveBeenCalledWith(
        expect.objectContaining({ slug: 'custom-slug' }),
      );
    });
  });

  describe('updateArticle', () => {
    it('should call update with correct params', async () => {
      mockRepo.update.mockResolvedValue(MOCK_ARTICLE as never);

      const data = { title: 'Updated Title' };
      const result = await articleService.updateArticle('test-id-1', data);

      expect(mockRepo.update).toHaveBeenCalledWith('test-id-1', data);
      expect(result).toEqual(MOCK_ARTICLE);
    });
  });

  describe('deleteArticle', () => {
    it('should call delete and return deleted article', async () => {
      mockRepo.delete.mockResolvedValue(MOCK_ARTICLE as never);

      const result = await articleService.deleteArticle('test-id-1');

      expect(mockRepo.delete).toHaveBeenCalledWith('test-id-1');
      expect(result).toEqual(MOCK_ARTICLE);
    });
  });

  describe('toggleLike', () => {
    it('should delegate to repository toggleLike', async () => {
      const mockResult = { isLiked: true, engagement: MOCK_ARTICLE.engagement };
      mockRepo.toggleLike.mockResolvedValue(mockResult);

      const result = await articleService.toggleLike('test-id-1', 'user-1');

      expect(mockRepo.toggleLike).toHaveBeenCalledWith('test-id-1', 'user-1');
      expect(result).toEqual(mockResult);
    });
  });
});
