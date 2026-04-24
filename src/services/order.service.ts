import type { Prisma } from '@/generated/prisma/client';
import { OrderStatus, PaymentStatus } from '@/generated/prisma/enums';
import { ApiError } from '@/lib/error';
import { orderRepository } from '@/repositories/order.repository';

type UiOrderStatus =
  | 'Menunggu Bayar'
  | 'Dikonfirmasi'
  | 'Pengemasan'
  | 'Dikirim'
  | 'Diterima'
  | 'Dibatalkan';

function mapToUiOrderStatus(order: {
  orderStatus: string;
  paymentStatus: string;
}): UiOrderStatus {
  if (order.orderStatus === 'cancelled' || order.paymentStatus === 'failed') {
    return 'Dibatalkan';
  }
  if (order.orderStatus === 'delivered') {
    return 'Diterima';
  }
  if (order.orderStatus === 'shipped') {
    return 'Dikirim';
  }
  if (order.orderStatus === 'processing') {
    return 'Pengemasan';
  }
  if (order.orderStatus === 'confirmed') {
    return 'Dikonfirmasi';
  }
  return 'Menunggu Bayar';
}

function formatOrderDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

function formatOrderCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
}

function mapToPaymentStatusLabel(paymentStatus: string) {
  if (paymentStatus === 'paid') return 'Lunas';
  if (paymentStatus === 'failed') return 'Gagal';
  if (paymentStatus === 'refunded') return 'Refund';
  return 'Belum Bayar';
}

function mapAdminOrder(order: {
  id: string;
  orderNumber: string;
  quantity: number;
  totalAmount: { toNumber(): number } | number;
  orderStatus: string;
  paymentStatus: string;
  trackingNumber: string | null;
  createdAt: Date;
  user: { id: string; name: string; email: string };
  product: { id: string; name: string; province: string; clothingType: string };
}) {
  const totalAmount =
    typeof order.totalAmount === 'number'
      ? order.totalAmount
      : order.totalAmount.toNumber();

  return {
    orderId: order.id,
    orderNumber: order.orderNumber,
    customer: {
      id: order.user.id,
      name: order.user.name,
      email: order.user.email,
    },
    product: {
      id: order.product.id,
      name: order.product.name,
      location: order.product.province,
      category: order.product.clothingType,
      quantity: order.quantity,
    },
    totalAmount,
    totalAmountLabel: formatOrderCurrency(totalAmount),
    orderStatus: order.orderStatus,
    orderStatusLabel: mapToUiOrderStatus(order),
    paymentStatus: order.paymentStatus,
    paymentStatusLabel: mapToPaymentStatusLabel(order.paymentStatus),
    trackingNumber: order.trackingNumber,
    createdAt: order.createdAt.toISOString(),
    createdAtLabel: formatOrderDate(order.createdAt),
  };
}

