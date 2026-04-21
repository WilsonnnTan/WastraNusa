import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ChevronRight, Heart, Star } from 'lucide-react';

import { products, sortOptions } from './data';

export function ProductCatalog() {
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
            className="inline-flex items-center gap-1 rounded-xl border border-[#dfd8ca] bg-[#f6f3eb] px-4 py-2 text-sm font-semibold text-[#2f5f48] transition hover:border-[#89a38f]"
            type="button"
          >
            Lihat Semua
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-2.5 text-sm">
          <span className="text-[#5f7366]">Urutkan:</span>
          {sortOptions.map((option, index) => (
            <Button
              key={option}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                index === 0
                  ? 'border-[#2d5f48] bg-[#2d5f48] text-[#ecf1e8]'
                  : 'border-[#dad2c4] bg-[#f8f4ec] text-[#4f6658] hover:border-[#a9baa8]'
              }`}
              type="button"
            >
              {option}
            </Button>
          ))}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <Card
              key={product.name}
              className="group overflow-hidden rounded-2xl border border-[#e5ddcf] bg-[#fbf8f2] shadow-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_-20px_rgba(35,56,44,0.7)] active:translate-y-0 active:shadow-sm"
              style={{ animationDelay: `${index * 55}ms` }}
            >
              <div className="relative h-56 border-b border-dashed border-[#dfd5c2] bg-[radial-gradient(circle_at_50%_24%,rgba(253,247,236,0.9)_0%,rgba(233,224,209,0.75)_58%,rgba(225,214,196,0.9)_100%)]">
                <Badge
                  variant="outline"
                  className="absolute left-3 top-3 rounded-md border-[#e4dbc8] bg-[#f8f2e6] px-2 py-0.5 text-[11px] font-semibold text-[#b7a381]"
                >
                  {product.material}
                </Badge>

                {product.badge ? (
                  <Badge className="absolute left-3 top-10 rounded-md bg-[#2d5f48] px-2 py-1 text-[11px] font-bold text-[#e9f1e7]">
                    {product.badge}
                  </Badge>
                ) : null}

                <Button
                  className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full border border-[#e0d5bf] bg-white/85 text-[#8c8477] transition hover:text-[#2d5f48]"
                  type="button"
                >
                  <Heart className="h-3.5 w-3.5" />
                </Button>

                <div className="absolute inset-0 grid place-items-center">
                  <div className="flex flex-col items-center gap-3 text-[#9b8d74]">
                    <span className="h-4 w-4 rotate-45 border border-[#d4c6ab]" />
                    <span className="text-sm font-medium text-[#6f6658]">
                      {product.material}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5 p-4">
                <p className="text-xs text-[#b3aa98]">{product.city}</p>
                <h3 className="line-clamp-2 text-lg font-bold leading-tight text-[#335545]">
                  {product.name}
                </h3>

                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={`${product.name}-${starIndex}`}
                      className={`h-3.5 w-3.5 ${
                        starIndex < 4
                          ? 'fill-[#d9b868] text-[#d9b868]'
                          : 'fill-[#e6dcc7] text-[#e6dcc7]'
                      }`}
                    />
                  ))}
                  <span className="ml-1 text-xs font-medium text-[#6f756a]">
                    ({product.reviews})
                  </span>
                </div>

                <div className="mt-2 flex items-end justify-between">
                  <div>
                    <p className="text-2xl font-extrabold tracking-tight text-[#2d5f48]">
                      {product.price}
                    </p>
                    {product.oldPrice ? (
                      <p className="text-sm font-semibold text-[#8c887e] line-through">
                        {product.oldPrice}
                      </p>
                    ) : null}
                  </div>
                  <span className="text-sm font-semibold text-[#536d5f]">
                    Stok: {product.stock}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
