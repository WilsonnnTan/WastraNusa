import Footer from '@/components/profile/Footer';
import Header from '@/components/profile/Header';
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

export default function Profile() {
  return (
    <div className="bg-brand-bg min-h-screen font-sans flex flex-col">
      <Header />

      <div className="px-4 md:px-8 py-3 bg-brand-bg-alt">
        <Breadcrumb>
          <BreadcrumbList className="text-[13px] text-muted-foreground">
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

      <ProfileCard />

      {/* Main content area with sidebar */}
      <div className="flex flex-col md:flex-row gap-6 items-stretch md:items-start px-4 md:px-8 py-4 md:py-6 bg-brand-bg-alt flex-1">
        <Sidebar active="Profil Saya" />

        <div className="flex-1 flex flex-col gap-5 w-full">
          <ProfileInfoSection />
          <SecuritySection />
        </div>
      </div>

      <Footer />
    </div>
  );
}
