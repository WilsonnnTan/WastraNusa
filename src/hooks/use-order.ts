import { useQuery } from '@tanstack/react-query';

export interface OrderItem {
  orderId: string;
  id: string;
  date: string;
  totalPrice: string;
  status:
    | 'Dikirim'
    | 'Diterima'
    | 'Dibatalkan'
    | 'Menunggu Bayar'
    | 'Dikonfirmasi'
    | 'Pengemasan';
  product: {
    category: string;
    name: string;
    location: string;
    quantity: number;
  };
  actions: ('Lacak Pesanan' | 'Detail')[];
}

export interface OrderDetail {
  orderId: string;
  orderNumber: string;
  orderDate: string;
  orderStatus:
    | 'Dikirim'
    | 'Diterima'
    | 'Dibatalkan'
    | 'Menunggu Bayar'
    | 'Dikonfirmasi'
    | 'Pengemasan';
  paymentStatus: 'unpaid' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string | null;
  totals: {
    subtotal: string;
    shippingCost: string;
    totalAmount: string;
  };
  product: {
    id: string;
    name: string;
    category: string;
    location: string;
    quantity: number;
    unitPrice: string;
  };
  shipping: {
    courier: string;
    courierService: string;
    trackingNumber: string | null;
    estimatedDelivery: string | null;
    recipientName: string;
    recipientPhone: string;
    fullAddress: string;
    city: string;
    province: string;
    district: string;
    subdistrict: string | null;
    postalCode: string;
  };
  paymentTransaction: {
    id: string;
    status: 'pending' | 'success' | 'failed' | 'expired';
    paymentUrl: string | null;
    vaNumber: string | null;
    paidAt: string | null;
    createdAt: string;
  } | null;
  customerNotes: string | null;
}

export interface PaginatedOrders {
  data: OrderItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

async function parseOrderResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    throw new Error('Gagal mengambil data pesanan');
  }

  const result = await response.json();
  return result.data as T;
}

export function useOrders(
  status?: string,
  page: number = 1,
  limit: number = 5,
) {
  return useQuery({
    queryKey: ['orders', status, page, limit],
    queryFn: async (): Promise<PaginatedOrders> => {
      const queryParams = new URLSearchParams();
      if (status && status !== 'Semua') {
        queryParams.set('status', status);
      }
      queryParams.set('page', page.toString());
      queryParams.set('limit', limit.toString());

      const response = await fetch(`/api/orders?${queryParams.toString()}`);
      return parseOrderResponse<PaginatedOrders>(response);
    },
  });
}

export function useOrderDetail(identifier: string) {
  return useQuery({
    queryKey: ['order-detail', identifier],
    queryFn: async (): Promise<OrderDetail> => {
      const response = await fetch(
        `/api/orders/${encodeURIComponent(identifier)}`,
      );
      return parseOrderResponse<OrderDetail>(response);
    },
    enabled: Boolean(identifier),
  });
}
