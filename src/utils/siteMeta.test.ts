import { productData } from '../assets/data/products';
import { productPath } from './productPath';
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  homeCanonical,
  isAbsoluteHttpUrl,
  productCanonical,
  productPageDescription,
  productPageTitle,
} from './siteMeta';

describe('siteMeta', () => {
  test('builds the homepage canonical with a trailing slash', () => {
    expect(homeCanonical()).toBe('https://pgmoutfitters.com/');
  });

  test('builds product titles and canonicals from the product name and path helper', () => {
    expect(productPageTitle('2-N-1')).toBe('2-N-1 Deer Feeder | PGM Outfitters');
    expect(productPageTitle('XXX')).toBe('XXX Deer Feeder | PGM Outfitters');
    expect(productPageTitle('Rice Brand')).toBe('Rice Brand Deer Feeder | PGM Outfitters');
    expect(productPageTitle('Dock Feeder')).toBe('Dock Feeder | PGM Outfitters');
    expect(productPageTitle('dock feeder')).toBe('dock feeder | PGM Outfitters');
    expect(productPageTitle('Covey Cafe')).toBe('Covey Cafe Deer Feeder | PGM Outfitters');
    expect(productCanonical('2-n-1')).toBe(`https://pgmoutfitters.com${productPath('2-n-1')}`);
    expect(productCanonical('2-n-1')).toBe('https://pgmoutfitters.com/deer-feeders/2-n-1');
  });

  test('uses a non-empty product description and falls back to the template when empty', () => {
    expect(productPageDescription('2-N-1', '')).toBe(
      'The 2-N-1 deer feeder from PGM Outfitters. Built for hunters and dealers. Request pricing.'
    );
    expect(productPageDescription('2-N-1', '   ')).toBe(
      'The 2-N-1 deer feeder from PGM Outfitters. Built for hunters and dealers. Request pricing.'
    );
    expect(productPageDescription('2-N-1', 'A split gravity and spin feeder.')).toBe(
      'A split gravity and spin feeder.'
    );
  });

  test('only treats http(s) values as absolute image URLs', () => {
    expect(isAbsoluteHttpUrl('https://pgmoutfitters.com/feeder.png')).toBe(true);
    expect(isAbsoluteHttpUrl('http://example.com/feeder.png')).toBe(true);
    expect(isAbsoluteHttpUrl('/static/media/2n1.png')).toBe(false);
    expect(isAbsoluteHttpUrl('')).toBe(false);
    expect(isAbsoluteHttpUrl(undefined)).toBe(false);
  });

  test('home plus every real feeder have unique titles, descriptions, and canonicals', () => {
    const titles = [HOME_TITLE, ...productData.map((product) => productPageTitle(product.name))];
    const descriptions = [
      HOME_DESCRIPTION,
      ...productData.map((product) =>
        productPageDescription(product.name, product.description)
      ),
    ];
    const canonicals = [
      homeCanonical(),
      ...productData.map((product) => productCanonical(product.slug)),
    ];

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    expect(new Set(canonicals).size).toBe(canonicals.length);
    expect(productData).toHaveLength(11);
  });
});
