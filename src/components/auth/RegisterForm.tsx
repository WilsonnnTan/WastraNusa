// import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// import { AuthDivider } from './AuthDivider';
import { GoogleButton } from './GoogleButton';

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
const YEARS = Array.from({ length: 80 }, (_, i) =>
  String(new Date().getFullYear() - i),
);

export function RegisterForm() {
  return (
    <div className="w-full">
      <h1 className="mb-6 text-2xl font-bold text-[#2d2318]">
        Sign Up to WastraNusa
      </h1>

      <form className="space-y-3">
        {/* First name */}
        <div className="space-y-1.5">
          <Label
            htmlFor="first-name"
            className="text-xs font-sm text-[#2d2318]"
          >
            First name
          </Label>
          <Input
            id="first-name"
            type="text"
            autoComplete="given-name"
            className="h-10 rounded-sm border-[#c8bfb0] bg-transparent focus-visible:ring-0.5 focus-visible:ring-[#8a7a6a] text-[#2d2318]"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1.5">
          <Label htmlFor="phone" className="text-xs font-sm text-[#2d2318]">
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            className="h-10 rounded-sm border-[#c8bfb0] bg-transparent focus-visible:ring-0.5 focus-visible:ring-[#8a7a6a] text-[#2d2318]"
          />
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-xs font-sm text-[#2d2318]">
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
            autoComplete="new-password"
            className="h-10 rounded-sm border-[#c8bfb0] bg-transparent focus-visible:ring-0.5 focus-visible:ring-[#8a7a6a] text-[#2d2318]"
          />
        </div>
        <div className="space-y-2"></div>
        {/* Date of Birth */}
        <div className="space-y-1.5 ">
          <Label className="text-xs font-sm text-[#2d2318]">
            Date of Birth
          </Label>
          <div className="flex gap-2">
            <Select>
              <SelectTrigger className="border-[#c8bfb0] bg-transparent text-[#2d2318] focus:ring-[#8a7a6a]">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                {DAYS.map((d) => (
                  <SelectItem key={d} value={d}>
                    {d}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="border-[#c8bfb0] bg-transparent text-[#2d2318] focus:ring-[#8a7a6a]">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {MONTHS.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="border-[#c8bfb0] bg-transparent text-[#2d2318] focus:ring-[#8a7a6a]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Gender */}
        <div className="flex gap-2 text-xs text-[#2d2318] mt-2">
          {['Female', 'Male', 'Custom'].map((gender) => (
            <label
              key={gender}
              className="flex items-center gap-1.5 cursor-pointer"
            >
              <input
                type="radio"
                name="gender"
                value={gender.toLowerCase()}
                className="accent-[#3d2e1e]"
              />
              {gender}
            </label>
          ))}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full h-11 bg-[#3d2e1e] hover:bg-[#2d2015] text-[#f0ebe3] font-semibold rounded-sm mt-1"
        >
          Sign Up
        </Button>
      </form>
      <div className="mt-4">
        <GoogleButton label="Continue with Google" />
      </div>
    </div>
  );
}
