import {
  type CustomerAddress,
  addressKeys,
  useAddresses,
  useCreateAddress,
  useDeleteAddress,
  useSetDefaultAddress,
  useUpdateAddress,
} from '@/hooks/use-address';
import {
  QueryClient,
  type QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';

function createWrapper(config?: QueryClientConfig) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    ...config,
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

describe('use-address hooks', { tags: ['frontend'] }, () => {
  const MOCK_ADDRESS = { id: 'addr-1', label: 'Home' };

  it('should fetch addresses', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse([MOCK_ADDRESS]) as never,
    );

    const { result } = renderHook(() => useAddresses(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual([MOCK_ADDRESS]);
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/addresses',
      expect.any(Object),
    );
  });

  it('should invalidate cache on create success', async () => {
    const queryClient = new QueryClient();
    vi.spyOn(queryClient, 'invalidateQueries');
    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse(MOCK_ADDRESS) as never,
    );

    const { result } = renderHook(() => useCreateAddress(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await result.current.mutateAsync({ label: 'New' } as never);

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: addressKeys.lists() }),
    );
  });

  it('should invalidate cache on update success', async () => {
    const queryClient = new QueryClient();
    vi.spyOn(queryClient, 'invalidateQueries');
    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse(MOCK_ADDRESS) as never,
    );

    const { result } = renderHook(() => useUpdateAddress(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    await result.current.mutateAsync({
      id: 'addr-1',
      data: { label: 'Updated' },
    });

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith(
      expect.objectContaining({ queryKey: addressKeys.lists() }),
    );
  });

  it('should optimistically update on delete', async () => {
    const queryClient = new QueryClient();
    queryClient.setQueryData(addressKeys.list(), [MOCK_ADDRESS]);

    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse(null) as never,
    );

    const { result } = renderHook(() => useDeleteAddress(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate('addr-1');

    // Should immediately remove from cache
    await waitFor(() => {
      expect(queryClient.getQueryData(addressKeys.list())).toEqual([]);
    });
  });

  it('should optimistically update on set default', async () => {
    const queryClient = new QueryClient();
    const addresses = [
      { id: 'addr-1', isDefault: true },
      { id: 'addr-2', isDefault: false },
    ];
    queryClient.setQueryData(addressKeys.list(), addresses);

    vi.spyOn(global, 'fetch').mockResolvedValue(
      createSuccessResponse({ id: 'addr-2', isDefault: true }) as never,
    );

    const { result } = renderHook(() => useSetDefaultAddress(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });

    result.current.mutate('addr-2');

    // Should immediately swap default flags in cache
    await waitFor(() => {
      const cached = queryClient.getQueryData<CustomerAddress[]>(
        addressKeys.list(),
      );
      expect(cached?.find((a) => a.id === 'addr-1')?.isDefault).toBe(false);
      expect(cached?.find((a) => a.id === 'addr-2')?.isDefault).toBe(true);
    });
  });
});
