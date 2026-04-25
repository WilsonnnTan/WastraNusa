import {
  useArticleOptions,
  useCreateProductInventory,
  useDeleteProductInventory,
  useProductInventories,
  useProductInventoryDetail,
  useUpdateProductInventory,
} from '@/hooks/use-product-inventory';
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

describe('use-product-inventory hooks', { tags: ['frontend'] }, () => {
  const MOCK_PRODUCT_LIST = {
    items: [
      {
        id: 'prod-1',
        name: 'Product 1',
        price: 100000,
        stock: 50,
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

  const MOCK_DETAIL = {
    id: 'prod-1',
    name: 'Product 1',
    price: 100000,
    stock: 50,
    variants: [],
  };

  const MOCK_ARTICLE_OPTIONS = {
    items: [
      {
        id: 'art-1',
        title: 'Article 1',
        island: 'Jawa',
        province: 'Jawa Tengah',
      },
    ],
    meta: {
      page: 1,
      hasNextPage: false,
    },
  };

  it('should fetch product inventory list', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse(MOCK_PRODUCT_LIST) as never,
    );

    const { result } = renderHook(() => useProductInventories(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(MOCK_PRODUCT_LIST);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/products?page=1&limit=10',
      expect.any(Object),
    );
  });

  it('should fetch product inventory detail', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse(MOCK_DETAIL) as never,
    );

    const { result } = renderHook(() => useProductInventoryDetail('prod-1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(MOCK_DETAIL);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/products/prod-1',
      expect.any(Object),
    );
  });

  it('should fetch article options (infinite query)', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse(MOCK_ARTICLE_OPTIONS) as never,
    );

    const { result } = renderHook(() => useArticleOptions(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.pages[0].items).toEqual([
      {
        id: 'art-1',
        title: 'Article 1',
        island: 'Jawa',
        province: 'Jawa Tengah',
      },
    ]);
  });

  it('should create product inventory', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse(MOCK_DETAIL, 201) as never,
    );

    const { result } = renderHook(() => useCreateProductInventory(), {
      wrapper: createWrapper(),
    });

    const input = {
      articleId: 'art-1',
      name: 'New Product',
      slug: 'new-product',
      price: 200000,
      stock: 10,
      sku: 'SKU-1',
      weight: 500,
      clothingType: 'Batik',
      gender: 'male' as const,
    };

    act(() => {
      result.current.mutate(input);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/products',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify(input),
      }),
    );
  });

  it('should update product inventory', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse(MOCK_DETAIL) as never,
    );

    const { result } = renderHook(() => useUpdateProductInventory(), {
      wrapper: createWrapper(),
    });

    const input = { name: 'Updated Product', slug: 'updated-product' };

    act(() => {
      result.current.mutate({ idOrSlug: 'prod-1', data: input });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/products/prod-1',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify(input),
      }),
    );
  });

  it('should delete product inventory', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse(null) as never,
    );

    const { result } = renderHook(() => useDeleteProductInventory(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate('prod-1');
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/products/prod-1',
      expect.objectContaining({
        method: 'DELETE',
      }),
    );
  });
});
