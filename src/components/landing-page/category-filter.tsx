'use client';

import { Button } from '@/components/ui/button';
import { useCategories } from '@/hooks/use-categories';
import Link from 'next/link';

export function CategoryFilter() {
  const { data: categories = [], isPending } = useCategories();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-sm font-medium text-[#4f6658]">Kategori :</span>
      <div className="flex flex-wrap gap-2">
        {isPending ? (
          <div className="h-8 w-32 animate-pulse rounded-full bg-[#e8dfd4]" />
        ) : (
          categories.map((category) => (
            <Button
              key={category}
              asChild
              variant="outline"
              className="rounded-full border border-[#4a3a2a]/[14.5%] bg-[#4a3a2a]/[6.3%] px-4 py-1.5 text-sm font-medium text-[#2f4f3f] transition-all hover:-translate-y-0.5 hover:border-[#2f4f3f] hover:bg-[#2f4f3f] hover:text-white hover:shadow-sm active:scale-95"
            >
              <Link href={`/catalog?topic=${encodeURIComponent(category)}`}>
                {category}
              </Link>
            </Button>
          ))
        )}
      </div>
    </div>
  );
}
