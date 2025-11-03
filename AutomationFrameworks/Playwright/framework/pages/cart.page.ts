import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly productName: string;
  readonly productLink: Locator;
  readonly productHeading: Locator;
  readonly addToCartButton: Locator;
  readonly cartLink: Locator;
  readonly cartTable: Locator;

  constructor(page: Page, productName: string) {
    this.page = page;
    this.productName = productName;
    this.productLink = page.getByRole('link', { name: productName });
    this.productHeading = page.getByRole('heading', { name: productName });
    this.addToCartButton = page.getByRole('button', { name: /add to cart/i });
    this.cartLink = page.getByRole('link', { name: /view cart/i });
    this.cartTable = page.locator('.items-table.listing');
  }

  async goToHome() {
    await this.page.goto('/');
  }

  async openProduct() {
    await this.productLink.click();
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async getProductRow() {
    return this.cartTable.getByRole('row', { name: new RegExp(this.productName, 'i') });
  }
}
