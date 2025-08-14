import { Page, expect } from '@playwright/test';
import { SELECTORS } from '../selectors';

export class ResultsPage {
  constructor(private page: Page) {}

  //   async waitForResults() {
  //   // Replace the selector below with the actual selector for a search result item
  //   await this.page.waitForSelector('.srp-river-results', { state: 'visible' });
  // }

  async clickFirstResult(): Promise<Page> {
    const first = this.page.locator(SELECTORS.firstResultLink).first();
    await expect(first).toBeVisible();

    const [popup] = await Promise.all([
      this.page.waitForEvent('popup').catch(() => null),
      first.click({ button: 'left' }),
    ]);

    if (popup) {
      await popup.waitForLoadState('domcontentloaded');
      return popup;
    }
    await this.page.waitForLoadState('domcontentloaded');
    return this.page;
  }
}