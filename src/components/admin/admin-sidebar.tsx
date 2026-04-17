'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth/auth-client';
import { cn } from '@/lib/utils';
import {
  type DashboardData,
  type DashboardNavItem,
  type StockAlertSeverity,
} from '@/types/dashboard';
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Package2,
  ShoppingBag,
  TriangleAlert,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const navigationIcons = {
  Dashboard: LayoutDashboard,
  Artikel: BookOpen,
  'Produk & Inventori': Package2,
  Pesanan: ShoppingBag,
} as const;

function countStockAlerts(data: DashboardData, severity: StockAlertSeverity) {
  return data.stockAlerts.filter((item) => item.severity === severity).length;
}

function SidebarNavigationItem({ item }: { item: DashboardNavItem }) {
  const Icon = navigationIcons[item.title as keyof typeof navigationIcons];
  const buttonClassName = cn(
    'h-10 rounded-xl px-3 text-[#dce6dd] hover:bg-white/8 hover:text-white',
    'data-[active=true]:bg-[#4b6f5f] data-[active=true]:text-white',
  );

  return (
    <SidebarMenuItem>
      {item.href && !item.disabled ? (
        <SidebarMenuButton
          asChild
          isActive={item.active}
          className={buttonClassName}
        >
          <Link href={item.href}>
            <Icon />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      ) : (
        <SidebarMenuButton disabled className={buttonClassName}>
          <Icon />
          <span>{item.title}</span>
        </SidebarMenuButton>
      )}
      {item.badge ? (
        <SidebarMenuBadge className="right-2 rounded-full bg-white/10 px-1.5 text-[11px] text-[#f5e9d2] peer-data-[active=true]/menu-button:bg-[#e47d42] peer-data-[active=true]/menu-button:text-white">
          {item.badge}
        </SidebarMenuBadge>
      ) : null}
    </SidebarMenuItem>
  );
}

export function AdminSidebar({ data }: { data: DashboardData }) {
  const router = useRouter();
  const outOfStockCount = countStockAlerts(data, 'out');
  const lowStockCount = countStockAlerts(data, 'low');

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  };

  return (
    <Sidebar collapsible="offcanvas" className="border-r-0">
      <SidebarHeader className="gap-4 px-4 py-5">
        <div className="flex items-center gap-3 rounded-2xl bg-white/8 px-3 py-3">
          <div className="flex size-10 items-center justify-center rounded-xl bg-[#416d59] text-sm font-semibold text-[#f4ead6] shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
            W
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#f6efe3]">
              {data.brandName}
            </p>
            <p className="text-xs text-[#b7c7bb]">{data.brandLabel}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup className="gap-2 py-0">
          <SidebarMenu>
            {data.navigation.map((item) => (
              <SidebarNavigationItem key={item.title} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <Alert className="mt-6 border-0 bg-[#7d4e46] text-[#faeee1] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
          <TriangleAlert />
          <AlertTitle>Peringatan Stok</AlertTitle>
          <AlertDescription className="text-[#f0d5c8] [&_p:not(:last-child)]:mb-1">
            <p>{outOfStockCount} produk habis</p>
            <p>{lowStockCount} produk stok rendah</p>
          </AlertDescription>
        </Alert>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-4">
        <SidebarGroup className="gap-3 py-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button
                  variant="ghost"
                  className="h-10 w-full justify-start gap-2 rounded-xl px-3 text-[#bfd0c3] hover:bg-white/8 hover:text-white"
                  onClick={handleSignOut}
                >
                  <LogOut className="size-4" />
                  <span>Sign Out</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarSeparator className="bg-white/10" />
          <div className="flex items-center gap-3 rounded-2xl bg-white/8 px-3 py-3">
            <Avatar size="sm" className="size-9">
              <AvatarFallback className="bg-[#d2a36d] font-semibold text-[#fff5df]">
                AD
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {data.adminName}
              </p>
              <p className="text-xs text-[#adc2b6]">{data.adminRole}</p>
            </div>
          </div>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
