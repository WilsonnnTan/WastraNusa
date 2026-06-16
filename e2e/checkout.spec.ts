import { expect, test } from '@playwright/test';

/**
 * Happy-path checkout E2E (browse cart -> checkout -> payment -> Midtrans stub).
 *
 * SKIPPED for now: this multi-step flow depends on seeded cart + default address
 * state and on the exact UI behaviour of AddressSection (auto-selecting the
 * default address). It was authored from source but has NOT yet been validated
 * against a running app + database, so it is skipped to keep CI green. Remove
 * `.skip` and iterate on selectors once you can run `pnpm test:e2e` locally
 * against a seeded DB. The Midtrans call is stubbed via MIDTRANS_STUB_MODE
 * (see playwright.config.ts + src/lib/midtrans.ts), so checkout redirects to
 * `/cart/checkout/payment?stub=success` instead of the real gateway.
 */
const SEED_USER = { email: 'user@test.com', password: 'User@12345' };

async function login(page: import('@playwright/test').Page) {
  await page.goto('/login');
  await page.getByLabel('Email').fill(SEED_USER.email);
  await page.getByLabel('Password').fill(SEED_USER.password);
  await page.getByRole('button', { name: /^sign in$/i }).click();
  await expect(page).toHaveURL(/\/encyclopedia/, { timeout: 15_000 });
}

test.describe('checkout', () => {
  test('a logged-in user can complete checkout to the payment redirect', async ({
    page,
  }) => {
    await login(page);

    // 1. Cart: select the first item, then proceed to checkout.
    await page.goto('/cart');
    await page.getByRole('checkbox').nth(1).check();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await expect(page).toHaveURL(/\/cart\/checkout$/);

    // 2. Checkout: pick the default address (if not auto-selected) + continue.
    //    A default shipping option ("sic") is preselected.
    await page.getByRole('button', { name: /Tinjau & Konfirmasi/i }).click();
    await expect(page).toHaveURL(/\/cart\/checkout\/payment/);

    // 3. Payment: confirm — Midtrans is stubbed, so this redirects locally.
    await page
      .getByRole('button', { name: /Konfirmasi & Bayar Sekarang/i })
      .click();

    await expect(page).toHaveURL(/stub=success/, { timeout: 15_000 });
  });
});
