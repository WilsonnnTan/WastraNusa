import { Button } from '@/components/ui/button';

import { categories } from './data';

export function CategoryFilters() {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-2.5 text-sm">
      <span className="mr-1 text-[#617567]">Kategori:</span>
      {categories.map((category) => (
        <Button
          key={category}
          className="rounded-full border border-[#d7d1c3] bg-[#f3efe6] px-3.5 py-1.5 text-xs font-semibold text-[#627668] transition hover:border-[#95aa9a] hover:text-[#2d5f48]"
          type="button"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
