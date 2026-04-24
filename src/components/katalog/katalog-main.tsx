'use client';

import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search, Star } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';

import {
  catalogProducts,
  catalogRegions,
  catalogSidebarCategories,
  catalogSortOptions,
} from './data';

function formatRupiah(value: number) {
  return `Rp ${value.toLocaleString('id-ID')}`;
}

export function KatalogMain() {
  const [activeSort, setActiveSort] = useState(catalogSortOptions[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return catalogProducts;
    }

    return catalogProducts.filter((product) =>
      `${product.name} ${product.category} ${product.city}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [searchQuery]);

  return (
    <main className="border-t border-[#dbd4c7]">
      <section className="mx-auto w-full max-w-[1320px] px-4 pb-5 pt-6 md:px-6 lg:px-8">
        <Breadcrumb>
          <BreadcrumbList className="text-[#66786d] text-sm font-medium">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="hover:text-[#2f5b49]">
                Beranda
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#2f5b49]">
                Katalog Produk
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-[#2f5b49]">
              Katalog Produk Wastra
            </h1>
            <p className="mt-1 text-[#4f6458]">
              12 produk autentik dari 34 provinsi
            </p>
          </div>

          <div className="relative w-full max-w-[320px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b2aa9b]" />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Cari produk..."
              className="h-10 rounded-xl border-[#ddd5c6] bg-[#ece6db] pl-10 text-[#4e6257] placeholder:text-[#aea593]"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-[#d4ccbe] bg-[#e8e3d9] py-6">
        <div className="mx-auto grid w-full max-w-[1320px] gap-4 px-4 md:px-6 xl:grid-cols-[240px_minmax(0,1fr)] lg:px-8">
          <aside className="flex flex-col gap-3">
            <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
              <h3 className="text-sm font-bold">Kategori</h3>
              <div className="flex flex-col gap-1.5">
                {catalogSidebarCategories.map((category, index) => (
                  <button
                    key={category.name}
                    type="button"
                    className={cn(
                      'flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition',
                      index === 0
                        ? 'bg-[#2f5f49] text-[#edf4ec]'
                        : 'text-[#4f6659] hover:bg-[#ece5d8]',
                    )}
                  >
                    <span>{category.name}</span>
                    <span>{category.count}</span>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
              <h3 className="text-sm font-bold">Rentang Harga</h3>
              <div className="flex flex-col gap-2 text-sm text-[#52685b]">
                {[
                  'Semua Harga',
                  '< Rp 200.000',
                  'Rp 200.000 - 500.000',
                  'Rp 500.000 - 1.000.000',
                  'Rp 1.000.000 - 3.000.000',
                  '> Rp 3.000.000',
                ].map((item, index) => (
                  <label key={item} className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="price-range"
                      defaultChecked={index === 0}
                    />
                    {item}
                  </label>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="Min"
                  className="h-8 rounded-md border-[#ddd5c6] bg-[#ece6db] text-xs"
                />
                <Input
                  placeholder="Max"
                  className="h-8 rounded-md border-[#ddd5c6] bg-[#ece6db] text-xs"
                />
              </div>
            </Card>

            <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
              <h3 className="text-sm font-bold">Ukuran</h3>
              <div className="flex flex-wrap gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'].map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant="outline"
                    size="xs"
                    className="rounded-md border-[#dad1c2] bg-[#f8f4eb] text-[#4f6659]"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </Card>

            <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
              <h3 className="text-sm font-bold">Asal Daerah</h3>
              <div className="flex flex-col gap-2 text-sm text-[#4f6659]">
                {catalogRegions.map((region) => (
                  <button key={region} type="button" className="text-left">
                    {region}
                  </button>
                ))}
              </div>
            </Card>

            <Button
              variant="outline"
              className="h-8 rounded-xl border-[#dad2c4] bg-[#f7f3ea] text-xs text-[#4f6558] hover:bg-[#ece5d8]"
            >
              Reset Semua Filter
            </Button>
          </aside>

          <div>
            <Card className="rounded-2xl border border-[#d9d0c1] bg-[#f9f6ef] px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#4f6658]">
                  <span className="font-semibold">Urutkan:</span>
                  {catalogSortOptions.map((option, index) => (
                    <Button
                      key={option}
                      type="button"
                      variant={index === 0 ? 'default' : 'outline'}
                      size="sm"
                      className={cn(
                        'rounded-md',
                        activeSort === option
                          ? 'bg-[#2f5f49] text-[#edf3eb] hover:bg-[#244938]'
                          : 'border-[#dad1c2] bg-[#f8f4eb] text-[#4f6658]',
                      )}
                      onClick={() => setActiveSort(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-[#607569]">
                  {filteredProducts.length} produk ditemukan
                </p>
              </div>
            </Card>

            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <Card
                  key={product.slug}
                  className="overflow-hidden rounded-2xl border border-[#ddd4c6] bg-[#f9f5ed] p-0"
                >
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
                          <span className="text-sm font-medium">
                            {product.category}
                          </span>
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
              ))}
            </div>

            <div className="mt-7 border-t border-[#d7cebf] pt-4">
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-md border-[#dad2c4] bg-[#f8f4eb] text-xs"
                >
                  ‹ Sebelumnya
                </Button>
                {[1, 2, 3, 4].map((page) => (
                  <Button
                    key={page}
                    variant={page === 1 ? 'default' : 'outline'}
                    size="icon-sm"
                    className={cn(
                      'rounded-md',
                      page === 1
                        ? 'bg-[#2f5f49] text-[#edf4ec] hover:bg-[#244938]'
                        : 'border-[#dad2c4] bg-[#f8f4eb] text-[#4e6558]',
                    )}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded-md border-[#dad2c4] bg-[#f8f4eb] text-[#4e6558]"
                >
                  …
                </Button>
                <Button
                  variant="outline"
                  size="icon-sm"
                  className="rounded-md border-[#dad2c4] bg-[#f8f4eb] text-[#4e6558]"
                >
                  20
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-md border-[#dad2c4] bg-[#f8f4eb] text-xs"
                >
                  Berikutnya ›
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
