import { Page } from '@playwright/test';
import { SELECTORS } from '../selectors';

export class ItemPage {
  constructor(private page: Page) {}

  async addToCart() {
    // Attempt to click any "Add to cart" variant available.
    for (const sel of SELECTORS.addToCartCandidates) {
      const btn = this.page.locator(sel).first();
      if (await btn.count()) {
        if (await btn.isVisible().catch(() => false)) {
          await btn.click({ trial: false }).catch(() => {});
          // Give the page a moment to register the click / show overlay.
          await this.page.waitForLoadState('networkidle').catch(() => {});
          break;
        }
      }
    }
  }

  async waitForAddedToCartOrTimeout(timeoutMs = 8000) {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      for (const sel of SELECTORS.addedToCartSignals) {
        const loc = this.page.locator(sel).first();
        if (await loc.count()) {
          if (await loc.isVisible().catch(() => false)) return true;
        }
      }
      await this.page.waitForTimeout(250);
    }
    return false;
  }
}