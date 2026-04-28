import { withApiAuth } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { updateAddressSchema } from '@/schemas/address.schema';
import { addressService } from '@/services/address.service';

type Params = { id: string };

// PUT /api/addresses/[id] — update address
export const PUT = withApiAuth<Params>(async ({ req, userId, params }) => {
  const body = await req.json();
  const data = updateAddressSchema.parse(body);
  const address = await addressService.updateAddress(params.id, userId, data);
  return jsend.success(address);
});

// DELETE /api/addresses/[id] — delete address
export const DELETE = withApiAuth<Params>(async ({ userId, params }) => {
  await addressService.deleteAddress(params.id, userId);
  return jsend.success(null);
});
