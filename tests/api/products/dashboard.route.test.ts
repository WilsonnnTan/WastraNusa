import { productService } from '@/services/product.service';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { GET } from '../../../src/app/api/products/dashboard/route';

const mockService = vi.mocked(productService);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('GET /api/products/dashboard', { tags: ['backend'] }, () => {
  it('should return product dashboard overview data', async () => {
    mockService.getDashboardOverview.mockResolvedValue({
      totalProducts: 12,
      lowStockItems: [
        {
          name: 'Batik Jawa Premium',
          category: 'Batik',
          stock: 3,
          severity: 'low',
        },
      ],
    } as never);

    const req = new Request('http://localhost/api/products/dashboard');
    const res = await GET(req, { params: Promise.resolve({}) });
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.status).toBe('success');
    expect(body.data).toEqual({
      totalProducts: 12,
      lowStockItems: [
        {
          name: 'Batik Jawa Premium',
          category: 'Batik',
          stock: 3,
          severity: 'low',
        },
      ],
    });
    expect(mockService.getDashboardOverview).toHaveBeenCalledWith();
  });
});
