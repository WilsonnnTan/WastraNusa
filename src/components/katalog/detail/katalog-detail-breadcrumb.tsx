import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type KatalogDetailBreadcrumbProps = {
  category: string;
  name: string;
};

export function KatalogDetailBreadcrumb({
  category,
  name,
}: KatalogDetailBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-[#66786d] text-sm font-medium">
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="hover:text-[#2f5b49]">
            Beranda
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/katalog" className="hover:text-[#2f5b49]">
            Katalog
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-[#2f5b49]">{category}</BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="max-w-[280px] truncate text-[#2f5b49]">
            {name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
