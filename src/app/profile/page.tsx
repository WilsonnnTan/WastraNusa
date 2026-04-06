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
import prisma from '@/lib/prisma';

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
  const { user: sessionUser, session } = await requireSession();

  const user = await prisma.user.findUnique({
    where: { id: sessionUser.id },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      image: true,
      createdAt: true,
      gender: true,
      birthDate: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });

  const profileUser = user ?? sessionUser;
  const totalOrders = user?._count.orders ?? 0;

  const joinedAt = formatDate(profileUser.createdAt, {
    month: 'long',
    year: 'numeric',
  });
  const birthDate = formatDate(profileUser.birthDate, {
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
        name={profileUser.name || '-'}
        email={profileUser.email || '-'}
        phoneNumber={profileUser.phoneNumber}
        joinedAt={joinedAt}
        image={profileUser.image}
        totalOrders={totalOrders}
      />

      {/* Main content area with sidebar */}
      <div className="bg-brand-bg-alt flex flex-1 flex-col items-stretch gap-6 px-4 py-4 md:flex-row md:items-start md:px-8 md:py-6">
        <Sidebar active="Profil Saya" />

        <div className="flex w-full flex-1 flex-col gap-5">
          <ProfileInfoSection
            fullName={profileUser.name || '-'}
            phoneNumber={profileUser.phoneNumber || '-'}
            email={profileUser.email || '-'}
            gender={mapGender(profileUser.gender)}
            birthDate={birthDate}
          />
          <SecuritySection lastLogin={lastLogin} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
