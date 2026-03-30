// TODO: change the design of reset password page based on our project's style
import { ResetPasswordForm } from './reset-password-form';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const params = await searchParams;
  const error = typeof params.error === 'string' ? params.error : undefined;
  const token = typeof params.token === 'string' ? params.token : undefined;

  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-background">
      <ResetPasswordForm token={token} error={error} />
    </main>
  );
}
