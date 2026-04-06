import { Button } from '@/components/ui/button';
import { CheckCircle, Lock } from 'lucide-react';
import { ReactNode } from 'react';

function SecurityRow({
  icon,
  title,
  subtitle,
  action,
}: {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  action?: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-4 sm:py-3.5 bg-brand-muted rounded-lg gap-3 sm:gap-0">
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {icon}
        <div>
          <div className="text-[13px] font-medium text-gray-700">{title}</div>
          {subtitle && (
            <div className="text-[12px] text-amber-700">{subtitle}</div>
          )}
        </div>
      </div>
      {action && (
        <Button
          variant="outline"
          className="h-8 px-3.5 text-xs text-gray-700 w-full sm:w-auto mt-1 sm:mt-0"
        >
          {action}
        </Button>
      )}
    </div>
  );
}

export default function SecuritySection({ lastLogin }: { lastLogin: string }) {
  return (
    <div className="bg-background rounded-2xl p-5 md:p-7 shadow-sm border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4 sm:gap-0">
        <h2 className="m-0 text-lg font-bold flex items-center gap-2 text-brand">
          <Lock size={18} /> Keamanan Akun
        </h2>
        <Button
          variant="outline"
          className="flex items-center gap-1.5 text-[13px] text-brand border-gray-300 rounded-lg h-9 w-full sm:w-auto"
        >
          Ubah Password
        </Button>
      </div>
      <div className="flex flex-col gap-2.5">
        <SecurityRow
          icon={<Lock size={16} />}
          title="Password"
          subtitle="••••••••••••"
        />
        <SecurityRow
          icon={<CheckCircle size={16} />}
          title="Login Terakhir"
          subtitle={lastLogin}
        />
      </div>
    </div>
  );
}
