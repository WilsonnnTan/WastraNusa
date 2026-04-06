// TODO: change the design of reset password page based on our project's style
import { ResetPasswordForm } from '../../components/(auth)/reset-password/reset-password-form';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
