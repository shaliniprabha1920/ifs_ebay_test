export const SELECTORS = {
  // Header / Cart
  cartCountCandidates: [
    '#gh-cart-n',           // historical
    'i#gh-cart-n',          // variant
    'span.gh-cart__count',  // variant
    'a#gh-cart .gh-cart__count', // another variant
  ],
  // Search
  searchInput: 'input#gh-ac',
  searchSubmit: 'input#gh-btn',
  // Results list
  firstResultLink: 'ul.srp-results li.s-item a.s-item__link',
  // PDP - Add to Cart
  addToCartCandidates: [
    'button#atcRedesignId_btn',
    'button#atcBtn_btn',
    'a#atcRedesignId_btn',
    'a#isCartBtn_btn',
    'button[aria-label*="Add to cart" i]',
    'button:has-text("Add to cart")',
    'a:has-text("Add to cart")',
    'button:has-text("Add to basket")',
    'a:has-text("Add to basket")',
  ],
  addedToCartSignals: [
    'text=Added to cart',
    '#atcRedesignId_overlay',
    '#ADDON_ITEMS_Modal', // sometimes shows suggested add-ons
  ],
  // Cookie / consent candidates
  cookieAcceptCandidates: [
    '#gdpr-banner-accept', // EU banner
    'button:has-text("Accept all")',
    'button:has-text("Accept")',
    'button:has-text("Got it")',
    'button:has-text("OK")',
  ]
};