import { withApiAuth } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { createAddressSchema } from '@/schemas/address.schema';
import { addressService } from '@/services/address.service';

// GET /api/addresses — list all addresses for the authenticated user
export const GET = withApiAuth(async ({ userId }) => {
  const addresses = await addressService.getAddresses(userId);
  return jsend.success(addresses);
});

// POST /api/addresses — create a new address
export const POST = withApiAuth(async ({ req, userId }) => {
  const body = await req.json();
  const data = createAddressSchema.parse(body);
  const address = await addressService.createAddress(userId, data);
  return jsend.success(address, 201);
});
