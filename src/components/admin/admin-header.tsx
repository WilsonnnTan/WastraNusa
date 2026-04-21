'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { type DashboardData } from '@/types/dashboard';

export function AdminHeader({ data }: { data: DashboardData }) {
  return (
    <header className="flex flex-col gap-4 border-b border-[#e2d7c8] px-4 py-4 md:px-8 md:py-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <SidebarTrigger
            aria-label="Open sidebar"
            variant="outline"
            size="icon-sm"
            className="mt-0.5 border-[#d7cab7] bg-white/80 text-[#5e554a] shadow-none md:hidden"
          />
          <div className="flex flex-col gap-1">
            <h1 className="text-xl font-semibold tracking-tight text-[#2f2a23] md:text-2xl">
              {data.title}
            </h1>
            <p className="text-sm text-[#8f8577]">{data.subtitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
