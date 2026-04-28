'use client';

import { useState } from 'react';

import { MyOrderList } from './my-order-list';

export type OrderStatus =
  | 'Semua'
  | 'Menunggu Bayar'
  | 'Dikonfirmasi'
  | 'Pengemasan' // pengemasan = processing
  | 'Dikirim'
  | 'Diterima'
  | 'Dibatalkan';

const tabs: OrderStatus[] = [
  'Semua',
  'Menunggu Bayar',
  'Dikonfirmasi',
  'Pengemasan',
  'Dikirim',
  'Diterima',
  'Dibatalkan',
];

export function MyOrderMain() {
  const [activeTab, setActiveTab] = useState<OrderStatus>('Semua');
  const [page, setPage] = useState(1);

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e2d5] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#e8e2d5] px-6 py-5">
        <h2 className="m-0 text-[18px] font-bold text-[#5c7365]">
          Pesanan Saya
        </h2>
      </div>
      <div className="border-b border-[#ece7dd] px-6 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setActiveTab(tab);
                setPage(1);
              }}
              className={`whitespace-nowrap px-3 py-1.5 text-[13px] font-semibold transition-colors rounded-md ${
                activeTab === tab
                  ? 'bg-[#3b5249] text-white'
                  : 'bg-[#f4efe6] text-[#8b7e6a] hover:bg-[#ebe4d7]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <MyOrderList activeTab={activeTab} page={page} setPage={setPage} />
      </div>
    </div>
  );
}
