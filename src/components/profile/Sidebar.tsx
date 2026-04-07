'use client';

import { Badge } from '@/components/ui/badge';
import { authClient } from '@/lib/auth/auth-client';
import { BookOpen, LogOut, MapPin, ShoppingBag, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Sidebar({ active }: { active: string }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  };

  const items = [
    { icon: <User size={16} />, label: 'Profil Saya', badge: null },
    { icon: <ShoppingBag size={16} />, label: 'Pesanan Saya', badge: null },
    { icon: <MapPin size={16} />, label: 'Alamat Tersimpan', badge: null },
    { icon: <BookOpen size={16} />, label: 'Artikel Disukai', badge: null },
    {
      icon: <LogOut size={16} />,
      label: 'Keluar',
      badge: null,
      action: handleSignOut,
    },
  ];

  return (
    <div className="w-full md:w-[200px] lg:w-[220px] bg-background rounded-2xl p-2 md:p-2 shadow-sm border flex flex-row flex-wrap md:flex-col gap-1 md:self-start">
      {items.map(({ icon, label, badge, action }) => (
        <div
          key={label}
          onClick={action}
          className={`flex-auto md:flex-none flex items-center justify-center md:justify-between px-3 md:px-3.5 py-2 md:py-2.5 rounded-lg cursor-pointer text-sm transition-colors whitespace-nowrap ${
            label === active
              ? 'bg-brand-muted text-brand font-medium'
              : 'bg-transparent text-gray-700 hover:bg-gray-100'
          }`}
        >
          <div className="flex items-center gap-2.5">
            {icon}
            <span className="hidden sm:inline md:inline">{label}</span>
          </div>
          {badge && (
            <Badge className="bg-brand hover:bg-brand-dark text-white rounded-full text-[11px] px-2 py-0.5 font-semibold leading-none border-none ml-2 md:ml-0">
              {badge}
            </Badge>
          )}
        </div>
      ))}
    </div>
  );
}
