'use client';

import {
  type EncyclopediaArticle,
  EncyclopediaArticleCard,
  EncyclopediaFeaturedCard,
  EncyclopediaPagination,
  EncyclopediaSearch,
  EncyclopediaSidebar,
  EncyclopediaStats,
  EncyclopediaViewToggle,
  type ViewMode,
} from '@/components/ensiklopedia';
import {
  ENCYCLOPEDIA_ARTICLES,
  ENCYCLOPEDIA_STATS,
  ENCYCLOPEDIA_TOPICS,
  REGION_FILTERS,
} from '@/components/ensiklopedia/constants';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function EncyclopediaMain() {
  const router = useRouter();
  const [currentView, setCurrentView] = useState<ViewMode>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 12;

  // Get featured and standard articles
  const featuredArticle =
    ENCYCLOPEDIA_ARTICLES.find((article) => article.featured) ??
    ENCYCLOPEDIA_ARTICLES[0];
  const standardArticles = ENCYCLOPEDIA_ARTICLES.filter(
    (article) => !article.featured,
  );

  // Event handlers
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search logic here
  };

  const handleRegionClick = (region: string) => {
    console.log('Selected region:', region);
    // Implement region filter logic here
  };

  const handleTopicClick = (topic: string) => {
    console.log('Selected topic:', topic);
    // Implement topic filter logic here
  };

  const handleResetFilters = () => {
    console.log('Filters reset');
    // Implement reset logic here
  };

  const handleViewChange = (view: ViewMode) => {
    setCurrentView(view);
  };

  const handleArticleClick = (article: EncyclopediaArticle) => {
    router.push(`/ensiklopedia/${article.slug}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Implement pagination logic here
  };

  return (
    <main>
      {/* Header Section */}
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
            <h1 className="text-4xl font-bold tracking-tight text-[#2f5b49] mt-2">
              Ensiklopedia Budaya Wastra
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#4d6759]">
              Jelajahi kekayaan pengetahuan wastra tradisional Indonesia dari
              teknik tenun hingga makna filosofi setiap motif kain.
            </p>
          </div>

          <div className="w-full self-start lg:justify-self-end">
            <EncyclopediaSearch onSearch={handleSearch} />
          </div>
        </div>

        <EncyclopediaStats stats={ENCYCLOPEDIA_STATS} />
      </section>

      {/* Main Content Section */}
      <section className="border-y border-[#d3cbbd] bg-[#e9e4d9] py-6">
        <div className="mx-auto w-full max-w-[1320px] px-4 md:px-6 lg:px-8">
          <div className="grid gap-5 xl:grid-cols-[250px_minmax(0,1fr)]">
            {/* Sidebar */}
            <EncyclopediaSidebar
              regions={REGION_FILTERS}
              topics={ENCYCLOPEDIA_TOPICS}
              onRegionClick={handleRegionClick}
              onTopicClick={handleTopicClick}
              onResetFilters={handleResetFilters}
            />

            {/* Articles Grid */}
            <div>
              <EncyclopediaViewToggle
                currentView={currentView}
                articleCount={standardArticles.length + 1}
                onViewChange={handleViewChange}
              />

              {/* Featured Article */}
              <EncyclopediaFeaturedCard
                article={featuredArticle}
                onReadMore={handleArticleClick}
              />

              {/* Standard Articles Grid */}
              <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {standardArticles.map((article) => (
                  <EncyclopediaArticleCard
                    key={article.title}
                    article={article}
                    onClick={handleArticleClick}
                  />
                ))}
              </div>

              {/* Pagination */}
              <EncyclopediaPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
