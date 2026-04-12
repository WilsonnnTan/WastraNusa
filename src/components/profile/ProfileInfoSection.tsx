'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { authClient } from '@/lib/auth/auth-client';
import { Edit2, Loader2, Save, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-muted-foreground">{label}</Label>
      <Input
        value={value}
        readOnly
        className="bg-brand-muted border-none text-gray-700 pointer-events-none h-10 w-full"
      />
    </div>
  );
}

interface ExtendedUser {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber?: string;
  gender?: string;
  birthDate?: string | Date;
}

export default function ProfileInfoSection() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user as ExtendedUser | undefined;

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    gender: '',
    birthDate: '',
  });

  useEffect(() => {
    if (user && !isEditing) {
      setFormData({
        name: user.name || '',
        phoneNumber: user.phoneNumber || '',
        gender: user.gender || '',
        birthDate: user.birthDate
          ? new Date(user.birthDate).toISOString().split('T')[0]
          : '', // Get YYYY-MM-DD
      });
    }
  }, [user, isEditing]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const result = await authClient.updateUser({
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        birthDate: formData.birthDate
          ? new Date(formData.birthDate)
          : undefined,
      });

      if (result.error) {
        toast.error(result.error.message || 'Gagal memperbarui profil');
      } else {
        toast.success('Profil berhasil diperbarui');
        setIsEditing(false);
      }
    } catch {
      toast.error('Terjadi kesalahan saat memperbarui profil');
    } finally {
      setIsSaving(false);
    }
  };

  const formattedBirthDate = user?.birthDate
    ? new Date(user.birthDate).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '-';

  const formattedGender =
    user?.gender === 'male'
      ? 'Laki-laki'
      : user?.gender === 'female'
        ? 'Perempuan'
        : '-';

  if (isPending) {
    return (
      <div className="bg-background rounded-2xl p-5 md:p-7 shadow-sm border animate-pulse">
        <div className="h-6 w-48 bg-muted rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-16 bg-muted rounded"></div>
          <div className="h-16 bg-muted rounded"></div>
          <div className="h-16 bg-muted rounded"></div>
          <div className="h-16 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background rounded-2xl p-5 md:p-7 shadow-sm border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h2 className="m-0 text-lg font-bold text-brand">Informasi Profil</h2>
        {!isEditing ? (
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1.5 text-[13px] text-brand border-gray-300 rounded-lg h-9 w-full sm:w-auto"
          >
            <Edit2 className="w-3.5 h-3.5" />
            Edit Profil
          </Button>
        ) : (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
              className="flex items-center gap-1.5 text-[13px] h-9 flex-1 sm:flex-none"
            >
              <X className="w-3.5 h-3.5" />
              Batal
            </Button>
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 text-[13px] h-9 flex-1 sm:flex-none bg-brand text-white hover:bg-brand-dark"
            >
              {isSaving ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Save className="w-3.5 h-3.5" />
              )}
              Simpan
            </Button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoField label="Nama Lengkap" value={user?.name || '-'} />
            <InfoField label="Nomor Telepon" value={user?.phoneNumber || '-'} />
            <InfoField label="Email" value={user?.email || '-'} />
            <InfoField label="Jenis Kelamin" value={formattedGender} />
          </div>
          <div className="mt-4">
            <InfoField label="Tanggal Lahir" value={formattedBirthDate} />
          </div>
        </>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Nama Lengkap</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="h-10 border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Nomor Telepon</Label>
              <Input
                value={formData.phoneNumber}
                onChange={(e) =>
                  setFormData({ ...formData, phoneNumber: e.target.value })
                }
                className="h-10 border-gray-300"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Email</Label>
              <Input
                value={user?.email || ''}
                readOnly
                className="bg-brand-muted border-none text-gray-700 pointer-events-none h-10 w-full"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="text-muted-foreground">Jenis Kelamin</Label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="flex h-10 w-full rounded-md border border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Pilih</option>
                <option value="male">Laki-laki</option>
                <option value="female">Perempuan</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-muted-foreground">Tanggal Lahir</Label>
            <Input
              type="date"
              value={formData.birthDate}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
              className="h-10 border-gray-300 w-full md:w-[calc(50%-0.5rem)]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
