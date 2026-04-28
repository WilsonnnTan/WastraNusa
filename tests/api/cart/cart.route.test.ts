import { DELETE, GET, POST } from '@/app/api/cart/route';
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
      quantity: 2,
    },
  ],
};

function createRequest(url: string, options: RequestInit = {}): Request {
  return new Request(url, options);
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/cart', { tags: ['backend'] }, () => {
  it('should return cart for authenticated user', async () => {
    mockAuth.requireUser.mockResolvedValue({
      id: 'user-1',
      role: 'user',
    } as never);
    mockService.getCart.mockResolvedValue(MOCK_CART as never);

    const req = createRequest('http://localhost/api/cart');
    const res = await GET(req, { params: Promise.resolve({}) });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.status).toBe('success');
    expect(body.data).toEqual(MOCK_CART);
    expect(mockService.getCart).toHaveBeenCalledWith('user-1');
  });
});

describe('POST /api/cart', { tags: ['backend'] }, () => {
  it('should add item to cart and return 201', async () => {
    mockAuth.requireUser.mockResolvedValue({
      id: 'user-1',
      role: 'user',
    } as never);
    mockService.addToCart.mockResolvedValue(MOCK_CART as never);

    const req = createRequest('http://localhost/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productId: 'prod-1',
        quantity: 2,
      }),
    });
    const res = await POST(req, { params: Promise.resolve({}) });
    const body = await res.json();

    expect(res.status).toBe(201);
    expect(body.status).toBe('success');
    expect(mockService.addToCart).toHaveBeenCalledWith(
      'user-1',
      'prod-1',
      null,
      2,
    );
  });
});

describe('DELETE /api/cart', { tags: ['backend'] }, () => {
  it('should remove multiple items from cart', async () => {
    mockAuth.requireUser.mockResolvedValue({
      id: 'user-1',
      role: 'user',
    } as never);
    mockService.removeMultipleFromCart.mockResolvedValue(MOCK_CART as never);

    const req = createRequest('http://localhost/api/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cartItemIds: ['item-1', 'item-2'],
      }),
    });
    const res = await DELETE(req, { params: Promise.resolve({}) });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.status).toBe('success');
    expect(mockService.removeMultipleFromCart).toHaveBeenCalledWith('user-1', [
      'item-1',
      'item-2',
    ]);
  });
});
