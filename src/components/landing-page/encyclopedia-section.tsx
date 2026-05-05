'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useArticles } from '@/hooks/use-article';
import { ChevronRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export interface HomepageArticlePreview {
  slug: string;
  category: string;
  title: string;
  meta: string;
  imageURL?: string | null;
}

export function EncyclopediaSection() {
  const { data, error, isPending } = useArticles(1, 3);
  const islandFilters =
    data?.meta.islands.filter((island) => island.name !== 'Semua Pulau') ?? [];
  const popularTags = islandFilters.slice(0, 5);
  const popularTopics = data?.meta.topics.slice(0, 5) ?? [];
  const latestArticles: HomepageArticlePreview[] =
    data?.items.map((article) => ({
      slug: article.slug,
      category: article.motifLabel,
      title: article.title,
      meta: `${article.region} - ${article.readMinutes ?? 0} mnt`,
      imageURL: article.imageURL,
    })) ?? [];

  return (
    <section className="mx-auto mt-14 w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl bg-[#2f5e48] text-[#edf3e8] shadow-[0_30px_50px_-35px_rgba(15,41,28,0.85)]">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="p-6 md:p-10">
            <Badge
              variant="outline"
              className="inline-flex rounded-lg border-white/20 bg-white/7 px-3 py-1 text-xs font-semibold text-[#d8e2d4]"
            >
              Ensiklopedia Budaya
            </Badge>

            <h3 className="mt-4 text-4xl font-bold tracking-tight text-[#f2f8ee]">
              Jelajahi Kekayaan Wastra Nusantara
            </h3>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#bed0c4]">
              Pakaian adat adalah busana tradisional yang mencerminkan identitas
              dan budaya suatu daerah. Indonesia memiliki ratusan jenis pakaian
              adat dari berbagai suku dan provinsi, masing-masing dengan
              keunikan motif, bahan, dan makna simbolis yang mendalam.
            </p>

            <div className="mt-7 flex max-w-xl items-center overflow-hidden rounded-xl border border-white/15 bg-[#254d3a]">
              <Search className="ml-4 h-4 w-4 text-[#b7cdbf]" />
              <Input
                className="h-12 w-full border-0 bg-transparent px-3 text-sm text-[#ebf3e7] placeholder:text-[#95b19f] focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Cari artikel budaya, motif, atau provinsi..."
                type="text"
              />
              <Button
                asChild
                className="inline-flex h-12 items-center bg-[#d5c8b3] px-6 text-sm font-bold text-[#2d5f48] transition hover:bg-[#e6dccc]"
              >
                <Link href="/encyclopedia">Cari</Link>
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#b1c4b5]">Filter pulau:</span>
              {popularTags.map((tag) => (
                <Button
                  key={tag.name}
                  asChild
                  className="rounded-full border border-white/18 bg-white/8 px-3 py-1.5 font-semibold text-[#d2dfd2] transition hover:bg-white/14"
                >
                  <Link
                    href={`/encyclopedia?island=${encodeURIComponent(tag.name)}`}
                  >
                    {tag.name}
                  </Link>
                </Button>
              ))}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#b1c4b5]">Filter topik:</span>
              {popularTopics.map((topic) => (
                <Button
                  key={topic}
                  asChild
                  className="rounded-full border border-white/18 bg-white/8 px-3 py-1.5 font-semibold text-[#d2dfd2] transition hover:bg-white/14"
                >
                  <Link
                    href={`/encyclopedia?topic=${encodeURIComponent(topic)}`}
                  >
                    {topic}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <aside className="border-t border-white/12 bg-[#2a5541] p-6 md:p-8 lg:border-l lg:border-t-0">
            <h4 className="text-2xl font-bold tracking-tight text-[#f0f7eb]">
              Artikel Terkini
            </h4>

            <div className="mt-6 space-y-3">
              {isPending
                ? Array.from({ length: 3 }).map((_, index) => (
                    <Card
                      key={index}
                      className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/7 p-3.5"
                    >
                      <div className="h-14 w-14 shrink-0 rounded-lg border border-white/10 bg-white/10" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-3/4 rounded bg-white/10" />
                        <div className="h-3 w-1/2 rounded bg-white/10" />
                        <div className="h-5 w-16 rounded bg-white/10" />
                      </div>
                    </Card>
                  ))
                : null}

              {!isPending && error ? (
                <Card className="rounded-xl border border-white/6 bg-white/7 p-4 text-sm text-[#dbe5d8]">
                  Gagal memuat artikel terkini.
                </Card>
              ) : null}

              {!isPending && !error && latestArticles.length > 0
                ? latestArticles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/encyclopedia/${article.slug}`}
                      className="block"
                    >
                      <Card className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/7 p-3.5 transition hover:bg-white/11">
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-[radial-gradient(circle_at_35%_35%,rgba(248,234,210,.18)_0%,rgba(214,183,145,.2)_55%,rgba(138,110,77,.3)_100%)]">
                          {article.imageURL ? (
                            <Image
                              src={article.imageURL}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="grid h-full w-full place-items-center">
                              <span className="h-4 w-4 rotate-45 border border-white/55" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-semibold leading-snug text-[#e9f2e5]">
                            {article.title}
                          </p>
                          <p className="mt-1 text-xs text-[#adc0b3]">
                            {article.meta}
                          </p>
                          <Badge
                            variant="secondary"
                            className="mt-2 inline-flex rounded-md bg-white/12 px-2 py-0.5 text-[11px] font-semibold text-[#dbe5d8]"
                          >
                            {article.category}
                          </Badge>
                        </div>
                      </Card>
                    </Link>
                  ))
                : null}

              {!isPending && !error && latestArticles.length === 0 ? (
                <Card className="rounded-xl border border-white/6 bg-white/7 p-4 text-sm text-[#dbe5d8]">
                  Artikel ensiklopedia belum tersedia.
                </Card>
              ) : null}
            </div>

            <Button
              asChild
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#d4e1d2] transition hover:text-white"
            >
              <Link href="/encyclopedia">
                Lihat semua artikel
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </aside>
        </div>
      </div>
    </section>
  );
}
