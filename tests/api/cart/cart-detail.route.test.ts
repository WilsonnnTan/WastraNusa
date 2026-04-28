import { DELETE, PUT } from '@/app/api/cart/[id]/route';
import { AuthHelper } from '@/lib/auth/auth-api-helper';
import { cartService } from '@/services/cart.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockService = vi.mocked(cartService);
const mockAuth = vi.mocked(AuthHelper);

const MOCK_CART = {
  id: 'cart-1',
  userId: 'user-1',
  items: [
    {
      id: 'item-1',
      cartId: 'cart-1',
      productId: 'prod-1',
      variantId: null,
      quantity: 5,
    },
  ],
};

function createRequest(url: string, options: RequestInit = {}): Request {
  return new Request(url, options);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('PUT /api/cart/[id]', { tags: ['backend'] }, () => {
  it('should update cart item quantity', async () => {
    mockAuth.requireUser.mockResolvedValue({
      id: 'user-1',
      role: 'user',
    } as never);
    mockService.updateCartItemQuantity.mockResolvedValue(MOCK_CART as never);

    const req = createRequest('http://localhost/api/cart/item-1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quantity: 5,
      }),
    });
    const res = await PUT(req, { params: Promise.resolve({ id: 'item-1' }) });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.status).toBe('success');
    expect(mockService.updateCartItemQuantity).toHaveBeenCalledWith(
      'user-1',
      'item-1',
      5,
    );
  });
});

describe('DELETE /api/cart/[id]', { tags: ['backend'] }, () => {
  it('should remove item from cart', async () => {
    mockAuth.requireUser.mockResolvedValue({
      id: 'user-1',
      role: 'user',
    } as never);
    mockService.removeFromCart.mockResolvedValue(MOCK_CART as never);

    const req = createRequest('http://localhost/api/cart/item-1', {
      method: 'DELETE',
    });
    const res = await DELETE(req, {
      params: Promise.resolve({ id: 'item-1' }),
    });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.status).toBe('success');
    expect(mockService.removeFromCart).toHaveBeenCalledWith('user-1', 'item-1');
  });
});
