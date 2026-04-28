import { withApiAuth } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { orderService } from '@/services/order.service';

type Params = { id: string };

export const GET = withApiAuth<Params>(async ({ userId, params }) => {
  const order = await orderService.getUserOrderDetail(userId, params.id);
  return jsend.success(order);
});
