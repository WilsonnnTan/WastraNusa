import type {
  PaymentTransactionStatus,
  Prisma,
} from '@/generated/prisma/client';
import prisma from '@/lib/prisma';

export const paymentTransactionRepository = {
  createPaymentTransaction: async (
    data: Prisma.PaymentTransactionUncheckedCreateInput,
  ) => {
    return prisma.paymentTransaction.create({ data });
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

  findTransactionByExternalId: async (externalId: string) => {
    return prisma.paymentTransaction.findUnique({
      where: { externalId },
    });
  },
};
