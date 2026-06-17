import { test, expect } from '@playwright/test';

test('Admin dashboard requires authentication', async ({ page }) => {
  await page.goto('/admin/dashboard');
  
  // Since we are not logged in, we should be redirected to the login page
  await expect(page).toHaveURL(/.*login/);
  
  // Verify login form is visible
  const emailInput = page.locator('input[type="email"]');
  await expect(emailInput).toBeVisible();
});
