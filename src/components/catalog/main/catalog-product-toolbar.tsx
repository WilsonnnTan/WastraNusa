import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ProductCatalogSortBy } from '@/types/product';

type CatalogProductToolbarProps = {
  activeSort: ProductCatalogSortBy;
  sortOptions: Array<{
    label: string;
    value: ProductCatalogSortBy;
  }>;
  productCount: number;
  onSortChange: (option: ProductCatalogSortBy) => void;
};

export function CatalogProductToolbar({
  activeSort,
  sortOptions,
  productCount,
  onSortChange,
}: CatalogProductToolbarProps) {
  return (
    <Card className="rounded-2xl border border-[#d9d0c1] bg-[#f9f6ef] px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#4f6658]">
          <span className="font-semibold">Urutkan:</span>
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              type="button"
              variant={activeSort === option.value ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'rounded-md',
                activeSort === option.value
                  ? 'bg-[#2f5f49] text-[#edf3eb] hover:bg-[#244938]'
                  : 'border-[#dad1c2] bg-[#f8f4eb] text-[#4f6658]',
              )}
              onClick={() => onSortChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <p className="text-sm text-[#607569]">
          {productCount} produk ditemukan
        </p>
      </div>
    </Card>
  );
}
