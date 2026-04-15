import { ApiError } from '@/lib/error';
import { logger } from '@/lib/logger';
import { articleRepository } from '@/repositories/article.repository';
import type {
  CreateArticleInput,
  UpdateArticleInput,
} from '@/schemas/article.schema';

const formatCount = (value: number) =>
  new Intl.NumberFormat('en-US').format(value);

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
      topic: article.topic,
      motifLabel: article.motifLabel,
      title: article.title,
      excerpt: article.excerpt,
      likes: article.engagement?.likeCount || 0,
      views: formatCount(article.engagement?.viewCount || 0),
      readMinutes: article.readMinutes,
      featured: article.featured,
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
      tags: [article.motifLabel, article.region, article.topic].filter(Boolean),
      quote: `${article.motifLabel} merepresentasikan warisan budaya yang hidup melalui teknik, simbol, dan praktik sosial masyarakat Indonesia.`,
      intro: article.summary || article.excerpt || article.description || '',
      sections:
        article.sections?.map((section) => ({
          title: section.title,
          content: section.content,
          imageLabel: section.imageLabel ?? undefined,
          imageCaption: section.imageCaption ?? undefined,
        })) || [],
      keyFacts: [
        { label: 'Wilayah Utama', value: article.region },
        { label: 'Kategori', value: article.topic },
        { label: 'Jenis Wastra', value: article.motifLabel },
        { label: 'Durasi Baca', value: `${article.readMinutes} menit` },
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
      topic: article.topic,
      motifLabel: article.motifLabel,
      title: article.title,
      excerpt: article.excerpt,
      likes: article.engagement?.likeCount || 0,
      views: formatCount(article.engagement?.viewCount || 0),
      readMinutes: article.readMinutes,
      featured: article.featured,
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
