import fs from 'fs';
import path from 'path';
import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { productData } from '../assets/data/products';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
  PRIVACY_DESCRIPTION,
  PRIVACY_TITLE,
  TERMS_DESCRIPTION,
  TERMS_TITLE,
  privacyCanonical,
  termsCanonical,
} from '../utils/siteMeta';
import App from './app';
import Privacy from './privacy';
import Terms from './terms';

jest.mock('./inquiry', () => ({
  __esModule: true,
  default: () => null,
}));

const metaContent = (selector: string) =>
  document.head.querySelector(selector)?.getAttribute('content');

const renderLegal = (Page: typeof Terms) =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <Page />
      </MemoryRouter>
    </HelmetProvider>
  );

const expectHelmet = async (
  title: string,
  description: string,
  canonical: string
) => {
  await waitFor(() => {
    expect(document.title).toBe(title);
  });

  expect(metaContent('meta[name="description"]')).toBe(description);
  expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
    canonical
  );
  expect(metaContent('meta[property="og:title"]')).toBe(title);
  expect(metaContent('meta[property="og:description"]')).toBe(description);
  expect(metaContent('meta[property="og:url"]')).toBe(canonical);
  expect(metaContent('meta[property="og:image"]')).toBe(DEFAULT_OG_IMAGE);
  expect(metaContent('meta[name="twitter:title"]')).toBe(title);
  expect(metaContent('meta[name="twitter:description"]')).toBe(description);
  expect(metaContent('meta[name="twitter:image:src"]')).toBe(DEFAULT_TWITTER_IMAGE);
  expect(metaContent('meta[name="robots"]')).toBeNull();
};

describe('Legal pages helmet and copy', () => {
  beforeEach(() => {
    document.title = '';
    window.scrollTo = jest.fn();
  });

  test('terms sets unique title, description, canonical, h1, and last-updated', async () => {
    const { container } = renderLegal(Terms);

    await expectHelmet(TERMS_TITLE, TERMS_DESCRIPTION, termsCanonical());
    expect(termsCanonical()).toBe('https://pgmoutfitters.com/terms');

    const headings = container.querySelectorAll('h1');
    expect(headings).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1, name: 'Terms of Use' })).toBeInTheDocument();
    expect(screen.getByText('Last updated: August 28, 2026')).toBeInTheDocument();
    expect(
      screen.getByText(/These Terms of Use \("Terms"\) govern your use of pgmoutfitters.com/)
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: '3. Orders and payment' })).toBeInTheDocument();
    expect(
      screen.getByText(/Orders placed on the Site are for pickup only at 908 Joseph St/)
    ).toBeInTheDocument();
  });

  test('privacy sets unique title, description, canonical, h1, and last-updated', async () => {
    const { container } = renderLegal(Privacy);

    await expectHelmet(PRIVACY_TITLE, PRIVACY_DESCRIPTION, privacyCanonical());
    expect(privacyCanonical()).toBe('https://pgmoutfitters.com/privacy');

    const headings = container.querySelectorAll('h1');
    expect(headings).toHaveLength(1);
    expect(screen.getByRole('heading', { level: 1, name: 'Privacy Policy' })).toBeInTheDocument();
    expect(screen.getByText('Last updated: August 28, 2026')).toBeInTheDocument();
    expect(
      screen.getByText(/This Privacy Policy explains how PGM Outfitters/)
    ).toBeInTheDocument();
    expect(screen.getByText(/We do not sell your personal information/)).toBeInTheDocument();
    expect(
      screen.getByText(
        'Email delivery, to send the order summary to you and to kyle@cltdev.com, precisiongear@bellsouth.net, and sales@pgmoutfitters.com.'
      )
    ).toBeInTheDocument();
  });
});

describe('Legal sitemap', () => {
  test('includes terms and privacy and still omits cart, success, and unknown slugs', () => {
    const xml = fs.readFileSync(path.join(__dirname, '../../public/sitemap.xml'), 'utf8');

    expect(xml).toContain('https://pgmoutfitters.com/terms');
    expect(xml).toContain('https://pgmoutfitters.com/privacy');
    expect(xml).not.toContain('/cart');
    expect(xml).not.toContain('/checkout/success');
    expect(xml).not.toContain('/dealers/not-a-real-dealer');
    expect(xml).not.toContain('/deer-feeders/not-a-real-feeder');
  });
});

describe('Legal hard load', () => {
  const originalPath = window.location.pathname;

  afterEach(() => {
    window.history.pushState({}, '', originalPath || '/');
  });

  test.each([
    ['/terms', 'Terms of Use'],
    ['/privacy', 'Privacy Policy'],
  ])('dismisses the boot loader on a hard load of %s', async (pathName, heading) => {
    window.history.pushState({}, '', pathName);
    window.scrollTo = jest.fn();

    render(
      <HelmetProvider>
        <App productData={productData} testimonialData={[]} />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.querySelector('.loader')).not.toBeInTheDocument();
    });
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument();
  });
});
