import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

export const addressRepository = {
  findAllByUser: async (userId: string) => {
    return prisma.customerAddress.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  },

  findById: async (id: string) => {
    return prisma.customerAddress.findUnique({ where: { id } });
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

  update: async (id: string, data: Prisma.CustomerAddressUpdateInput) => {
    return prisma.customerAddress.update({ where: { id }, data });
  },

  delete: async (id: string) => {
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
      prisma.customerAddress.update({
        where: { id },
        data: { isDefault: true },
      }),
    ]);
  },

  countByUser: async (userId: string) => {
    return prisma.customerAddress.count({ where: { userId } });
  },
};
