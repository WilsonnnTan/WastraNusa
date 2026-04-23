import type { Prisma } from '@/generated/prisma/client';
import { orderRepository } from '@/repositories/order.repository';

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
      let uiStatus:
        | 'Menunggu Bayar'
        | 'Dikonfirmasi'
        | 'Pengemasan'
        | 'Dikirim'
        | 'Diterima'
        | 'Dibatalkan' = 'Menunggu Bayar';

      if (
        order.orderStatus === 'cancelled' ||
        order.paymentStatus === 'failed'
      ) {
        uiStatus = 'Dibatalkan';
      } else if (order.orderStatus === 'delivered') {
        uiStatus = 'Diterima';
      } else if (order.orderStatus === 'shipped') {
        uiStatus = 'Dikirim';
      } else if (order.orderStatus === 'processing') {
        uiStatus = 'Pengemasan';
      } else if (order.orderStatus === 'confirmed') {
        uiStatus = 'Dikonfirmasi';
      } else if (
        order.orderStatus === 'pending' ||
        order.paymentStatus === 'unpaid'
      ) {
        uiStatus = 'Menunggu Bayar';
      }

      const formattedDate = new Intl.DateTimeFormat('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date(order.createdAt));

      const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      }).format(Number(order.totalAmount));

      return {
        id: order.orderNumber || order.id,
        date: formattedDate,
        totalPrice: formattedPrice,
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
};
