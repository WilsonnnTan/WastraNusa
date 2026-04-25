import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { ProductFilterOption } from '@/types/product';

export type PricePresetKey =
  | 'all'
  | 'lt-200k'
  | '200k-500k'
  | '500k-1m'
  | '1m-3m'
  | 'gt-3m';

const PRICE_RANGES: Array<{
  key: PricePresetKey;
  label: string;
}> = [
  { key: 'all', label: 'Semua Harga' },
  { key: 'lt-200k', label: '< Rp 200.000' },
  { key: '200k-500k', label: 'Rp 200.000 - 500.000' },
  { key: '500k-1m', label: 'Rp 500.000 - 1.000.000' },
  { key: '1m-3m', label: 'Rp 1.000.000 - 3.000.000' },
  { key: 'gt-3m', label: '> Rp 3.000.000' },
];

type KatalogFiltersSidebarProps = {
  totalProducts: number;
  categories: ProductFilterOption[];
  islands: ProductFilterOption[];
  provinces: ProductFilterOption[];
  genders: ProductFilterOption[];
  statuses: ProductFilterOption[];
  selectedCategory?: string;
  selectedIsland?: string;
  selectedProvince?: string;
  selectedGender?: string;
  selectedStatus?: string;
  inStockOnly: boolean;
  minPriceInput: string;
  maxPriceInput: string;
  selectedPricePreset: PricePresetKey;
  onCategoryChange: (value?: string) => void;
  onIslandChange: (value?: string) => void;
  onProvinceChange: (value?: string) => void;
  onGenderChange: (value?: string) => void;
  onStatusChange: (value?: string) => void;
  onInStockOnlyChange: (value: boolean) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onPricePresetChange: (value: PricePresetKey) => void;
  onResetFilters: () => void;
};

