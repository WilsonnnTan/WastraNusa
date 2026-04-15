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
  province: 'Jawa Tengah',
  island: 'Jawa',
  region: 'Pekalongan',
  ethnicGroup: 'Javanese',
  clothingType: 'batik',
  gender: 'male' as const,
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

      const result = await articleService.getArticles(2, 5);

      expect(result.length).toBe(1);
      expect(result[0].title).toBe(MOCK_ARTICLE.title);
    });

    it('should clamp limit to max 50', async () => {
      mockRepo.findAll.mockResolvedValue([]);

      await articleService.getArticles(1, 100);

      expect(mockRepo.findAll).toHaveBeenCalledWith({ offset: 0, limit: 50 });
    });

    it('should default to page 1 and limit 10', async () => {
      mockRepo.findAll.mockResolvedValue([]);

      await articleService.getArticles();

      expect(mockRepo.findAll).toHaveBeenCalledWith({ offset: 0, limit: 10 });
    });
  });

  describe('getArticleDetail', () => {
    it('should return article and increment view count', async () => {
      mockRepo.findByIdOrSlug.mockResolvedValue(MOCK_ARTICLE);
      mockRepo.incrementViewCount.mockResolvedValue(MOCK_ARTICLE as never);

      const result = await articleService.getArticleDetail('test-id-1');
      expect(result.title).toBe(MOCK_ARTICLE.title);
      expect(result.author).toBe('Admin');
      expect(mockRepo.findByIdOrSlug).toHaveBeenCalledWith('test-id-1');
      expect(mockRepo.incrementViewCount).toHaveBeenCalledWith('test-id-1');
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

  describe('createArticle', () => {
    it('should generate UUID and slug, then call create', async () => {
      mockRepo.create.mockResolvedValue(MOCK_ARTICLE as never);

      const input = {
        title: 'My New Article',
        province: 'Bali',
        island: 'Bali',
        region: 'Denpasar',
        clothingType: 'endek',
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
        province: 'Bali',
        island: 'Bali',
        region: 'Denpasar',
        clothingType: 'endek',
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
