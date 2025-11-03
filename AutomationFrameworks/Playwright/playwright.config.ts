import { defineConfig } from '@playwright/test';
import 'dotenv/config';
import { testFlags } from './framework/config/testFlags';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  use: {
    headless: true,
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    screenshot: testFlags.captureFailureScreenshots ? 'only-on-failure' : 'off',
    video: testFlags.retainVideo ? 'retain-on-failure' : 'off',
    trace: testFlags.enableTrace ? 'on-first-retry' : 'off',
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  outputDir: 'test-results',
});
