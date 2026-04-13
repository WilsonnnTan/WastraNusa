import { BookmarkX } from 'lucide-react';

import { EncyclopediaArticleCard } from './encyclopedia-article-card';
import type { EncyclopediaArticle } from './types';

interface LikedArticlesListProps {
  articles: EncyclopediaArticle[];
}

export function LikedArticlesList({ articles }: LikedArticlesListProps) {
  // Tampilan jika data kosong
  if (articles.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-[#d8cfbf] bg-[#fbf8f2]/50 text-[#726759]">
        <BookmarkX className="mb-3 h-10 w-10 text-[#ccbda4]" />
        <p className="text-sm font-medium">
          Kamu belum menyukai artikel apapun.
        </p>
        <p className="text-xs text-[#a29582] mt-1">
          Jelajahi ensiklopedia dan temukan wastra favoritmu!
        </p>
      </div>
    );
  }

  // LOGIKA DINAMIS: Batasi maksimal hanya 5 artikel yang dirender
  const displayArticles = articles.slice(0, 5);

  // TAMPILAN GRID:
  // sm:grid-cols-2 (Tablet) -> 2 kolom
  // lg:grid-cols-3 (Laptop) -> 3 kolom
  // xl:grid-cols-4 (Layar Besar) -> 4 kolom (Untuk test permintaanmu)
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {displayArticles.map((article) => (
        <EncyclopediaArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
}
