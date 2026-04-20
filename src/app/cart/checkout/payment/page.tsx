import { PaymentMain } from '@/components/checkout/payment/payment-main';
import { requireUser } from '@/lib/auth/auth-page-helper';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Konfirmasi Pembayaran - Wastra Nusa',
  description: 'Tinjau dan konfirmasi pesanan Wastra Anda.',
};

export default async function PaymentPage() {
  try {
    await requireUser();
  } catch {
    redirect('/login?callbackUrl=/cart/checkout/payment');
  }

  return <PaymentMain />;
}
