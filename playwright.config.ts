import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;
const baseURL = process.env.BASE_URL ?? `http://localhost:${PORT}`;

/**
 * Playwright config for WastraNusa E2E tests.
 * The app is built (`pnpm build`) and served (`pnpm start`) by the `webServer`
 * block below. MIDTRANS_STUB_MODE makes checkout return a local redirect URL so
 * no real payment gateway call is made (see src/lib/midtrans.ts).
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'pnpm start',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      MIDTRANS_STUB_MODE: 'true',
      BETTER_AUTH_URL: baseURL,
    },
  },
});
