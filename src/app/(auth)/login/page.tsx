// app/(auth)/login/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setShowError(false);
    // TODO: ganti dengan logika auth, misal signIn dari next-auth
    await new Promise((r) => setTimeout(r, 900));
    if (!email || !password) setShowError(true);
    setLoading(false);
  }

  function handleGoogle() {
    // TODO: signIn("google") dari next-auth/react
    console.log('Google sign in');
  }

  const inputClass =
    'h-11 w-full border border-wn-border rounded-[3px] bg-transparent px-3.5 text-sm text-wn-text outline-none focus:border-wn-primary transition-colors font-[family-name:var(--font-sans)]';

  return (
    <div className="flex min-h-screen bg-[#D9CBB6]">
      {/* ── Left Panel ── */}
      <div className="flex flex-col w-[58%] px-12 py-9">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline">
          <div className="w-[60px] h-[60px] ">
            <img src="\auth\logo.png" alt="logo" />
          </div>
          <span className="text-lg font-bold text-wn-primary tracking-wide">
            WastraNusa
          </span>
        </Link>

        {/* Form area — centred vertically */}
        <div className="flex flex-col flex-1 justify-center max-w-[370px] w-full mx-auto pb-16">
          <p className="text-xs font-semibold text-wn-primary tracking-widest mb-1">
            Start your journey
          </p>

          <h1 className="text-3xl font-bold text-wn-primary leading-tight mb-8">
            Sign In to WastraNusa
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Email */}
            <div className="flex flex-col gap-1.5 mb-4">
              <label
                htmlFor="email"
                className="text-xs text-wn-primary tracking-wide"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5 mb-2">
              <label
                htmlFor="password"
                className="text-xs text-wn-primary tracking-wide"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Error + Forgot */}
            <div className="flex justify-between items-center min-h-[1.1rem] mb-4">
              {showError && (
                <span className="text-xs text-wn-dark">
                  Wrong email or password
                </span>
              )}
              <Link
                href="/forgot-password"
                className="text-xs text-wn-accent no-underline hover:underline ml-auto"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[46px] bg-wn-dark text-wn-bg rounded-[3px] text-base font-semibold tracking-widest cursor-pointer hover:bg-wn-darker disabled:opacity-55 disabled:cursor-not-allowed transition-colors mb-3"
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          {/* Google button */}
          <button
            type="button"
            onClick={handleGoogle}
            className="w-full h-11 bg-transparent border border-wn-border rounded-[3px] flex items-center justify-center gap-2.5 text-sm text-wn-dark cursor-pointer hover:border-wn-dark hover:bg-wn-dark/5 transition-colors mb-5"
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* Sign up link */}
          <p className="text-sm text-wn-muted text-center">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
              className="text-wn-accent font-medium no-underline hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 relative overflow-hidden">
        <Image
          src="/auth/kebaya.jpg"
          alt="WastraNusa"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          priority
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,#8abfba00_0%,#5a9d9666_35%,#3d7d78cc_70%,#2a5e5aff_100%)]" />
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
        fill="#4285F4"
      />
      <path
        d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
        fill="#34A853"
      />
      <path
        d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
        fill="#EA4335"
      />
    </svg>
  );
}
