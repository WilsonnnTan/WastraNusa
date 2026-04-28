'use client';

import { CatalogProductCard } from '@/components/catalog/main/catalog-product-card';
import { CatalogProductGridSkeleton } from '@/components/catalog/main/catalog-product-grid';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useProductCatalog } from '@/hooks/use-product-catalog';
import type { ProductCatalogSortBy } from '@/types/product';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const LANDING_PAGE_SIZE = 4;

const SORT_OPTIONS: Array<{
  label: string;
  value: ProductCatalogSortBy;
}> = [
  { label: 'Terbaru', value: 'newest' },
  { label: 'Terlama', value: 'oldest' },
  { label: 'Harga ↑', value: 'price_asc' },
  { label: 'Harga ↓', value: 'price_desc' },
  { label: 'Nama A-Z', value: 'name_asc' },
];

export function ProductCatalog() {
  const [activeSort, setActiveSort] = useState<ProductCatalogSortBy>('newest');
  const { data, error, isPending } = useProductCatalog(1, LANDING_PAGE_SIZE, {
    sortBy: activeSort,
  });

  const products = data?.items ?? [];

  return (
    <section className="mt-10 border-y border-[#dfd8ca] bg-[#f6f3eb] py-10">
      <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
        <Badge
          variant="outline"
          className="inline-flex rounded-lg border-[#e1d8c8] bg-[#f3ecdd] px-3 py-1 text-xs font-semibold text-[#9f8d72]"
        >
          Produk Terbaru
        </Badge>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-5">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-[#2b4d3c] sm:text-4xl">
              Produk Pilihan Pengrajin Nusantara
            </h2>
            <p className="mt-2 text-base text-[#5f7366]">
              Koleksi wastra autentik dari pengrajin terbaik Indonesia
            </p>
          </div>

          <Button
            asChild
            className="inline-flex items-center gap-1 rounded-xl border border-[#dfd8ca] bg-[#f6f3eb] px-4 py-2 text-sm font-semibold text-[#2f5f48] transition hover:border-[#89a38f]"
          >
            <Link href="/catalog">
              Lihat Semua
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2.5 text-sm">
          <span className="text-[#5f7366]">Urutkan:</span>
          {SORT_OPTIONS.map((option) => (
            <Button
              key={option.value}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                activeSort === option.value
                  ? 'border-[#2d5f48] bg-[#2d5f48] text-[#ecf1e8]'
                  : 'border-[#dad2c4] bg-[#f8f4ec] text-[#4f6658] hover:border-[#a9baa8]'
              }`}
              type="button"
              onClick={() => setActiveSort(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>

        {isPending && !data ? <CatalogProductGridSkeleton count={4} /> : null}

        {!isPending && error ? (
          <div className="mt-6 rounded-2xl border border-[#e2c9bb] bg-[#fbf1eb] p-6 text-sm text-[#8b5e4a]">
            Gagal memuat data produk. Silakan coba lagi.
          </div>
        ) : null}

        {!error && products.length > 0 ? (
          <div className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <CatalogProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : null}

        {!isPending && !error && products.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-[#d8cfbf] bg-[#fbf8f2] p-6 text-sm text-[#4f6658]">
            Belum ada produk yang tersedia untuk ditampilkan saat ini.
          </div>
        ) : null}
      </div>
    </section>
  );
}
