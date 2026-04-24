import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function KatalogPagination() {
  return (
    <div className="mt-7 border-t border-[#d7cebf] pt-4">
      <div className="flex flex-wrap items-center justify-center gap-1.5">
        <Button
          variant="outline"
          size="sm"
          className="rounded-md border-[#dad2c4] bg-[#f8f4eb] text-xs"
        >
          Sebelumnya
        </Button>
        {[1, 2, 3, 4].map((page) => (
          <Button
            key={page}
            variant={page === 1 ? 'default' : 'outline'}
            size="icon-sm"
            className={cn(
              'rounded-md',
              page === 1
                ? 'bg-[#2f5f49] text-[#edf4ec] hover:bg-[#244938]'
                : 'border-[#dad2c4] bg-[#f8f4eb] text-[#4e6558]',
            )}
          >
            {page}
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-md border-[#dad2c4] bg-[#f8f4eb] text-[#4e6558]"
        >
          �
        </Button>
        <Button
          variant="outline"
          size="icon-sm"
          className="rounded-md border-[#dad2c4] bg-[#f8f4eb] text-[#4e6558]"
        >
          20
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-md border-[#dad2c4] bg-[#f8f4eb] text-xs"
        >
          Berikutnya �
        </Button>
      </div>
    </div>
  );
}
