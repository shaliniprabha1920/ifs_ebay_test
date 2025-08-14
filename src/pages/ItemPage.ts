import { Page } from '@playwright/test';
import { SELECTORS } from '../selectors';

export class ItemPage {
  constructor(private page: Page) {}

 async addToCart() {
    for (const sel of SELECTORS.addToCartCandidates) {
      const el = this.page.locator(sel).first();
      if (await el.count() && await el.isVisible().catch(() => false)) {
        await el.click();
        await this.page.waitForLoadState('networkidle');
        return;
      }
    }
    throw new Error('Add to Cart button/link not found!');
  }
}