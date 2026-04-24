import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

import { catalogRegions, catalogSidebarCategories } from '../data';

const PRICE_RANGES = [
  'Semua Harga',
  '< Rp 200.000',
  'Rp 200.000 - 500.000',
  'Rp 500.000 - 1.000.000',
  'Rp 1.000.000 - 3.000.000',
  '> Rp 3.000.000',
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Custom'];

export function KatalogFiltersSidebar() {
  return (
    <aside className="flex flex-col gap-3">
      <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
        <h3 className="text-sm font-bold">Kategori</h3>
        <div className="flex flex-col gap-1.5">
          {catalogSidebarCategories.map((category, index) => (
            <button
              key={category.name}
              type="button"
              className={cn(
                'flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition',
                index === 0
                  ? 'bg-[#2f5f49] text-[#edf4ec]'
                  : 'text-[#4f6659] hover:bg-[#ece5d8]',
              )}
            >
              <span>{category.name}</span>
              <Badge variant="secondary" className="rounded-sm">
                {category.count}
              </Badge>
            </button>
          ))}
        </div>
      </Card>

      <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
        <h3 className="text-sm font-bold">Rentang Harga</h3>
        <div className="flex flex-col gap-2 text-sm text-[#52685b]">
          {PRICE_RANGES.map((item, index) => (
            <label key={item} className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="price-range"
                defaultChecked={index === 0}
              />
              {item}
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input
            placeholder="Min"
            className="h-8 rounded-md border-[#ddd5c6] bg-[#ece6db] text-xs"
          />
          <Input
            placeholder="Max"
            className="h-8 rounded-md border-[#ddd5c6] bg-[#ece6db] text-xs"
          />
        </div>
      </Card>

      <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
        <h3 className="text-sm font-bold">Ukuran</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <Button
              key={size}
              type="button"
              variant="outline"
              size="xs"
              className="rounded-md border-[#dad1c2] bg-[#f8f4eb] text-[#4f6659]"
            >
              {size}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
        <h3 className="text-sm font-bold">Asal Daerah</h3>
        <div className="flex flex-col gap-2 text-sm text-[#4f6659]">
          {catalogRegions.map((region) => (
            <button key={region} type="button" className="text-left">
              {region}
            </button>
          ))}
        </div>
      </Card>

      <Button
        variant="outline"
        className="h-8 rounded-xl border-[#dad2c4] bg-[#f7f3ea] text-xs text-[#4f6558] hover:bg-[#ece5d8]"
      >
        Reset Semua Filter
      </Button>
    </aside>
  );
}
