import prisma from '@/lib/prisma';

export const cartRepository = {
  /**
   * Get or create a cart for a user
   */
  findOrCreateByUser: async (userId: string) => {
    return prisma.cart.upsert({
      where: { userId },
      update: {},
      create: { id: crypto.randomUUID(), userId },
      include: { items: { include: { product: true, variant: true } } },
    });
  },

  /**
   * Get cart with all items and relations
   */
  findByUserId: async (userId: string) => {
    return prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
            variant: true,
          },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  },

  /**
   * Add item to cart or update quantity if exists
   */
  addItem: async (
    cartId: string,
    productId: string,
    variantId: string | null,
    quantity: number,
    userId?: string,
  ) => {
    if (userId) {
      const cart = await prisma.cart.findFirst({
        where: { id: cartId, userId },
        select: { id: true },
      });

      if (!cart) {
        throw new Error('Cart not found');
      }
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId,
        productId,
        variantId,
        ...(userId ? { cart: { userId } } : {}),
      },
    });

    if (existingItem) {
      return prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + quantity },
        include: { product: true, variant: true },
      });
    }

    return prisma.cartItem.create({
      data: {
        id: crypto.randomUUID(),
        cartId,
        productId,
        variantId,
        quantity,
      },
      include: { product: true, variant: true },
    });
  },

  /**
   * Update cart item quantity
   */
  updateItemQuantity: async (
    cartItemId: string,
    quantity: number,
    userId?: string,
  ) => {
    if (!userId) {
      return prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
        include: { product: true, variant: true },
      });
    }

    await prisma.cartItem.updateMany({
      where: { id: cartItemId, cart: { userId } },
      data: { quantity },
    });

    return prisma.cartItem.findFirst({
      where: { id: cartItemId, cart: { userId } },
      include: { product: true, variant: true },
    });
  },

  /**
   * Remove item from cart
   */
  removeItem: async (cartItemId: string, userId?: string) => {
    if (!userId) {
      return prisma.cartItem.delete({
        where: { id: cartItemId },
      });
    }

    return prisma.cartItem.deleteMany({
      where: { id: cartItemId, cart: { userId } },
    });
  },

  /**
   * Clear all items from cart
   */
  clearCart: async (cartId: string, userId?: string) => {
    return prisma.cartItem.deleteMany({
      where: {
        cartId,
        ...(userId ? { cart: { userId } } : {}),
      },
    });
  },

  /**
   * Remove multiple items from cart
   */
  removeItems: async (cartItemIds: string[], userId?: string) => {
    return prisma.cartItem.deleteMany({
      where: {
        id: { in: cartItemIds },
        ...(userId ? { cart: { userId } } : {}),
      },
    });
  },

  /**
   * Remove purchased cart items by id
   */
  removePurchasedItemsById: async (userId: string, cartItemIds: string[]) => {
    if (cartItemIds.length === 0) {
      return { count: 0 };
    }

    return prisma.cartItem.deleteMany({
      where: {
        id: { in: cartItemIds },
        cart: { userId },
      },
    });
  },

  /**
   * Remove purchased cart items by product+variant ownership.
   */
  removePurchasedItemsByProductVariant: async (
    userId: string,
    items: Array<{ productId: string; variantId: string | null }>,
  ) => {
    if (items.length === 0) {
      return { count: 0 };
    }

    return prisma.cartItem.deleteMany({
      where: {
        cart: { userId },
        OR: items.map((item) => ({
          productId: item.productId,
          variantId: item.variantId,
        })),
      },
    });
  },

  /**
   * Get total item count in cart
   */
  getCartItemCount: async (userId: string) => {
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    return cart ? cart.items.length : 0;
  },
};
