import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { CircleCheck, Minus, Plus, ShoppingCart } from 'lucide-react';

import type { CatalogProduct } from '../data';
import { formatRupiah } from '../utils';

type KatalogDetailProductSummaryProps = {
  product: CatalogProduct;
  selectedColor: string;
  selectedSize: string;
  safeQuantity: number;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
};

const COLOR_OPTIONS = ['Coklat Sogan', 'Hitam', 'Biru Indigo'];

export function KatalogDetailProductSummary({
  product,
  selectedColor,
  selectedSize,
  safeQuantity,
  onColorChange,
  onSizeChange,
  onDecreaseQuantity,
  onIncreaseQuantity,
}: KatalogDetailProductSummaryProps) {
  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        <Badge
          variant="outline"
          className="border-[#e0d8ca] bg-[#f4ecdd] text-[#baa489]"
        >
          {product.category}
        </Badge>
        <Badge
          variant="outline"
          className="border-[#e0d8ca] bg-[#f4ecdd] text-[#bc7c5f]"
        >
          {product.region}
        </Badge>
      </div>

      <h1 className="mt-2 text-5xl font-bold tracking-tight text-[#2f5b49]">
        {product.name}
      </h1>

      <p className="mt-2 text-sm text-[#5f665e]">
        Dijual oleh{' '}
        <span className="font-semibold text-[#ca724e]">Batik Mataram Solo</span>
        {' � '}Solo, Jawa Tengah
      </p>
      <p className="mt-2 inline-flex items-center gap-1.5 text-[#598a66]">
        <CircleCheck className="size-4" />
        Stok: {product.stock}
      </p>

      <Card className="mt-4 rounded-2xl border border-[#ddd4c5] bg-[#efe9de] px-5 py-4">
        <h2 className="text-4xl font-extrabold tracking-tight text-[#2f5f49]">
          {formatRupiah(product.price)}
        </h2>
        <p className="text-sm text-[#6d6a62]">
          Harga sudah termasuk PPN � Belum termasuk ongkos kirim
        </p>
      </Card>

      <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#3e5348]">
        Batik Tulis Kawung merupakan salah satu motif batik tertua dari Keraton
        Yogyakarta dan Solo. Motif kawung terinspirasi dari buah aren
        (kolang-kaling) yang disusun geometris, melambangkan kesucian, kekuatan,
        dan harapan.
        <span className="ml-1 font-semibold text-[#ca724e]">
          Baca selengkapnya
        </span>
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-[#4d6458]">
            Pilihan Warna:
          </span>
          {COLOR_OPTIONS.map((color) => (
            <Button
              key={color}
              type="button"
              size="sm"
              variant="outline"
              className={cn(
                'rounded-full border-[#ddd3c2] bg-[#f4efe5] text-[#4f6558]',
                selectedColor === color && 'bg-[#dfe8dd] text-[#315642]',
              )}
              onClick={() => onColorChange(color)}
            >
              {color}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#4d6458]">Ukuran</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {product.sizes.map((size) => (
            <Button
              key={size}
              type="button"
              variant="outline"
              className={cn(
                'rounded-lg border-[#ddd4c5] bg-[#f5f0e7] text-[#496356]',
                selectedSize === size &&
                  'border-[#2f5f49] bg-[#2f5f49] text-[#edf4ec]',
              )}
              onClick={() => onSizeChange(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Card className="inline-flex flex-row items-center gap-0 rounded-xl border border-[#ddd4c5] bg-[#f4efe5] p-1">
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            className="rounded-md"
            onClick={onDecreaseQuantity}
            disabled={safeQuantity <= 1}
          >
            <Minus />
          </Button>
          <span className="min-w-8 text-center text-sm font-semibold text-[#315642]">
            {safeQuantity}
          </span>
          <Button
            type="button"
            size="icon-sm"
            variant="ghost"
            className="rounded-md"
            onClick={onIncreaseQuantity}
            disabled={safeQuantity >= product.stock}
          >
            <Plus />
          </Button>
        </Card>
        <span className="text-sm text-[#6c6962]">
          Maks. {product.stock} unit
        </span>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Button className="h-11 rounded-xl bg-[#2f5f49] text-[#edf4ec] hover:bg-[#254a39]">
          <ShoppingCart data-icon="inline-start" />
          Tambah ke Keranjang
        </Button>
        <Button className="h-11 rounded-xl bg-[#cc7543] text-white hover:bg-[#b56539]">
          Beli Langsung
        </Button>
      </div>
    </div>
  );
}
