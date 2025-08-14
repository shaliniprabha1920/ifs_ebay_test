import { Page, expect } from '@playwright/test';
import { SELECTORS } from '../selectors';

export class HomePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
    await this.dismissCookieBanners();
    await expect(this.page.locator(SELECTORS.searchInput)).toBeVisible();
  }

  async search(term: string) {
    await this.page.fill(SELECTORS.searchInput, term);
    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      this.page.click(SELECTORS.searchSubmit)
    ]);
  }

  private async dismissCookieBanners() {
    for (const sel of SELECTORS.cookieAcceptCandidates) {
      const el = this.page.locator(sel).first();
      if (await el.isVisible().catch(() => false)) {
        await el.click().catch(() => {});
        break;
      }
    }
  }
}