import { ApiError } from '@/lib/error';
import { cartRepository } from '@/repositories/cart.repository';
import { cartService } from '@/services/cart.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.unmock('@/services/cart.service');

const mockRepo = vi.mocked(cartRepository);

const MOCK_CART = {
  id: 'cart-1',
  userId: 'user-1',
  items: [
    {
      id: 'item-1',
      cartId: 'cart-1',
      productId: 'prod-1',
      variantId: null,
      quantity: 2,
    },
  ],
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('cartService', { tags: ['backend'] }, () => {
  describe('getCart', () => {
    it('should call repository findOrCreateByUser', async () => {
      mockRepo.findOrCreateByUser.mockResolvedValue(MOCK_CART as never);

      const cart = await cartService.getCart('user-1');

      expect(mockRepo.findOrCreateByUser).toHaveBeenCalledWith('user-1');
      expect(cart).toEqual(MOCK_CART);
    });
  });

  describe('addToCart', () => {
    it('should throw error if quantity is 0 or less', async () => {
      await expect(
        cartService.addToCart('user-1', 'prod-1', null, 0),
      ).rejects.toThrow(ApiError);
    });

    it('should add item and return updated cart', async () => {
      mockRepo.findOrCreateByUser.mockResolvedValue(MOCK_CART as never);
      mockRepo.findByUserId.mockResolvedValue(MOCK_CART as never);

      const cart = await cartService.addToCart('user-1', 'prod-1', null, 1);

      expect(mockRepo.addItem).toHaveBeenCalledWith(
        MOCK_CART.id,
        'prod-1',
        null,
        1,
        'user-1',
      );
      expect(mockRepo.findByUserId).toHaveBeenCalledWith('user-1');
      expect(cart).toEqual(MOCK_CART);
    });
  });

  describe('updateCartItemQuantity', () => {
    it('should throw error if quantity is 0 or less', async () => {
      await expect(
        cartService.updateCartItemQuantity('user-1', 'item-1', 0),
      ).rejects.toThrow(ApiError);
    });

    it('should throw 404 if item not in user cart', async () => {
      mockRepo.findByUserId.mockResolvedValue(MOCK_CART as never);

      await expect(
        cartService.updateCartItemQuantity('user-1', 'other-item', 5),
      ).rejects.toThrow(ApiError);
    });

    it('should update quantity and return cart', async () => {
      mockRepo.findByUserId.mockResolvedValue(MOCK_CART as never);

      await cartService.updateCartItemQuantity('user-1', 'item-1', 5);

      expect(mockRepo.updateItemQuantity).toHaveBeenCalledWith(
        'item-1',
        5,
        'user-1',
      );
    });
  });

  describe('removeFromCart', () => {
    it('should throw 404 if item not in user cart', async () => {
      mockRepo.findByUserId.mockResolvedValue(MOCK_CART as never);

      await expect(
        cartService.removeFromCart('user-1', 'other-item'),
      ).rejects.toThrow(ApiError);
    });

    it('should remove item and return cart', async () => {
      mockRepo.findByUserId.mockResolvedValue(MOCK_CART as never);

      await cartService.removeFromCart('user-1', 'item-1');

      expect(mockRepo.removeItem).toHaveBeenCalledWith('item-1', 'user-1');
    });
  });

  describe('removeMultipleFromCart', () => {
    it('should throw 400 if no IDs provided', async () => {
      await expect(
        cartService.removeMultipleFromCart('user-1', []),
      ).rejects.toThrow(ApiError);
    });

    it('should throw 404 if some items not in user cart', async () => {
      mockRepo.findByUserId.mockResolvedValue(MOCK_CART as never);

      await expect(
        cartService.removeMultipleFromCart('user-1', ['item-1', 'other-item']),
      ).rejects.toThrow(ApiError);
    });

    it('should remove items and return cart', async () => {
      mockRepo.findByUserId.mockResolvedValue(MOCK_CART as never);

      await cartService.removeMultipleFromCart('user-1', ['item-1']);

      expect(mockRepo.removeItems).toHaveBeenCalledWith(['item-1'], 'user-1');
    });
  });

  describe('clearCart', () => {
    it('should clear all items and return cart', async () => {
      mockRepo.findByUserId.mockResolvedValue(MOCK_CART as never);

      await cartService.clearCart('user-1');

      expect(mockRepo.clearCart).toHaveBeenCalledWith(MOCK_CART.id, 'user-1');
    });
  });
});
