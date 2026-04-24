import { useAdminOrders, useUpdateAdminOrder } from '@/hooks/use-admin-order';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };
}

function createSuccessResponse<T>(data: T, status = 200) {
  return new Response(
    JSON.stringify({
      status: 'success',
      data,
    }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    },
  );
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('use-admin-order hooks', { tags: ['frontend'] }, () => {
  const MOCK_LIST = {
    items: [
      {
        orderId: 'order-1',
        orderNumber: 'ORD-1',
        customer: {
          id: 'user-1',
          name: 'User',
          email: 'user@example.com',
        },
        product: {
          id: 'prod-1',
          name: 'Batik',
          location: 'Solo',
          category: 'batik',
          quantity: 1,
        },
        totalAmount: 150000,
        totalAmountLabel: 'Rp150.000',
        orderStatus: 'processing',
        orderStatusLabel: 'Pengemasan',
        paymentStatus: 'paid',
        paymentStatusLabel: 'Lunas',
        trackingNumber: null,
        createdAt: '2026-01-01T00:00:00.000Z',
        createdAtLabel: '1 Jan 2026',
      },
    ],
    meta: {
      page: 1,
      limit: 10,
      totalItems: 1,
      totalPages: 1,
      hasNextPage: false,
    },
  };

  it('should fetch admin orders with filters', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse(MOCK_LIST) as never,
    );

    const { result } = renderHook(
      () => useAdminOrders(1, 10, { orderStatus: 'processing' }),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(MOCK_LIST);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/admin/orders?page=1&limit=10&orderStatus=processing',
      expect.any(Object),
    );
  });

  it('should update admin order', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse(MOCK_LIST.items[0]) as never,
    );

    const { result } = renderHook(() => useUpdateAdminOrder(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({
        idOrOrderNumber: 'ORD-1',
        data: {
          orderStatus: 'shipped',
          trackingNumber: 'RESI-123',
        },
      });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/admin/orders/ORD-1',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({
          orderStatus: 'shipped',
          trackingNumber: 'RESI-123',
        }),
      }),
    );
  });
});
