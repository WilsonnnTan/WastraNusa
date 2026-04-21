import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import ProfileBreadcrumb from '@/components/profile/ProfileBreadcrumb';
import ProfileCard from '@/components/profile/ProfileCard';
import Sidebar from '@/components/profile/Sidebar';

export default async function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-brand-bg flex min-h-screen flex-col font-sans">
      <Header homeHref="/" />

      <div className="bg-brand-bg-alt px-4 py-3 md:px-8">
        <ProfileBreadcrumb />
      </div>

      <ProfileCard />

      <div className="bg-brand-bg-alt flex flex-1 flex-col items-stretch gap-6 px-4 py-4 md:flex-row md:items-start md:px-8 md:py-6">
        <Sidebar />

        <div className="flex w-full flex-1 flex-col gap-5">{children}</div>
      </div>

      <Footer />
    </div>
  );
}
