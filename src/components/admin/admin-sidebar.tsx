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
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth/auth-client';
import { cn } from '@/lib/utils';
import { type DashboardData, type DashboardNavItem } from '@/types/dashboard';
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  Package2,
  ShoppingBag,
  TriangleAlert,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

const navigationIcons = {
  Dashboard: LayoutDashboard,
  Article: BookOpen,
  'Produk & Inventori': Package2,
  Pesanan: ShoppingBag,
} as const;

const ADMIN_NAVIGATION = [
  { title: 'Dashboard', href: '/admin/dashboard' },
  { title: 'Article', href: '/admin/article' },
  { title: 'Produk & Inventori', href: '/admin/product-inventory' },
  { title: 'Pesanan', href: '/admin/pesanan' },
];

function SidebarNavigationItem({ item }: { item: DashboardNavItem }) {
  const Icon = navigationIcons[item.title as keyof typeof navigationIcons];
  const buttonClassName = cn(
    'h-10 rounded-xl px-3 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground',
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
    </SidebarMenuItem>
  );
}

export function AdminSidebar({ data }: { data: Partial<DashboardData> }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const stockAlerts = data.stockAlerts ?? [];
  const outOfStockCount = stockAlerts.filter(
    (item) => item.stockLabel === 'Habis',
  ).length;
  const criticalStockCount = stockAlerts.filter(
    (item) => item.stockLabel === 'Kritis',
  ).length;
  const lowStockCount = stockAlerts.filter((item) =>
    item.stockLabel.startsWith('Rendah'),
  ).length;

  const adminName = session?.user?.name ?? 'Admin WastraNusa';
  const adminRole = session?.user?.role === 'admin' ? 'Super User' : 'Staff';

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
          <div className="flex size-10 items-center text-white justify-center rounded-xl bg-[#416d59] text-sm font-semibold text-sidebar-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.16)]">
            W
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">
              WastraNusa
            </p>
            <p className="text-xs text-sidebar-foreground/75">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3">
        <SidebarGroup className="gap-2 py-0">
          <SidebarMenu>
            {ADMIN_NAVIGATION.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarNavigationItem
                  key={item.title}
                  item={{ ...item, active: isActive }}
                />
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {(outOfStockCount > 0 ||
          criticalStockCount > 0 ||
          lowStockCount > 0) && (
          <Alert className="mt-6 border-0 bg-[#7d4e46] text-[#faeee1] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
            <TriangleAlert />
            <AlertTitle>Peringatan Stok</AlertTitle>
            <AlertDescription className="text-[#f0d5c8] [&_p:not(:last-child)]:mb-1">
              <p>{outOfStockCount} Produk Habis</p>
              <p>{criticalStockCount} Produk Kritis</p>
              <p>{lowStockCount} Produk Rendah</p>
            </AlertDescription>
          </Alert>
        )}
      </SidebarContent>

      <SidebarFooter className="px-3 pb-4">
        <SidebarGroup className="gap-3 py-0">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button
                  variant="ghost"
                  className="h-10 w-full justify-start gap-2 rounded-xl px-3 text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
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
              <AvatarFallback className="bg-[#d2a36d] font-semibold text-sidebar-foreground">
                {adminName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-sidebar-foreground">
                {adminName}
              </p>
              <p className="text-xs text-sidebar-foreground/75">{adminRole}</p>
            </div>
          </div>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  );
}
