import type { PaymentStatus, Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

export const orderRepository = {
  createOrder: async (data: Prisma.OrderUncheckedCreateInput) => {
    return prisma.order.create({ data });
  },

  findOrderById: async (orderId: string) => {
    return prisma.order.findUnique({
      where: { id: orderId },
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
};
