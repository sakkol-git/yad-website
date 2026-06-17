import { test, expect } from '@playwright/test';

test('Homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/YAD Cambodia/);
  
  // Verify header navigation link is present
  const contactLink = page.locator('a', { hasText: 'Contact' }).first();
  await expect(contactLink).toBeVisible();
});

test('Programs page navigation works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Programs');
  await expect(page).toHaveURL(/.*programs/);
});
