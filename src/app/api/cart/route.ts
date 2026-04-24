import { withApiAuth } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { addToCartSchema, removeFromCartSchema } from '@/schemas/cart.schema';
import { cartService } from '@/services/cart.service';

// GET /api/cart — get user's cart with all items
export const GET = withApiAuth(async ({ userId }) => {
  const cart = await cartService.getCart(userId);
  return jsend.success(cart);
});

// POST /api/cart — add item to cart
export const POST = withApiAuth(async ({ req, userId }) => {
  const body = await req.json();
  const data = addToCartSchema.parse(body);

  const cart = await cartService.addToCart(
    userId,
    data.productId,
    data.variantId || null,
    data.quantity,
  );

  return jsend.success(cart, 201);
});

// DELETE /api/cart — remove multiple items from cart
export const DELETE = withApiAuth(async ({ req, userId }) => {
  const body = await req.json();
  const data = removeFromCartSchema.parse(body);

  const cart = await cartService.removeMultipleFromCart(
    userId,
    data.cartItemIds,
  );
  return jsend.success(cart);
});
