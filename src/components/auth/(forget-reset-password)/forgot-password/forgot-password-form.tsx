'use client';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email('Invalid email address.'),
});

type FormValues = z.infer<typeof formSchema>;

export function ForgotPasswordForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      const { error: authError } = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: '/reset-password',
      });

      if (authError) {
        setError(authError.message || 'Failed to send reset link.');
      } else {
        setIsSuccess(true);
      }
    } catch {
      setError('An unexpected error occurred.');
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <p className="text-sm text-[#2d2318]">
          We&apos;ve sent a password reset link to your email address.
        </p>
        <p className="text-xs text-[#2d2318]/70">
          Please check your inbox (and spam folder) and follow the instructions
          to reset your password.
        </p>
        <Button
          asChild
          className="w-full h-11 bg-[#3d2e1e] hover:bg-[#2d2015] text-[#f0ebe3] font-semibold rounded-sm shadow-sm"
        >
          <Link href="/login">Return to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <Field data-invalid={!!errors.email}>
          <FieldLabel htmlFor="email">Email Address</FieldLabel>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="name@example.com"
            className="h-11 rounded-sm border-[#b8b0a0] bg-transparent focus-visible:ring-1 focus-visible:ring-[#8a7a6a] text-[#2d2318]"
          />
          <FieldError>{errors.email?.message}</FieldError>
        </Field>
      </div>

      {error && (
        <div className="flex justify-center -mt-2">
          <FieldError className="text-center">{error}</FieldError>
        </div>
      )}

      <div className="space-y-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 bg-[#3d2e1e] hover:bg-[#2d2015] text-[#f0ebe3] font-semibold rounded-sm shadow-sm"
        >
          {isSubmitting ? 'Sending...' : 'Send Reset Link'}
        </Button>

        <p className="mt-5 text-center text-xs text-[#7a6e62]">
          Remember your password?{' '}
          <Link
            href="/login"
            className="text-[#c07a4a] hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </form>
  );
}
