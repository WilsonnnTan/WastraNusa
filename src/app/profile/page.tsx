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
import { requireSession } from '@/lib/auth/auth-page-helper';

function formatDate(
  value: string | Date | null | undefined,
  options: Intl.DateTimeFormatOptions,
) {
  if (!value) {
    return '-';
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('id-ID', options).format(date);
}

function mapGender(value: string | null | undefined) {
  if (value === 'male') {
    return 'Laki-laki';
  }

  if (value === 'female') {
    return 'Perempuan';
  }

  return '-';
}

export default async function Profile() {
  const { user, session } = await requireSession();

  const joinedAt = formatDate(user.createdAt, {
    month: 'long',
    year: 'numeric',
  });
  const birthDate = formatDate(user.birthDate, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  const lastLogin = formatDate(session.updatedAt ?? session.createdAt, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

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

      <ProfileCard
        name={user.name || '-'}
        email={user.email || '-'}
        phoneNumber={user.phoneNumber}
        joinedAt={joinedAt}
        image={user.image}
      />

      {/* Main content area with sidebar */}
      <div className="bg-brand-bg-alt flex flex-1 flex-col items-stretch gap-6 px-4 py-4 md:flex-row md:items-start md:px-8 md:py-6">
        <Sidebar active="Profil Saya" />

        <div className="flex w-full flex-1 flex-col gap-5">
          <ProfileInfoSection
            fullName={user.name || '-'}
            phoneNumber={user.phoneNumber || '-'}
            email={user.email || '-'}
            gender={mapGender(user.gender)}
            birthDate={birthDate}
          />
          <SecuritySection lastLogin={lastLogin} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
