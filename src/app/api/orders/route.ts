import { withApiAuth } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { orderService } from '@/services/order.service';

export const GET = withApiAuth(async ({ req, userId }) => {
  const url = new URL(req.url);
  const status = url.searchParams.get('status') || undefined;
  const page = parseInt(url.searchParams.get('page') || '1', 10);
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);

  const result = await orderService.getUserOrders(userId, status, page, limit);

  return jsend.success(result);
});
