import { dealerData } from '../assets/data/dealers';
import { productData } from '../assets/data/products';
import { dealerPath } from './dealerPath';
import { productPath } from './productPath';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
  CART_TITLE,
  HOME_DESCRIPTION,
  HOME_HEADING,
  HOME_TITLE,
  PRIVACY_DESCRIPTION,
  PRIVACY_TITLE,
  TERMS_DESCRIPTION,
  TERMS_TITLE,
  dealerCanonical,
  dealerPageDescription,
  dealerPageTitle,
  dealerWebsiteUrl,
  homeCanonical,
  isAbsoluteHttpUrl,
  privacyCanonical,
  productCanonical,
  termsCanonical,
  productPageDescription,
  productPageTitle,
} from './siteMeta';

describe('siteMeta', () => {
  test('keeps the homepage title and uses the Shreveport-made meta description', () => {
    expect(HOME_HEADING).toBe('Next Generation Deer Feeders');
    expect(HOME_TITLE).toBe(`${HOME_HEADING} | PGM Outfitters`);
    expect(HOME_TITLE).toBe('Next Generation Deer Feeders | PGM Outfitters');
    expect(HOME_DESCRIPTION).toBe(
      'Shreveport-made deer feeders that run protein and corn on gravity or timer. Built by PGM Outfitters for hunters and dealers.'
    );
  });

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

  test('keeps the existing index.html S3 URLs as the site default images', () => {
    expect(DEFAULT_OG_IMAGE).toBe('https://init-public.s3.amazonaws.com/pgmFacebook.jpg');
    expect(DEFAULT_TWITTER_IMAGE).toBe('https://init-public.s3.amazonaws.com/pgmTwitter.jpg');
  });

  test('only treats http(s) values as absolute image URLs', () => {
    expect(isAbsoluteHttpUrl('https://pgmoutfitters.com/feeder.png')).toBe(true);
    expect(isAbsoluteHttpUrl('http://example.com/feeder.png')).toBe(true);
    expect(isAbsoluteHttpUrl('/static/media/2n1.png')).toBe(false);
    expect(isAbsoluteHttpUrl('')).toBe(false);
    expect(isAbsoluteHttpUrl(undefined)).toBe(false);
  });

  test('only treats non-Maps http(s) dealer links as websites', () => {
    expect(dealerWebsiteUrl('https://www.deltaoutdoors.com/')).toBe(
      'https://www.deltaoutdoors.com/'
    );
    expect(dealerWebsiteUrl('link')).toBeUndefined();
    expect(dealerWebsiteUrl('')).toBeUndefined();
    expect(
      dealerWebsiteUrl(
        'https://www.google.com/maps/place/Renegade+Firearms/@33.2912839,-91.0389018'
      )
    ).toBeUndefined();
    expect(
      dealerWebsiteUrl('https://maps.google.com/maps?q=3148+MS-1+Greenville+MS')
    ).toBeUndefined();
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

  test('builds dealer titles, descriptions, and canonicals from name, city, and slug', () => {
    expect(dealerPageTitle('Renegade Firearms')).toBe(
      'Renegade Firearms | PGM Outfitters Dealer'
    );
    expect(dealerPageDescription('Renegade Firearms', 'Greenville', 'MS')).toBe(
      'Shop Next Generation deer feeders at Renegade Firearms in Greenville, MS. Address, directions, and the full PGM Outfitters lineup.'
    );
    expect(dealerCanonical('renegade-firearms')).toBe(
      `https://pgmoutfitters.com${dealerPath('renegade-firearms')}`
    );
    expect(dealerCanonical('renegade-firearms')).toBe(
      'https://pgmoutfitters.com/dealers/renegade-firearms'
    );
  });

  test('home, feeders, and dealers have unique titles, descriptions, and canonicals', () => {
    const titles = [
      HOME_TITLE,
      ...productData.map((product) => productPageTitle(product.name)),
      ...dealerData.map((dealer) => dealerPageTitle(dealer.name)),
    ];
    const descriptions = [
      HOME_DESCRIPTION,
      ...productData.map((product) =>
        productPageDescription(product.name, product.description)
      ),
      ...dealerData.map((dealer) =>
        dealerPageDescription(dealer.name, dealer.address.city, dealer.address.state)
      ),
    ];
    const canonicals = [
      homeCanonical(),
      ...productData.map((product) => productCanonical(product.slug)),
      ...dealerData.map((dealer) => dealerCanonical(dealer.slug)),
    ];

    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    expect(new Set(canonicals).size).toBe(canonicals.length);
    expect(dealerData.map((dealer) => dealer.slug)).toContain('feed-garden-store');
    expect(dealerData).toHaveLength(9);
  });

  test('legal titles, descriptions, and canonicals are distinct from home, cart, and each other', () => {
    const titles = [HOME_TITLE, CART_TITLE, TERMS_TITLE, PRIVACY_TITLE];
    const descriptions = [HOME_DESCRIPTION, TERMS_DESCRIPTION, PRIVACY_DESCRIPTION];
    const canonicals = [homeCanonical(), termsCanonical(), privacyCanonical()];

    expect(TERMS_TITLE).toBe('Terms of Use | PGM Outfitters');
    expect(PRIVACY_TITLE).toBe('Privacy Policy | PGM Outfitters');
    expect(TERMS_DESCRIPTION).toBe(
      'Terms of use for pgmoutfitters.com, including pickup-only deer feeder orders at 908 Joseph St, Shreveport, LA.'
    );
    expect(PRIVACY_DESCRIPTION).toBe(
      'How PGM Outfitters collects and uses information from inquiries, checkout, and the website.'
    );
    expect(termsCanonical()).toBe('https://pgmoutfitters.com/terms');
    expect(privacyCanonical()).toBe('https://pgmoutfitters.com/privacy');
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descriptions).size).toBe(descriptions.length);
    expect(new Set(canonicals).size).toBe(canonicals.length);
  });
});
