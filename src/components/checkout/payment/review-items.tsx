'use client';

import { Hexagon } from 'lucide-react';

const reviewItems = [
  {
    id: '1',
    title: 'Batik Tulis Kawung',
    category: 'Batik',
    detail: 'Solo, Jawa Tengah - Ukuran M - ×1',
    price: 350000,
  },
  {
    id: '2',
    title: 'Tenun Ikat Flores',
    category: 'Tenun',
    detail: 'Flores, NTT - Ukuran M - ×1',
    price: 580000,
  },
];

export function ReviewItems() {
  return (
    <div className="bg-white rounded-2xl border border-[#e8e2d5] p-6 sm:p-8 shadow-sm">
      <h2 className="text-xl font-bold text-[#3d5446] mb-6">
        Tinjau Pesanan Anda
      </h2>

      <div className="space-y-4 mb-8">
        {reviewItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#fbf8f2] rounded-xl p-5 flex items-center gap-5"
          >
            <div className="w-16 h-16 shrink-0 border border-[#e8e2d5] rounded-xl flex flex-col items-center justify-center text-[#8e8476] bg-[#f4efe6]">
              <Hexagon className="w-6 h-6 stroke-[1.5]" />
              <span className="text-[8px] font-bold mt-1 uppercase">
                {item.category}
              </span>
            </div>

            <div className="flex-1">
              <span className="inline-block px-2 py-0.5 bg-[#e8e2d5] text-[#726759] text-[10px] font-bold rounded mb-1">
                {item.category}
              </span>
              <h3 className="font-bold text-[#3d5446] text-sm">{item.title}</h3>
              <p className="text-[11px] text-[#8e8476] mt-0.5">{item.detail}</p>
            </div>

            <div className="text-right">
              <span className="font-bold text-[#3d5446] text-sm">
                Rp {item.price.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-[#fbf8f2] border border-[#e8e2d5] rounded-xl p-5">
          <h4 className="text-[11px] font-bold text-[#d8cfbf] mb-2 uppercase tracking-wider">
            Alamat Pengiriman
          </h4>
          <p className="text-xs font-bold text-[#3d5446] mb-0.5">Siti Rahayu</p>
          <p className="text-[11px] text-[#7a887f] leading-relaxed">
            Jl. Cendana No. 12, Yogyakarta
            <br />
            DI Yogyakarta 55281
          </p>
        </div>

        <div className="bg-[#fbf8f2] border border-[#e8e2d5] rounded-xl p-5">
          <h4 className="text-[11px] font-bold text-[#d8cfbf] mb-2 uppercase tracking-wider">
            Metode Pengiriman
          </h4>
          <p className="text-xs font-bold text-[#3d5446] mb-0.5">SiCepat</p>
          <p className="text-[11px] text-[#7a887f] mb-0.5">Reguler</p>
          <p className="text-[11px] text-[#7a887f]">2–4 hari kerja</p>
        </div>
      </div>
    </div>
  );
}
