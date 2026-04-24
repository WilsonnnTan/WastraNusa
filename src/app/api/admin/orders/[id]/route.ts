import { withApiAdmin } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { adminOrderUpdateSchema } from '@/schemas/order.schema';
import { orderService } from '@/services/order.service';

type Params = { id: string };

export const PUT = withApiAdmin<Params>(async ({ req, params }) => {
  const body = await req.json();
  const payload = adminOrderUpdateSchema.parse(body);
  const order = await orderService.updateOrderForAdmin(params.id, payload);
  return jsend.success(order);
});
