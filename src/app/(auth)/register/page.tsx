// app/(auth)/register/page.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const YEARS = Array.from({ length: 100 }, (_, i) =>
  String(new Date().getFullYear() - i),
);

type Gender = 'female' | 'male' | 'custom' | '';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState<Gender>('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: ganti dengan logika registrasi Anda
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
  }

  function handleGoogle() {
    // TODO: signIn("google") dari next-auth/react
    console.log('Google sign up');
  }

  const inputClass =
    'h-11 w-full border border-wn-border rounded-[3px] bg-transparent px-3.5 text-sm text-wn-text outline-none focus:border-wn-dark transition-colors';

  const selectClass =
    'h-11 w-full border border-wn-border rounded-[3px] bg-wn-bg pl-3 pr-8 text-sm text-wn-dark outline-none focus:border-wn-dark appearance-none cursor-pointer transition-colors';

  const labelClass = 'text-xs text-wn-dark tracking-wide';

  return (
    <div className="flex min-h-screen bg-wn-bg">
      {/* ── Left Panel ── */}
      <div className="flex flex-col w-[58%] px-12 py-9">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 no-underline mb-6">
          <div className="w-[34px] h-[34px] rounded-full border border-wn-dark grid place-items-center shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2C5.5 2 2 5.5 2 9s3.5 7 7 7 7-3.5 7-7-3.5-7-7-7z"
                stroke="#3a2a1a"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M4 9c1.5-2.5 3-4 5-4s3.5 1.5 5 4c-1.5 2.5-3 4-5 4S5.5 11.5 4 9z"
                stroke="#3a2a1a"
                strokeWidth="1"
                fill="none"
              />
              <circle cx="9" cy="9" r="1.5" fill="#3a2a1a" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-wn-text tracking-wide">
            WastraNusa
          </span>
        </Link>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-wn-text leading-tight mb-7">
          Sign Up to WastraNusa
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* First name */}
          <div className="flex flex-col gap-1.5 mb-4">
            <label htmlFor="firstName" className={labelClass}>
              First name
            </label>
            <input
              id="firstName"
              type="text"
              autoComplete="given-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5 mb-4">
            <label htmlFor="phone" className={labelClass}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5 mb-4">
            <label htmlFor="email" className={labelClass}>
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
          <div className="flex flex-col gap-1.5 mb-4">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col gap-1.5 mb-4">
            <label className={labelClass}>Date of Birth</label>
            <div className="grid grid-cols-[1fr_1.6fr_1.3fr] gap-2.5">
              {/* Day */}
              <div className="relative">
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Day</option>
                  {DAYS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </div>

              {/* Month */}
              <div className="relative">
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Month</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </div>

              {/* Year */}
              <div className="relative">
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className={selectClass}
                >
                  <option value="">Year</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
                <ChevronIcon />
              </div>
            </div>
          </div>

          {/* Gender */}
          <div className="flex gap-8 mb-5">
            {(['female', 'male', 'custom'] as const).map((g) => (
              <label
                key={g}
                className="flex items-center gap-2 cursor-pointer text-sm text-wn-dark"
              >
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={() => setGender(g)}
                  className="
                    appearance-none w-4 h-4 rounded-full
                    border border-wn-border
                    grid place-items-center shrink-0 cursor-pointer
                    checked:border-wn-dark
                    checked:before:content-['']
                    checked:before:block
                    checked:before:w-[7px]
                    checked:before:h-[7px]
                    checked:before:rounded-full
                    checked:before:bg-wn-dark
                  "
                />
                {g === 'female' ? 'Female' : g === 'male' ? 'Male' : 'Custom'}
              </label>
            ))}
          </div>

          {/* Sign Up button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-[46px] bg-wn-dark text-wn-bg rounded-[3px] text-base font-semibold tracking-widest cursor-pointer hover:bg-wn-darker disabled:opacity-55 disabled:cursor-not-allowed transition-colors mb-4"
          >
            {loading ? 'Signing up…' : 'Sign Up'}
          </button>
        </form>

        {/* Divider row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-px bg-wn-border" />
          <span className="text-xs text-wn-muted whitespace-nowrap">
            or sign up with
          </span>
          <div className="flex-1 h-px bg-wn-border" />
          <Link
            href="/forgot-password"
            className="text-xs text-wn-accent no-underline hover:underline whitespace-nowrap"
          >
            Forgot password?
          </Link>
        </div>

        {/* Google button */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full h-11 bg-transparent border border-wn-border rounded-[3px] flex items-center justify-center gap-2.5 text-sm text-wn-dark cursor-pointer hover:border-wn-dark hover:bg-wn-dark/5 transition-colors mb-4"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        {/* Sign in link */}
        <p className="text-sm text-wn-muted text-center">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-wn-accent font-medium no-underline hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 relative overflow-hidden">
        {/*
          Ganti dengan foto asli:
          import Image from "next/image";
          <Image
            src="/hero-register.jpg"
            alt="WastraNusa"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
        */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, #8abfba 0%, #5a9d96 35%, #3d7d78 70%, #2a5e5a 100%)',
          }}
        />
        <div className="absolute inset-0 bg-black/20 z-10" />
      </div>
    </div>
  );
}

function ChevronIcon() {
  return (
    <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
        <path
          d="M1 1l5 5 5-5"
          stroke="#3a2a1a"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
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
