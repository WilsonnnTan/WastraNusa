import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronRight, Search } from 'lucide-react';
import Link from 'next/link';

import { latestArticles, popularSearchTags } from './data';

export function EncyclopediaSection() {
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
              Batik is a dyeing technique using wax resist. The term is also
              used to describe patterned textiles created with that technique.
              Batik is made by drawing or stamping wax on a cloth ...
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
                <Link href="/ensiklopedia">Cari</Link>
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-[#b1c4b5]">Populer:</span>
              {popularSearchTags.map((tag) => (
                <Button
                  key={tag}
                  className="rounded-full border border-white/18 bg-white/8 px-3 py-1.5 font-semibold text-[#d2dfd2] transition hover:bg-white/14"
                  type="button"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          <aside className="border-t border-white/12 bg-[#2a5541] p-6 md:p-8 lg:border-l lg:border-t-0">
            <h4 className="text-2xl font-bold tracking-tight text-[#f0f7eb]">
              Artikel Terkini
            </h4>

            <div className="mt-6 space-y-3">
              {latestArticles.map((article) => (
                <Card
                  key={article.title}
                  className="flex items-start gap-3 rounded-xl border border-white/6 bg-white/7 p-3.5 transition hover:bg-white/11"
                >
                  <div
                    className={`${article.thumbClass} grid h-14 w-14 shrink-0 place-items-center rounded-lg border border-white/10`}
                  >
                    <span className="h-4 w-4 rotate-45 border border-white/55" />
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
              ))}
            </div>

            <Button
              asChild
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#d4e1d2] transition hover:text-white"
            >
              <Link href="/ensiklopedia">
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
