import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import Link from 'next/link';

import type { CatalogProduct } from '../data';
import { formatRupiah } from '../utils';

type KatalogProductCardProps = {
  product: CatalogProduct;
};

export function KatalogProductCard({ product }: KatalogProductCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl border border-[#ddd4c6] bg-[#f9f5ed] p-0">
      <div className="relative h-56 border-b border-dashed border-[#dfd5c2] bg-[#ece2d4]">
        <Badge
          variant="outline"
          className="absolute left-3 top-3 rounded-md border-[#e4dbc8] bg-[#f8f2e6] px-2 py-0.5 text-[11px] font-semibold text-[#b7a381]"
        >
          {product.category}
        </Badge>

        {product.badge ? (
          <Badge
            className={cn(
              'absolute left-3 top-10 rounded-md px-2 py-0.5 text-[11px] font-bold',
              product.badge === 'HABIS'
                ? 'bg-[#cbc9c4] text-[#fbfbfb]'
                : 'bg-[#2f5f49] text-[#edf3eb]',
            )}
          >
            {product.badge}
          </Badge>
        ) : null}

        <div className="absolute inset-0 grid place-items-center">
          <div className="flex flex-col items-center gap-2 text-[#7c6c54]">
            <span className="size-4 rotate-45 border border-[#cebda2]" />
            {product.soldOut ? (
              <Badge className="rounded-full bg-[#2f5f49] px-3 py-0.5 text-xs text-[#eff4eb]">
                Stok Habis
              </Badge>
            ) : (
              <span className="text-sm font-medium">{product.category}</span>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-3">
        <div className="flex items-center justify-between text-xs text-[#7c7a72]">
          <span>{product.category}</span>
          <span>{product.city}</span>
        </div>

        <Link
          href={`/katalog/${product.slug}`}
          className="line-clamp-2 text-base font-bold leading-tight text-[#365847] hover:underline"
        >
          {product.name}
        </Link>

        <div className="inline-flex items-center gap-1 text-xs text-[#7f786c]">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={`${product.slug}-star-${index}`}
              className={cn(
                index < Math.round(product.rating)
                  ? 'fill-[#d8b665] text-[#d8b665]'
                  : 'fill-[#e6ddcb] text-[#e6ddcb]',
              )}
            />
          ))}
          <span>({product.reviews})</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {product.sizes.slice(0, 4).map((size) => (
            <Badge
              key={`${product.slug}-${size}`}
              variant="outline"
              className="rounded-md border-[#ddd3c2] bg-[#f7f1e5] px-1.5 py-0 text-[10px] text-[#5f7467]"
            >
              {size}
            </Badge>
          ))}
        </div>

        <div className="mt-1 flex items-end justify-between">
          <div className="flex flex-col">
            <p className="text-2xl font-extrabold tracking-tight text-[#2f5f49]">
              {formatRupiah(product.price)}
            </p>
            {product.oldPrice ? (
              <p className="text-xs text-[#8c887e] line-through">
                {formatRupiah(product.oldPrice)}
              </p>
            ) : null}
          </div>
          <p className="text-sm font-semibold text-[#4d6858]">
            {product.soldOut ? 'Habis' : `Stok: ${product.stock}`}
          </p>
        </div>
      </div>
    </Card>
  );
}
