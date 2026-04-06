import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Edit2 } from 'lucide-react';

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-muted-foreground">{label}</Label>
      <Input
        value={value}
        readOnly
        className="bg-brand-muted border-none text-gray-700 pointer-events-none h-10"
      />
    </div>
  );
}

type ProfileInfoSectionProps = {
  fullName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  birthDate: string;
};

export default function ProfileInfoSection({
  fullName,
  phoneNumber,
  email,
  gender,
  birthDate,
}: ProfileInfoSectionProps) {
  return (
    <div className="bg-background rounded-2xl p-5 md:p-7 shadow-sm border">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h2 className="m-0 text-lg font-bold text-brand">Informasi Profil</h2>
        <Button
          variant="outline"
          className="flex items-center gap-1.5 text-[13px] text-brand border-gray-300 rounded-lg h-9 w-full sm:w-auto"
        >
          <Edit2 className="w-3.5 h-3.5" />
          Edit Profil
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoField label="Nama Lengkap" value={fullName} />
        <InfoField label="Nomor Telepon" value={phoneNumber} />
        <InfoField label="Email" value={email} />
        <InfoField label="Jenis Kelamin" value={gender} />
      </div>
      <div className="mt-4">
        <InfoField label="Tanggal Lahir" value={birthDate} />
      </div>
    </div>
  );
}
