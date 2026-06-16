import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    clearMocks: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'clover', 'json'],
      exclude: [
        'generated/**',
        'src/generated/**',
        'tests/**',
        'prisma/**',
        '**/*.config.*',
        '**/*.d.ts',
      ],
      // Floor thresholds (ratchet upward). These are intentionally set near the
      // current measured baseline so CI fails on *regressions* without breaking
      // the existing pipeline. Branch coverage is the weakest area — raise these
      // toward the >80% target stated in CONTRIBUTING.md as coverage improves.
      thresholds: {
        statements: 78,
        lines: 78,
        functions: 80,
        branches: 55,
      },
    },
    tags: [
      {
        name: 'frontend',
        description: 'Tests written for frontend.',
      },
      {
        name: 'backend',
        description: 'Tests written for backend.',
      },
      {
        name: 'db',
        description: 'Tests for database queries.',
        timeout: 60_000,
      },
      {
        name: 'flaky',
        description: 'Flaky CI tests.',
        retry: process.env.CI ? 3 : 0,
        timeout: 30_000,
        priority: 1,
      },
    ],
  },
});
