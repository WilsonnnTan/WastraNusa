'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type FormValues = z.infer<typeof formSchema>;

interface ResetPasswordFormProps {
  token?: string;
  error?: string;
}

// Component 1: Success or Invalid Link View
const ResetPasswordStatus = ({
  type,
  onAction,
}: {
  type: 'success' | 'invalid';
  onAction: () => void;
}) => {
  const isSuccess = type === 'success';

  return (
    <div className="text-center space-y-4">
      <p className="text-sm text-[#2d2318]">
        {isSuccess
          ? 'Your password has been successfully updated.'
          : 'This password reset link is invalid or has expired.'}
      </p>
      <p className="text-xs text-[#2d2318]/70">
        {isSuccess
          ? 'You will be redirected to the login page shortly.'
          : 'For your security, reset links expire after a short period of time. Please request a new one.'}
      </p>
      <Button
        onClick={onAction}
        className="w-full h-11 bg-[#3d2e1e] hover:bg-[#2d2015] text-[#f0ebe3] font-semibold rounded-sm shadow-sm"
      >
        {isSuccess ? 'Go to Login Now' : 'Return to Login'}
      </Button>
    </div>
  );
};

// Component 2: The Actual Form
const ActualResetForm = ({
  form,
  onSubmit,
  authError,
}: {
  form: UseFormReturn<FormValues>;
  onSubmit: (data: FormValues) => void;
  authError: string | null;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-4">
        <Field data-invalid={!!errors.password}>
          <FieldLabel htmlFor="password">New Password</FieldLabel>
          <Input
            id="password"
            type="password"
            {...register('password')}
            className="h-11 rounded-sm border-[#b8b0a0] bg-transparent focus-visible:ring-1 focus-visible:ring-[#8a7a6a] text-[#2d2318]"
            placeholder="••••••••"
          />
          <FieldError>{errors.password?.message}</FieldError>
        </Field>

        <Field data-invalid={!!errors.confirmPassword}>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className="h-11 rounded-sm border-[#b8b0a0] bg-transparent focus-visible:ring-1 focus-visible:ring-[#8a7a6a] text-[#2d2318]"
            placeholder="••••••••"
          />
          <FieldError>{errors.confirmPassword?.message}</FieldError>
        </Field>
      </div>

      {authError && (
        <div className="flex justify-center -mt-1">
          <FieldError className="text-center">{authError}</FieldError>
        </div>
      )}

      <Button
        type="submit"
        className="w-full h-11 bg-[#3d2e1e] hover:bg-[#2d2015] text-[#f0ebe3] font-semibold rounded-sm shadow-sm mt-1"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Resetting...' : 'Reset Password'}
      </Button>
    </form>
  );
};

export function ResetPasswordForm({
  token,
  error: urlError,
}: ResetPasswordFormProps) {
  const [authError, setAuthError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setAuthError(null);

    try {
      const { error } = await authClient.resetPassword({
        newPassword: data.password,
        token: token,
      });

      if (error) {
        setAuthError(
          error.message || 'Something went wrong. Please try again.',
        );
      } else {
        setSuccess(true);
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      }
    } catch {
      setAuthError('An unexpected error occurred. Please try again.');
    }
  };

  const goToLogin = () => router.push('/login');

  if (urlError === 'INVALID_TOKEN' || !token) {
    return <ResetPasswordStatus type="invalid" onAction={goToLogin} />;
  }

  if (success) {
    return <ResetPasswordStatus type="success" onAction={goToLogin} />;
  }

  return (
    <ActualResetForm form={form} onSubmit={onSubmit} authError={authError} />
  );
}
