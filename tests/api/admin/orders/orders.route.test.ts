import { GET } from '@/app/api/admin/orders/route';
import { AuthHelper } from '@/lib/auth/auth-api-helper';
import { orderService } from '@/services/order.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockService = vi.mocked(orderService);
const mockAuth = vi.mocked(AuthHelper);

describe('GET /api/admin/orders', { tags: ['backend'] }, () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return paginated admin order list', async () => {
    mockAuth.requireAdmin.mockResolvedValue({ id: 'admin-1' } as never);
    mockService.getAdminOrders.mockResolvedValue({
      items: [],
      meta: {
        page: 1,
        limit: 10,
        totalItems: 0,
        totalPages: 1,
        hasNextPage: false,
      },
    } as never);

    const req = new Request('http://localhost/api/admin/orders');
    const response = await GET(req, { params: Promise.resolve({}) });
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe('success');
    expect(mockAuth.requireAdmin).toHaveBeenCalled();
    expect(mockService.getAdminOrders).toHaveBeenCalledWith(1, 10, {
      orderStatus: undefined,
      paymentStatus: undefined,
    });
  });

  it('should pass filters and pagination to service', async () => {
    mockAuth.requireAdmin.mockResolvedValue({ id: 'admin-1' } as never);
    mockService.getAdminOrders.mockResolvedValue({
      items: [],
      meta: {
        page: 2,
        limit: 5,
        totalItems: 0,
        totalPages: 1,
        hasNextPage: false,
      },
    } as never);

    const req = new Request(
      'http://localhost/api/admin/orders?page=2&limit=5&orderStatus=shipped&paymentStatus=paid',
    );
    await GET(req, { params: Promise.resolve({}) });

    expect(mockService.getAdminOrders).toHaveBeenCalledWith(2, 5, {
      orderStatus: 'shipped',
      paymentStatus: 'paid',
    });
  });
});
