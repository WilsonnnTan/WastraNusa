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
              className="rounded-full border border-[#d5ccc0] bg-white px-4 py-1.5 text-sm font-medium text-[#4f6658] transition hover:border-[#a9a390] hover:text-[#ffffff] hover:bg-[#fbf9f6]"
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
