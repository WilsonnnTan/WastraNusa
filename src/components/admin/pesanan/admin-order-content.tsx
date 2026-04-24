'use client';

import { AdminHeader } from '@/components/admin/admin-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { OrderStatus, PaymentStatus } from '@/generated/prisma/enums';
import {
  type AdminOrderItem,
  adminOrderKeys,
  fetchAdminOrders,
  useAdminOrders,
  useUpdateAdminOrder,
} from '@/hooks/use-admin-order';
import type { AdminOrderUpdateInput } from '@/schemas/order.schema';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Save } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

type FilterOrderStatus = OrderStatus | 'all';
type FilterPaymentStatus = PaymentStatus | 'all';

type OrderDraft = {
  orderStatus: OrderStatus;
  trackingNumber: string;
};

const ORDER_STATUS_FILTER_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: OrderStatus.pending, label: 'Menunggu Bayar' },
  { value: OrderStatus.confirmed, label: 'Dikonfirmasi' },
  { value: OrderStatus.processing, label: 'Pengemasan' },
  { value: OrderStatus.shipped, label: 'Dikirim' },
  { value: OrderStatus.delivered, label: 'Diterima' },
  { value: OrderStatus.cancelled, label: 'Dibatalkan' },
];

const ORDER_STATUS_EDIT_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: OrderStatus.processing, label: 'Pengemasan' },
  { value: OrderStatus.shipped, label: 'Dikirim' },
  { value: OrderStatus.delivered, label: 'Diterima' },
];

const PAYMENT_STATUS_OPTIONS: { value: PaymentStatus; label: string }[] = [
  { value: PaymentStatus.unpaid, label: 'Belum Bayar' },
  { value: PaymentStatus.paid, label: 'Lunas' },
  { value: PaymentStatus.failed, label: 'Gagal' },
  { value: PaymentStatus.refunded, label: 'Refund' },
];

