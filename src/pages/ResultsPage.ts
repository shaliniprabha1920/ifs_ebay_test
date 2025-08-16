import { Page, expect } from '@playwright/test';
import { SELECTORS } from '../selectors';

export class ResultsPage {
  constructor(private page: Page) {}

  async clickFirstResult(): Promise<Page> {
    const first = this.page.locator(SELECTORS.firstResultLink).first();
    await expect(first).toBeVisible();

    // Some results open in a new tab; handle both same-page and popup cases.
    const [maybePopup] = await Promise.all([
      this.page.waitForEvent('popup').catch(() => null),
      first.click({ button: 'left' }),
    ]);

    if (maybePopup) {
      await maybePopup.waitForLoadState('domcontentloaded');
      return maybePopup;
    }
    await this.page.waitForLoadState('domcontentloaded');
    return this.page;
  }
}