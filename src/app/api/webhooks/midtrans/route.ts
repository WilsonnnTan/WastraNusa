import { withApiPublic } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { midtransNotificationSchema } from '@/schemas/payment.schema';
import { paymentService } from '@/services/payment.service';

export const POST = withApiPublic(async ({ req }) => {
  const body = await req.json();
  const payload = midtransNotificationSchema.parse(body);
  await paymentService.handleNotification(payload);
  return jsend.success(null, 200);
});
