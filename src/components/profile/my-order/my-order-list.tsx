import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Eye, Hexagon, Truck, XCircle } from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
  id: string; // MN-2025-99432
  date: string; // 14 Mar 2025
  totalPrice: string; // Rp 613.000
  status: 'Dikirim' | 'Diterima' | 'Dibatalkan' | 'Menunggu Bayar';
  statusInfo: string; // Dalam pengiriman
  product: {
    category: string; // Batik, Songket...
    name: string; // Batik Tulis Kawung
    location: string; // Solo, Jawa Tengah
    quantity: number; // 2
  };
  actions: ('Lacak Pesanan' | 'Detail')[];
}

const mockOrders: OrderItem[] = [
  {
    id: 'MN-2025-99432',
    date: '14 Mar 2025',
    totalPrice: 'Rp 613.000',
    status: 'Dikirim',
    statusInfo: 'Dalam pengiriman',
    product: {
      category: 'Batik',
      name: 'Batik Tulis Kawung',
      location: 'Solo, Jawa Tengah',
      quantity: 2,
    },
    actions: ['Lacak Pesanan', 'Detail'],
  },
  {
    id: 'MN-2025-98391',
    date: '2 Mar 2025',
    totalPrice: 'Rp 1.400.000',
    status: 'Diterima',
    statusInfo: 'Menunggu ulasan',
    product: {
      category: 'Songket',
      name: 'Songket Palembang Tradisional',
      location: 'Palembang, Sumatera Selatan',
      quantity: 1,
    },
    actions: ['Detail'],
  },
  {
    id: 'MN-2025-98284',
    date: '18 Feb 2025',
    totalPrice: 'Rp 1.016.500',
    status: 'Diterima',
    statusInfo: 'Pesanan diterima',
    product: {
      category: 'Ulos',
      name: 'Ulos Batak Ragi Hotang',
      location: 'Samosir, Sumatera Utara',
      quantity: 3,
    },
    actions: ['Detail'],
  },
  {
    id: 'MN-2025-98176',
    date: '3 Feb 2025',
    totalPrice: 'Rp 3.200.000',
    status: 'Diterima',
    statusInfo: 'Pesanan diterima',
    product: {
      category: 'Tenun',
      name: 'Kain Gringsing Tenganan',
      location: 'Tenganan, Bali',
      quantity: 1,
    },
    actions: ['Detail'],
  },
  {
    id: 'MN-2025-88961',
    date: '12 Jan 2025',
    totalPrice: 'Rp 1.388.000',
    status: 'Dibatalkan',
    statusInfo: 'Pesanan dibatalkan',
    product: {
      category: 'Ikat',
      name: 'Tenun Ikat Flores',
      location: 'Flores, NTT',
      quantity: 2,
    },
    actions: ['Detail'],
  },
];

interface MyOrderListProps {
  activeTab: string;
}

