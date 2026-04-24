import { ApiError } from '@/lib/error';
import { logger } from '@/lib/logger';
import { cartRepository } from '@/repositories/cart.repository';

export const cartService = {
  /**
   * Get cart for authenticated user
   */
  getCart: async (userId: string) => {
    const cart = await cartRepository.findOrCreateByUser(userId);
    return cart;
  },

  /**
   * Add item to cart
   */
  addToCart: async (
    userId: string,
    productId: string,
    variantId: string | null,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      throw new ApiError('Quantity must be greater than 0', 400);
    }

    const cart = await cartRepository.findOrCreateByUser(userId);
    await cartRepository.addItem(cart.id, productId, variantId, quantity);

    logger.info('Item added to cart', {
      userId,
      productId,
      variantId,
      quantity,
    });

    // Return updated cart
    return cartRepository.findByUserId(userId);
  },

  /**
   * Update item quantity in cart
   */
  updateCartItemQuantity: async (
    userId: string,
    cartItemId: string,
    quantity: number,
  ) => {
    if (quantity <= 0) {
      throw new ApiError('Quantity must be greater than 0', 400);
    }

    // Verify item belongs to user's cart
    const cart = await cartRepository.findByUserId(userId);
    if (!cart) {
      throw new ApiError('Cart not found', 404);
    }

    const itemExists = cart.items.some((item) => item.id === cartItemId);
    if (!itemExists) {
      throw new ApiError('Item not found in cart', 404);
    }

    await cartRepository.updateItemQuantity(cartItemId, quantity);

    logger.info('Cart item quantity updated', {
      userId,
      cartItemId,
      quantity,
    });

    return cartRepository.findByUserId(userId);
  },

  /**
   * Remove item from cart
   */
  removeFromCart: async (userId: string, cartItemId: string) => {
    // Verify item belongs to user's cart
    const cart = await cartRepository.findByUserId(userId);
    if (!cart) {
      throw new ApiError('Cart not found', 404);
    }

    const itemExists = cart.items.some((item) => item.id === cartItemId);
    if (!itemExists) {
      throw new ApiError('Item not found in cart', 404);
    }

    await cartRepository.removeItem(cartItemId);

    logger.info('Item removed from cart', {
      userId,
      cartItemId,
    });

    return cartRepository.findByUserId(userId);
  },

  /**
   * Remove multiple items from cart
   */
  removeMultipleFromCart: async (userId: string, cartItemIds: string[]) => {
    if (cartItemIds.length === 0) {
      throw new ApiError('No items to remove', 400);
    }

    // Verify all items belong to user's cart
    const cart = await cartRepository.findByUserId(userId);
    if (!cart) {
      throw new ApiError('Cart not found', 404);
    }

    const cartItemIdSet = new Set(cart.items.map((item) => item.id));
    const invalidIds = cartItemIds.filter((id) => !cartItemIdSet.has(id));

    if (invalidIds.length > 0) {
      throw new ApiError('Some items not found in cart', 404);
    }

    await cartRepository.removeItems(cartItemIds);

    logger.info('Multiple items removed from cart', {
      userId,
      count: cartItemIds.length,
    });

    return cartRepository.findByUserId(userId);
  },

  /**
   * Clear entire cart
   */
  clearCart: async (userId: string) => {
    const cart = await cartRepository.findByUserId(userId);
    if (!cart) {
      throw new ApiError('Cart not found', 404);
    }

    await cartRepository.clearCart(cart.id);

    logger.info('Cart cleared', { userId });

    return cartRepository.findByUserId(userId);
  },

  /**
   * Get cart item count
   */
  getCartCount: async (userId: string) => {
    return cartRepository.getCartItemCount(userId);
  },
};
