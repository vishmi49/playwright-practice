import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page }) => {
  const username = 'vish';
  const password = 'Vish123@+';

  // Navigate to the login page
  await page.goto('https://bookcart.azurewebsites.net/login');

  // Wait for the page to load completely
  await page.waitForTimeout(5000);

  // Verify the login page title
  const title = page.locator('.mat-mdc-card-title.mat-h1');
  await expect(title).toHaveText('Login');

  // Fill in the username and password fields
  const usernameInput = page.locator('input[placeholder="Username"]');
  const passwordInput = page.locator('input[placeholder="Password"]');
  const loginButton = page.locator('mat-card-actions button:has-text("Login")');

  await usernameInput.fill(username);
  await passwordInput.fill(password);

  // Click the login button
  await loginButton.click();

  // Wait for the navigation to the home page
  await page.waitForURL('https://bookcart.azurewebsites.net');

  // Verify the logged-in user's name appears
  const loggedInUser = page.locator('.mat-toolbar-row .mat-mdc-menu-trigger .mdc-button__label'); // Update this selector as per your application's actual selector
  await expect(loggedInUser).toHaveText(username);

  // Save the storage state for authenticated session
  try {
    await page.context().storageState({ path: authFile });
    console.log(`Storage state saved to ${authFile}`);
  } catch (error) {
    console.error(`Failed to save storage state: ${error}`);
  }
});
