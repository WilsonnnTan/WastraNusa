import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, User } from 'lucide-react';

type ProfileCardProps = {
  name: string;
  email: string;
  phoneNumber?: string | null;
  joinedAt?: string;
  image?: string | null;
  totalOrders?: number;
};

export default function ProfileCard({
  name,
  email,
  phoneNumber,
  joinedAt,
  image,
  totalOrders = 0,
}: ProfileCardProps) {
  const contactInfo = [email, phoneNumber].filter(Boolean).join(' | ');

  return (
    <div className="mx-4 md:mx-8 my-4 px-4 md:px-8 py-5 md:py-7 bg-background rounded-xl border flex flex-col md:flex-row justify-between items-center font-sans shadow-sm gap-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-center text-center md:text-left">
        <Avatar className="size-20 md:size-18 border">
          {image ? <AvatarImage src={image} alt={name} /> : null}
          <AvatarFallback className="bg-muted text-muted-foreground">
            <User size={32} />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1.5 items-center md:items-start">
          <h2 className="m-0 text-lg md:text-xl font-bold text-foreground">
            {name}
          </h2>
          <p className="m-0 text-[13px] text-muted-foreground break-all md:break-normal">
            {contactInfo || '-'}
          </p>
          <p className="m-0 text-[12px] text-muted-foreground flex items-center justify-center md:justify-start gap-1">
            <MapPin size={13} />
            Bergabung: {joinedAt || '-'}
          </p>
        </div>
      </div>

      <div className="text-center w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 mt-2 md:mt-0 border-border">
        <div className="text-3xl md:text-4xl font-extrabold text-foreground">
          {totalOrders}
        </div>
        <div className="text-[13px] text-muted-foreground">Total Pesanan</div>
      </div>
    </div>
  );
}
