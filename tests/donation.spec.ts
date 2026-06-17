import { test, expect } from '@playwright/test';

test('Donation flow requires inputs', async ({ page }) => {
  await page.goto('/donate/flow');
  
  // Submit button should be disabled initially or validation should prevent it
  const submitButton = page.locator('button[type="submit"]').first();
  await expect(submitButton).toBeDisabled();

  // Checking that email input exists
  const emailInput = page.locator('input[type="email"]').first();
  await expect(emailInput).toBeVisible();
});
