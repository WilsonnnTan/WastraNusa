import { withApiAuth } from '@/lib/api-handler';
import { jsend } from '@/lib/jsend';
import { addressService } from '@/services/address.service';

type Params = { id: string };

// POST /api/addresses/[id]/default — set as primary address
export const POST = withApiAuth<Params>(async ({ userId, params }) => {
  const address = await addressService.setDefaultAddress(params.id, userId);
  return jsend.success(address);
});
