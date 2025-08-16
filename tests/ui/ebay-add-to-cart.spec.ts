import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import { ResultsPage } from '../../src/pages/ResultsPage';
import { ItemPage } from '../../src/pages/ItemPage';
import { Cart_Header } from '../../src/pages/Cart_Header';

test.describe('verify item can be added to Cart or not', () => {
  test('search book -> open first -> add to cart -> cart count increases', async ({ page }) => {
    const home = new HomePage(page);
    const cart_header = new Cart_Header(page);

    await home.goto();
    const initialCount = await cart_header.getCartCount();
  
    
    await home.search('book');
    const results = new ResultsPage(page);
    const pdp = await results.clickFirstResult();

    const headerOnPdp = new Cart_Header(pdp);
    const beforeCount = await headerOnPdp.getCartCount();
    
    const item = new ItemPage(pdp);
    await item.addToCart();
    await item.waitForAddedToCartOrTimeout(10000);

    // Wait briefly for the header cart badge to update
    await pdp.waitForTimeout(1500);
    const afterCount = await headerOnPdp.getCartCount();
  
    // If the page didn't expose the count change, fall back to the original page's header
    const finalCount = afterCount || (await cart_header.getCartCount());

    // Assert the count increased by at least 1 compared to the earliest observed count
    expect(finalCount).toBeGreaterThan(Math.max(initialCount, beforeCount));
  });
});