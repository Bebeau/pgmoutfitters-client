import fs from 'fs';
import path from 'path';
import { dealerData } from './assets/data/dealers';
import { productData } from './assets/data/products';
import {
  HOME_DESCRIPTION,
  HOME_HEADING,
  HOME_TITLE,
  PRIVACY_TITLE,
  TERMS_TITLE,
  dealerCanonical,
  dealerPageDescription,
  dealerPageTitle,
  homeCanonical,
  productCanonical,
  productPageDescription,
  productPageTitle,
} from './utils/siteMeta';
import { headingLevels, headingOrderSkips } from './utils/headingOrder';

const { assertDistinctPageTitles, assertPrerenderedPage, getTitle } = require('../scripts/assertPrerenderedHtml');

const buildDir = path.join(__dirname, '../build');
const homeFile = path.join(buildDir, 'index.html');
const feederFile = path.join(buildDir, 'deer-feeders/5-n-1/index.html');
const dealerFile = path.join(buildDir, 'dealers/delta-outdoors/index.html');
const termsFile = path.join(buildDir, 'terms/index.html');
const privacyFile = path.join(buildDir, 'privacy/index.html');
const hasBuiltHtml =
  fs.existsSync(homeFile) && fs.existsSync(feederFile) && fs.existsSync(dealerFile);
const hasLegalHtml = fs.existsSync(termsFile) && fs.existsSync(privacyFile);

const describeBuilt = hasBuiltHtml ? describe : describe.skip;
const describeLegalBuilt = hasLegalHtml ? describe : describe.skip;

describeBuilt('built prerendered HTML smoke', () => {
  test('homepage, one feeder, and one dealer contain their own titles', () => {
    const feeder = productData.find((item) => item.slug === '5-n-1');
    const dealer = dealerData.find((item) => item.slug === 'delta-outdoors');
    if (!feeder || !dealer) {
      throw new Error('Expected 5-n-1 and delta-outdoors');
    }

    const homeHtml = fs.readFileSync(homeFile, 'utf8');
    const feederHtml = fs.readFileSync(feederFile, 'utf8');
    const dealerHtml = fs.readFileSync(dealerFile, 'utf8');
    const feederTitle = productPageTitle(feeder.name);
    const dealerTitle = dealerPageTitle(dealer.name);

    expect(getTitle(homeHtml)).toBe(HOME_TITLE);
    expect(getTitle(feederHtml)).toBe(feederTitle);
    expect(getTitle(dealerHtml)).toBe(dealerTitle);
    expect(getTitle(feederHtml)).not.toBe(HOME_TITLE);
    expect(getTitle(dealerHtml)).not.toBe(HOME_TITLE);
    assertDistinctPageTitles([{ html: homeHtml }, { html: feederHtml }, { html: dealerHtml }]);

    assertPrerenderedPage(homeHtml, {
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      canonical: homeCanonical(),
      contentIncludes: [HOME_HEADING],
    });
    assertPrerenderedPage(feederHtml, {
      title: feederTitle,
      description: productPageDescription(feeder.name, feeder.description),
      canonical: productCanonical(feeder.slug),
      contentIncludes: [feeder.name],
    });
    assertPrerenderedPage(dealerHtml, {
      title: dealerTitle,
      description: dealerPageDescription(dealer.name, dealer.address.city, dealer.address.state),
      canonical: dealerCanonical(dealer.slug),
      contentIncludes: [dealer.name],
    });
  });

  test('homepage prerender includes phase C landmarks and does not skip headings', () => {
    const homeHtml = fs.readFileSync(homeFile, 'utf8');
    const feederHtml = fs.readFileSync(feederFile, 'utf8');

    expect(homeHtml).toContain('<main>');
    expect(homeHtml).toContain('aria-label="PGM Outfitters home"');
    expect(homeHtml).toContain('testimonialWrap show');
    expect(homeHtml).toContain('fetchpriority="high"');
    expect(homeHtml).toContain('<h1 tabindex="-1">');
    expect(homeHtml).not.toMatch(/productCard[\s\S]{0,800}<h4/);

    const homeRoot = document.createElement('div');
    homeRoot.innerHTML = homeHtml;
    expect(headingOrderSkips(headingLevels(homeRoot))).toEqual([]);

    expect(feederHtml).toContain('<main>');
    expect(feederHtml).toContain('aria-label="Close"');
    const feederRoot = document.createElement('div');
    feederRoot.innerHTML = feederHtml;
    expect(headingOrderSkips(headingLevels(feederRoot))).toEqual([]);
  });
});

describeLegalBuilt('built prerendered legal HTML smoke', () => {
  test('terms and privacy contain their own titles', () => {
    const termsHtml = fs.readFileSync(termsFile, 'utf8');
    const privacyHtml = fs.readFileSync(privacyFile, 'utf8');

    expect(getTitle(termsHtml)).toBe(TERMS_TITLE);
    expect(getTitle(privacyHtml)).toBe(PRIVACY_TITLE);
    expect(getTitle(termsHtml)).not.toBe(HOME_TITLE);
    expect(getTitle(privacyHtml)).not.toBe(HOME_TITLE);
    expect(getTitle(privacyHtml)).not.toBe(getTitle(termsHtml));
  });
});
