import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { EncyclopediaArticleDetail } from '@/types/encyclopedia';
import { BookOpenText } from 'lucide-react';
import Link from 'next/link';

type CatalogDetailEncyclopediaProps = {
  encyclopediaFacts: readonly [string, string][];
  category: string;
  linkedArticle?: EncyclopediaArticleDetail;
  isLinkedArticlePending?: boolean;
};

export function CatalogDetailEncyclopedia({
  encyclopediaFacts,
  category,
  linkedArticle,
  isLinkedArticlePending = false,
}: CatalogDetailEncyclopediaProps) {
  const articleHref = linkedArticle?.slug
    ? `/encyclopedia/${linkedArticle.slug}`
    : '/encyclopedia';
  const articleTitle =
    linkedArticle?.title ?? 'Artikel ensiklopedia belum tersedia';
  const articleExcerpt =
    linkedArticle?.excerpt ??
    'Artikel terkait produk ini belum tersedia saat ini. Silakan lihat daftar ensiklopedia untuk membaca artikel budaya lainnya.';

  return (
    <aside className="flex flex-col gap-3">
      <Card className="overflow-hidden rounded-2xl border border-[#ddd3c3] bg-[#f6f2e9] p-0">
        <div className="flex items-center justify-between bg-[#2f5f49] px-4 py-3 text-[#edf4ec]">
          <h3 className="inline-flex items-center gap-1.5 text-sm font-bold">
            <BookOpenText className="size-4" />
            Ensiklopedia Budaya
          </h3>
        </div>
        <div className="flex flex-col gap-3 p-3">
          <p className="text-sm text-[#9b9386]">Terkait Produk Ini</p>
          <Card className="items-center rounded-xl border border-[#ddd4c5] bg-[#ece3d5] py-5">
            <span className="size-4 rotate-45 border border-[#cebda2]" />
            <p className="text-sm font-semibold text-[#6d665c]">{category}</p>
          </Card>
          <h4 className="text-2xl font-bold leading-tight text-[#2f5b49]">
            {isLinkedArticlePending ? 'Memuat artikel...' : articleTitle}
          </h4>
          <p className="text-sm leading-6 text-[#4d6056]">
            {isLinkedArticlePending
              ? 'Sedang memuat ringkasan artikel terkait produk ini.'
              : articleExcerpt}
          </p>
          <div className="rounded-xl border border-[#ddd4c5] bg-[#f1ebdf] p-3">
            <div className="grid gap-2 text-xs text-[#455b50]">
              {encyclopediaFacts.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[110px_minmax(0,1fr)] gap-2"
                >
                  <span className="text-[#6e7a70]">{label}</span>
                  <span className="font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </div>
          {isLinkedArticlePending || !linkedArticle ? (
            <Button
              disabled
              className="rounded-xl bg-[#cc7543] text-white hover:bg-[#b56439]"
            >
              Baca Artikel Lengkap
            </Button>
          ) : (
            <Button
              asChild
              className="rounded-xl bg-[#cc7543] text-white hover:bg-[#b56439]"
            >
              <Link href={articleHref}>Baca Artikel Lengkap</Link>
            </Button>
          )}
        </div>
      </Card>
    </aside>
  );
}
