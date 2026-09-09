import { contrastRatio } from './colorContrast';

// Keep in sync with $green / $greenAccessible in src/assets/scss/_variables.scss
const BRAND_GREEN = '#7C8969';
const ACCESSIBLE_GREEN = '#6B7759';
const WHITE = '#FFFFFF';

describe('cart and add-to-cart contrast', () => {
  test('legacy brand green fails WCAG AA for normal white text', () => {
    expect(contrastRatio(WHITE, BRAND_GREEN)).toBeLessThan(4.5);
  });

  test('accessible green used by Cart and Add to Cart meets WCAG AA', () => {
    expect(contrastRatio(WHITE, ACCESSIBLE_GREEN)).toBeGreaterThanOrEqual(4.5);
  });
});
