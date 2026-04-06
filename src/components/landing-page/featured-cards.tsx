import { Card } from '@/components/ui/card';

export function FeaturedCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <Card className="group relative overflow-hidden rounded-2xl border border-[#ddd5c6] bg-[#5a453a] shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_24%,rgba(255,227,204,.35)_0%,rgba(0,0,0,0)_40%),linear-gradient(135deg,#896457_0%,#5a4137_58%,#3b2d27_100%)] transition duration-500 group-hover:scale-105" />
        <div className="relative flex min-h-[200px] items-end p-4">
          <div>
            <p className="text-lg font-semibold leading-tight text-[#f6eee1]">
              Koleksi Songket
            </p>
            <p className="text-sm text-[#d5cab9]">Kain Kebesaran Nusantara</p>
          </div>
        </div>
      </Card>

      <Card className="group relative overflow-hidden rounded-2xl border border-[#ddd5c6] bg-[#575150] shadow-sm">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_28%,rgba(233,235,236,.4)_0%,rgba(0,0,0,0)_36%),linear-gradient(135deg,#7e6f67_0%,#5b514d_58%,#393230_100%)] transition duration-500 group-hover:scale-105" />
        <div className="relative flex min-h-[200px] items-end p-4">
          <div>
            <p className="text-lg font-semibold leading-tight text-[#f6eee1]">
              Kebaya Modern
            </p>
            <p className="text-sm text-[#d5cab9]">Anggun & Elegan</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
