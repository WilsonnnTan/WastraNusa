import type { Prisma } from '@/generated/prisma/client';
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
};
