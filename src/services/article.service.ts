import { ApiError } from '@/lib/error';
import { logger } from '@/lib/logger';
import { articleRepository } from '@/repositories/article.repository';
import {
  type CreateArticleInput,
  type UpdateArticleInput,
} from '@/schemas/article.schema';
import { type ArticleDashboardData } from '@/types/dashboard';
import {
  type EncyclopediaArticleFilters,
  type EncyclopediaArticleListResponse,
  type RegionFilter,
} from '@/types/encyclopedia';
import type { LikedArticlesResponse } from '@/types/profile';

const formatCount = (value: number) =>
  new Intl.NumberFormat('en-US').format(value);

export const articleService = {
  getArticles: async (
    page: number = 1,
    limit: number = 10,
    filters: EncyclopediaArticleFilters = {},
  ): Promise<EncyclopediaArticleListResponse> => {
    const safeLimit = Math.min(Math.max(1, limit), 50);
    const offset = (Math.max(1, page) - 1) * safeLimit;
    const region = filters.region || undefined;

    const [articles, totalItems, globalTotalItems, regionCounts] =
      await Promise.all([
        articleRepository.findAll({
          offset,
          limit: safeLimit,
          region,
        }),
        articleRepository.countAll({ region }),
        articleRepository.countAll(),
        articleRepository.countByRegion(),
      ]);

    const items = articles.map((article) => ({
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

    const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));
    const regions: RegionFilter[] = [
      { name: 'Semua Wilayah', count: globalTotalItems, active: !region },
      ...regionCounts.map((regionCount) => ({
        name: regionCount.region,
        count: regionCount._count.region,
        active: regionCount.region === region,
      })),
    ];

    return {
      items,
      meta: {
        page: Math.max(1, page),
        limit: safeLimit,
        totalItems,
        totalPages,
        hasNextPage: Math.max(1, page) < totalPages,
        regions,
      },
    };
  },

  getDashboardOverview: async (): Promise<ArticleDashboardData> => {
    const [totalArticles, mostPopularArticles] = await Promise.all([
      articleRepository.countAll(),
      articleRepository.findMostPopular(6),
    ]);

    return {
      totalArticles,
      popularArticles: mostPopularArticles.map((item, index) => ({
        rank: index + 1,
        slug: item.article.slug,
        title: item.article.title,
        category: item.article.topic,
        region: item.article.region,
        views: item.viewCount,
        readTimeMinutes: item.article.readMinutes,
      })),
    };
  },

  getArticleDetail: async (idOrSlug: string, userId?: string) => {
    const article = await articleRepository.findByIdOrSlug(idOrSlug);
    if (!article) {
      throw new ApiError('Article not found', 404);
    }

    const existingLike =
      userId && article.id
        ? await articleRepository.findUserLike(article.id, userId)
        : null;

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
      isLiked: Boolean(existingLike),
      views: formatCount(article.engagement?.viewCount || 0),
      readMinutes: article.readMinutes,
      featured: article.featured,
    };
  },

  getLikedArticles: async (
    userId: string,
    page: number = 1,
    limit: number = 5,
  ): Promise<LikedArticlesResponse> => {
    const safeLimit = Math.min(Math.max(1, limit), 50);
    const totalItems = await articleRepository.countLikedByUser(userId);
    const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));
    const safePage = Math.min(Math.max(1, page), totalPages);
    const offset = (safePage - 1) * safeLimit;
    const likedArticles = await articleRepository.findLikedByUser({
      userId,
      offset,
      limit: safeLimit,
    });

    return {
      items: likedArticles.map(({ article }) => ({
        id: article.id,
        slug: article.slug,
        region: article.region,
        topic: article.topic,
        motifLabel: article.motifLabel,
        title: article.title,
        excerpt: article.excerpt,
        likes: article.engagement?.likeCount || 0,
        views: formatCount(article.engagement?.viewCount || 0),
        readMinutes: article.readMinutes,
        featured: article.featured,
        imageUrl: article.wikimediaImageUrl,
      })),
      meta: {
        page: safePage,
        limit: safeLimit,
        totalItems,
        totalPages,
        hasNextPage: safePage < totalPages,
      },
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
