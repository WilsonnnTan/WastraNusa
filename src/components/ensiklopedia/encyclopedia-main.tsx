'use client';

import {
  EncyclopediaArticleCard,
  EncyclopediaFeaturedCard,
  EncyclopediaPagination,
  EncyclopediaSidebar,
  EncyclopediaStats,
} from '@/components/ensiklopedia';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Skeleton } from '@/components/ui/skeleton';
import { useArticles } from '@/hooks/use-article';
import type { Stat } from '@/types/encyclopedia';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ARTICLES_PER_PAGE = 10;

interface EncyclopediaMainProps {
  initialIsland?: string;
  initialTopic?: string;
}

function EncyclopediaStatsSkeleton() {
  return (
    <div className="mt-7 grid grid-cols-3 gap-4 border-y border-[#d8d0c1] py-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton className="h-10 w-20 bg-[#e6dfd1]" />
          <Skeleton className="h-4 w-28 bg-[#e6dfd1]" />
        </div>
      ))}
    </div>
  );
}

function EncyclopediaSidebarSkeleton() {
  return (
    <aside className="flex flex-col gap-3">
      <div className="rounded-2xl border border-[#d4cbbc] bg-[#f7f3ea] p-4">
        <Skeleton className="mb-3 h-5 w-28 bg-[#e6dfd1]" />
        <div className="flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-9 w-full bg-[#e6dfd1]" />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-[#d4cbbc] bg-[#f7f3ea] p-4">
        <Skeleton className="mb-3 h-5 w-20 bg-[#e6dfd1]" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-7 w-24 bg-[#e6dfd1]" />
          ))}
        </div>
      </div>

      <Skeleton className="h-10 w-full rounded-xl bg-[#e6dfd1]" />
    </aside>
  );
}

function EncyclopediaFeaturedSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#d5ccbc] bg-[#faf8f2]">
      <div className="grid md:grid-cols-[320px_minmax(0,1fr)]">
        <Skeleton className="h-[220px] w-full rounded-none bg-[#ece1d0]" />
        <div className="p-5">
          <div className="mb-3 flex gap-2">
            <Skeleton className="h-6 w-20 bg-[#e6dfd1]" />
            <Skeleton className="h-6 w-24 bg-[#e6dfd1]" />
          </div>
          <Skeleton className="h-9 w-4/5 bg-[#e6dfd1]" />
          <Skeleton className="mt-2 h-9 w-3/5 bg-[#e6dfd1]" />
          <Skeleton className="mt-3 h-4 w-full bg-[#e6dfd1]" />
          <Skeleton className="mt-2 h-4 w-5/6 bg-[#e6dfd1]" />
          <Skeleton className="mt-4 h-10 w-40 rounded-xl bg-[#e6dfd1]" />
        </div>
      </div>
    </div>
  );
}

