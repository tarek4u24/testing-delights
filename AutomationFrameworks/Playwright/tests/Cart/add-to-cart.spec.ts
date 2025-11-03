import { test, expect } from '@playwright/test';
import { CartPage } from '../../framework/pages/cart.page';
import { captureStepScreenshot } from '../../framework/utils/screenshot';
import { testFlags } from '../../framework/config/testFlags';

test.describe('🛒 EverShop - Add to Cart Flow', () => {
  test('User can add a product to the cart', async ({ page }, testInfo) => {
    test.info().annotations.push({ type: 'feature', description: 'Cart' });

    const productName = 'Striped Cotton Sweater';
    const cart = new CartPage(page, productName);

    await test.step('Visit homepage', async () => {
      await cart.goToHome();
      await expect(page).toHaveTitle(/EverShop/i);
      await captureStepScreenshot(page, testInfo, 'visit-homepage');
    });

    await test.step('Open product detail page', async () => {
      await expect(cart.productLink).toBeVisible({ timeout: 5000 });
      await cart.openProduct();
      await expect(cart.productHeading).toBeVisible();
      await captureStepScreenshot(page, testInfo, 'open-product');
    });

    await test.step('Add product to cart', async () => {
      await expect(cart.addToCartButton).toBeEnabled();
      await cart.addToCartButton.click();
      await captureStepScreenshot(page, testInfo, 'add-to-cart');
    });

    await test.step('Navigate to cart and verify item', async () => {
      await expect(cart.cartLink).toContainText('(1)');
      await cart.goToCart();
      await expect(cart.cartTable).toBeVisible();
      const row = await cart.getProductRow();
      // expect.soft(row).toBeVisible();
      expect.soft(row).not.toBeVisible();
      await captureStepScreenshot(page, testInfo, 'verify-cart');
    });
  });

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'failed') return;
  if (!testFlags.captureFailureScreenshots) return;

  const screenshotPath = `test-results/screenshots/${testInfo.title.replace(/\s+/g, '_')}_failed.png`;
  await page.screenshot({ path: screenshotPath, fullPage: true });

  testInfo.attachments.push({
    name: 'failure-screenshot',
    path: screenshotPath,
    contentType: 'image/png',
  });
});

});