export function KatalogFiltersSidebar({
  totalProducts,
  categories,
  islands,
  provinces,
  genders,
  statuses,
  selectedCategory,
  selectedIsland,
  selectedProvince,
  selectedGender,
  selectedStatus,
  inStockOnly,
  minPriceInput,
  maxPriceInput,
  selectedPricePreset,
  onCategoryChange,
  onIslandChange,
  onProvinceChange,
  onGenderChange,
  onStatusChange,
  onInStockOnlyChange,
  onMinPriceChange,
  onMaxPriceChange,
  onPricePresetChange,
  onResetFilters,
}: KatalogFiltersSidebarProps) {
  return (
    <aside className="flex flex-col gap-3">
      <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
        <h3 className="text-sm font-bold">Kategori Produk</h3>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            className={cn(
              'flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition',
              !selectedCategory
                ? 'bg-[#2f5f49] text-[#edf4ec]'
                : 'text-[#4f6659] hover:bg-[#ece5d8]',
            )}
            onClick={() => onCategoryChange(undefined)}
          >
            <span>Semua Produk</span>
            <Badge variant="secondary" className="rounded-sm">
              {totalProducts}
            </Badge>
          </button>

          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              className={cn(
                'flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition',
                selectedCategory === category.name
                  ? 'bg-[#2f5f49] text-[#edf4ec]'
                  : 'text-[#4f6659] hover:bg-[#ece5d8]',
              )}
              onClick={() => onCategoryChange(category.name)}
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
          {PRICE_RANGES.map((item) => (
            <label key={item.key} className="inline-flex items-center gap-2">
              <input
                type="radio"
                name="price-range"
                checked={selectedPricePreset === item.key}
                onChange={() => onPricePresetChange(item.key)}
              />
              {item.label}
            </label>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Input
            value={minPriceInput}
            onChange={(event) => onMinPriceChange(event.target.value)}
            placeholder="Min"
            className="h-8 rounded-md border-[#ddd5c6] bg-[#ece6db] text-xs"
          />
          <Input
            value={maxPriceInput}
            onChange={(event) => onMaxPriceChange(event.target.value)}
            placeholder="Max"
            className="h-8 rounded-md border-[#ddd5c6] bg-[#ece6db] text-xs"
          />
        </div>
      </Card>

      <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
        <h3 className="text-sm font-bold">Daerah</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={!selectedIsland ? 'default' : 'outline'}
            size="xs"
            className={cn(
              'rounded-md',
              !selectedIsland
                ? 'bg-[#2f5f49] text-[#edf3eb] hover:bg-[#244938]'
                : 'border-[#dad1c2] bg-[#f8f4eb] text-[#4f6659]',
            )}
            onClick={() => onIslandChange(undefined)}
          >
            Semua Pulau
          </Button>
          {islands.map((island) => (
            <Button
              key={island.name}
              type="button"
              variant={selectedIsland === island.name ? 'default' : 'outline'}
              size="xs"
              className={cn(
                'rounded-md',
                selectedIsland === island.name
                  ? 'bg-[#2f5f49] text-[#edf3eb] hover:bg-[#244938]'
                  : 'border-[#dad1c2] bg-[#f8f4eb] text-[#4f6659]',
              )}
              onClick={() => onIslandChange(island.name)}
            >
              {island.name} ({island.count})
            </Button>
          ))}
        </div>

        <div className="mt-1 flex flex-wrap gap-2">
          <Button
            type="button"
            variant={!selectedProvince ? 'default' : 'outline'}
            size="xs"
            className={cn(
              'rounded-md',
              !selectedProvince
                ? 'bg-[#2f5f49] text-[#edf3eb] hover:bg-[#244938]'
                : 'border-[#dad1c2] bg-[#f8f4eb] text-[#4f6659]',
            )}
            onClick={() => onProvinceChange(undefined)}
          >
            Semua Provinsi
          </Button>
          {provinces.slice(0, 8).map((province) => (
            <Button
              key={province.name}
              type="button"
              variant={
                selectedProvince === province.name ? 'default' : 'outline'
              }
              size="xs"
              className={cn(
                'rounded-md',
                selectedProvince === province.name
                  ? 'bg-[#2f5f49] text-[#edf3eb] hover:bg-[#244938]'
                  : 'border-[#dad1c2] bg-[#f8f4eb] text-[#4f6659]',
              )}
              onClick={() => onProvinceChange(province.name)}
            >
              {province.name}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
        <h3 className="text-sm font-bold">Filter Tambahan</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="xs"
            variant={!selectedGender ? 'default' : 'outline'}
            className={cn(
              'rounded-md',
              !selectedGender
                ? 'bg-[#2f5f49] text-[#edf3eb] hover:bg-[#244938]'
                : 'border-[#dad1c2] bg-[#f8f4eb] text-[#4f6659]',
            )}
            onClick={() => onGenderChange(undefined)}
          >
            Semua Gender
          </Button>
          {genders.map((gender) => (
            <Button
              key={gender.name}
              type="button"
              size="xs"
              variant={selectedGender === gender.name ? 'default' : 'outline'}
              className={cn(
                'rounded-md',
                selectedGender === gender.name
                  ? 'bg-[#2f5f49] text-[#edf3eb] hover:bg-[#244938]'
                  : 'border-[#dad1c2] bg-[#f8f4eb] text-[#4f6659]',
              )}
              onClick={() => onGenderChange(gender.name)}
            >
              {gender.name} ({gender.count})
            </Button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="xs"
            variant={!selectedStatus ? 'default' : 'outline'}
            className={cn(
              'rounded-md',
              !selectedStatus
                ? 'bg-[#2f5f49] text-[#edf3eb] hover:bg-[#244938]'
                : 'border-[#dad1c2] bg-[#f8f4eb] text-[#4f6659]',
            )}
            onClick={() => onStatusChange(undefined)}
          >
            Semua Status
          </Button>
          {statuses.map((status) => (
            <Button
              key={status.name}
              type="button"
              size="xs"
              variant={selectedStatus === status.name ? 'default' : 'outline'}
              className={cn(
                'rounded-md',
                selectedStatus === status.name
                  ? 'bg-[#2f5f49] text-[#edf3eb] hover:bg-[#244938]'
                  : 'border-[#dad1c2] bg-[#f8f4eb] text-[#4f6659]',
              )}
              onClick={() => onStatusChange(status.name)}
            >
              {status.name} ({status.count})
            </Button>
          ))}
        </div>

        <label className="inline-flex items-center gap-2 text-sm text-[#52685b]">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(event) => onInStockOnlyChange(event.target.checked)}
          />
          Hanya tampilkan produk yang tersedia
        </label>
      </Card>

      <Button
        variant="outline"
        className="h-8 rounded-xl border-[#dad2c4] bg-[#f7f3ea] text-xs text-[#4f6558] hover:bg-[#ece5d8]"
        onClick={onResetFilters}
      >
        Reset Semua Filter
      </Button>
    </aside>
  );
}
