import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

const getUniqueWhere = (idOrSlug: string) => {
  const isUuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      idOrSlug,
    );
  return isUuid ? { id: idOrSlug } : { slug: idOrSlug };
};

export const articleRepository = {
  findAll: async ({
    offset,
    limit,
    region,
  }: { offset?: number; limit?: number; region?: string } = {}) => {
    const where: Prisma.ArticleWhereInput = region ? { region } : {};

    return prisma.article.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: { id: true, name: true, image: true },
        },
        engagement: true,
      },
    });
  },

  countAll: async ({ region }: { region?: string } = {}) => {
    const where: Prisma.ArticleWhereInput = region ? { region } : {};

    return prisma.article.count({ where });
  },

  countByRegion: async () => {
    return prisma.article.groupBy({
      by: ['region'],
      _count: {
        region: true,
      },
      orderBy: {
        region: 'asc',
      },
    });
  },

  findByIdOrSlug: async (idOrSlug: string) => {
    return prisma.article.findUnique({
      where: getUniqueWhere(idOrSlug),
      include: {
        creator: {
          select: { id: true, name: true, image: true },
        },
        engagement: true,
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });
  },

  create: async (data: Prisma.ArticleUncheckedCreateInput) => {
    return prisma.article.create({
      data: {
        ...data,
        engagement: {
          create: {
            id: `eng_${data.id}`,
            viewCount: 0,
            likeCount: 0,
          },
        },
      },
    });
  },

  update: async (idOrSlug: string, data: Prisma.ArticleUpdateInput) => {
    return prisma.article.update({
      where: getUniqueWhere(idOrSlug),
      data,
    });
  },

  delete: async (idOrSlug: string) => {
    return prisma.article.delete({
      where: getUniqueWhere(idOrSlug),
    });
  },

  incrementViewCount: async (idOrSlug: string) => {
    return prisma.article.update({
      where: getUniqueWhere(idOrSlug),
      data: {
        engagement: {
          update: { viewCount: { increment: 1 } },
        },
      },
    });
  },

  findUserLike: async (articleId: string, userId: string) => {
    return prisma.userArticleLike.findFirst({
      where: { articleId, userId },
    });
  },

  toggleLike: async (idOrSlug: string, userId: string) => {
    return prisma.$transaction(async (tx) => {
      const article = await tx.article.findUnique({
        where: getUniqueWhere(idOrSlug),
        select: { id: true },
      });

      if (!article) {
        throw new Error('NotFound');
      }

      const existingLike = await tx.userArticleLike.findFirst({
        where: { articleId: article.id, userId },
      });

      if (existingLike) {
        // Unlike
        await tx.userArticleLike.delete({
          where: { id: existingLike.id },
        });
        const engagement = await tx.articleEngagement.update({
          where: { articleId: article.id },
          data: { likeCount: { decrement: 1 } },
        });
        return { isLiked: false, engagement };
      } else {
        // Like
        await tx.userArticleLike.create({
          data: {
            id: crypto.randomUUID(),
            articleId: article.id,
            userId,
          },
        });
        const engagement = await tx.articleEngagement.update({
          where: { articleId: article.id },
          data: { likeCount: { increment: 1 } },
        });
        return { isLiked: true, engagement };
      }
    });
  },
};
