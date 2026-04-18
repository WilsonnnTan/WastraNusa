import { Sidebar } from '@/components/admin/AdminSidebar';
import { BottomSection } from '@/components/admin/BottomSection';
import { DashboardHeader } from '@/components/admin/DashboardHeader';
import { StatCards } from '@/components/admin/StatCards';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#f5f2eb] font-sans text-stone-900">
      <Sidebar />

      <main className="flex-1 p-8 h-screen overflow-y-auto hidden-scrollbar">
        <div className="max-w-[1200px] mx-auto w-full">
          <DashboardHeader />
          <StatCards />
          <BottomSection />
        </div>
      </main>
    </div>
  );
}
