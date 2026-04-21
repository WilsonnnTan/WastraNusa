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
    topic,
  }: {
    offset?: number;
    limit?: number;
    region?: string;
    topic?: string;
  } = {}) => {
    const where: Prisma.ArticleWhereInput = {
      ...(region ? { region } : {}),
      ...(topic ? { topic } : {}),
    };

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

  countAll: async ({
    region,
    topic,
  }: { region?: string; topic?: string } = {}) => {
    const where: Prisma.ArticleWhereInput = {
      ...(region ? { region } : {}),
      ...(topic ? { topic } : {}),
    };

    return prisma.article.count({ where });
  },

  countByRegion: async ({ topic }: { topic?: string } = {}) => {
    return prisma.article.groupBy({
      by: ['region'],
      where: topic
        ? {
            topic,
          }
        : undefined,
      _count: {
        region: true,
      },
      orderBy: {
        region: 'asc',
      },
    });
  },

  countByTopic: async ({ region }: { region?: string } = {}) => {
    return prisma.article.groupBy({
      by: ['topic'],
      where: region
        ? {
            region,
          }
        : undefined,
      _count: {
        topic: true,
      },
      orderBy: {
        topic: 'asc',
      },
    });
  },

  countDistinctMotifLabel: async () => {
    const motifGroups = await prisma.article.groupBy({
      by: ['motifLabel'],
      _count: {
        motifLabel: true,
      },
    });

    return motifGroups.filter((item) => item.motifLabel.trim().length > 0)
      .length;
  },

  findMostPopular: async (limit: number = 6) => {
    return prisma.articleEngagement.findMany({
      take: limit,
      orderBy: [{ viewCount: 'desc' }, { updatedAt: 'desc' }],
      include: {
        article: {
          select: {
            slug: true,
            title: true,
            topic: true,
            region: true,
            readMinutes: true,
          },
        },
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

  countLikedByUser: async (userId: string) => {
    return prisma.userArticleLike.count({
      where: {
        userId,
        article: {
          is: {
            status: 'published',
          },
        },
      },
    });
  },

  findLikedByUser: async ({
    userId,
    offset,
    limit,
  }: {
    userId: string;
    offset?: number;
    limit?: number;
  }) => {
    return prisma.userArticleLike.findMany({
      where: {
        userId,
        article: {
          is: {
            status: 'published',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: limit,
      include: {
        article: {
          include: {
            engagement: true,
          },
        },
      },
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
