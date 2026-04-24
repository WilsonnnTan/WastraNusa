import { type PaginatedOrders, useOrders } from '@/hooks/use-order';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
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

describe('useOrders hook', { tags: ['frontend'] }, () => {
  const MOCK_ORDERS: PaginatedOrders = {
    data: [
      {
        id: 'order-1',
        date: '2026-01-01',
        totalPrice: '150000',
        status: 'Dikonfirmasi',
        product: {
          category: 'Batik',
          name: 'Kemeja Batik',
          location: 'Solo',
          quantity: 1,
        },
        actions: ['Detail'],
      },
    ],
    meta: {
      total: 1,
      page: 1,
      limit: 5,
      totalPages: 1,
    },
  };

  it('should fetch orders with default params', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse(MOCK_ORDERS) as never,
    );

    const { result } = renderHook(() => useOrders(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(MOCK_ORDERS);
    expect(global.fetch).toHaveBeenCalledWith('/api/orders?page=1&limit=5');
  });

  it('should fetch orders with custom status and pagination', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse(MOCK_ORDERS) as never,
    );

    const { result } = renderHook(() => useOrders('Dikirim', 2, 10), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/orders?status=Dikirim&page=2&limit=10',
    );
  });

  it('should handle error response', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(null, { status: 500 }) as never,
    );

    const { result } = renderHook(() => useOrders(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe('Gagal mengambil data pesanan');
  });
});
