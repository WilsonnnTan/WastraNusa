import type {
  PaymentStatus,
  PaymentTransactionStatus,
  Prisma,
} from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

export const paymentRepository = {
  findProductById: async (productId: string) => {
    return prisma.product.findUnique({
      where: { id: productId },
    });
  },

  findVariantById: async (variantId: string) => {
    return prisma.productVariant.findUnique({
      where: { id: variantId },
    });
  },

  createOrder: async (data: Prisma.OrderUncheckedCreateInput) => {
    return prisma.order.create({ data });
  },

  findOrderById: async (orderId: string) => {
    return prisma.order.findUnique({
      where: { id: orderId },
    });
  },

  createPaymentTransaction: async (
    data: Prisma.PaymentTransactionUncheckedCreateInput,
  ) => {
    return prisma.paymentTransaction.create({ data });
  },

  findPaymentByExternalId: async (externalId: string) => {
    return prisma.paymentTransaction.findUnique({
      where: { externalId },
    });
  },

  updatePaymentStatus: async (
    externalId: string,
    data: {
      status: PaymentTransactionStatus;
      paidAt?: Date | null;
    },
  ) => {
    return prisma.paymentTransaction.update({
      where: { externalId },
      data,
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

  decrementProductStock: async (productId: string, quantity: number) => {
    return prisma.product.update({
      where: { id: productId },
      data: { stock: { decrement: quantity } },
    });
  },

  decrementVariantStock: async (variantId: string, quantity: number) => {
    return prisma.productVariant.update({
      where: { id: variantId },
      data: { stock: { decrement: quantity } },
    });
  },
};
