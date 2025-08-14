# Playwright + TypeScript: eBay Cart Automation

## Scenario
Verify that an item can be added to the cart on eBay.

Steps automated:
1. Open browser
2. Navigate to ebay.com
3. Search for `book`
4. Click the first book in the list
5. On the item listing page, click **Add to cart**
6. Verify the cart count in the header increases

## Prerequisites
- Node.js 18+
- (First run) Install Playwright browsers

## Quick Start
```bash
npm i
npx playwright install
npm test
```

### Run headed (to watch the browser)
```bash
npm run test:headed
```

### UI mode (explore / debug)
```bash
npm run test:ui
```

## Notes on Robustness
- Selectors are resilient and include multiple fallbacks.
- The script gracefully dismisses cookie/consent banners if they appear.
- If the product opens in a new tab/window, the test automatically switches to it.
- The test verifies that the cart count increases from its initial value.

## Config
- You can override the base URL using `.env`:
  ```
  EBAY_BASE_URL=https://www.ebay.com
  ```
- See `playwright.config.ts` for more options.