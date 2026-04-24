import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  variantId: z.string().nullable().optional(),
  quantity: z.number().int().positive('Quantity must be a positive number'),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().positive('Quantity must be a positive number'),
});

export const removeFromCartSchema = z.object({
  cartItemIds: z.array(z.string()).min(1, 'At least one item ID is required'),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type RemoveFromCartInput = z.infer<typeof removeFromCartSchema>;
