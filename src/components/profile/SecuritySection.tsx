'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle, Loader2, Lock, X } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod/v3';

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Password saat ini wajib diisi'),
    newPassword: z.string().min(8, 'Password baru minimal 8 karakter'),
    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Password baru tidak cocok',
    path: ['confirmPassword'],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

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

export default function SecuritySection() {
  const { data, isPending } = authClient.useSession();
  const session = data?.session;

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: PasswordFormValues) => {
    setIsSaving(true);
    try {
      const result = await authClient.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        revokeOtherSessions: true,
      });

      if (result.error) {
        toast.error(result.error.message || 'Gagal mengubah password');
      } else {
        toast.success('Password berhasil diubah');
        setIsChangingPassword(false);
        reset();
      }
    } catch {
      toast.error('Terjadi kesalahan saat mengubah password');
    } finally {
      setIsSaving(false);
    }
  };

  const loginDate = session?.createdAt
    ? new Date(session.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    : '-';

  return (
    <div className="bg-background rounded-2xl p-5 md:p-7 shadow-sm border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-4 sm:gap-0">
        <h2 className="m-0 text-lg font-bold flex items-center gap-2 text-brand">
          <Lock size={18} /> Keamanan Akun
        </h2>
        {!isChangingPassword ? (
          <Button
            variant="outline"
            onClick={() => setIsChangingPassword(true)}
            className="flex items-center gap-1.5 text-[13px] text-brand border-gray-300 rounded-lg h-9 w-full sm:w-auto"
          >
            Ubah Password
          </Button>
        ) : null}
      </div>

      {isChangingPassword ? (
        <div className="space-y-4 bg-brand-muted/50 p-4 rounded-xl border border-border/50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-sm">Ubah Password</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsChangingPassword(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-3 relative">
              <div className="space-y-1">
                <Label className="text-xs">Password Saat Ini</Label>
                <Input
                  type="password"
                  {...register('currentPassword')}
                  className="h-9"
                />
                {errors.currentPassword && (
                  <p className="text-[10px] text-destructive">
                    {errors.currentPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Password Baru</Label>
                <Input
                  type="password"
                  {...register('newPassword')}
                  className="h-9"
                />
                {errors.newPassword && (
                  <p className="text-[10px] text-destructive">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Konfirmasi Password Baru</Label>
                <Input
                  type="password"
                  {...register('confirmPassword')}
                  className="h-9"
                />
                {errors.confirmPassword && (
                  <p className="text-[10px] text-destructive">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-end pt-2">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-brand text-white hover:bg-brand-dark h-9 text-xs"
              >
                {isSaving ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-2" />
                ) : null}
                Simpan Password
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          <SecurityRow
            icon={<Lock size={16} />}
            title="Password"
            subtitle="••••••••••••"
          />
          <SecurityRow
            icon={<CheckCircle size={16} />}
            title="Login Terakhir"
            subtitle={isPending ? 'Memuat...' : `${loginDate} (Sesi Aktif)`}
          />
        </div>
      )}
    </div>
  );
}
