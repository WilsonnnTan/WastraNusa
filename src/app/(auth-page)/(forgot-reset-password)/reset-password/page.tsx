import { ResetPasswordForm } from '@/components/auth/(forget-reset-password)/reset-password/reset-password-form';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token, error } = await searchParams;

  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#2d2318]">
          Reset Password
        </h1>
        <p className="mt-2 text-xs text-[#7a6e62]">
          Enter your new password below to secure your account.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <ResetPasswordForm
          token={typeof token === 'string' ? token : undefined}
          error={typeof error === 'string' ? error : undefined}
        />
      </div>
    </>
  );
}