function EncyclopediaArticleGridSkeleton() {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-[#d8cfbf] bg-[#fbf8f2]"
        >
          <Skeleton className="h-44 w-full rounded-none bg-[#ece1d0]" />
          <div className="p-4">
            <div className="flex gap-1">
              <Skeleton className="h-5 w-20 bg-[#e6dfd1]" />
              <Skeleton className="h-5 w-20 bg-[#e6dfd1]" />
            </div>
            <Skeleton className="mt-2 h-8 w-11/12 bg-[#e6dfd1]" />
            <Skeleton className="mt-2 h-8 w-3/4 bg-[#e6dfd1]" />
            <Skeleton className="mt-3 h-4 w-full bg-[#e6dfd1]" />
            <Skeleton className="mt-2 h-4 w-5/6 bg-[#e6dfd1]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function EncyclopediaMain({
  initialIsland,
  initialTopic,
}: EncyclopediaMainProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIsland, setSelectedIsland] = useState(initialIsland);
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const { data, error, isPending } = useArticles(
    currentPage,
    ARTICLES_PER_PAGE,
    {
      island: selectedIsland,
      topic: selectedTopic,
    },
  );
  const articles = data?.items ?? [];
  const islands = data?.meta.islands ?? [];
  const topics = data?.meta.topics ?? [];
  const totalPages = data?.meta.totalPages ?? 0;
  const showLoadingSkeleton = isPending && !data;
  const stats: Stat[] = [
    {
      value: String(
        data?.meta.stats?.totalArticles ?? data?.meta.totalItems ?? 0,
      ),
      label: 'Total Artikel',
    },
    {
      value: String(
        data?.meta.stats?.totalIslands ?? Math.max(islands.length - 1, 0),
      ),
      label: 'Pulau Tercakup',
    },
    {
      value: String(data?.meta.stats?.totalWastraTypes ?? 0),
      label: 'Jenis Wastra',
    },
  ];

  const featuredArticle =
    currentPage === 1 && !selectedIsland && !selectedTopic
      ? (articles.find((article) => article.featured) ?? articles[0])
      : undefined;
  const standardArticles = featuredArticle
    ? articles.filter((article) => article.slug !== featuredArticle.slug)
    : articles;

  const pushFilterQuery = (island?: string, topic?: string) => {
    const searchParams = new URLSearchParams();

    if (island) {
      searchParams.set('island', island);
    }

    if (topic) {
      searchParams.set('topic', topic);
    }

    const query = searchParams.toString();
    router.push(query ? `/ensiklopedia?${query}` : '/ensiklopedia');
  };

  const handleIslandClick = (island: string) => {
    const nextIsland = island === 'Semua Pulau' ? undefined : island;
    setCurrentPage(1);
    setSelectedIsland(nextIsland);
    pushFilterQuery(nextIsland, selectedTopic);
  };

  const handleTopicClick = (topic: string) => {
    const nextTopic = selectedTopic === topic ? undefined : topic;
    setCurrentPage(1);
    setSelectedTopic(nextTopic);
    pushFilterQuery(selectedIsland, nextTopic);
  };

  const handleResetFilters = () => {
    setCurrentPage(1);
    setSelectedIsland(undefined);
    setSelectedTopic(undefined);
    pushFilterQuery(undefined, undefined);
  };

  const handleArticleClick = (article: (typeof articles)[number]) => {
    router.push(`/ensiklopedia/${article.slug}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <main>
      <section className="mx-auto w-full max-w-[1320px] px-4 pb-4 pt-7 md:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <Breadcrumb className="mb-2">
              <BreadcrumbList className="text-[#6e8276] text-sm font-medium">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="hover:text-[#2f5b49]">
                    Beranda
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-[#2f5b49]">
                    Ensiklopedia Budaya
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#2f5b49]">
              Ensiklopedia Budaya Wastra
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#4d6759]">
              Jelajahi kekayaan pengetahuan wastra tradisional Indonesia dari
              teknik tenun hingga makna filosofi setiap motif kain.
            </p>
          </div>
        </div>

        {showLoadingSkeleton ? (
          <EncyclopediaStatsSkeleton />
        ) : (
          <EncyclopediaStats stats={stats} />
        )}
      </section>

      <section className="border-y border-[#d3cbbd] bg-[#e9e4d9] py-6">
        <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-5 xl:grid-cols-[250px_minmax(0,1fr)]">
            {showLoadingSkeleton ? (
              <EncyclopediaSidebarSkeleton />
            ) : (
              <EncyclopediaSidebar
                islands={islands}
                topics={topics}
                selectedTopic={selectedTopic}
                onIslandClick={handleIslandClick}
                onTopicClick={handleTopicClick}
                onResetFilters={handleResetFilters}
              />
            )}

            <div>
              {showLoadingSkeleton ? (
                <Skeleton className="mb-3 h-5 w-44 bg-[#e6dfd1]" />
              ) : (
                <p className="mb-3 text-sm font-semibold text-[#4e6659]">
                  Menampilkan {data?.meta.totalItems ?? articles.length} artikel
                </p>
              )}

              {isPending && !showLoadingSkeleton ? (
                <div className="mt-4 rounded-2xl border border-[#d8cfbf] bg-[#fbf8f2] p-6 text-sm text-[#4f6658]">
                  Memuat artikel ensiklopedia...
                </div>
              ) : null}

              {!isPending && error ? (
                <div className="mt-4 rounded-2xl border border-[#e2c9bb] bg-[#fbf1eb] p-6 text-sm text-[#8b5e4a]">
                  Gagal memuat artikel. Silakan coba lagi.
                </div>
              ) : null}

              {showLoadingSkeleton ? <EncyclopediaFeaturedSkeleton /> : null}

              {!isPending && !error && featuredArticle ? (
                <EncyclopediaFeaturedCard
                  article={featuredArticle}
                  onReadMore={handleArticleClick}
                />
              ) : null}

              {showLoadingSkeleton ? <EncyclopediaArticleGridSkeleton /> : null}

              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {!isPending &&
                  !error &&
                  standardArticles.map((article) => (
                    <EncyclopediaArticleCard
                      key={article.slug}
                      article={article}
                      onClick={handleArticleClick}
                    />
                  ))}

                {!isPending &&
                  !error &&
                  !featuredArticle &&
                  standardArticles.length === 0 && (
                    <div className="rounded-2xl border border-[#d8cfbf] bg-[#fbf8f2] p-6 text-sm text-[#4f6658] sm:col-span-2 xl:col-span-3">
                      Belum ada artikel ensiklopedia yang tersedia.
                    </div>
                  )}
              </div>

              {totalPages > 1 ? (
                <EncyclopediaPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