export function MyOrderList({ activeTab }: MyOrderListProps) {
  const filteredOrders =
    activeTab === 'Semua'
      ? mockOrders
      : activeTab === 'Beri Ulasan'
        ? mockOrders.filter(
            (o) =>
              o.status === 'Diterima' && o.statusInfo === 'Menunggu ulasan',
          )
        : mockOrders.filter((o) => o.status === activeTab);

  if (filteredOrders.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8cfbf] bg-[#fbf8f2]/50 text-[#726759]">
        <div className="mb-3 rounded-full bg-[#efe8db] p-4 text-[#ccbda4]">
          <Hexagon className="h-8 w-8" />
        </div>
        <p className="text-sm font-medium">Belum ada pesanan.</p>
        <p className="mt-1 text-xs text-[#a29582]">
          Pesananmu yang sesuai filter ini akan muncul di sini.
        </p>
      </div>
    );
  }

  const getStatusBadgeColor = (status: OrderItem['status']) => {
    switch (status) {
      case 'Diterima':
        return 'bg-[#eef3ef] text-[#5c7365]';
      case 'Dikirim':
        return 'bg-[#f4efe6] text-[#8b7e6a]';
      case 'Dibatalkan':
        return 'bg-[#fdf6f2] text-[#c4826b]';
      default:
        return 'bg-[#f4efe6] text-[#8b7e6a]';
    }
  };

  const getStatusIcon = (status: OrderItem['status'], statusInfo: string) => {
    if (status === 'Dikirim') {
      return <Truck className="h-4 w-4 text-[#8b7e6a]" />;
    } else if (status === 'Diterima' && statusInfo === 'Menunggu ulasan') {
      return <CheckCircle2 className="h-4 w-4 text-[#8b7e6a]" />;
    } else if (status === 'Diterima') {
      return <CheckCircle2 className="h-4 w-4 text-[#5c7365]" />;
    } else if (status === 'Dibatalkan') {
      return <XCircle className="h-4 w-4 text-[#c4826b]" />;
    }
    return <CheckCircle2 className="h-4 w-4 text-[#8b7e6a]" />;
  };

  return (
    <div className="flex flex-col gap-6">
      {filteredOrders.map((order) => (
        <div key={order.id} className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge
                variant="secondary"
                className={`rounded border-none px-2.5 py-0.5 text-[11px] font-semibold hover:bg-opacity-80 ${getStatusBadgeColor(
                  order.status,
                )} hover:${getStatusBadgeColor(order.status).split(' ')[0]}`}
              >
                {order.status}
              </Badge>
              <div className="text-[13px] font-medium text-[#726759]">
                {order.id} <span className="font-bold text-[#4d6356]">•</span>{' '}
                {order.date}
              </div>
            </div>
            <div className="text-[14px] font-bold text-[#4d6356]">
              {order.totalPrice}
            </div>
          </div>

          <Link
            href="#"
            className="group flex items-center gap-4 rounded-xl border border-[#ece7dd] bg-[#fbf8f2] p-4 transition-all hover:border-[#dcd5c7] hover:bg-[#f4efe6]"
          >
            <div className="relative flex h-[60px] w-[60px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#efe8db] text-[#b0a591] border border-[#e8e2d5]">
              <Hexagon size={24} strokeWidth={1.5} className="text-[#c4b9a3]" />
              <span className="mt-1 absolute bottom-1.5 text-[9px] font-semibold tracking-wide text-[#a39882] uppercase">
                {order.product.category.substring(0, 4)}
              </span>
            </div>

            <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
              <div className="flex flex-wrap gap-1.5 mb-0.5">
                <Badge
                  variant="secondary"
                  className="rounded border-none bg-[#f4efe6] px-2 py-0 text-[10px] font-medium text-[#c4826b] hover:bg-[#f4efe6]"
                >
                  {order.product.category}
                </Badge>
              </div>
              <h3 className="w-full truncate text-[15px] font-bold leading-none text-[#4d6356]">
                {order.product.name}
              </h3>
              <p className="text-[12px] leading-relaxed text-[#8f9b94] mt-0.5">
                {order.product.location} • {order.product.quantity} produk
              </p>
            </div>
          </Link>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2 text-[13px] font-medium text-[#726759]">
              {getStatusIcon(order.status, order.statusInfo)}
              <span
                className={
                  order.status === 'Diterima' &&
                  order.statusInfo !== 'Menunggu ulasan'
                    ? 'text-[#5c7365]'
                    : ''
                }
              >
                {order.statusInfo}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {order.actions.includes('Lacak Pesanan') && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 rounded-lg border-[#c4826b] text-[#c4826b] hover:bg-[#fdf6f2] hover:text-[#a06651] text-xs font-semibold px-4"
                >
                  Lacak Pesanan
                </Button>
              )}
              {order.actions.includes('Detail') && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1.5 rounded-lg border-[#ece7dd] text-[#726759] hover:bg-[#f4efe6] hover:text-[#5c7365] text-xs font-semibold px-4"
                >
                  <Eye className="h-3.5 w-3.5" />
                  Detail
                </Button>
              )}
            </div>
          </div>

          <div className="h-px w-full bg-[#ece7dd] mt-2 mb-1 last:hidden block" />
        </div>
      ))}
    </div>
  );
}
