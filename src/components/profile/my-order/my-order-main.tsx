'use client';

import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useState } from 'react';

import { MyOrderList } from './my-order-list';

export type OrderStatus =
  | 'Semua'
  | 'Menunggu Bayar'
  | 'Dikirim'
  | 'Diterima'
  | 'Dibatalkan'
  | 'Beri Ulasan';

const tabs: OrderStatus[] = [
  'Semua',
  'Menunggu Bayar',
  'Dikirim',
  'Diterima',
  'Dibatalkan',
  'Beri Ulasan',
];

export function MyOrderMain() {
  const [activeTab, setActiveTab] = useState<OrderStatus>('Semua');
  //const activeTab: OrderStatus = 'Semua';

  return (
    <div className="overflow-hidden rounded-2xl border border-[#e8e2d5] bg-white shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-[#e8e2d5] px-6 py-5">
        <h2 className="m-0 text-[18px] font-bold text-[#5c7365]">
          Pesanan Saya
        </h2>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-1.5 rounded-lg border-[#dcd5c7] text-[#8b7e6a] hover:bg-[#fcfbf9] hover:text-[#5c7365]"
        >
          <FileText className="h-3.5 w-3.5" />
          <span className="text-xs font-medium">Histori Lengkap</span>
        </Button>
      </div>
      <div className="border-b border-[#ece7dd] px-6 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
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
        <MyOrderList activeTab={activeTab} />
      </div>
      *
    </div>
  );
}
