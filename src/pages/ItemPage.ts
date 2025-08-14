import { Page } from '@playwright/test';
import { SELECTORS } from '../selectors';

export class ItemPage {
  constructor(private page: Page) {}

  async addToCart() {
    for (const sel of SELECTORS.addToCartCandidates) {
      const btn = this.page.locator(sel).first();
      if (await btn.count()) {
        if (await btn.isVisible().catch(() => false)) {
          await btn.click({ trial: false }).catch(() => {});
          await this.page.waitForLoadState('networkidle').catch(() => {});
          break;
        }
      }
    }
  }
}