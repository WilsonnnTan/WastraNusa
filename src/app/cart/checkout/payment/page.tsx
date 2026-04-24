import { PaymentMain } from '@/components/checkout/payment/payment-main';
import { requireUser } from '@/lib/auth/auth-page-helper';

export default async function PaymentPage() {
  await requireUser();
  return <PaymentMain />;
}
