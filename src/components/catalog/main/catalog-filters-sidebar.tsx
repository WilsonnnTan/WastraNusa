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

function capitalizeFirstLetter(value: string): string {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatStatusLabel(value: string): string {
  const statusLabels: Record<string, string> = {
    active: 'Aktif',
    inactive: 'Tidak Aktif',
    out_of_stock: 'Stok Habis',
  };

  if (statusLabels[value]) {
    return statusLabels[value];
  }

  return value
    .split('_')
    .map((word) => capitalizeFirstLetter(word))
    .join(' ');
}

type CatalogFiltersSidebarProps = {
  totalProducts: number;
  categories: ProductFilterOption[];
  islands: ProductFilterOption[];
  sizes: ProductFilterOption[];
  genders: ProductFilterOption[];
  statuses: ProductFilterOption[];
  selectedCategory?: string;
  selectedIsland?: string;
  selectedSize?: string;
  selectedGender?: string;
  selectedStatus?: string;
  inStockOnly: boolean;
  minPriceInput: string;
  maxPriceInput: string;
  selectedPricePreset: PricePresetKey;
  onCategoryChange: (value?: string) => void;
  onIslandChange: (value?: string) => void;
  onSizeChange: (value?: string) => void;
  onGenderChange: (value?: string) => void;
  onStatusChange: (value?: string) => void;
  onInStockOnlyChange: (value: boolean) => void;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  onPricePresetChange: (value: PricePresetKey) => void;
  onResetFilters: () => void;
};

export function CatalogFiltersSidebar({
  totalProducts,
  categories,
  islands,
  sizes,
  genders,
  statuses,
  selectedCategory,
  selectedIsland,
  selectedSize,
  selectedGender,
  selectedStatus,
  inStockOnly,
  minPriceInput,
  maxPriceInput,
  selectedPricePreset,
  onCategoryChange,
  onIslandChange,
  onSizeChange,
  onGenderChange,
  onStatusChange,
  onInStockOnlyChange,
  onMinPriceChange,
  onMaxPriceChange,
  onPricePresetChange,
  onResetFilters,
}: CatalogFiltersSidebarProps) {
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
            <Badge
              variant="secondary"
              className="rounded-none border-0 bg-transparent p-0 text-current shadow-none"
            >
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
              <Badge
                variant="secondary"
                className="rounded-none border-0 bg-transparent p-0 text-current shadow-none"
              >
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
        <h3 className="text-sm font-bold">Ukuran</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={!selectedSize ? 'default' : 'outline'}
            size="xs"
            className={cn(
              'rounded-md',
              !selectedSize
                ? 'bg-[#2f5f49] text-[#edf3eb] hover:bg-[#244938]'
                : 'border-[#dad1c2] bg-[#f8f4eb] text-[#4f6659]',
            )}
            onClick={() => onSizeChange(undefined)}
          >
            Semua Ukuran
          </Button>
          {sizes.map((size) => (
            <Button
              key={size.name}
              type="button"
              variant={selectedSize === size.name ? 'default' : 'outline'}
              size="xs"
              className={cn(
                'rounded-md',
                selectedSize === size.name
                  ? 'bg-[#2f5f49] text-[#edf3eb] hover:bg-[#244938]'
                  : 'border-[#dad1c2] bg-[#f8f4eb] text-[#4f6659]',
              )}
              onClick={() => onSizeChange(size.name)}
            >
              {size.name} ({size.count})
            </Button>
          ))}
        </div>
      </Card>

      <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
        <h3 className="text-sm font-bold">Asal Daerah</h3>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            className={cn(
              'flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition',
              !selectedIsland
                ? 'bg-[#2f5f49] text-[#edf4ec]'
                : 'text-[#4f6659] hover:bg-[#ece5d8]',
            )}
            onClick={() => onIslandChange(undefined)}
          >
            <span>Semua Pulau</span>
            <Badge
              variant="secondary"
              className="rounded-none border-0 bg-transparent p-0 text-current shadow-none"
            >
              {islands.reduce((total, island) => total + island.count, 0)}
            </Badge>
          </button>

          {islands.map((island) => (
            <button
              key={island.name}
              type="button"
              className={cn(
                'flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition',
                selectedIsland === island.name
                  ? 'bg-[#2f5f49] text-[#edf4ec]'
                  : 'text-[#4f6659] hover:bg-[#ece5d8]',
              )}
              onClick={() => onIslandChange(island.name)}
            >
              <span>{island.name}</span>
              <Badge
                variant="secondary"
                className="rounded-none border-0 bg-transparent p-0 text-current shadow-none"
              >
                {island.count}
              </Badge>
            </button>
          ))}
        </div>
      </Card>

      <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
        <h3 className="text-sm font-bold">Gender</h3>
        <div className="flex flex-col gap-1.5">
          <button
            type="button"
            className={cn(
              'flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition',
              !selectedGender
                ? 'bg-[#2f5f49] text-[#edf4ec]'
                : 'text-[#4f6659] hover:bg-[#ece5d8]',
            )}
            onClick={() => onGenderChange(undefined)}
          >
            <span>Semua Gender</span>
            <Badge
              variant="secondary"
              className="rounded-none border-0 bg-transparent p-0 text-current shadow-none"
            >
              {genders.reduce((total, gender) => total + gender.count, 0)}
            </Badge>
          </button>

          {genders.map((gender) => (
            <button
              key={gender.name}
              type="button"
              className={cn(
                'flex items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition',
                selectedGender === gender.name
                  ? 'bg-[#2f5f49] text-[#edf4ec]'
                  : 'text-[#4f6659] hover:bg-[#ece5d8]',
              )}
              onClick={() => onGenderChange(gender.name)}
            >
              <span>{capitalizeFirstLetter(gender.name)}</span>
              <Badge
                variant="secondary"
                className="rounded-none border-0 bg-transparent p-0 text-current shadow-none"
              >
                {gender.count}
              </Badge>
            </button>
          ))}
        </div>
      </Card>

      <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
        <h3 className="text-sm font-bold">Status Produk</h3>
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
              {formatStatusLabel(status.name)} ({status.count})
            </Button>
          ))}
        </div>
      </Card>

      <Card className="gap-3 rounded-2xl border border-[#dad1c3] bg-[#f6f2e9] p-3 text-[#3f5b4c]">
        <h3 className="text-sm font-bold">Ketersediaan</h3>
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
