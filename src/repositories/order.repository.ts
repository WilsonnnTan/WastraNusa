import type { PaymentStatus, Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

export const orderRepository = {
  createOrder: async (data: Prisma.OrderUncheckedCreateInput) => {
    return prisma.order.create({ data });
  },

  findOrderById: async (orderId: string, userId?: string) => {
    return prisma.order.findFirst({
      where: {
        id: orderId,
        ...(userId ? { userId } : {}),
      },
    });
  },

  updateOrderPaymentStatus: async (
    orderId: string,
    data: {
      paymentStatus: PaymentStatus;
      paymentMethod?: string | null;
      paidAt?: Date | null;
      orderStatus?: 'confirmed';
    },
  ) => {
    return prisma.order.update({
      where: { id: orderId },
      data,
    });
  },

  findOrdersByUserId: async (
    userId: string,
    filters: Prisma.OrderWhereInput,
    skip?: number,
    take?: number,
  ) => {
    return prisma.order.findMany({
      where: { userId, ...filters },
      skip,
      take,
      include: {
        product: {
          select: {
            name: true,
            province: true,
            clothingType: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  },

  countOrdersByUserId: async (
    userId: string,
    filters: Prisma.OrderWhereInput,
  ) => {
    return prisma.order.count({
      where: { userId, ...filters },
    });
  },
};
