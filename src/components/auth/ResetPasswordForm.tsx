import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const requirements = [
  { label: 'One Low Case Character', col: 1 },
  { label: 'One Special Character', col: 2 },
  { label: 'One Upper Case Character', col: 1 },
  { label: '8 Character Minimum', col: 2 },
  { label: 'One Number', col: 1 },
];

export function ResetPasswordForm() {
  return (
    <div className="min-h-screen bg-[#d6cfc0] flex flex-col font-segoe">
      {/* Logo */}
      <div className="px-10 pt-8">
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <img src="/logo.png" alt="WastraNusa" className="h-15 w-15" />
          <span className="text-lg font-semibold tracking-tight text-[#2d2318]">
            WastraNusa
          </span>
        </Link>
      </div>

      {/* Card */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-[680px] rounded-lg border border-[#b8b0a0] bg-[#cec7b6] p-10">
          <div className="grid grid-cols-2 gap-10">
            {/* Left */}
            <div>
              <h1 className="text-3xl font-bold leading-tight text-[#2d2318]">
                Reset Your
                <br />
                Password
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-[#2d2318]">
                Almost done! Create strong password to secure your account
              </p>

              {/* Key illustration */}
              <div className="mt-6">
                <svg
                  viewBox="0 0 200 160"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-48"
                >
                  {/* Clouds */}
                  <ellipse
                    cx="80"
                    cy="120"
                    rx="55"
                    ry="28"
                    fill="#7bafc4"
                    opacity="0.85"
                  />
                  <ellipse
                    cx="55"
                    cy="110"
                    rx="30"
                    ry="20"
                    fill="#7bafc4"
                    opacity="0.75"
                  />
                  <ellipse
                    cx="115"
                    cy="112"
                    rx="32"
                    ry="18"
                    fill="#5a9ab5"
                    opacity="0.7"
                  />
                  <ellipse
                    cx="75"
                    cy="105"
                    rx="25"
                    ry="15"
                    fill="#a8cdd8"
                    opacity="0.6"
                  />
                  <ellipse
                    cx="100"
                    cy="108"
                    rx="22"
                    ry="14"
                    fill="#8fbfce"
                    opacity="0.65"
                  />

                  {/* Sparkles */}
                  <text x="30" y="60" fontSize="14" fill="#e8c84a">
                    ✦
                  </text>
                  <text x="140" y="55" fontSize="10" fill="#e8c84a">
                    ✦
                  </text>
                  <text x="155" y="80" fontSize="8" fill="#e8c84a">
                    ✦
                  </text>
                  <text x="20" y="90" fontSize="8" fill="#e8c84a">
                    ✦
                  </text>

                  {/* Key body */}
                  <g transform="rotate(-35, 100, 90)">
                    <circle
                      cx="75"
                      cy="75"
                      r="24"
                      fill="#c8a030"
                      stroke="#a07820"
                      strokeWidth="2"
                    />
                    <circle
                      cx="75"
                      cy="75"
                      r="14"
                      fill="#d4b040"
                      stroke="#a07820"
                      strokeWidth="1.5"
                    />
                    <circle cx="75" cy="75" r="7" fill="#b89028" />
                    <rect
                      x="95"
                      y="71"
                      width="60"
                      height="8"
                      rx="4"
                      fill="#c8a030"
                      stroke="#a07820"
                      strokeWidth="1"
                    />
                    <rect
                      x="128"
                      y="79"
                      width="8"
                      height="10"
                      rx="2"
                      fill="#c8a030"
                      stroke="#a07820"
                      strokeWidth="1"
                    />
                    <rect
                      x="144"
                      y="79"
                      width="8"
                      height="14"
                      rx="2"
                      fill="#c8a030"
                      stroke="#a07820"
                      strokeWidth="1"
                    />
                  </g>

                  {/* Compass */}
                  <circle
                    cx="138"
                    cy="128"
                    r="16"
                    fill="#8fbfce"
                    stroke="#5a8fa0"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="138"
                    cy="128"
                    r="12"
                    fill="#7aafbe"
                    stroke="#5a8fa0"
                    strokeWidth="1"
                  />
                  <polygon
                    points="138,116 141,128 138,124 135,128"
                    fill="#c84a30"
                  />
                  <polygon
                    points="138,140 135,128 138,132 141,128"
                    fill="#e8e0d0"
                  />
                  <circle cx="138" cy="128" r="2" fill="#2d2318" />
                </svg>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col justify-center gap-4">
              {/* Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="password"
                  className="text-sm font-normal text-[#2d2318]"
                >
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="h-10 rounded-sm border-[#b8b0a0] bg-transparent focus-visible:ring-1 focus-visible:ring-[#8a7a6a] text-[#2d2318]"
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="confirm-password"
                  className="text-sm font-normal text-[#2d2318]"
                >
                  Confirm Password
                </Label>
                <Input
                  id="confirm-password"
                  type="password"
                  className="h-10 rounded-sm border-[#b8b0a0] bg-transparent focus-visible:ring-1 focus-visible:ring-[#8a7a6a] text-[#2d2318]"
                />
              </div>

              {/* Password requirements */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                {requirements.map((req) => (
                  <div key={req.label} className="flex items-center gap-1.5">
                    <div className="h-3.5 w-3.5 rounded-full border border-[#8a7a6a] shrink-0" />
                    <span className="text-xs text-[#2d2318]">{req.label}</span>
                  </div>
                ))}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full h-11 bg-[#3d2e1e] hover:bg-[#2d2015] text-[#f0ebe3] font-semibold rounded-sm"
              >
                Create New Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
