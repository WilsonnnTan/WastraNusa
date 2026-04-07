import prisma from '@/lib/prisma';

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
};
