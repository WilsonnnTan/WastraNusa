'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useArticles } from '@/hooks/use-article';
import Link from 'next/link';

function getRegionCardBackground(index: number) {
  const hue = 28 + ((index * 23) % 36);
  const start = `hsl(${hue} 38% 70%)`;
  const mid = `hsl(${hue - 6} 20% 47%)`;
  const end = `hsl(${hue - 12} 10% 27%)`;

  return `radial-gradient(circle at 80% 15%, rgba(255, 235, 190, 0.35) 0%, rgba(0, 0, 0, 0) 42%), linear-gradient(165deg, ${start} 0%, ${mid} 52%, ${end} 100%)`;
}

export function RegionCards() {
  const { data, error, isPending } = useArticles(1, 1);
  const regions =
    data?.meta.regions.filter((region) => region.name !== 'Semua Wilayah') ??
    [];

  return (
    <section className="mx-auto mt-16 w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
      <Badge
        variant="outline"
        className="inline-flex rounded-lg border-[#e4dac8] bg-[#f3ecdd] px-3 py-1 text-xs font-semibold text-[#b09c80]"
      >
        Jelajahi Wilayah
      </Badge>

      <h3 className="mt-3 text-4xl font-bold tracking-tight text-[#2d5f48]">
        Wastra dari Seluruh Nusantara
      </h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {isPending
          ? Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className="overflow-hidden rounded-2xl border border-[#ddd4c6] bg-[#d8cfbf]/30"
              >
                <div className="min-h-[188px] animate-pulse p-4" />
              </Card>
            ))
          : null}

        {!isPending && error ? (
          <div className="rounded-2xl border border-[#e2c9bb] bg-[#fbf1eb] p-6 text-sm text-[#8b5e4a] sm:col-span-2 lg:col-span-3 xl:col-span-5">
            Gagal memuat wilayah ensiklopedia.
          </div>
        ) : null}

        {!isPending && !error
          ? regions.map((region, index) => (
              <Link
                key={region.name}
                href={`/ensiklopedia?region=${encodeURIComponent(region.name)}`}
              >
                <Card className="group relative overflow-hidden rounded-2xl border border-[#ddd4c6]">
                  <div
                    className="absolute inset-0 transition duration-500 group-hover:scale-105"
                    style={{
                      backgroundImage: getRegionCardBackground(index),
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                  <div className="relative flex min-h-[188px] flex-col justify-end p-4 text-[#f6f2e8]">
                    <span className="mb-2 inline-flex h-4 w-4 rotate-45 border border-[#e9dec8]" />
                    <p className="text-sm text-[#e5dcca]">Eksplorasi Wilayah</p>
                    <p className="mt-2 text-2xl font-bold leading-tight">
                      {region.name}
                    </p>
                    <p className="text-sm text-[#d3ccb8]">
                      {region.count} artikel
                    </p>
                  </div>
                </Card>
              </Link>
            ))
          : null}
      </div>
    </section>
  );
}
