'use client';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import ProfileCard from '@/components/profile/ProfileCard';
import ProfileInfoSection from '@/components/profile/ProfileInfoSection';
import SecuritySection from '@/components/profile/SecuritySection';
import Sidebar from '@/components/profile/Sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { authClient } from '@/lib/auth/auth-client';

export default function Profile() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Format data lastLogin
  const lastLogin = session?.session?.createdAt
    ? new Date(session.session.createdAt).toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '-';

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
              <BreadcrumbPage>Profil Saya</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <ProfileCard user={user} />

      {/* Main content area with sidebar */}
      <div className="bg-brand-bg-alt flex flex-1 flex-col items-stretch gap-6 px-4 py-4 md:flex-row md:items-start md:px-8 md:py-6">
        <Sidebar active="Profil Saya" />

        <div className="flex w-full flex-1 flex-col gap-5">
          <ProfileInfoSection user={user} />
          <SecuritySection lastLogin={lastLogin} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
