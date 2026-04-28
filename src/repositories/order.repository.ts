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

  findOrderDetailByIdentifier: async (userId: string, identifier: string) => {
    return prisma.order.findFirst({
      where: {
        userId,
        OR: [{ id: identifier }, { orderNumber: identifier }],
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            province: true,
            clothingType: true,
          },
        },
        shippingAddress: {
          select: {
            recipientName: true,
            phone: true,
            province: true,
            city: true,
            district: true,
            subdistrict: true,
            postalCode: true,
            fullAddress: true,
          },
        },
        paymentTransactions: {
          orderBy: {
            createdAt: 'desc',
          },
          select: {
            id: true,
            status: true,
            paymentUrl: true,
            vaNumber: true,
            paidAt: true,
            createdAt: true,
          },
        },
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

  findOrdersForAdmin: async (
    filters: Prisma.OrderWhereInput,
    skip?: number,
    take?: number,
  ) => {
    return prisma.order.findMany({
      where: filters,
      skip,
      take,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
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

  countOrdersForAdmin: async (filters: Prisma.OrderWhereInput) => {
    return prisma.order.count({
      where: filters,
    });
  },

  findOrderForAdminByIdentifier: async (identifier: string) => {
    return prisma.order.findFirst({
      where: {
        OR: [{ id: identifier }, { orderNumber: identifier }],
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            province: true,
            clothingType: true,
          },
        },
        shippingAddress: {
          select: {
            recipientName: true,
            phone: true,
            province: true,
            city: true,
            district: true,
            subdistrict: true,
            postalCode: true,
            fullAddress: true,
          },
        },
      },
    });
  },

  updateOrderForAdmin: async (
    identifier: string,
    data: Prisma.OrderUpdateInput,
  ) => {
    const order = await prisma.order.findFirst({
      where: {
        OR: [{ id: identifier }, { orderNumber: identifier }],
      },
      select: {
        id: true,
      },
    });

    return prisma.order.update({
      where: {
        id: order?.id ?? identifier,
      },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        product: {
          select: {
            id: true,
            name: true,
            province: true,
            clothingType: true,
          },
        },
        shippingAddress: {
          select: {
            recipientName: true,
            phone: true,
            province: true,
            city: true,
            district: true,
            subdistrict: true,
            postalCode: true,
            fullAddress: true,
          },
        },
      },
    });
  },
};
