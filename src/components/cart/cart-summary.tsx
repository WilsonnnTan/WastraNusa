'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Menambahkan interface agar komponen tahu bentuk data item yang diterima
interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  quantity: number;
}

interface CartSummaryProps {
  totals: {
    count: number;
    subtotal: number;
    serviceFee: number;
    total: number;
  };
  // Prop baru untuk menerima daftar produk yang dicentang di keranjang
  selectedItems?: CartItem[];
}

export function CartSummary({ totals, selectedItems = [] }: CartSummaryProps) {
  const isCartEmpty = totals.count === 0;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white rounded-2xl border border-[#e8e2d5] p-6 shadow-sm animate-pulse h-[350px]"></div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#e8e2d5] p-6 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-[#3d5446] text-sm">Ringkasan Pesanan</h3>
        <span className="text-[11px] text-[#3d5446]">
          {totals.count} produk
        </span>
      </div>

      <hr className="border-[#f0ede6] mb-5" />

      {/* Daftar Item yang Dipilih */}
      {!isCartEmpty && selectedItems.length > 0 && (
        <>
          <div className="space-y-4 mb-6 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
            {selectedItems.map((item, idx) => (
              <div key={idx} className="flex gap-4 items-center">
                {/* Visual Ikon Pakaian Identik dengan Checkout */}
                <div className="w-11 h-11 bg-[#eadecb] rounded-lg shrink-0 flex justify-center relative overflow-hidden">
                  <div className="absolute top-0 w-6 h-5 border-b border-l border-r border-[#d4c5b0] rounded-b-md"></div>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#3d5446] truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-[#3d5446] mt-0.5">
                    {item.variant || 'M'} - ×{item.quantity}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#3d5446] whitespace-nowrap">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
          </div>
          <hr className="border-[#f0ede6] mb-5" />
        </>
      )}

      {/* Rincian Biaya */}
      <div className="space-y-3 text-[11px] text-[#3d5446]">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-bold">
            Rp {(totals.subtotal || 0).toLocaleString('id-ID')}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Biaya Layanan</span>
          <span className="font-bold">
            Rp {(totals.serviceFee || 0).toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <hr className="border-[#f0ede6] my-5" />

      {/* Total Akhir */}
      <div className="flex justify-between items-center">
        <span className="text-sm font-bold text-[#3d5446]">Estimasi Total</span>
        <span className="text-sm font-bold text-[#3d5446]">
          Rp {(totals.total || 0).toLocaleString('id-ID')}
        </span>
      </div>

      {/* Tombol Lanjut Checkout */}
      <div className="mt-6">
        <Link
          href={!isCartEmpty ? '/cart/checkout' : '#'}
          className={`block w-full ${isCartEmpty ? 'pointer-events-none' : ''}`}
          aria-disabled={isCartEmpty}
        >
          <Button
            disabled={isCartEmpty}
            className="w-full bg-[#2f5f49] hover:bg-[#244a39] text-white py-6 rounded-xl font-bold shadow-md shadow-brand/10 transition-all active:scale-[0.98]"
          >
            Lanjut ke Checkout →
          </Button>
        </Link>
      </div>

      <p className="text-center text-[10px] mt-3 text-[#3d5446]">
        {totals.count} produk terpilih untuk dibeli
      </p>
    </div>
  );
}
