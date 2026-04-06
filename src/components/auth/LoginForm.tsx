import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

import { GoogleButton } from './GoogleButton';

export function LoginForm() {
  return (
    <div className="w-full">
      <p className="text-xs font-semibold text-[#7a6e62]">Start your journey</p>
      <h1 className="mt-1 mb-5 text-2xl font-bold text-[#2d2318]">
        Sign In to WastraNusa
      </h1>

      <form className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-xs font-sm text-[#2d2318] text-bold"
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            className="h-10 rounded-sm border-[#c8bfb0] bg-transparent focus-visible:ring-0.5 focus-visible:ring-[#8a7a6a] text-[#2d2318]"
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs font-sm text-[#2d2318]">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            className="h-10 rounded-sm border-[#c8bfb0] bg-transparent focus-visible:ring-0.5 focus-visible:ring-[#8a7a6a] text-[#2d2318]"
          />
        </div>

        {/* Error + Forgot (same row, above Sign In button) */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#9a8e80]">Wrong email or password</span>
          <Link
            href="/forgot-password"
            className="text-[#c07a4a] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Sign In */}
        <Button
          type="submit"
          className="w-full h-11 bg-[#3d2e1e] hover:bg-[#2d2015] text-[#f0ebe3] font-semibold rounded-sm"
        >
          Sign In
        </Button>
      </form>

      {/* Google — no divider, just directly below */}
      <div className="mt-3">
        <GoogleButton label="Continue with Google" />
      </div>

      {/* Register link */}
      <p className="mt-5 text-center text-xs text-[#7a6e62]">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="text-[#c07a4a] hover:underline font-medium"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
