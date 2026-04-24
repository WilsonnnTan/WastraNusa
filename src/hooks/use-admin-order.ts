import type { OrderStatus, PaymentStatus } from '@/generated/prisma/enums';
import type { JSendResponse } from '@/lib/jsend';
import type { AdminOrderUpdateInput } from '@/schemas/order.schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export type AdminOrderItem = {
  orderId: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  product: {
    id: string;
    name: string;
    location: string;
    category: string;
    quantity: number;
  };
  totalAmount: number;
  totalAmountLabel: string;
  orderStatus: OrderStatus;
  orderStatusLabel: string;
  paymentStatus: PaymentStatus;
  paymentStatusLabel: string;
  trackingNumber: string | null;
  createdAt: string;
  createdAtLabel: string;
};

export type AdminOrderListResponse = {
  items: AdminOrderItem[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
  };
};

export type AdminOrderFilters = {
  orderStatus?: OrderStatus;
  paymentStatus?: PaymentStatus;
};

export const adminOrderKeys = {
  all: ['admin-orders'] as const,
  lists: () => [...adminOrderKeys.all, 'list'] as const,
  list: (
    page: number,
    limit: number,
    orderStatus: OrderStatus | 'all',
    paymentStatus: PaymentStatus | 'all',
  ) =>
    [
      ...adminOrderKeys.lists(),
      page,
      limit,
      orderStatus,
      paymentStatus,
    ] as const,
  details: () => [...adminOrderKeys.all, 'detail'] as const,
  detail: (idOrOrderNumber: string) =>
    [...adminOrderKeys.details(), idOrOrderNumber] as const,
};

async function parseJSend<T>(response: Response): Promise<T> {
  const body = (await response.json()) as JSendResponse<T>;

  if (body.status === 'success') {
    return body.data as T;
  }

  if (body.status === 'fail') {
    const message =
      typeof body.data === 'object' &&
      body.data !== null &&
      'message' in body.data
        ? String(body.data.message)
        : 'Request failed';

    throw new Error(message);
  }

  throw new Error(body.message);
}

async function fetchApi<T>(path: string): Promise<T> {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return parseJSend<T>(response);
}

async function mutateApi<T>(
  path: string,
  method: 'PUT',
  body?: unknown,
): Promise<T> {
  const response = await fetch(path, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  return parseJSend<T>(response);
}

export function fetchAdminOrders(
  page: number = 1,
  limit: number = 10,
  filters: AdminOrderFilters = {},
) {
  const searchParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (filters.orderStatus) {
    searchParams.set('orderStatus', filters.orderStatus);
  }
  if (filters.paymentStatus) {
    searchParams.set('paymentStatus', filters.paymentStatus);
  }

  return fetchApi<AdminOrderListResponse>(
    `/api/admin/orders?${searchParams.toString()}`,
  );
}

export function useAdminOrders(
  page: number = 1,
  limit: number = 10,
  filters: AdminOrderFilters = {},
) {
  return useQuery({
    queryKey: adminOrderKeys.list(
      page,
      limit,
      filters.orderStatus ?? 'all',
      filters.paymentStatus ?? 'all',
    ),
    queryFn: () => fetchAdminOrders(page, limit, filters),
    placeholderData: (previousData) => previousData,
  });
}

export function useUpdateAdminOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      idOrOrderNumber,
      data,
    }: {
      idOrOrderNumber: string;
      data: AdminOrderUpdateInput;
    }) =>
      mutateApi<AdminOrderItem>(
        `/api/admin/orders/${encodeURIComponent(idOrOrderNumber)}`,
        'PUT',
        data,
      ),
    onSuccess: (_, { idOrOrderNumber }) => {
      queryClient.invalidateQueries({ queryKey: adminOrderKeys.all });
      queryClient.invalidateQueries({
        queryKey: adminOrderKeys.detail(idOrOrderNumber),
      });
    },
  });
}
