import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

export const addressRepository = {
  findAllByUser: async (userId: string) => {
    return prisma.customerAddress.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  },

  findById: async (id: string, userId?: string) => {
    return prisma.customerAddress.findFirst({
      where: {
        id,
        ...(userId ? { userId } : {}),
      },
    });
  },

  findDefaultByUser: async (userId: string) => {
    return prisma.customerAddress.findFirst({
      where: { userId, isDefault: true },
      orderBy: { createdAt: 'desc' },
    });
  },

  create: async (data: Prisma.CustomerAddressUncheckedCreateInput) => {
    return prisma.customerAddress.create({ data });
  },

  update: async (
    id: string,
    data: Prisma.CustomerAddressUpdateInput,
    userId?: string,
  ) => {
    if (!userId) {
      return prisma.customerAddress.update({ where: { id }, data });
    }

    await prisma.customerAddress.updateMany({
      where: { id, userId },
      data,
    });

    return prisma.customerAddress.findFirst({
      where: { id, userId },
    });
  },

  delete: async (id: string, userId?: string) => {
    if (userId) {
      const address = await prisma.customerAddress.findFirst({
        where: { id, userId },
      });
      if (!address) return null;

      return prisma.customerAddress.delete({ where: { id: address.id } });
    }

    return prisma.customerAddress.delete({ where: { id } });
  },

  clearDefaultsByUser: async (userId: string) => {
    return prisma.customerAddress.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
  },

  /**
   * Sets one address as the default and clears isDefault on all other addresses for the user.
   */
  setDefault: async (id: string, userId: string) => {
    return prisma.$transaction([
      prisma.customerAddress.updateMany({
        where: { userId },
        data: { isDefault: false },
      }),
      prisma.customerAddress.updateMany({
        where: { id, userId },
        data: { isDefault: true },
      }),
      prisma.customerAddress.findFirst({
        where: { id, userId },
      }),
    ]);
  },

  countByUser: async (userId: string) => {
    return prisma.customerAddress.count({ where: { userId } });
  },
};
