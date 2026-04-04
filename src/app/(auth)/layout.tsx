// app/(auth)/layout.tsx
// Layout untuk semua halaman di dalam grup (auth): login, register, forgot-password

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
