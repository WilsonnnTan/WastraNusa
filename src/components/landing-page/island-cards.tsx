'use client';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useArticles } from '@/hooks/use-article';
import type { EncyclopediaArticle } from '@/types/encyclopedia';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';

function getIslandCardBackground(index: number) {
  const hue = 28 + ((index * 23) % 36);
  const start = `hsl(${hue} 38% 70%)`;
  const mid = `hsl(${hue - 6} 20% 47%)`;
  const end = `hsl(${hue - 12} 10% 27%)`;

  return `radial-gradient(circle at 80% 15%, rgba(255, 235, 190, 0.35) 0%, rgba(0, 0, 0, 0) 42%), linear-gradient(165deg, ${start} 0%, ${mid} 52%, ${end} 100%)`;
}

export function IslandCards() {
  const { data, error, isPending } = useArticles(1, 50);
  const islands =
    data?.meta.islands.filter((island) => island.name !== 'Semua Pulau') ?? [];

  const islandImages = useMemo(() => {
    const imagesByIsland = new Map<string, string>();
    const articles: EncyclopediaArticle[] = data?.items ?? [];

    for (const article of articles) {
      const island = article.island ?? undefined;
      const imageURL = article.imageURL ?? undefined;

      if (!island || !imageURL || imagesByIsland.has(island)) continue;
      const isNextImageSupported =
        imageURL.startsWith('/') || imageURL.startsWith('https://');

      if (isNextImageSupported) {
        imagesByIsland.set(island, imageURL);
      }
    }

    return imagesByIsland;
  }, [data?.items]);

  return (
    <section className="mx-auto mt-16 w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
      <Badge
        variant="outline"
        className="inline-flex rounded-lg border-[#e4dac8] bg-[#f3ecdd] px-3 py-1 text-xs font-semibold text-[#b09c80]"
      >
        Jelajahi Pulau
      </Badge>

      <h3 className="mt-3 text-4xl font-bold tracking-tight text-[#2d5f48]">
        Wastra dari Seluruh Nusantara
      </h3>

      <div className="mt-6">
        {isPending ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, index) => (
              <Card
                key={index}
                className="min-w-[240px] overflow-hidden rounded-2xl border border-[#ddd4c6] bg-[#d8cfbf]/30"
              >
                <div className="min-h-[188px] animate-pulse p-4" />
              </Card>
            ))}
          </div>
        ) : null}

        {!isPending && error ? (
          <div className="rounded-2xl border border-[#e2c9bb] bg-[#fbf1eb] p-6 text-sm text-[#8b5e4a]">
            Gagal memuat pulau ensiklopedia.
          </div>
        ) : null}

        {!isPending && !error ? (
          <Carousel opts={{ align: 'start', loop: true }}>
            <CarouselPrevious className="left-3 z-10 border-[#ddd4c6] bg-white text-[#2d5f48] hover:bg-[#f3ecdd]" />
            <CarouselNext className="right-3 z-10 border-[#ddd4c6] bg-white text-[#2d5f48] hover:bg-[#f3ecdd]" />
            <CarouselContent className="py-0">
              {islands.map((island, index) => (
                <CarouselItem
                  key={island.name}
                  className="basis-[85%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/5"
                >
                  <Link
                    href={`/encyclopedia?island=${encodeURIComponent(island.name)}`}
                  >
                    <Card className="group relative overflow-hidden rounded-2xl border border-[#ddd4c6]">
                      {islandImages.get(island.name) ? (
                        <Image
                          src={islandImages.get(island.name)!}
                          alt={island.name}
                          fill
                          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 transition duration-500 group-hover:scale-105"
                          style={{
                            backgroundImage: getIslandCardBackground(index),
                          }}
                        />
                      )}
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.78)_45%,rgba(0,0,0,0.35)_75%,rgba(0,0,0,0)_100%)]" />

                      <div className="relative flex min-h-[188px] flex-col justify-end p-4 text-[#f6f2e8]">
                        <span className="mb-2 inline-flex h-4 w-4 rotate-45 border border-[#e9dec8]" />
                        <p className="text-sm text-[#e5dcca]">
                          Eksplorasi Pulau
                        </p>
                        <p className="mt-2 text-2xl font-bold leading-tight">
                          {island.name}
                        </p>
                        <p className="text-sm text-[#d3ccb8]">
                          {island.count} artikel
                        </p>
                      </div>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : null}
      </div>
    </section>
  );
}
