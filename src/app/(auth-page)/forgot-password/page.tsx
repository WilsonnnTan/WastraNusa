import { ForgotPasswordForm } from '@/components/auth/(forget-reset-password)/forgot-password/forgot-password-form';
import { Layout } from '@/components/auth/(forget-reset-password)/layout';

export default function ForgotPasswordPage() {
  return (
    <Layout
      title="Forgot Password"
      description="Enter your registered email address to receive a recovery link."
    >
      <ForgotPasswordForm />
    </Layout>
  );
}
