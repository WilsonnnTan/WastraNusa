import { expect, test } from '@playwright/test';

// Credentials from prisma/dev-seeds/user.seed.ts (seeded as emailVerified: true).
const SEED_USER = { email: 'user@test.com', password: 'User@12345' };

test.describe('smoke', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/.+/);
  });

  test('a seeded user can sign in and reach the encyclopedia', async ({
    page,
  }) => {
    await page.goto('/login');

    await page.getByLabel('Email').fill(SEED_USER.email);
    await page.getByLabel('Password').fill(SEED_USER.password);
    await page.getByRole('button', { name: /^sign in$/i }).click();

    await expect(page).toHaveURL(/\/encyclopedia/, { timeout: 15_000 });
  });
});
