'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

const breadcrumbMap: Record<string, { label: string; href?: string }[]> = {
  '/profile': [{ label: 'Profil Saya' }],
  '/profile/artikel-disukai': [
    { label: 'Profil Saya', href: '/profile' },
    { label: 'Artikel Disukai' },
  ],
};

export default function ProfileBreadcrumb() {
  const pathname = usePathname();
  const items = breadcrumbMap[pathname] ?? [{ label: 'Profil Saya' }];

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-muted-foreground text-[13px]">
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="text-brand hover:text-brand-dark">
            Beranda
          </BreadcrumbLink>
        </BreadcrumbItem>

        {items.map((item, index) => (
          <BreadcrumbItem key={`${item.label}-${index}`} className="contents">
            <BreadcrumbSeparator />
            {item.href ? (
              <BreadcrumbLink
                href={item.href}
                className="text-brand hover:text-brand-dark"
              >
                {item.label}
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
