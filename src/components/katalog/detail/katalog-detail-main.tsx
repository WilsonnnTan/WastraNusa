'use client';

import { useMemo, useState } from 'react';

import { catalogProducts } from '../data';
import { KatalogDetailBreadcrumb } from './katalog-detail-breadcrumb';
import { type DetailTab, KatalogDetailContent } from './katalog-detail-content';
import { KatalogDetailEncyclopedia } from './katalog-detail-encyclopedia';
import { KatalogDetailGallery } from './katalog-detail-gallery';
import { KatalogDetailProductSummary } from './katalog-detail-product-summary';

export function KatalogDetailMain({ slug }: { slug: string }) {
  const product = useMemo(
    () => catalogProducts.find((item) => item.slug === slug),
    [slug],
  );
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Coklat Sogan');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<DetailTab>('deskripsi');

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-[1320px] px-4 pb-10 pt-6 md:px-6 lg:px-8">
        <p className="text-sm text-[#8b5e4a]">Produk tidak ditemukan.</p>
      </main>
    );
  }

  const safeQuantity = Math.min(Math.max(quantity, 1), product.stock);
  const encyclopediaFacts: readonly [string, string][] = [
    ['Ditetapkan UNESCO', '2 Oktober 2009'],
    ['Asal Tertua', 'Kerajaan Mataram, abad ke-12'],
    ['Pusat Produksi', 'Solo, Yogyakarta, Pekalongan'],
  ];

  return (
    <main className="border-t border-[#ddd4c5]">
      <section className="mx-auto w-full max-w-[1320px] px-4 pb-8 pt-6 md:px-6 lg:px-8">
        <KatalogDetailBreadcrumb
          category={product.category}
          name={product.name}
        />

        <div className="mt-4 grid gap-5 xl:grid-cols-[minmax(0,430px)_minmax(0,1fr)]">
          <KatalogDetailGallery category={product.category} />
          <KatalogDetailProductSummary
            product={product}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            safeQuantity={safeQuantity}
            onColorChange={setSelectedColor}
            onSizeChange={setSelectedSize}
            onDecreaseQuantity={() =>
              setQuantity((value) => Math.max(1, value - 1))
            }
            onIncreaseQuantity={() =>
              setQuantity((value) => Math.min(product.stock, value + 1))
            }
          />
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1320px] gap-4 px-4 pb-10 md:px-6 lg:px-8 xl:grid-cols-[minmax(0,1fr)_320px]">
        <KatalogDetailContent
          activeTab={activeTab}
          product={product}
          onTabChange={setActiveTab}
        />
        <KatalogDetailEncyclopedia encyclopediaFacts={encyclopediaFacts} />
      </section>
    </main>
  );
}
