import Link from 'next/link';

type AuthLayoutProps = {
  children: React.ReactNode;
};

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#e8e0d0] font-segoe">
      {/* Left: form panel — form sits slightly above center, left-aligned with padding */}
      <div className="flex w-full flex-col lg:w-[60%]">
        {/* Logo top-left */}
        <div className="px-10 pt-8 md:px-12">
          <Link href="/" className="flex items-center gap-2.5 w-fit">
            <img src="/logo.png" alt="WastraNusa" className="h-15 w-15" />
            <span className="text-lg font-semibold tracking-tight text-[#2d2318]">
              WastraNusa
            </span>
          </Link>
        </div>

        {/* Form — centered vertically, left-padded like design */}
        <div className="flex flex-1 items-center justify-center px-10">
          <div className="w-full max-w-[345px]">{children}</div>
        </div>
      </div>

      {/* Right: image panel with dark green tinted overlay (no fade) */}
      <div className="relative hidden lg:block lg:w-[40%]">
        <img
          src="/auth-cover.jpg"
          style={{ objectPosition: '70% 10%' }} // x% y%
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark green tinted overlay matching the design */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'rgba(42, 99, 71, 0.45)' }}
        />
      </div>
    </div>
  );
}
