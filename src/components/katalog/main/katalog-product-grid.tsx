import type { CatalogProduct } from '../data';
import { KatalogProductCard } from './katalog-product-card';

type KatalogProductGridProps = {
  products: CatalogProduct[];
};

export function KatalogProductGrid({ products }: KatalogProductGridProps) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <KatalogProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}
