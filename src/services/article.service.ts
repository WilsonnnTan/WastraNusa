import { ApiError } from '@/lib/error';
import { logger } from '@/lib/logger';
import { articleRepository } from '@/repositories/article.repository';
import type {
  CreateArticleInput,
  UpdateArticleInput,
} from '@/schemas/article.schema';

export const articleService = {
  getArticles: async (page: number = 1, limit: number = 10) => {
    const safeLimit = Math.min(Math.max(1, limit), 50);
    const offset = (Math.max(1, page) - 1) * safeLimit;

    const articles = await articleRepository.findAll({
      offset,
      limit: safeLimit,
    });
    return articles.map((article) => ({
      ...article,
      region: article.region,
      topic: article.clothingType,
      motifLabel: article.clothingType,
      title: article.title,
      excerpt: article.summary || article.description || '',
      likes: article.engagement?.likeCount || 0,
      views: (article.engagement?.viewCount || 0).toString(),
      readMinutes: 6,
    }));
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

    return {
      ...article,
      author: article.creator?.name || 'Admin',
      publishedAt: article.createdAt.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      tags: [article.clothingType, article.province, article.region],
      quote: `${article.clothingType} merepresentasikan warisan budaya yang hidup melalui teknik, simbol, dan praktik sosial masyarakat Indonesia.`,
      intro: article.summary || article.description || '',
      sections: article.sections || [],
      keyFacts: [
        { label: 'Wilayah Utama', value: article.region },
        { label: 'Kategori', value: article.clothingType },
        { label: 'Jenis Wastra', value: article.clothingType },
        { label: 'Durasi Baca', value: '6 menit' },
        {
          label: 'Dilihat',
          value: `${article.engagement?.viewCount || 0} kali`,
        },
        {
          label: 'Disukai',
          value: `${article.engagement?.likeCount || 0} pengguna`,
        },
      ],
      relatedProducts: [],
      discussionCount: 0,
      nextArticle: {
        slug: '',
        title: 'Kembali ke Artikel Populer',
      },
      references: ['[1] Wikipedia'],
      // Base compatibility
      region: article.region,
      topic: article.clothingType,
      motifLabel: article.clothingType,
      title: article.title,
      excerpt: article.summary || article.description || '',
      likes: article.engagement?.likeCount || 0,
      views: (article.engagement?.viewCount || 0).toString(),
      readMinutes: 6,
    };
  },

  createArticle: async (data: CreateArticleInput, userId: string) => {
    const id = crypto.randomUUID();
    const slug =
      data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    const { sections, ...restData } = data;

    const article = await articleRepository.create({
      ...restData,
      id,
      slug,
      createdBy: userId,
      sections: sections ? { create: sections } : undefined,
    });
    logger.info('Article created successfully', { articleId: id, slug });
    return article;
  },

  updateArticle: async (idOrSlug: string, data: UpdateArticleInput) => {
    const { sections, ...restData } = data;
    const article = await articleRepository.update(idOrSlug, {
      ...restData,
      sections: sections
        ? {
            deleteMany: {},
            create: sections,
          }
        : undefined,
    });
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
