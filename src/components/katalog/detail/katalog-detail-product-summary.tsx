import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ProductInventoryItem } from '@/types/product';
import { CircleCheck, Minus, Plus, ShoppingCart } from 'lucide-react';

import { formatRupiah } from '../utils';

type KatalogDetailProductSummaryProps = {
  product: ProductInventoryItem;
  sizeOptions: string[];
  colorOptions: string[];
  selectedColor?: string;
  selectedSize?: string;
  safeQuantity: number;
  onColorChange: (color?: string) => void;
  onSizeChange: (size?: string) => void;
  onDecreaseQuantity: () => void;
  onIncreaseQuantity: () => void;
  onAddToCart: () => void;
  onBuyNow: () => void;
  isCartActionPending?: boolean;
};

export function KatalogDetailProductSummary({
  product,
  sizeOptions,
  colorOptions,
  selectedColor,
  selectedSize,
  safeQuantity,
  onColorChange,
  onSizeChange,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onAddToCart,
  onBuyNow,
  isCartActionPending = false,
}: KatalogDetailProductSummaryProps) {
  const isOutOfStock = product.stock <= 0 || product.status === 'out_of_stock';

  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        <Badge
          variant="outline"
          className="border-[#e0d8ca] bg-[#f4ecdd] text-[#baa489]"
        >
          {product.clothingType}
        </Badge>
        <Badge
          variant="outline"
          className="border-[#e0d8ca] bg-[#f4ecdd] text-[#bc7c5f]"
        >
          {product.province}
        </Badge>
      </div>

      <h1 className="mt-2 text-5xl font-bold tracking-tight text-[#2f5b49]">
        {product.name}
      </h1>

      <p className="mt-2 text-sm text-[#5f665e]">
        SKU <span className="font-semibold text-[#ca724e]">{product.sku}</span>{' '}
        · {product.island}, {product.province}
      </p>
      <p className="mt-2 inline-flex items-center gap-1.5 text-[#598a66]">
        <CircleCheck className="size-4" />
        {isOutOfStock ? 'Stok habis' : `Stok: ${product.stock}`}
      </p>

      <Card className="mt-4 rounded-2xl border border-[#ddd4c5] bg-[#efe9de] px-5 py-4">
        <h2 className="text-4xl font-extrabold tracking-tight text-[#2f5f49]">
          {formatRupiah(product.price)}
        </h2>
        <p className="text-sm text-[#6d6a62]">
          Harga sudah termasuk PPN · Belum termasuk ongkos kirim
        </p>
      </Card>

      <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#3e5348]">
        {product.description ||
          'Deskripsi produk belum tersedia. Silakan cek artikel ensiklopedia untuk konteks budaya produk ini.'}
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-[#4d6458]">
            Pilihan Warna:
          </span>
          {colorOptions.length > 0 ? (
            colorOptions.map((color) => (
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
            ))
          ) : (
            <span className="text-sm text-[#6f6a5f]">
              Belum ada varian warna
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-[#4d6458]">Ukuran</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {sizeOptions.length > 0 ? (
            sizeOptions.map((size) => (
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
            ))
          ) : (
            <span className="text-sm text-[#6f6a5f]">
              Belum ada varian ukuran
            </span>
          )}
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
            disabled={safeQuantity <= 1 || isOutOfStock}
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
            disabled={safeQuantity >= product.stock || isOutOfStock}
          >
            <Plus />
          </Button>
        </Card>
        <span className="text-sm text-[#6c6962]">
          Maks. {product.stock} unit
        </span>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Button
          disabled={isOutOfStock || isCartActionPending}
          className="h-11 rounded-xl bg-[#2f5f49] text-[#edf4ec] hover:bg-[#254a39]"
          onClick={onAddToCart}
        >
          <ShoppingCart data-icon="inline-start" />
          {isCartActionPending ? 'Memproses...' : 'Tambah ke Keranjang'}
        </Button>
        <Button
          disabled={isOutOfStock || isCartActionPending}
          className="h-11 rounded-xl bg-[#cc7543] text-white hover:bg-[#b56539]"
          onClick={onBuyNow}
        >
          {isCartActionPending ? 'Memproses...' : 'Beli Langsung'}
        </Button>
      </div>
    </div>
  );
}
