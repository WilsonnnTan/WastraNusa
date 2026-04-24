'use client';

import { useState } from 'react';

import { catalogProducts, catalogSortOptions } from '../data';
import { KatalogFiltersSidebar } from './katalog-filters-sidebar';
import { KatalogMainHeader } from './katalog-main-header';
import { KatalogPagination } from './katalog-pagination';
import { KatalogProductGrid } from './katalog-product-grid';
import { KatalogProductToolbar } from './katalog-product-toolbar';

export function KatalogMain() {
  const [activeSort, setActiveSort] = useState(catalogSortOptions[0]);

  return (
    <main className="border-t border-[#dbd4c7]">
      <KatalogMainHeader />

      <section className="border-y border-[#d4ccbe] bg-[#e8e3d9] py-6">
        <div className="mx-auto grid w-full max-w-[1320px] gap-4 px-4 md:px-6 lg:px-8 xl:grid-cols-[240px_minmax(0,1fr)]">
          <KatalogFiltersSidebar />

          <div>
            <KatalogProductToolbar
              activeSort={activeSort}
              productCount={catalogProducts.length}
              onSortChange={setActiveSort}
            />
            <KatalogProductGrid products={catalogProducts} />
            <KatalogPagination />
          </div>
        </div>
      </section>
    </main>
  );
}
