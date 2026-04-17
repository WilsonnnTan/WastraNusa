'use client';

import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type DashboardData } from '@/types/dashboard';
import { Download } from 'lucide-react';

function escapeCsvValue(value: string | number) {
  const safeValue = String(value).replace(/"/g, '""');
  return /[",\n]/.test(safeValue) ? `"${safeValue}"` : safeValue;
}

function buildDashboardCsv(data: DashboardData) {
  const rows: Array<Array<string | number>> = [
    ['Dashboard', data.title],
    ['Subtitle', data.subtitle],
    [],
    ['Summary'],
    ['Title', 'Value', 'Change', 'Description', 'Footnote'],
    ...data.summary.map((item) => [
      item.title,
      item.value,
      item.changeLabel,
      item.description,
      item.footnote,
    ]),
    [],
    ['Stock Alerts'],
    ['Product', 'Category', 'Status'],
    ...data.stockAlerts.map((item) => [
      item.name,
      item.category,
      item.stockLabel,
    ]),
    [],
    ['Popular Articles'],
    ['Rank', 'Title', 'Category', 'Region', 'Views', 'Read Time (min)'],
    ...data.popularArticles.map((item) => [
      item.rank,
      item.title,
      item.category,
      item.region,
      item.views,
      item.readTimeMinutes,
    ]),
  ];

  return rows
    .map((row) => row.map((value) => escapeCsvValue(value ?? '')).join(','))
    .join('\n');
}

function downloadDashboardCsv(data: DashboardData) {
  const blob = new Blob([buildDashboardCsv(data)], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `${data.exportFileName}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}

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

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => downloadDashboardCsv(data)}
          className="border-[#dccfbf] bg-white/85 text-[#645948] shadow-none hover:bg-[#f9f4ec]"
        >
          <Download data-icon="inline-start" />
          Export
        </Button>
      </div>
    </header>
  );
}
