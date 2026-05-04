'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCancelOrder, useOrderDetail } from '@/hooks/use-order';
import {
  ArrowLeft,
  Box,
  CreditCard,
  MapPin,
  Package,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { PaymentDeadlineBadge } from './payment-deadline-badge';

interface MyOrderDetailMainProps {
  orderId: string;
}

function getStatusBadgeColor(status: string) {
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
}

export function MyOrderDetailMain({ orderId }: MyOrderDetailMainProps) {
  const { data: order, isLoading, isError, refetch } = useOrderDetail(orderId);
  const cancelOrderMutation = useCancelOrder();

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-[#e8e2d5] bg-white shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 rounded bg-[#ece7dd]" />
          <div className="h-24 rounded-xl bg-[#fbf8f2]" />
          <div className="h-24 rounded-xl bg-[#fbf8f2]" />
          <div className="h-24 rounded-xl bg-[#fbf8f2]" />
        </div>
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="flex h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8cfbf] bg-[#fbf8f2]/50 text-[#726759]">
        <div className="mb-3 rounded-full bg-[#fdf6f2] p-4 text-[#c4826b]">
          <XCircle className="h-8 w-8" />
        </div>
        <p className="text-sm font-medium">Gagal memuat detail pesanan.</p>
        <Button
          className="mt-4 rounded-full bg-[#3c5043] px-4 hover:bg-[#2d3d32]"
          asChild
        >
          <Link href="/profile/my-order">Kembali ke daftar pesanan</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e2d5] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#e8e2d5] px-6 py-5">
        <div className="flex flex-col gap-1">
          <h2 className="m-0 text-[18px] font-bold text-[#5c7365]">
            Detail Pesanan
          </h2>
          <p className="text-xs text-[#8f9b94]">
            {order.orderNumber} - {order.orderDate}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-lg border-[#ece7dd]"
          asChild
        >
          <Link href="/profile/my-order">
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Link>
        </Button>
      </div>

      <div className="space-y-4 p-6">
        <div className="rounded-xl border border-[#ece7dd] bg-[#fbf8f2] p-4">
          <div className="mb-3 flex items-center gap-2 text-[#5c7365]">
            <Package className="h-4 w-4" />
            <p className="text-sm font-semibold">Status Pesanan</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className={`rounded border-none px-2.5 py-0.5 text-[11px] font-semibold ${getStatusBadgeColor(order.orderStatus)}`}
            >
              {order.orderStatus}
            </Badge>
            <span className="text-xs text-[#8f9b94]">
              Pembayaran: {order.paymentStatusLabel}
            </span>
          </div>
          {order.paymentDeadlineAt && (
            <div className="mt-3">
              <PaymentDeadlineBadge
                deadlineAt={order.paymentDeadlineAt}
                onExpire={() => {
                  void refetch();
                }}
              />
            </div>
          )}
          {order.canCancel && (
            <Button
              variant="outline"
              size="sm"
              className="mt-3 rounded-lg border-[#d8b5a7] text-[#b56d56] hover:bg-[#fdf6f2] hover:text-[#9d5a46]"
              disabled={cancelOrderMutation.isPending}
              onClick={() => {
                cancelOrderMutation.mutate(order.orderNumber, {
                  onSuccess: () => {
                    toast.success('Pesanan berhasil dibatalkan.');
                  },
                  onError: (error) => {
                    toast.error(error.message);
                  },
                });
              }}
            >
              Batalkan Pesanan
            </Button>
          )}
        </div>

        <div className="rounded-xl border border-[#ece7dd] bg-[#fbf8f2] p-4">
          <div className="mb-3 flex items-center gap-2 text-[#5c7365]">
            <Box className="h-4 w-4" />
            <p className="text-sm font-semibold">Produk</p>
          </div>
          <p className="text-sm font-semibold text-[#4d6356]">
            {order.product.name}
          </p>
          <p className="mt-1 text-xs text-[#8f9b94]">
            {order.product.category} - {order.product.location}
          </p>
          <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-[#726759] md:grid-cols-2">
            <p>Jumlah: {order.product.quantity}</p>
            <p>Harga Satuan: {order.product.unitPrice}</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#ece7dd] bg-[#fbf8f2] p-4">
          <div className="mb-3 flex items-center gap-2 text-[#5c7365]">
            <MapPin className="h-4 w-4" />
            <p className="text-sm font-semibold">Pengiriman</p>
          </div>
          <p className="text-sm font-semibold text-[#4d6356]">
            {order.shipping.recipientName} ({order.shipping.recipientPhone})
          </p>
          <p className="mt-1 text-xs text-[#726759]">
            {order.shipping.fullAddress}
          </p>
          <p className="mt-1 text-xs text-[#8f9b94]">
            {order.shipping.district}, {order.shipping.city},{' '}
            {order.shipping.province} {order.shipping.postalCode}
          </p>
          <p className="mt-2 text-xs text-[#726759]">
            Kurir: {order.shipping.courier} {order.shipping.courierService}
            {order.shipping.trackingNumber
              ? ` - Resi: ${order.shipping.trackingNumber}`
              : ''}
          </p>
        </div>

        <div className="rounded-xl border border-[#ece7dd] bg-[#fbf8f2] p-4">
          <div className="mb-3 flex items-center gap-2 text-[#5c7365]">
            <CreditCard className="h-4 w-4" />
            <p className="text-sm font-semibold">Pembayaran</p>
          </div>
          <div className="space-y-1 text-xs text-[#726759]">
            <p>Subtotal: {order.totals.subtotal}</p>
            <p>Ongkir: {order.totals.shippingCost}</p>
            <p className="text-sm font-bold text-[#4d6356]">
              Total: {order.totals.totalAmount}
            </p>
            {order.paymentMethod && <p>Metode: {order.paymentMethod}</p>}
            {order.paymentTransaction?.vaNumber && (
              <p>VA Number: {order.paymentTransaction.vaNumber}</p>
            )}
            {order.paymentTransaction?.paymentUrl &&
              order.paymentStatus === 'unpaid' && (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 rounded-lg border-[#5c7365] text-[#4d6356] hover:bg-[#eef3ef]"
                  asChild
                >
                  <a
                    href={order.paymentTransaction.paymentUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Lanjutkan Pembayaran
                  </a>
                </Button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
