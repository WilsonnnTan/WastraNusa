import { ForgotPasswordForm } from '@/components/auth/(forget-reset-password)/forgot-password/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-[#2d2318]">
          Forgot Password
        </h1>
        <p className="mt-2 text-xs text-[#7a6e62]">
          Enter your registered email address to receive a recovery link.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <ForgotPasswordForm />
      </div>
    </>
  );
}
