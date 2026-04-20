'use client';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import { AddressSection } from './address-section';
import { CheckoutSummary } from './checkout-summary';
import { ShippingMethodSection } from './shipping-method-section';

// Data kurir didefinisikan di sini agar mudah dihitung
const shippingOptions = [
  {
    id: 'sic',
    name: 'Reguler',
    courier: 'SiCepat',
    price: 16000,
    desc: '2-4 hari kerja',
    tag: 'Hemat',
  },
  {
    id: 'jne-reg',
    name: 'Reguler (REG)',
    courier: 'JNE',
    price: 18000,
    desc: '3-5 hari kerja',
  },
  {
    id: 'jne-yes',
    name: 'YES (1 hari)',
    courier: 'JNE',
    price: 42000,
    desc: '1 hari kerja',
  },
  {
    id: 'gosend',
    name: 'Same Day',
    courier: 'GoSend',
    price: 56000,
    desc: 'Hari ini (max 8 jam)',
    tag: 'Dalam kota',
  },
];

export function CheckoutMain() {
  const [selectedShippingId, setSelectedShippingId] = useState('sic');

  // Menemukan detail kurir yang dipilih
  const selectedShipping = useMemo(
    () => shippingOptions.find((opt) => opt.id === selectedShippingId),
    [selectedShippingId],
  );

  // Kalkulasi total yang akan dikirim ke CheckoutSummary
  const totals = useMemo(() => {
    const subtotal = 930000; // Contoh subtotal produk
    const serviceFee = 5000;
    const shippingFee = selectedShipping?.price || 0;
    const ppn = Math.round((subtotal + shippingFee) * 0.11);

    return {
      subtotal,
      shippingFee,
      serviceFee,
      ppn,
      total: subtotal + shippingFee + serviceFee + ppn,
      shippingName: selectedShipping
        ? `${selectedShipping.courier} (${selectedShipping.name})`
        : '-',
    };
  }, [selectedShipping]);

  return (
    <div className="min-h-screen bg-[#fbf8f2] flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-10 max-w-[1320px]">
        {/* Progress Bar */}
        <div className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-[#8e8476]">
          <span className="text-brand">Keranjang</span>
          <span className="text-[#d8cfbf]">/</span>
          <span className="text-[#3d5446] border-b-2 border-brand pb-1">
            Pengiriman
          </span>
          <span className="text-[#d8cfbf]">/</span>
          <span className="text-[#d8cfbf]">Pembayaran</span>
        </div>

        <div className="lg:grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <AddressSection />
            <ShippingMethodSection
              options={shippingOptions}
              selectedId={selectedShippingId}
              onSelect={setSelectedShippingId}
            />

            {/* --- BAGIAN TOMBOL NAVIGASI --- */}
            <div className="mt-10 pt-6 border-t border-[#e8e2d5] flex flex-col sm:flex-row justify-between items-center gap-4">
              <Link href="/cart">
                <Button
                  variant="ghost"
                  className="text-brand font-bold gap-2 hover:bg-brand/5 px-0 sm:px-4"
                >
                  <ChevronLeft size={18} /> Kembali ke Keranjang
                </Button>
              </Link>

              {/* PERBAIKAN: Membungkus tombol dengan Link ke halaman payment */}
              <Link href="/cart/checkout/payment" className="w-full sm:w-auto">
                <Button className="w-full bg-[#2f5f49] hover:bg-[#244a39] text-white px-12 py-7 rounded-2xl font-bold shadow-lg shadow-brand/10 transition-all active:scale-95">
                  Tinjau & Konfirmasi →
                </Button>
              </Link>
            </div>

            {/* Trust Badge */}
            <div className="flex items-center justify-center gap-2 text-[#8e8476] mt-4">
              <ShieldCheck size={14} />
              <p className="text-[10px] font-medium uppercase tracking-tighter">
                Pembayaran Aman & Terenkripsi
              </p>
            </div>
            {/* ---------------------------------- */}
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
