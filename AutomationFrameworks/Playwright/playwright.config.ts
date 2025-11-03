import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  use: {
    headless: true,
    baseURL: 'http://localhost:3000',
    // 'only-on-failure' or 'on' or 'off'
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  outputDir: 'test-results',
});
