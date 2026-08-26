// Explicit prerender list only. Do not crawl. Keep in sync with productData
// and dealerData — src/utils/prerenderRoutes.test.ts asserts the slugs match.
const PRODUCT_SLUGS = [
  '1-n-1',
  '2-n-1',
  '3-n-1',
  '4-n-1',
  '5-n-1',
  'xxx',
  'rice-brand',
  'duel-tray',
  'backyard',
  'dock-feeder',
  'covey-cafe',
];

const DEALER_SLUGS = [
  'renegade-firearms',
  'delta-outdoors',
  'russell-feed-supply-decatur',
  'j-and-l-sales',
  'huntin-store',
  'oklaunion-outdoors',
  'wes-tex-steel',
  'potts-feed-store',
];

const SKIPPED_PATHS = ['/cart', '/checkout/success'];

const getPrerenderPaths = () => [
  '/',
  ...PRODUCT_SLUGS.map((slug) => `/deer-feeders/${slug}`),
  ...DEALER_SLUGS.map((slug) => `/dealers/${slug}`),
];

module.exports = {
  PRODUCT_SLUGS,
  DEALER_SLUGS,
  SKIPPED_PATHS,
  getPrerenderPaths,
};
