import { Layout } from '@/components/auth/(forget-reset-password)/layout';
import { ResetPasswordForm } from '@/components/auth/(forget-reset-password)/reset-password/reset-password-form';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { token, error } = await searchParams;

  return (
    <Layout
      title="Reset Password"
      description="Enter your new password below to secure your account."
    >
      <ResetPasswordForm
        token={typeof token === 'string' ? token : undefined}
        error={typeof error === 'string' ? error : undefined}
      />
    </Layout>
  );
}