export const orderService = {
  getUserOrders: async (
    userId: string,
    status?: string,
    page: number = 1,
    limit: number = 10,
  ) => {
    let filters: Prisma.OrderWhereInput = {};

    if (status && status !== 'Semua') {
      switch (status) {
        case 'Menunggu Bayar':
          filters = {
            OR: [{ orderStatus: 'pending' }, { paymentStatus: 'unpaid' }],
          };
          break;
        case 'Dikonfirmasi':
          filters = { orderStatus: 'confirmed' };
          break;
        case 'Pengemasan':
          filters = { orderStatus: 'processing' };
          break;
        case 'Dikirim':
          filters = { orderStatus: 'shipped' };
          break;
        case 'Diterima':
          filters = { orderStatus: 'delivered' };
          break;
        case 'Dibatalkan':
          filters = {
            OR: [{ orderStatus: 'cancelled' }, { paymentStatus: 'failed' }],
          };
          break;
        default:
          break;
      }
    }

    const skip = (page - 1) * limit;

    const [orders, totalItems] = await Promise.all([
      orderRepository.findOrdersByUserId(userId, filters, skip, limit),
      orderRepository.countOrdersByUserId(userId, filters),
    ]);

    const totalPages = Math.ceil(totalItems / limit);

    const formattedOrders = orders.map((order) => {
      const uiStatus = mapToUiOrderStatus(order);

      return {
        orderId: order.id,
        id: order.orderNumber || order.id,
        date: formatOrderDate(order.createdAt),
        totalPrice: formatOrderCurrency(Number(order.totalAmount)),
        status: uiStatus,
        product: {
          category: order.product.clothingType,
          name: order.product.name,
          location: order.product.province,
          quantity: order.quantity,
        },
        actions: [
          'Detail',
          ...(uiStatus === 'Dikirim' ? ['Lacak Pesanan'] : []),
        ] as ('Lacak Pesanan' | 'Detail')[],
      };
    });

    return {
      data: formattedOrders,
      meta: {
        total: totalItems,
        page,
        limit,
        totalPages,
      },
    };
  },

  getUserOrderDetail: async (userId: string, identifier: string) => {
    const order = await orderRepository.findOrderDetailByIdentifier(
      userId,
      identifier,
    );

    if (!order) {
      throw new ApiError('Pesanan tidak ditemukan', 404);
    }

    const latestPayment = order.paymentTransactions[0] || null;

    return {
      orderId: order.id,
      orderNumber: order.orderNumber,
      orderDate: formatOrderDate(order.createdAt),
      orderStatus: mapToUiOrderStatus(order),
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      totals: {
        subtotal: formatOrderCurrency(Number(order.subtotal)),
        shippingCost: formatOrderCurrency(Number(order.shippingCost)),
        totalAmount: formatOrderCurrency(Number(order.totalAmount)),
      },
      product: {
        id: order.product.id,
        name: order.product.name,
        category: order.product.clothingType,
        location: order.product.province,
        quantity: order.quantity,
        unitPrice: formatOrderCurrency(Number(order.productPrice)),
      },
      shipping: {
        courier: order.courier,
        courierService: order.courierService,
        trackingNumber: order.trackingNumber,
        estimatedDelivery: order.estimatedDelivery,
        recipientName: order.shippingAddress.recipientName,
        recipientPhone: order.shippingAddress.phone,
        fullAddress: order.shippingAddress.fullAddress,
        city: order.shippingAddress.city,
        province: order.shippingAddress.province,
        district: order.shippingAddress.district,
        subdistrict: order.shippingAddress.subdistrict,
        postalCode: order.shippingAddress.postalCode,
      },
      paymentTransaction: latestPayment
        ? {
            id: latestPayment.id,
            status: latestPayment.status,
            paymentUrl: latestPayment.paymentUrl,
            vaNumber: latestPayment.vaNumber,
            paidAt: latestPayment.paidAt,
            createdAt: latestPayment.createdAt,
          }
        : null,
      customerNotes: order.customerNotes,
    };
  },

  getAdminOrders: async (
    page: number = 1,
    limit: number = 10,
    filters?: {
      orderStatus?: OrderStatus;
      paymentStatus?: PaymentStatus;
    },
  ) => {
    const safeLimit = Math.min(Math.max(1, limit), 50);
    const safePage = Math.max(1, page);
    const offset = (safePage - 1) * safeLimit;

    const where: Prisma.OrderWhereInput = {};
    if (filters?.orderStatus) {
      where.orderStatus = filters.orderStatus;
    }
    if (filters?.paymentStatus) {
      where.paymentStatus = filters.paymentStatus;
    }

    const [orders, totalItems] = await Promise.all([
      orderRepository.findOrdersForAdmin(where, offset, safeLimit),
      orderRepository.countOrdersForAdmin(where),
    ]);

    const totalPages = Math.max(1, Math.ceil(totalItems / safeLimit));

    return {
      items: orders.map(mapAdminOrder),
      meta: {
        page: safePage,
        limit: safeLimit,
        totalItems,
        totalPages,
        hasNextPage: safePage < totalPages,
      },
    };
  },

  updateOrderForAdmin: async (
    identifier: string,
    data: {
      orderStatus?: OrderStatus;
      trackingNumber?: string | null;
      customerNotes?: string | null;
    },
  ) => {
    const existing =
      await orderRepository.findOrderForAdminByIdentifier(identifier);

    if (!existing) {
      throw new ApiError('Pesanan tidak ditemukan', 404);
    }

    const now = new Date();
    const nextData: Prisma.OrderUpdateInput = {
      orderStatus: data.orderStatus,
      trackingNumber:
        data.trackingNumber === undefined
          ? undefined
          : data.trackingNumber?.trim()
            ? data.trackingNumber.trim()
            : null,
      customerNotes: data.customerNotes,
    };

    if (data.orderStatus === OrderStatus.shipped) {
      nextData.shippedAt = now;
    }
    if (data.orderStatus === OrderStatus.delivered) {
      nextData.deliveredAt = now;
    }

    const updated = await orderRepository.updateOrderForAdmin(
      identifier,
      nextData,
    );

    return mapAdminOrder(updated);
  },
};
