import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';
import type {
  ProductCatalogFilters,
  ProductCatalogSortBy,
} from '@/types/product';

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

const DEFAULT_SORT: ProductCatalogSortBy = 'newest';

function buildProductWhereInput(
  filters: ProductCatalogFilters = {},
): Prisma.ProductWhereInput {
  const {
    minPrice,
    maxPrice,
    island,
    province,
    clothingType,
    gender,
    status,
    inStock,
  } = filters;

  const where: Prisma.ProductWhereInput = {
    ...(island ? { island } : {}),
    ...(province ? { province } : {}),
    ...(clothingType ? { clothingType } : {}),
    ...(gender ? { gender } : {}),
    ...(status ? { status } : {}),
  };

  if (typeof minPrice === 'number' || typeof maxPrice === 'number') {
    where.price = {
      ...(typeof minPrice === 'number' ? { gte: minPrice } : {}),
      ...(typeof maxPrice === 'number' ? { lte: maxPrice } : {}),
    };
  }

  if (typeof inStock === 'boolean') {
    where.stock = inStock ? { gt: 0 } : 0;
  }

  return where;
}

function buildOrderBy(sortBy: ProductCatalogSortBy = DEFAULT_SORT) {
  switch (sortBy) {
    case 'oldest':
      return { createdAt: 'asc' } as const;
    case 'price_asc':
      return { price: 'asc' } as const;
    case 'price_desc':
      return { price: 'desc' } as const;
    case 'sold_desc':
      return { sold: 'desc' } as const;
    case 'name_asc':
      return { name: 'asc' } as const;
    case 'name_desc':
      return { name: 'desc' } as const;
    case 'newest':
    default:
      return { createdAt: 'desc' } as const;
  }
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
    filters,
  }: {
    offset?: number;
    limit?: number;
    filters?: ProductCatalogFilters;
  } = {}) => {
    const orderBy = buildOrderBy(filters?.sortBy);
    const where = buildProductWhereInput(filters);

    return prisma.product.findMany({
      where,
      skip: offset,
      take: limit,
      orderBy,
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

  countAll: async (filters?: ProductCatalogFilters) => {
    return prisma.product.count({
      where: buildProductWhereInput(filters),
    });
  },

  countByClothingType: async (filters?: ProductCatalogFilters) => {
    return prisma.product.groupBy({
      by: ['clothingType'],
      where: buildProductWhereInput(filters),
      _count: {
        clothingType: true,
      },
      orderBy: {
        clothingType: 'asc',
      },
    });
  },

  countByIsland: async (filters?: ProductCatalogFilters) => {
    return prisma.product.groupBy({
      by: ['island'],
      where: buildProductWhereInput(filters),
      _count: {
        island: true,
      },
      orderBy: {
        island: 'asc',
      },
    });
  },

  countByProvince: async (filters?: ProductCatalogFilters) => {
    return prisma.product.groupBy({
      by: ['province'],
      where: buildProductWhereInput(filters),
      _count: {
        province: true,
      },
      orderBy: {
        province: 'asc',
      },
    });
  },

  countByGender: async (filters?: ProductCatalogFilters) => {
    return prisma.product.groupBy({
      by: ['gender'],
      where: buildProductWhereInput(filters),
      _count: {
        gender: true,
      },
      orderBy: {
        gender: 'asc',
      },
    });
  },

  countByStatus: async (filters?: ProductCatalogFilters) => {
    return prisma.product.groupBy({
      by: ['status'],
      where: buildProductWhereInput(filters),
      _count: {
        status: true,
      },
      orderBy: {
        status: 'asc',
      },
    });
  },

  getPriceRange: async (filters?: ProductCatalogFilters) => {
    const aggregate = await prisma.product.aggregate({
      where: buildProductWhereInput(filters),
      _min: {
        price: true,
      },
      _max: {
        price: true,
      },
    });

    return {
      min: aggregate._min.price?.toNumber() ?? 0,
      max: aggregate._max.price?.toNumber() ?? 0,
    };
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
