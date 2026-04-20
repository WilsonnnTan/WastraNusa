'use client';

import { useEffect, useState } from 'react';

interface CheckoutSummaryProps {
  totals: {
    subtotal: number;
    shippingFee: number;
    serviceFee: number;
    ppn: number;
    total: number;
    shippingName: string;
  };
}

export function CheckoutSummary({ totals }: CheckoutSummaryProps) {
  const [mounted, setMounted] = useState(false);

  // Mencegah Hydration Mismatch
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-white rounded-2xl border border-[#e8e2d5] p-6 shadow-sm animate-pulse h-[400px]">
        <div className="flex justify-between mb-6">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <div className="space-y-4">
          <div className="h-12 bg-gray-100 rounded"></div>
          <div className="h-12 bg-gray-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (!totals) return null;

  return (
    <div className="bg-white rounded-2xl border border-[#e8e2d5] p-6 shadow-sm sticky top-24">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-[#3d5446] text-sm">Ringkasan Pesanan</h3>
        <span className="text-[11px] text-[#3d5446]">2 produk</span>
      </div>

      <hr className="border-[#f0ede6] mb-5" />

      {/* Item List */}
      <div className="space-y-4 mb-6">
        {/* Produk 1 */}
        <div className="flex gap-4 items-center">
          <div className="w-11 h-11 bg-[#eadecb] rounded-lg shrink-0 flex justify-center relative overflow-hidden">
            {/* Aksen visual kerah/saku seperti di desain */}
            <div className="absolute top-0 w-6 h-5 border-b border-l border-r border-[#d4c5b0] rounded-b-md"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#3d5446] truncate">
              Batik Tulis Kawung
            </p>
            <p className="text-[10px] text-[#3d5446] mt-0.5">M - x1</p>
          </div>
          <span className="text-xs font-bold text-[#3d5446] whitespace-nowrap">
            Rp {(350000).toLocaleString('id-ID')}
          </span>
        </div>

        {/* Produk 2 */}
        <div className="flex gap-4 items-center">
          <div className="w-11 h-11 bg-[#eadecb] rounded-lg shrink-0 flex justify-center relative overflow-hidden">
            <div className="absolute top-0 w-6 h-5 border-b border-l border-r border-[#d4c5b0] rounded-b-md"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-[#3d5446] truncate">
              Tenun Ikat Flores
            </p>
            <p className="text-[10px] text-[#3d5446] mt-0.5">M - x1</p>
          </div>
          <span className="text-xs font-bold text-[#3d5446] whitespace-nowrap">
            Rp {(580000).toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <hr className="border-[#f0ede6] mb-5" />

      {/* Rincian Biaya */}
      <div className="space-y-3 text-[11px] text-[#3d5446]">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-bold">
            Rp {(totals.subtotal || 0).toLocaleString('id-ID')}
          </span>
        </div>
        <div className="flex justify-between items-start gap-4">
          <span className="leading-tight shrink">
            Ongkos Kirim ({totals.shippingName || '-'})
          </span>
          <span className="font-bold whitespace-nowrap">
            Rp {(totals.shippingFee || 0).toLocaleString('id-ID')}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Biaya Layanan</span>
          <span className="font-bold">
            Rp {(totals.serviceFee || 0).toLocaleString('id-ID')}
          </span>
        </div>
        <div className="flex justify-between">
          <span>PPN (11%)</span>
          <span className="font-bold">
            Rp {(totals.ppn || 0).toLocaleString('id-ID')}
          </span>
        </div>
      </div>

      <hr className="border-[#f0ede6] my-5" />

      {/* Total Akhir */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-bold text-[#3d5446]">
            Total Pembayaran
          </span>
          <span className="text-sm font-bold text-[#3d5446]">
            Rp {(totals.total || 0).toLocaleString('id-ID')}
          </span>
        </div>
        <p className="text-[10px] text-[#3d5446]">Sudah termasuk pajak</p>
      </div>
    </div>
  );
}
