import { dealerData } from '../assets/data/dealers';
import { productData } from '../assets/data/products';
import {
  DEALER_SLUGS,
  PRODUCT_SLUGS,
  SKIPPED_PATHS,
  getPrerenderPaths,
} from './prerenderRoutes';
import {
  HOME_DESCRIPTION,
  HOME_HEADING,
  HOME_TITLE,
  dealerCanonical,
  dealerPageDescription,
  dealerPageTitle,
  homeCanonical,
  productCanonical,
  productPageDescription,
  productPageTitle,
} from './siteMeta';

const {
  assertDistinctPageTitles,
  assertPrerenderedPage,
  getTitle,
} = require('../../scripts/assertPrerenderedHtml');

describe('prerender route list', () => {
  test('matches productData and dealerData and skips cart, success, and inquiry', () => {
    expect(PRODUCT_SLUGS).toEqual(productData.map((product) => product.slug));
    expect(DEALER_SLUGS).toEqual(dealerData.map((dealer) => dealer.slug));

    const paths = getPrerenderPaths();
    expect(paths[0]).toBe('/');
    expect(paths).toEqual([
      '/',
      '/terms',
      '/privacy',
      ...productData.map((product) => `/deer-feeders/${product.slug}`),
      ...dealerData.map((dealer) => `/dealers/${dealer.slug}`),
    ]);
    SKIPPED_PATHS.forEach((skipped) => {
      expect(paths).not.toContain(skipped);
    });
    expect(paths.join(' ')).not.toMatch(/inquiry/);
    expect(paths).not.toContain('/cart');
    expect(paths).not.toContain('/checkout/success');
    expect(paths).not.toContain('/deer-feeders/not-a-real-feeder');
    expect(paths).not.toContain('/dealers/not-a-real-dealer');
    expect(paths).toHaveLength(3 + productData.length + dealerData.length);
  });
});

describe('prerendered HTML smoke helper', () => {
  const homeHtml = `<!doctype html><html><head><title>${HOME_TITLE}</title><meta name="description" content="${HOME_DESCRIPTION}" /><link rel="canonical" href="${homeCanonical()}" /></head><body><div id="root"><h1>${HOME_HEADING}</h1></div><script src="/static/js/main.js"></script></body></html>`;
  const feeder = productData.find((item) => item.slug === '5-n-1');
  const dealer = dealerData.find((item) => item.slug === 'delta-outdoors');

  if (!feeder || !dealer) {
    throw new Error('Expected 5-n-1 and delta-outdoors');
  }

  const feederTitle = productPageTitle(feeder.name);
  const dealerTitle = dealerPageTitle(dealer.name);
  const feederHtml = `<!doctype html><html><head><title>${feederTitle}</title><meta name="description" content="${productPageDescription(feeder.name, feeder.description)}" /><link rel="canonical" href="${productCanonical(feeder.slug)}" /></head><body><div id="root"><div id="productPage"><h2>${feeder.name}</h2></div></div><script></script></body></html>`;
  const dealerHtml = `<!doctype html><html><head><title>${dealerTitle}</title><meta name="description" content="${dealerPageDescription(dealer.name, dealer.address.city, dealer.address.state)}" /><link rel="canonical" href="${dealerCanonical(dealer.slug)}" /></head><body><div id="root"><div class="dealerPage"><h1>${dealer.name}</h1></div></div><script></script></body></html>`;

  test('accepts a page with its own title, description, canonical, and #root body', () => {
    assertPrerenderedPage(feederHtml, {
      title: feederTitle,
      description: productPageDescription(feeder.name, feeder.description),
      canonical: productCanonical(feeder.slug),
      contentIncludes: [feeder.name],
    });
  });

  test('homepage, one feeder, and one dealer must have their own titles', () => {
    expect(getTitle(homeHtml)).toBe(HOME_TITLE);
    expect(getTitle(feederHtml)).toBe(feederTitle);
    expect(getTitle(dealerHtml)).toBe(dealerTitle);
    expect(feederTitle).not.toBe(HOME_TITLE);
    expect(dealerTitle).not.toBe(HOME_TITLE);
    expect(dealerTitle).not.toBe(feederTitle);
    assertDistinctPageTitles([
      { html: homeHtml },
      { html: feederHtml },
      { html: dealerHtml },
    ]);
  });

  test('fails when every file still has the homepage title or an empty #root', () => {
    expect(() =>
      assertDistinctPageTitles([{ html: homeHtml }, { html: homeHtml }, { html: homeHtml }])
    ).toThrow(/not unique/);
    expect(() =>
      assertPrerenderedPage(
        `<html><head><title>${feederTitle}</title><meta name="description" content="x" /><link rel="canonical" href="${productCanonical(feeder.slug)}" /></head><body><div id="root"></div><script></script></body></html>`,
        {
          title: feederTitle,
          description: 'x',
          canonical: productCanonical(feeder.slug),
          contentIncludes: [feeder.name],
        }
      )
    ).toThrow(/Empty #root/);
  });
});
