import { withApiAuth } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { updateCartItemSchema } from '@/schemas/cart.schema';
import { cartService } from '@/services/cart.service';

type Params = { id: string };

// PUT /api/cart/[id] — update cart item quantity
export const PUT = withApiAuth<Params>(async ({ req, userId, params }) => {
  const body = await req.json();
  const data = updateCartItemSchema.parse(body);

  const cart = await cartService.updateCartItemQuantity(
    userId,
    params.id,
    data.quantity,
  );
  return jsend.success(cart);
});

// DELETE /api/cart/[id] — remove item from cart
export const DELETE = withApiAuth<Params>(async ({ userId, params }) => {
  const cart = await cartService.removeFromCart(userId, params.id);
  return jsend.success(cart);
});
