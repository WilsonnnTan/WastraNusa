import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { catalogSortOptions } from '../data';

type KatalogProductToolbarProps = {
  activeSort: string;
  productCount: number;
  onSortChange: (option: string) => void;
};

export function KatalogProductToolbar({
  activeSort,
  productCount,
  onSortChange,
}: KatalogProductToolbarProps) {
  return (
    <Card className="rounded-2xl border border-[#d9d0c1] bg-[#f9f6ef] px-4 py-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-[#4f6658]">
          <span className="font-semibold">Urutkan:</span>
          {catalogSortOptions.map((option) => (
            <Button
              key={option}
              type="button"
              variant={activeSort === option ? 'default' : 'outline'}
              size="sm"
              className={cn(
                'rounded-md',
                activeSort === option
                  ? 'bg-[#2f5f49] text-[#edf3eb] hover:bg-[#244938]'
                  : 'border-[#dad1c2] bg-[#f8f4eb] text-[#4f6658]',
              )}
              onClick={() => onSortChange(option)}
            >
              {option}
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
