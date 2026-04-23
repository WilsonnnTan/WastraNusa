import { useQuery } from '@tanstack/react-query';

export interface OrderItem {
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

export interface PaginatedOrders {
  data: OrderItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
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
      if (!response.ok) {
        throw new Error('Gagal mengambil data pesanan');
      }

      const result = await response.json();
      return result.data;
    },
  });
}
