import { withApiAuth } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { checkoutSchema } from '@/schemas/payment.schema';
import { paymentService } from '@/services/payment.service';

export const POST = withApiAuth(async ({ req, userId }) => {
  const body = await req.json();
  const data = checkoutSchema.parse(body);
  const result = await paymentService.checkout(data, userId);
  return jsend.success(result, 201);
});
