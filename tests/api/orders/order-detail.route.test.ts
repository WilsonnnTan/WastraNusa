import { GET } from '@/app/api/orders/[id]/route';
import { AuthHelper } from '@/lib/auth/auth-api-helper';
import { orderService } from '@/services/order.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockService = vi.mocked(orderService);
const mockAuth = vi.mocked(AuthHelper);

describe('Order Detail API GET', { tags: ['backend'] }, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return order detail data for authenticated user', async () => {
    mockAuth.requireUser.mockResolvedValue({ id: 'user-1' } as never);
    mockService.getUserOrderDetail.mockResolvedValue({
      orderId: 'order-id-1',
      orderNumber: 'ORD-1',
    } as never);

    const req = new Request('http://localhost/api/orders/ORD-1');
    const response = await GET(req, {
      params: Promise.resolve({ id: 'ORD-1' }),
    });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe('success');
    expect(mockService.getUserOrderDetail).toHaveBeenCalledWith(
      'user-1',
      'ORD-1',
    );
  });
});