function TableRowSkeleton() {
  return (
    <tr className="border-t border-[#ece7de]">
      <td className="px-4 py-3">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-28 bg-[#eee2d0]" />
          <Skeleton className="h-4 w-36 bg-[#eee2d0]" />
        </div>
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-4 w-36 bg-[#eee2d0]" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-6 w-24 rounded-md bg-[#eee2d0]" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-6 w-24 rounded-md bg-[#eee2d0]" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-9 w-36 rounded-lg bg-[#eee2d0]" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-9 w-28 rounded-lg bg-[#eee2d0]" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="h-9 w-20 rounded-lg bg-[#eee2d0]" />
      </td>
    </tr>
  );
}

function getOrderStatusBadgeClass(status: OrderStatus) {
  switch (status) {
    case OrderStatus.delivered:
      return 'bg-emerald-100 text-emerald-700';
    case OrderStatus.shipped:
      return 'bg-blue-100 text-blue-700';
    case OrderStatus.processing:
      return 'bg-amber-100 text-amber-700';
    case OrderStatus.confirmed:
      return 'bg-sky-100 text-sky-700';
    case OrderStatus.cancelled:
      return 'bg-red-100 text-red-700';
    case OrderStatus.pending:
    default:
      return 'bg-slate-200 text-slate-700';
  }
}

function getPaymentStatusBadgeClass(status: PaymentStatus) {
  switch (status) {
    case PaymentStatus.paid:
      return 'bg-emerald-100 text-emerald-700';
    case PaymentStatus.failed:
      return 'bg-red-100 text-red-700';
    case PaymentStatus.refunded:
      return 'bg-orange-100 text-orange-700';
    case PaymentStatus.unpaid:
    default:
      return 'bg-slate-200 text-slate-700';
  }
}

function getOrderDraft(order: AdminOrderItem, draft?: OrderDraft): OrderDraft {
  if (draft) return draft;
  return {
    orderStatus: order.orderStatus,
    trackingNumber: order.trackingNumber ?? '',
  };
}

function isOrderEditable(order: AdminOrderItem) {
  if (order.paymentStatus !== PaymentStatus.paid) {
    return false;
  }
  if (
    order.orderStatus === OrderStatus.cancelled ||
    order.paymentStatus === PaymentStatus.failed
  ) {
    return false;
  }
  return true;
}

export function AdminOrderContent() {
  const [page, setPage] = useState(1);
  const [orderStatusFilter, setOrderStatusFilter] =
    useState<FilterOrderStatus>('all');
  const [paymentStatusFilter, setPaymentStatusFilter] =
    useState<FilterPaymentStatus>('all');
  const [drafts, setDrafts] = useState<Record<string, OrderDraft>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  const filters = useMemo(
    () => ({
      orderStatus: orderStatusFilter === 'all' ? undefined : orderStatusFilter,
      paymentStatus:
        paymentStatusFilter === 'all' ? undefined : paymentStatusFilter,
    }),
    [orderStatusFilter, paymentStatusFilter],
  );

  const { data: orderData, isLoading } = useAdminOrders(page, 10, filters);
  const { mutate: updateOrder } = useUpdateAdminOrder();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (orderData?.meta.hasNextPage) {
      const nextPage = page + 1;
      queryClient.prefetchQuery({
        queryKey: adminOrderKeys.list(
          nextPage,
          10,
          filters.orderStatus ?? 'all',
          filters.paymentStatus ?? 'all',
        ),
        queryFn: () => fetchAdminOrders(nextPage, 10, filters),
      });
    }
  }, [page, orderData, queryClient, filters]);

  const headerData = useMemo(
    () => ({
      title: 'Manajemen Pesanan',
      subtitle: 'Kelola status pesanan pelanggan',
      brandName: '',
      brandLabel: '',
      adminName: '',
      adminRole: '',
      lastUpdatedLabel: '',
      summary: [],
      stockAlerts: [],
      popularArticles: [],
    }),
    [],
  );

  const handleDraftChange = (
    orderId: string,
    updater: (current: OrderDraft) => OrderDraft,
    order: AdminOrderItem,
  ) => {
    setDrafts((currentDrafts) => ({
      ...currentDrafts,
      [orderId]: updater(getOrderDraft(order, currentDrafts[orderId])),
    }));
  };

  const handleSave = (order: AdminOrderItem) => {
    const draft = getOrderDraft(order, drafts[order.orderId]);
    const payload: AdminOrderUpdateInput = {};

    if (draft.orderStatus !== order.orderStatus) {
      payload.orderStatus = draft.orderStatus;
    }
    const normalizedTrackingNumber =
      draft.trackingNumber.trim() === '' ? null : draft.trackingNumber.trim();
    if (normalizedTrackingNumber !== order.trackingNumber) {
      payload.trackingNumber = normalizedTrackingNumber;
    }

    if (Object.keys(payload).length === 0) {
      toast.info('Tidak ada perubahan untuk disimpan');
      return;
    }

    setSavingId(order.orderId);
    updateOrder(
      {
        idOrOrderNumber: order.orderId,
        data: payload,
      },
      {
        onSuccess: () => {
          toast.success('Pesanan berhasil diperbarui');
          setDrafts((currentDrafts) => {
            const next = { ...currentDrafts };
            delete next[order.orderId];
            return next;
          });
        },
        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : 'Gagal memperbarui pesanan',
          );
        },
        onSettled: () => {
          setSavingId(null);
        },
      },
    );
  };

  return (
    <main className="flex flex-col">
      <AdminHeader data={headerData} />

      <section className="flex-1 bg-[#f0ede5] px-5 py-5 md:px-8">
        <div className="flex flex-col gap-4 rounded-2xl bg-[#ebe6db] p-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-muted-foreground">
              {isLoading ? '...' : orderData?.meta.totalItems} pesanan
            </p>

            <div className="flex flex-col gap-2 sm:flex-row">
              <Select
                value={orderStatusFilter}
                onValueChange={(value: FilterOrderStatus) => {
                  setOrderStatusFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-10 w-full rounded-xl border-[#ddd6c9] bg-white sm:w-[190px]">
                  <SelectValue placeholder="Status Pesanan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Status Pesanan</SelectItem>
                  {ORDER_STATUS_FILTER_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={paymentStatusFilter}
                onValueChange={(value: FilterPaymentStatus) => {
                  setPaymentStatusFilter(value);
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-10 w-full rounded-xl border-[#ddd6c9] bg-white sm:w-[180px]">
                  <SelectValue placeholder="Status Pembayaran" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Semua Pembayaran</SelectItem>
                  {PAYMENT_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="overflow-hidden rounded-2xl border border-[#ddd6c9] bg-background py-0 ring-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1280px] text-left">
                <thead className="bg-[#ede8df] text-xs font-semibold tracking-wide text-[#6a645a] uppercase">
                  <tr>
                    <th className="px-4 py-3">Pesanan</th>
                    <th className="px-4 py-3">Pelanggan</th>
                    <th className="px-4 py-3">Produk</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Pembayaran</th>
                    <th className="px-4 py-3">No. Resi</th>
                    <th className="px-4 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, index) => (
                      <TableRowSkeleton key={index} />
                    ))
                  ) : orderData?.items.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="py-10 text-center text-[#8f8377]"
                      >
                        Belum ada data pesanan.
                      </td>
                    </tr>
                  ) : (
                    orderData?.items.map((order) => {
                      const draft = getOrderDraft(order, drafts[order.orderId]);
                      const editable = isOrderEditable(order);
                      const selectedEditableStatus =
                        ORDER_STATUS_EDIT_OPTIONS.some(
                          (option) => option.value === draft.orderStatus,
                        )
                          ? draft.orderStatus
                          : undefined;
                      return (
                        <tr
                          key={order.orderId}
                          className="border-t border-[#ece7de]"
                        >
                          <td className="px-4 py-3 text-[#2b2b2b]">
                            <div className="flex flex-col gap-0.5">
                              <p className="text-base font-semibold">
                                {order.orderNumber}
                              </p>
                              <p className="text-xs text-muted-foreground/80">
                                {order.createdAtLabel} ·{' '}
                                {order.totalAmountLabel}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#6d6a64]">
                            <div className="flex flex-col">
                              <span className="font-semibold text-[#3d3a34]">
                                {order.customer.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {order.customer.email}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-[#6d6a64]">
                            <div className="flex flex-col">
                              <span className="font-semibold text-[#3d3a34]">
                                {order.product.name}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {order.product.location} · Qty{' '}
                                {order.product.quantity}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-col gap-2">
                              <Badge
                                variant="secondary"
                                className={getOrderStatusBadgeClass(
                                  order.orderStatus,
                                )}
                              >
                                {order.orderStatusLabel}
                              </Badge>
                              <Select
                                value={selectedEditableStatus}
                                onValueChange={(value: OrderStatus) =>
                                  handleDraftChange(
                                    order.orderId,
                                    (current) => ({
                                      ...current,
                                      orderStatus: value,
                                    }),
                                    order,
                                  )
                                }
                                disabled={!editable}
                              >
                                <SelectTrigger className="h-9 rounded-lg border-[#ddd6c9] bg-white text-xs">
                                  <SelectValue placeholder="Pilih status" />
                                </SelectTrigger>
                                <SelectContent>
                                  {ORDER_STATUS_EDIT_OPTIONS.map((option) => (
                                    <SelectItem
                                      key={option.value}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge
                              variant="secondary"
                              className={getPaymentStatusBadgeClass(
                                order.paymentStatus,
                              )}
                            >
                              {order.paymentStatusLabel}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Input
                              value={draft.trackingNumber}
                              onChange={(event) =>
                                handleDraftChange(
                                  order.orderId,
                                  (current) => ({
                                    ...current,
                                    trackingNumber: event.target.value,
                                  }),
                                  order,
                                )
                              }
                              placeholder="Isi no. resi"
                              className="h-9 rounded-lg border-[#ddd6c9] bg-white text-sm"
                              disabled={!editable}
                            />
                          </td>
                          <td className="px-4 py-3 text-right">
                            <Button
                              size="sm"
                              className="h-9 rounded-lg"
                              onClick={() => handleSave(order)}
                              disabled={!editable || savingId === order.orderId}
                            >
                              <Save data-icon="inline-start" />
                              Simpan
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {orderData && orderData.meta.totalPages > 1 ? (
            <div className="mt-4 flex items-center justify-between px-2">
              <p className="text-sm text-muted-foreground">
                Halaman {page} dari {orderData.meta.totalPages}
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 rounded-lg border-[#ddd6c9] bg-background text-[#6a645a] hover:bg-[#ede8df]"
                  onClick={() =>
                    setPage((currentPage) => Math.max(1, currentPage - 1))
                  }
                  disabled={page === 1 || isLoading}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="size-8 rounded-lg border-[#ddd6c9] bg-background text-[#6a645a] hover:bg-[#ede8df]"
                  onClick={() =>
                    setPage((currentPage) =>
                      Math.min(orderData.meta.totalPages, currentPage + 1),
                    )
                  }
                  disabled={page === orderData.meta.totalPages || isLoading}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
