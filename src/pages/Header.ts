import { Page } from '@playwright/test';
import { SELECTORS } from '../selectors';

export class Header {
  constructor(private page: Page) {}

  async getCartCount(): Promise<number> {
    for (const sel of SELECTORS.cartCountCandidates) {
      const el = this.page.locator(sel).first();
      if (await el.count()) {
        const txt = (await el.textContent())?.trim() || '';
        const m = txt.match(/\d+/);
        if (m) return parseInt(m[0], 10);
      }
    }
    return 0;
  }
}