import prisma from '@/lib/prisma';

async function resolveProductId(idOrSlug: string) {
  const foundProduct = await prisma.product.findFirst({
    where: {
      OR: [{ id: idOrSlug }, { slug: idOrSlug }],
    },
    select: {
      id: true,
    },
  });

  return foundProduct?.id ?? null;
}

export const productRepository = {
  findProductById: async (productId: string) => {
    return prisma.product.findUnique({
      where: { id: productId },
    });
  },

  decrementProductStock: async (productId: string, quantity: number) => {
    return prisma.product.update({
      where: { id: productId },
      data: { stock: { decrement: quantity } },
    });
  },

  findAll: async ({
    offset,
    limit,
  }: {
    offset?: number;
    limit?: number;
  } = {}) => {
    return prisma.product.findMany({
      skip: offset,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: {
        article: {
          select: {
            id: true,
            title: true,
          },
        },
        variants: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  },

  countAll: async () => {
    return prisma.product.count();
  },

  findByIdOrSlug: async (idOrSlug: string) => {
    return prisma.product.findFirst({
      where: {
        OR: [{ id: idOrSlug }, { slug: idOrSlug }],
      },
      include: {
        article: {
          select: {
            id: true,
            title: true,
          },
        },
        variants: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  },

  create: async (data: Record<string, unknown>) => {
    return prisma.product.create({
      data: data as never,
      include: {
        article: {
          select: {
            id: true,
            title: true,
          },
        },
        variants: true,
      },
    });
  },

  update: async (idOrSlug: string, data: Record<string, unknown>) => {
    const productId = await resolveProductId(idOrSlug);

    return prisma.product.update({
      where: {
        id: productId ?? idOrSlug,
      },
      data: data as never,
      include: {
        article: {
          select: {
            id: true,
            title: true,
          },
        },
        variants: true,
      },
    });
  },

  delete: async (idOrSlug: string) => {
    const productId = await resolveProductId(idOrSlug);

    return prisma.product.delete({
      where: {
        id: productId ?? idOrSlug,
      },
    });
  },
};
