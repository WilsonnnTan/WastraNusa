import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import ProfileCard from '@/components/profile/ProfileCard';
import Sidebar from '@/components/profile/Sidebar';
import { LikedArticlesMain } from '@/components/profile/artikel-disukai/liked-articles-main';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { requireUser } from '@/lib/auth/auth-page-helper';

export default async function LikedArticlesPage() {
  await requireUser();

  return (
    <div className="bg-brand-bg flex min-h-screen flex-col font-sans">
      <Header homeHref="/" />

      <div className="bg-brand-bg-alt px-4 py-3 md:px-8">
        <Breadcrumb>
          <BreadcrumbList className="text-muted-foreground text-[13px]">
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/"
                className="text-brand hover:text-brand-dark"
              >
                Beranda
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/profile"
                className="text-brand hover:text-brand-dark"
              >
                Profil Saya
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Artikel Disukai</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <ProfileCard />

      <div className="bg-brand-bg-alt flex flex-1 flex-col items-stretch gap-6 px-4 py-4 md:flex-row md:items-start md:px-8 md:py-6">
        <Sidebar active="Artikel Disukai" />

        <div className="flex w-full flex-1 flex-col gap-5">
          {/* Wrapper putih dan judul kita pindahkan ke dalam LikedArticlesMain */}
          <LikedArticlesMain />
        </div>
      </div>

      <Footer />
    </div>
  );
}
