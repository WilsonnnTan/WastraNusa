import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ProductInventoryItem } from '@/types/product';
import Link from 'next/link';

import { formatRupiah } from '../utils';

type KatalogProductCardProps = {
  product: ProductInventoryItem;
};

export function KatalogProductCard({ product }: KatalogProductCardProps) {
  const sizeVariants = product.variants
    .filter((variant) => variant.type === 'size')
    .map((variant) => variant.name);
  const isOutOfStock = product.stock <= 0 || product.status === 'out_of_stock';

  return (
    <Card className="overflow-hidden rounded-2xl border border-[#ddd4c6] bg-[#f9f5ed] p-0">
      <div className="relative h-56 border-b border-dashed border-[#dfd5c2] bg-[#ece2d4]">
        <Badge
          variant="outline"
          className="absolute left-3 top-3 rounded-md border-[#e4dbc8] bg-[#f8f2e6] px-2 py-0.5 text-[11px] font-semibold text-[#b7a381]"
        >
          {product.clothingType}
        </Badge>

        {isOutOfStock ? (
          <Badge
            className={cn(
              'absolute left-3 top-10 rounded-md px-2 py-0.5 text-[11px] font-bold',
              'bg-[#cbc9c4] text-[#fbfbfb]',
            )}
          >
            HABIS
          </Badge>
        ) : product.status === 'inactive' ? (
          <Badge className="absolute left-3 top-10 rounded-md bg-[#8b8479] px-2 py-0.5 text-[11px] font-bold text-[#fbfbfb]">
            NONAKTIF
          </Badge>
        ) : null}

        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-2 text-[#7c6c54]">
            <span className="size-4 rotate-45 border border-[#cebda2]" />
            <span className="text-sm font-medium">Gambar Placeholder</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <div className="flex items-center justify-between text-xs text-[#7c7a72]">
          <span>{product.clothingType}</span>
          <span>{product.province}</span>
        </div>

        <Link
          href={`/katalog/${product.slug}`}
          className="line-clamp-2 text-base font-bold leading-tight text-[#365847] hover:underline"
        >
          {product.name}
        </Link>

        <div className="flex flex-wrap gap-1">
          {sizeVariants.slice(0, 4).map((size) => (
            <Badge
              key={`${product.slug}-${size}`}
              variant="outline"
              className="rounded-md border-[#ddd3c2] bg-[#f7f1e5] px-1.5 py-0 text-[10px] text-[#5f7467]"
            >
              {size}
            </Badge>
          ))}
          {sizeVariants.length === 0 ? (
            <Badge
              variant="outline"
              className="rounded-md border-[#ddd3c2] bg-[#f7f1e5] px-1.5 py-0 text-[10px] text-[#5f7467]"
            >
              Tanpa Varian Ukuran
            </Badge>
          ) : null}
        </div>

        <div className="mt-1 flex items-end justify-between">
          <div className="flex flex-col">
            <p className="text-2xl font-extrabold tracking-tight text-[#2f5f49]">
              {formatRupiah(product.price)}
            </p>
            <p className="text-xs text-[#8c887e]">Terjual {product.sold}</p>
          </div>
          <p className="text-sm font-semibold text-[#4d6858]">
            {isOutOfStock ? 'Habis' : `Stok: ${product.stock}`}
          </p>
        </div>
      </div>
    </Card>
  );
}
