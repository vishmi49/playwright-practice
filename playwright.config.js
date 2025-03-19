// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const path = require('path');

// Path to the saved authentication state
const authFile = path.join(__dirname, '.auth/user.json');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  projects: [
    // Setup project for authentication
    { 
      name: 'setup', 
      testMatch: /tests\/auth\/auth-setup\.js/ 
    },

    // Chromium project
    {
      name: 'chromium',
      testMatch: /.*\.spec\.js/, // Match test files following *.spec.js pattern
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile, // Use prepared auth state
      },
      dependencies: ['setup'],
    },

    // Firefox project
    {
      name: 'firefox',
      testMatch: /.*\.spec\.js/, // Match test files following *.spec.js pattern
      use: {
        ...devices['Desktop Firefox'],
        storageState: authFile, // Use prepared auth state
      },
      dependencies: ['setup'],
    },

    // Webkit project
    {
      name: 'webkit',
      testMatch: /.*\.spec\.js/, // Match test files following *.spec.js pattern
      use: {
        ...devices['Desktop Safari'],
        storageState: authFile, // Use prepared auth state
      },
      dependencies: ['setup'],
    },
  ],

  /* Shared settings for all projects */
  use: {
    baseURL: 'https://automationteststore.com/',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  /* Global settings */
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
});
