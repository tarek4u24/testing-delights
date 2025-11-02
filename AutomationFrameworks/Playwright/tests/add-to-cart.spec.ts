import { test, expect } from '@playwright/test';
test.describe('🛒 EverShop - Add to Cart Flow', () => {
  test('User can add a product to the cart', async ({ page }) => {
    const productName = 'Striped Cotton Sweater';

    // Step 1: Visit homepage
    await page.goto('http://localhost:3000');
    await expect(page).toHaveTitle(/EverShop/i);
    console.log('✅ Homepage loaded');

    // Step 2: Locate and click on the product
    const productLink = page.getByRole('link', { name: productName });
    await expect(productLink).toBeVisible();
    await productLink.click();
    console.log(`✅ Navigated to product: ${productName}`);

    // Step 3: Verify product detail page
    const productHeading = page.getByRole('heading', { name: productName });
    await expect(productHeading).toBeVisible();

    // Step 4: Check price and add to cart
    // await expect(page.locator('[data-testid="product-price"]')).toBeVisible();
    const addToCartButton = page.getByRole('button', { name: /add to cart/i });
    await expect(addToCartButton).toBeEnabled();
    await addToCartButton.click();
    console.log('✅ Product added to cart');

    // Step 5: Navigate to cart
    const cartLink = page.getByRole('link', { name: /view cart/i });
    await expect(cartLink).toContainText('(1)');
    await cartLink.click();
    console.log('✅ Navigated to cart');

    // Step 6a: Verify cart item via test ID
    // const cartItem = page.locator('[data-testid="cart-item"]').first();
    // await expect(cartItem).toBeVisible();
    // await expect(cartItem.locator('[data-testid="cart-item-title"]')).toHaveText(productName);

    // Step 6b: Verify cart item via table structure
    const cartTable = page.locator('.items-table.listing');
    await expect(cartTable).toBeVisible();

    const productRow = cartTable.getByRole('row', { name: new RegExp(productName, 'i') });
    await expect(productRow).toBeVisible();

    // const quantityCell = productRow.getByText(/Qty:?\s*1/i, { exact: false });
    // const priceCell = productRow.getByText(/\$\d+/, { exact: false });

    // await expect(quantityCell).toBeVisible();
    // await expect(priceCell).toBeVisible();
    console.log('✅ Cart verification complete');
  });
});
