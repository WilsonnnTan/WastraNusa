'use client';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ChevronLeft, CreditCard } from 'lucide-react';
import Link from 'next/link';

import { CheckoutSummary } from '../checkout-summary';
import { ReviewItems } from './review-items';

// PERBAIKAN: Mundur satu folder

export function PaymentMain() {
  const totals = {
    subtotal: 930000,
    shippingFee: 16000,
    serviceFee: 5000,
    ppn: 102300,
    total: 1053300,
    shippingName: 'SiCepat',
  };

  return (
    <div className="min-h-screen bg-[#fbf8f2] flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-[1320px]">
        <div className="lg:grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <ReviewItems />

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link href="/cart/checkout">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto text-[#3d5446] border-[#d8cfbf] font-bold gap-2 hover:bg-[#f4efe6] px-6 py-6 rounded-xl"
                >
                  <ChevronLeft size={18} /> Kembali
                </Button>
              </Link>

              <Button className="w-full sm:w-auto bg-[#cc6644] hover:bg-[#b3593b] text-white px-8 py-6 rounded-xl font-bold shadow-lg shadow-[#cc6644]/20 transition-all active:scale-95 gap-2">
                <CreditCard size={18} /> Konfirmasi & Bayar Sekarang
              </Button>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <CheckoutSummary totals={totals} />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
