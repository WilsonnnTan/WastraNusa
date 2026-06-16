import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { ProductCatalogSortBy } from '@/types/product';
import { Package } from 'lucide-react';

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
    <Card className="rounded-2xl border border-[#d9d0c1] bg-[#f9f6ef] px-3 py-3 sm:px-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Result count */}
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#2f5f49]/10 text-[#2f5f49]">
            <Package className="size-[18px]" />
          </span>
          <p className="text-sm text-[#5b6f63]">
            <span className="text-base font-bold text-[#2f5b49]">
              {productCount}
            </span>{' '}
            produk ditemukan
          </p>
        </div>

        {/* Sort control */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold tracking-wide text-[#7d8a7f] uppercase">
            Urutkan
          </span>
          <div className="flex flex-wrap items-center gap-1 rounded-xl border border-[#e2dac9] bg-[#efeadf] p-1">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                type="button"
                size="sm"
                variant="ghost"
                className={cn(
                  'h-7 rounded-lg px-3 text-xs font-semibold transition-all duration-200 active:scale-95',
                  activeSort === option.value
                    ? 'bg-[#2f5f49] text-[#edf3eb] shadow-sm hover:bg-[#2f5f49]/90 hover:text-[#edf3eb]'
                    : 'text-[#5d6f62] hover:bg-[#e3dccd] hover:text-[#3f5b4c]',
                )}
                onClick={() => onSortChange(option.value)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
