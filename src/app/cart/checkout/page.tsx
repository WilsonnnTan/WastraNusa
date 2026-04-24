import { CheckoutMain } from '@/components/checkout/checkout-main';
import { requireUser } from '@/lib/auth/auth-page-helper';

export default async function CheckoutPage() {
  await requireUser();
  return <CheckoutMain />;
}
