import { withApiAuth } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { orderService } from '@/services/order.service';

type Params = { id: string };

export const GET = withApiAuth<Params>(async ({ userId, params }) => {
  const order = await orderService.getUserOrderDetail(userId, params.id);
  return jsend.success(order);
});

export const PATCH = withApiAuth<Params>(async ({ req, userId, params }) => {
  const body = (await req.json().catch(() => null)) as {
    action?: string;
  } | null;

  if (body?.action !== 'cancel') {
    return jsend.fail({ message: 'Aksi pesanan tidak valid' }, 400);
  }

  const order = await orderService.cancelUserOrder(userId, params.id);
  return jsend.success(order);
});
