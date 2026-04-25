import { Skeleton } from '@/components/ui/skeleton';
import type { ProductInventoryItem } from '@/types/product';

import { KatalogProductCard } from './katalog-product-card';

type KatalogProductGridProps = {
  products: ProductInventoryItem[];
};

export function KatalogProductGrid({ products }: KatalogProductGridProps) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <KatalogProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

type KatalogProductGridSkeletonProps = {
  count?: number;
};

export function KatalogProductGridSkeleton({
  count = 9,
}: KatalogProductGridSkeletonProps) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`katalog-skeleton-${index}`}
          className="overflow-hidden rounded-2xl border border-[#ddd4c6] bg-[#f9f5ed]"
        >
          <Skeleton className="h-56 w-full rounded-none border-b border-dashed border-[#dfd5c2] bg-[#ece2d4]" />
          <div className="space-y-3 p-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3 w-20 bg-[#e6dfd1]" />
              <Skeleton className="h-3 w-24 bg-[#e6dfd1]" />
            </div>
            <Skeleton className="h-5 w-11/12 bg-[#e6dfd1]" />
            <Skeleton className="h-5 w-3/4 bg-[#e6dfd1]" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-14 rounded-md bg-[#e6dfd1]" />
              <Skeleton className="h-5 w-14 rounded-md bg-[#e6dfd1]" />
              <Skeleton className="h-5 w-14 rounded-md bg-[#e6dfd1]" />
            </div>
            <div className="flex items-end justify-between">
              <div className="space-y-2">
                <Skeleton className="h-8 w-28 bg-[#e6dfd1]" />
                <Skeleton className="h-3 w-16 bg-[#e6dfd1]" />
              </div>
              <Skeleton className="h-4 w-16 bg-[#e6dfd1]" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
