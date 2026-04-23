'use client';

import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { ShoppingCart } from 'lucide-react';
import { useMemo, useState } from 'react';

import { CartList } from './cart-list';
import { CartSummary } from './cart-summary';

const dummyCart = [
  {
    id: '1',
    name: 'Batik Tulis Kawung Klasik',
    price: 350000,
    size: 'M',
    stock: 48,
    quantity: 1,
    clothingType: 'Batik',
    province: 'Jawa Tengah',
  },
  {
    id: '1-2',
    name: 'Batik Cap Parang Kusumo',
    price: 150000,
    size: 'L',
    stock: 20,
    quantity: 1,
    clothingType: 'Batik',
    province: 'Jawa Tengah',
  },
  {
    id: '1-3',
    name: 'Kemeja Batik Sogan Premium',
    price: 550000,
    size: 'XL',
    stock: 10,
    quantity: 1,
    clothingType: 'Batik',
    province: 'Jawa Tengah',
  },
  {
    id: '2',
    name: 'Tenun Ikat Flores Indigo',
    price: 1160000,
    size: 'M',
    stock: 24,
    quantity: 1,
    clothingType: 'Tenun',
    province: 'Nusa Tenggara Timur',
  },
  {
    id: '2-2',
    name: 'Selendang Tenun Sumba',
    price: 450000,
    size: 'All Size',
    stock: 15,
    quantity: 1,
    clothingType: 'Tenun',
    province: 'Nusa Tenggara Timur',
  },
  {
    id: '3',
    name: 'Songket Palembang Lepus',
    price: 1200000,
    size: 'M',
    stock: 15,
    quantity: 1,
    clothingType: 'Songket',
    province: 'Sumatera Selatan',
  },
  {
    id: '3-2',
    name: 'Tanjak Songket Tradisional',
    price: 250000,
    size: 'All Size',
    stock: 30,
    quantity: 1,
    clothingType: 'Songket',
    province: 'Sumatera Selatan',
  },
];

export function CartMain() {
  const [items, setItems] = useState(dummyCart);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id],
    );
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      }),
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((item) => item.id));
    }
  };

  const handleDeleteSelected = () => {
    setItems((prev) => prev.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  // PERBAIKAN: Memisahkan totals dan data item yang dipilih untuk sidebar
  const { totals, selectedItemsForSummary } = useMemo(() => {
    // 1. Ambil data mentah item yang sedang dicentang
    const selectedItems = items.filter((item) => selectedIds.includes(item.id));

    // 2. Hitung harga dan biaya
    const subtotal = selectedItems.reduce(
      (acc, curr) => acc + curr.price * curr.quantity,
      0,
    );
    const serviceFee = selectedIds.length > 0 ? 5000 : 0;

    // 3. Format data agar sesuai dengan interface CartSummary
    const formattedItems = selectedItems.map((item) => ({
      id: item.id,
      name: item.name,
      variant: item.size, // Mapping properti size ke variant
      price: item.price,
      quantity: item.quantity,
    }));

    return {
      totals: {
        subtotal,
        serviceFee,
        total: subtotal + serviceFee,
        count: selectedIds.length,
      },
      selectedItemsForSummary: formattedItems,
    };
  }, [selectedIds, items]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbf8f2]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-[1320px]">
        <div className="flex items-center gap-2 mb-8">
          <ShoppingCart className="text-brand" />
          <h1 className="text-2xl font-bold text-[#3d5446]">
            Keranjang Belanja{' '}
            <span className="text-[#8e8476] font-normal text-lg">
              ({items.length} produk)
            </span>
          </h1>
        </div>

        <div className="lg:grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <CartList
              items={items}
              selectedIds={selectedIds}
              onToggleItem={toggleItem}
              onToggleAll={toggleAll}
              onUpdateQty={updateQuantity}
              onDeleteSelected={handleDeleteSelected}
            />
          </div>
          <div className="lg:col-span-4">
            {/* PERBAIKAN: Mengirimkan data formattedItems ke props selectedItems */}
            <CartSummary
              totals={totals}
              selectedItems={selectedItemsForSummary}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
