import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

export function KatalogMainHeader() {
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
      </div>
    </section>
  );
}
