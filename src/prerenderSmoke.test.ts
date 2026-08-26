import fs from 'fs';
import path from 'path';
import { dealerData } from './assets/data/dealers';
import { productData } from './assets/data/products';
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
} from './utils/siteMeta';

const { assertDistinctPageTitles, assertPrerenderedPage, getTitle } = require('../scripts/assertPrerenderedHtml');

const buildDir = path.join(__dirname, '../build');
const homeFile = path.join(buildDir, 'index.html');
const feederFile = path.join(buildDir, 'deer-feeders/5-n-1/index.html');
const dealerFile = path.join(buildDir, 'dealers/delta-outdoors/index.html');
const hasBuiltHtml =
  fs.existsSync(homeFile) && fs.existsSync(feederFile) && fs.existsSync(dealerFile);

const describeBuilt = hasBuiltHtml ? describe : describe.skip;

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
});
