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
import { useArticles } from '@/hooks/use-article';
import type { Stat } from '@/types/encyclopedia';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ARTICLES_PER_PAGE = 10;

interface EncyclopediaMainProps {
  initialRegion?: string;
  initialTopic?: string;
}

export function EncyclopediaMain({
  initialRegion,
  initialTopic,
}: EncyclopediaMainProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const { data, error, isPending } = useArticles(
    currentPage,
    ARTICLES_PER_PAGE,
    {
      region: selectedRegion,
      topic: selectedTopic,
    },
  );
  const articles = data?.items ?? [];
  const regions = data?.meta.regions ?? [];
  const topics = data?.meta.topics ?? [];
  const totalPages = data?.meta.totalPages ?? 0;
  const stats: Stat[] = [
    {
      value: String(
        data?.meta.stats?.totalArticles ?? data?.meta.totalItems ?? 0,
      ),
      label: 'Total Artikel',
    },
    {
      value: String(
        data?.meta.stats?.totalRegions ?? Math.max(regions.length - 1, 0),
      ),
      label: 'Provinsi Tercakup',
    },
    {
      value: String(data?.meta.stats?.totalWastraTypes ?? 0),
      label: 'Jenis Wastra',
    },
  ];

  const featuredArticle =
    currentPage === 1 && !selectedRegion && !selectedTopic
      ? (articles.find((article) => article.featured) ?? articles[0])
      : undefined;
  const standardArticles = featuredArticle
    ? articles.filter((article) => article.slug !== featuredArticle.slug)
    : articles;

  const pushFilterQuery = (region?: string, topic?: string) => {
    const searchParams = new URLSearchParams();

    if (region) {
      searchParams.set('region', region);
    }

    if (topic) {
      searchParams.set('topic', topic);
    }

    const query = searchParams.toString();
    router.push(query ? `/ensiklopedia?${query}` : '/ensiklopedia');
  };

  const handleRegionClick = (region: string) => {
    const nextRegion = region === 'Semua Wilayah' ? undefined : region;
    setCurrentPage(1);
    setSelectedRegion(nextRegion);
    pushFilterQuery(nextRegion, selectedTopic);
  };

  const handleTopicClick = (topic: string) => {
    const nextTopic = selectedTopic === topic ? undefined : topic;
    setCurrentPage(1);
    setSelectedTopic(nextTopic);
    pushFilterQuery(selectedRegion, nextTopic);
  };

  const handleResetFilters = () => {
    setCurrentPage(1);
    setSelectedRegion(undefined);
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

        <EncyclopediaStats stats={stats} />
      </section>

      <section className="border-y border-[#d3cbbd] bg-[#e9e4d9] py-6">
        <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-5 xl:grid-cols-[250px_minmax(0,1fr)]">
            <EncyclopediaSidebar
              regions={regions}
              topics={topics}
              selectedTopic={selectedTopic}
              onRegionClick={handleRegionClick}
              onTopicClick={handleTopicClick}
              onResetFilters={handleResetFilters}
            />

            <div>
              <p className="mb-3 text-sm font-semibold text-[#4e6659]">
                Menampilkan {data?.meta.totalItems ?? articles.length} artikel
              </p>

              {isPending ? (
                <div className="mt-4 rounded-2xl border border-[#d8cfbf] bg-[#fbf8f2] p-6 text-sm text-[#4f6658]">
                  Memuat artikel ensiklopedia...
                </div>
              ) : null}

              {!isPending && error ? (
                <div className="mt-4 rounded-2xl border border-[#e2c9bb] bg-[#fbf1eb] p-6 text-sm text-[#8b5e4a]">
                  Gagal memuat artikel. Silakan coba lagi.
                </div>
              ) : null}

              {!isPending && !error && featuredArticle ? (
                <EncyclopediaFeaturedCard
                  article={featuredArticle}
                  onReadMore={handleArticleClick}
                />
              ) : null}

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
