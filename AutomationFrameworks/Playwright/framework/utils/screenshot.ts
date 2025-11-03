import { Page, TestInfo } from '@playwright/test';
import { testFlags } from '../config/testFlags';

export async function captureStepScreenshot(page: Page, testInfo: TestInfo, step: string) {
  if (!testFlags.captureStepScreenshots) return;

  const file = `test-results/screenshots/${testInfo.title.replace(/\s+/g, '_')}_${step}.png`;
  await page.screenshot({ path: file });
  testInfo.attachments.push({ name: step, path: file, contentType: 'image/png' });
}
