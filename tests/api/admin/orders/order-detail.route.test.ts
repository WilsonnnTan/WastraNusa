import { PUT } from '@/app/api/admin/orders/[id]/route';
import { AuthHelper } from '@/lib/auth/auth-api-helper';
import { orderService } from '@/services/order.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockService = vi.mocked(orderService);
const mockAuth = vi.mocked(AuthHelper);

describe('Admin Order Detail API', { tags: ['backend'] }, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update order on PUT', async () => {
    mockAuth.requireAdmin.mockResolvedValue({ id: 'admin-1' } as never);
    mockService.updateOrderForAdmin.mockResolvedValue({
      orderId: 'order-1',
      orderNumber: 'ORD-1',
      orderStatus: 'shipped',
    } as never);

    const req = new Request('http://localhost/api/admin/orders/ORD-1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderStatus: 'shipped',
        trackingNumber: 'RESI-123',
      }),
    });
    const response = await PUT(req, {
      params: Promise.resolve({ id: 'ORD-1' }),
    });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe('success');
    expect(mockService.updateOrderForAdmin).toHaveBeenCalledWith('ORD-1', {
      orderStatus: 'shipped',
      trackingNumber: 'RESI-123',
    });
  });

  it('should return 400 when payload is empty', async () => {
    mockAuth.requireAdmin.mockResolvedValue({ id: 'admin-1' } as never);

    const req = new Request('http://localhost/api/admin/orders/ORD-1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const response = await PUT(req, {
      params: Promise.resolve({ id: 'ORD-1' }),
    });
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.status).toBe('fail');
  });

  it('should return 400 when orderStatus is outside editable statuses', async () => {
    mockAuth.requireAdmin.mockResolvedValue({ id: 'admin-1' } as never);

    const req = new Request('http://localhost/api/admin/orders/ORD-1', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderStatus: 'confirmed' }),
    });
    const response = await PUT(req, {
      params: Promise.resolve({ id: 'ORD-1' }),
    });
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.status).toBe('fail');
    expect(mockService.updateOrderForAdmin).not.toHaveBeenCalled();
  });
});
