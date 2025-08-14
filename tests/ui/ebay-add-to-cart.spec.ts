import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { ResultsPage } from '../../src/pages/ResultsPage';
import { ItemPage } from '../../src/pages/ItemPage';
import { Header } from '../../src/pages/Header';

test.describe('Verify item is added to Cart', () => {
  test('search book open first-> add to cart-> cart count increases', async ({ page }) => {
    const home = new HomePage(page);
    const header = new Header(page);

    await home.goto();
    const initialCount = await header.getCartCount();

    await home.search('book');
    const results = new ResultsPage(page);
    const pdp = await results.clickFirstResult();

    const headerOnPdp = new Header(pdp);
    const beforeCount = await headerOnPdp.getCartCount();

    const item = new ItemPage(pdp);
    await item.addToCart();
  
    await pdp.waitForTimeout(1500);
    const afterCount = await headerOnPdp.getCartCount();

    const finalCount = afterCount || (await header.getCartCount());
    expect(finalCount).toBeGreaterThan(Math.max(initialCount, beforeCount));
  });
});