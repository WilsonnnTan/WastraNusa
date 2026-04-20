'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { MapPin, Store, Trash2 } from 'lucide-react';

import { CartItem } from './cart-item';

// 1. Definisi Tipe Data Produk agar TypeScript tidak komplain 'any'
export interface CartProduct {
  id: string;
  title: string;
  shopName: string;
  location: string;
  price: number;
  originalPrice?: number;
  size: string;
  stock: number;
  quantity: number;
  category: string;
  origin: string;
}

// 2. Definisi Tipe Data untuk Props Komponen
interface CartListProps {
  items: CartProduct[];
  selectedIds: string[];
  onToggleItem: (id: string) => void;
  onToggleAll: () => void;
  onUpdateQty: (id: string, delta: number) => void;
}

// 3. Definisi Tipe Data untuk Hasil Grouping Toko
interface GroupedShop {
  [key: string]: {
    name: string;
    location: string;
    products: CartProduct[];
  };
}

export function CartList({
  items,
  selectedIds,
  onToggleItem,
  onToggleAll,
  onUpdateQty,
}: CartListProps) {
  // Tidak lagi menggunakan ': any'
  const isAllSelected = items.length > 0 && selectedIds.length === items.length;

  // Logika Mengelompokkan produk menggunakan tipe yang benar
  const groupedByShop = items.reduce<GroupedShop>((acc, item) => {
    if (!acc[item.shopName]) {
      acc[item.shopName] = {
        name: item.shopName,
        location: item.location,
        products: [],
      };
    }
    acc[item.shopName].products.push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {/* Header Pilih Semua */}
      <div className="bg-white rounded-xl border border-[#e8e2d5] p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <Checkbox id="all" checked={isAllSelected} onChange={onToggleAll} />
          <label
            htmlFor="all"
            className="text-sm font-bold text-[#455c4d] cursor-pointer"
          >
            Pilih Semua ({items.length} produk)
          </label>
        </div>
        <button className="text-xs font-bold text-red-500 flex items-center gap-1.5 hover:underline">
          <Trash2 size={14} /> Hapus
        </button>
      </div>

      {/* Render Grup Toko */}
      {Object.values(groupedByShop).map((shop) => (
        <div
          key={shop.name}
          className="bg-white rounded-2xl border border-[#e8e2d5] overflow-hidden shadow-sm"
        >
          {/* Header Toko */}
          <div className="px-5 py-3 border-b border-[#f0ede6] flex items-center justify-between bg-[#faf9f6]">
            <div className="flex items-center gap-3">
              <Store size={16} className="text-brand" />
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-[#3d5446]">
                  {shop.name}
                </span>
                <span className="text-[10px] text-[#8e8476] flex items-center gap-1">
                  <MapPin size={10} /> {shop.location}
                </span>
              </div>
            </div>
            <button className="text-[10px] font-bold text-brand hover:underline italic">
              Kunjungi Toko →
            </button>
          </div>

          {/* List Produk di dalam Toko ini */}
          <div className="divide-y divide-[#f0ede6]">
            {shop.products.map((product) => (
              <CartItem
                key={product.id}
                item={product}
                isSelected={selectedIds.includes(product.id)}
                onToggle={() => onToggleItem(product.id)}
                onUpdateQty={(delta: number) => onUpdateQty(product.id, delta)}
                // isInsideGroup sudah saya hapus di sini
              />
            ))}
          </div>

          {/* Promo Footer per Toko */}
          <div className="px-5 py-2.5 bg-[#fcfaf7] border-t border-[#f0ede6] flex items-center justify-between text-[10px]">
            <span className="text-[#8e8476]">
              🎁 Promo: Gratis ongkir min. belanja Rp 500rb
            </span>
            <button className="font-bold text-brand italic underline">
              Pakai →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
