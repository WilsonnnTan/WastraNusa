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

export default function ProfileInfoSection() {
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
        <InfoField label="Nama Lengkap" value="Siti Rahayu" />
        <InfoField label="Nomor Telepon" value="+62 812 3456 7890" />
        <InfoField label="Email" value="sitirahayu@gmail.com" />
        <InfoField label="Jenis Kelamin" value="Perempuan" />
      </div>
      <div className="mt-4">
        <InfoField label="Tanggal Lahir" value="12 Januari 1995" />
      </div>
    </div>
  );
}
