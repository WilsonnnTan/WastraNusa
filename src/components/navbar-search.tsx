'use client';

import { Input } from '@/components/ui/input';
import { useArticles } from '@/hooks/use-article';
import { useProductCatalog } from '@/hooks/use-product-catalog';
import {
  ARTICLE_SEARCH_LIMIT,
  PRODUCT_SEARCH_LIMIT,
  normalizeQuery,
  searchArticles,
  searchProducts,
} from '@/lib/search-filters';
import { cn } from '@/lib/utils';
import { BookOpenText, Search, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

const MAX_SUGGESTIONS_PER_GROUP = 5;

type NavbarSearchProps = {
  className?: string;
  placeholder?: string;
  /** Called after navigating away, e.g. to close a mobile menu. */
  onSubmitted?: () => void;
};

export function NavbarSearch({
  className,
  placeholder = 'Cari produk atau artikel ensiklopedia...',
  onSubmitted,
}: NavbarSearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: productData } = useProductCatalog(1, PRODUCT_SEARCH_LIMIT);
  const { data: articleData } = useArticles(1, ARTICLE_SEARCH_LIMIT);

  const normalizedQuery = normalizeQuery(query);

  const products = useMemo(
    () =>
      searchProducts(productData?.items ?? [], query).slice(
        0,
        MAX_SUGGESTIONS_PER_GROUP,
      ),
    [productData?.items, query],
  );

  const articles = useMemo(
    () =>
      searchArticles(articleData?.items ?? [], query).slice(
        0,
        MAX_SUGGESTIONS_PER_GROUP,
      ),
    [articleData?.items, query],
  );

  const hasResults = products.length > 0 || articles.length > 0;
  const showDropdown = isOpen && normalizedQuery.length > 0;

  // Close dropdown when clicking outside.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goToSearchPage = () => {
    if (!normalizedQuery) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    setIsOpen(false);
    onSubmitted?.();
  };

  const navigateTo = (href: string) => {
    router.push(href);
    setIsOpen(false);
    onSubmitted?.();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    goToSearchPage();
  };

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      <form
        onSubmit={handleSubmit}
        role="search"
        className="flex w-full items-center overflow-hidden rounded-xl border border-[#d8cfbf] bg-[#f3ede2] transition-all duration-300 focus-within:border-[#2f5b49]/40 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(47,91,73,0.08)]"
      >
        <Search className="ml-3.5 h-4 w-4 shrink-0 text-[#9f9a8d]" />
        <Input
          className="h-10 w-full border-0 bg-transparent px-3 text-sm text-[#445f50] placeholder:text-[#b2ad9f] focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder={placeholder}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          aria-label="Cari produk atau artikel"
        />
        <button
          type="submit"
          className="m-1 shrink-0 rounded-lg bg-[#2f5f49] px-4 py-1.5 text-xs font-semibold text-[#eef3ea] transition hover:bg-[#274e3c] active:scale-95"
        >
          Cari
        </button>
      </form>

      {showDropdown ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[28rem] overflow-y-auto rounded-xl border border-[#ddd3c2] bg-white text-left shadow-lg">
          {hasResults ? (
            <>
              {products.length > 0 ? (
                <div>
                  <p className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[#9a9289]">
                    Produk
                  </p>
                  {products.map((product) => (
                    <button
                      key={`product-${product.slug}`}
                      type="button"
                      onClick={() => navigateTo(`/catalog/${product.slug}`)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-[#f9f7f2]"
                    >
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[#e5dccf] bg-[#ece1d0]">
                        {product.imageURL ? (
                          <Image
                            src={product.imageURL}
                            alt={product.name}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <div className="grid h-full w-full place-items-center text-[#b59f80]">
                            <ShoppingBag className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-medium text-[#2f5b49]">
                          {product.name}
                        </p>
                        <p className="line-clamp-1 text-xs text-[#a8b5ab]">
                          {product.clothingType} • {product.province}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : null}

              {articles.length > 0 ? (
                <div className="border-t border-[#f0ebe2]">
                  <p className="px-4 pt-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[#9a9289]">
                    Ensiklopedia
                  </p>
                  {articles.map((article) => (
                    <button
                      key={`article-${article.slug}`}
                      type="button"
                      onClick={() =>
                        navigateTo(`/encyclopedia/${article.slug}`)
                      }
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left transition hover:bg-[#f9f7f2]"
                    >
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg border border-[#e5dccf] bg-[#ece1d0]">
                        {article.imageURL ? (
                          <Image
                            src={article.imageURL}
                            alt={article.title}
                            fill
                            className="object-cover"
                            sizes="40px"
                          />
                        ) : (
                          <div className="grid h-full w-full place-items-center text-[#b59f80]">
                            <BookOpenText className="h-4 w-4" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-1 text-sm font-medium text-[#2f5b49]">
                          {article.title}
                        </p>
                        <p className="line-clamp-1 text-xs text-[#a8b5ab]">
                          {article.region} • {article.topic}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : null}

              <button
                type="button"
                onClick={goToSearchPage}
                className="block w-full border-t border-[#f0ebe2] px-4 py-2.5 text-center text-xs font-semibold text-[#2f5f49] transition hover:bg-[#f9f7f2]"
              >
                Lihat semua hasil untuk &ldquo;{query.trim()}&rdquo;
              </button>
            </>
          ) : (
            <p className="px-4 py-6 text-center text-sm text-[#7a8d7f]">
              Tidak ada hasil untuk &ldquo;{query.trim()}&rdquo;
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}
