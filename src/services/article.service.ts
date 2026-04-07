import { ApiError } from '@/lib/error';
import { logger } from '@/logger/logger';
import { articleRepository } from '@/repositories/article.repository';
import type {
  CreateArticleInput,
  UpdateArticleInput,
} from '@/schemas/article.schema';

export const articleService = {
  getArticles: async (page: number = 1, limit: number = 10) => {
    const safeLimit = Math.min(Math.max(1, limit), 50);
    const offset = (Math.max(1, page) - 1) * safeLimit;

    return articleRepository.findAll({ offset, limit: safeLimit });
  },

  getArticleDetail: async (idOrSlug: string) => {
    const article = await articleRepository.findByIdOrSlug(idOrSlug);
    if (!article) {
      throw new ApiError('Article not found', 404);
    }

    // NOTE: Consider creating a dedicated endpoint for incrementing view counts instead of mixing it with getArticleDetail.
    articleRepository.incrementViewCount(idOrSlug).catch((error) => {
      logger.error(`Failed to increment view count for article ${idOrSlug}`, {
        error,
      });
    });

    return article;
  },

  createArticle: async (data: CreateArticleInput, userId: string) => {
    const id = crypto.randomUUID();
    const slug =
      data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const article = await articleRepository.create({
      ...data,
      id,
      slug,
      createdBy: userId,
    });
    logger.info('Article created successfully', { articleId: id, slug });
    return article;
  },

  updateArticle: async (idOrSlug: string, data: UpdateArticleInput) => {
    const article = await articleRepository.update(idOrSlug, data);
    logger.info('Article updated successfully', { articleId: idOrSlug });
    return article;
  },

  deleteArticle: async (idOrSlug: string) => {
    const article = await articleRepository.delete(idOrSlug);
    logger.info('Article deleted successfully', { articleId: article.id });
    return article;
  },

  toggleLike: async (idOrSlug: string, userId: string) => {
    return await articleRepository.toggleLike(idOrSlug, userId);
  },
};
