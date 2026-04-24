import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type KatalogMainHeaderProps = {
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
};

export function KatalogMainHeader({
  searchQuery,
  onSearchQueryChange,
}: KatalogMainHeaderProps) {
  return (
    <section className="mx-auto w-full max-w-[1320px] px-4 pb-5 pt-6 md:px-6 lg:px-8">
      <Breadcrumb>
        <BreadcrumbList className="text-[#66786d] text-sm font-medium">
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="hover:text-[#2f5b49]">
              Beranda
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-[#2f5b49]">
              Katalog Produk
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-[#2f5b49]">
            Katalog Produk Wastra
          </h1>
          <p className="mt-1 text-[#4f6458]">
            12 produk autentik dari 34 provinsi
          </p>
        </div>

        <div className="relative w-full max-w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b2aa9b]" />
          <Input
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Cari produk..."
            className="h-10 rounded-xl border-[#ddd5c6] bg-[#ece6db] pl-10 text-[#4e6257] placeholder:text-[#aea593]"
          />
        </div>
      </div>
    </section>
  );
}
