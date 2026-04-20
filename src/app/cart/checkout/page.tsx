import { CheckoutMain } from '@/components/checkout/checkout-main';
import { requireUser } from '@/lib/auth/auth-page-helper';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Pengiriman & Pembayaran - WastraNusa',
  description: 'Selesaikan pesanan Wastra Anda dengan aman.',
};

export default async function CheckoutPage() {
  try {
    // Proteksi: Memastikan user sudah terautentikasi
    // requireUser biasanya akan melempar error atau redirect jika user tidak ditemukan
    await requireUser();
  } catch {
    // Jika gagal autentikasi, arahkan ke halaman login
    redirect('/login?callbackUrl=/cart/checkout');
  }

  return <CheckoutMain />;
}
