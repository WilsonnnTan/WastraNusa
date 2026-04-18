import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  AlertTriangle,
  BookOpen,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingBag,
} from 'lucide-react';
import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 bg-[#2d4a3e] text-white p-4 flex flex-col gap-6 font-sans h-screen sticky top-0 overflow-y-auto">
      <div className="flex items-center gap-3 px-2 mt-2">
        <Avatar size="sm" className="bg-[#1f372c]">
          <AvatarFallback className="bg-orange-200 text-stone-800">
            🧵
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-bold text-sm tracking-wide">WastraNusa</h2>
          <p className="text-xs text-white/50">Admin Panel</p>
        </div>
      </div>

      <nav className="flex flex-col gap-1 mt-4 flex-1">
        {/* Active Nav Item */}
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#824424] text-orange-200 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span className="text-sm font-medium flex-1">Artikel</span>
          <span className="bg-[#1f372c] text-white/70 text-[10px] px-2 py-0.5 rounded-full">
            12
          </span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-colors"
        >
          <Package className="w-4 h-4" />
          <span className="text-sm font-medium flex-1">Produk & Inventori</span>
          <span className="bg-[#1f372c] text-white/70 text-[10px] px-2 py-0.5 rounded-full">
            12
          </span>
        </Link>

        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-sm font-medium flex-1">Pesanan</span>
          <span className="bg-[#1f372c] text-white/70 text-[10px] px-2 py-0.5 rounded-full">
            12
          </span>
        </Link>

        <div className="mt-8 bg-[#4a2e2d] border border-red-500/20 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-medium">Peringatan Stok</span>
          </div>
          <div className="text-xs text-red-200/60 flex flex-col gap-1">
            <p>1 produk habis</p>
            <p>1 produk stok rendah</p>
          </div>
        </div>
      </nav>

      <div className="mt-auto flex flex-col gap-2">
        <Link
          href="#"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-colors mb-2"
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Pengaturan</span>
        </Link>

        <div className="flex items-center gap-3 bg-[#1f372c] p-3 rounded-2xl border border-white/5 hover:bg-[#1a2f25] cursor-pointer transition-colors">
          <Avatar className="w-9 h-9 rounded-full border border-orange-500/30">
            <AvatarFallback className="bg-[#824424] text-orange-100 text-xs font-medium">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white/90">
              Admin WastraNus
            </span>
            <span className="text-[10px] text-white/50">Super User</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
