import fs from 'fs';
import path from 'path';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { dealerData } from '../assets/data/dealers';
import { productData } from '../assets/data/products';
import { CartProvider } from '../context/cartContext';
import { dealerMapsEmbedUrl } from '../utils/dealerAddress';
import { dealerPath } from '../utils/dealerPath';
import {
  dealerCanonical,
  dealerPageDescription,
  dealerPageTitle,
} from '../utils/siteMeta';
import App from './app';
import Cart from './cart';
import DealerPage from './dealerPage';

const EXPECTED_DEALER_SLUGS = [
  'renegade-firearms',
  'delta-outdoors',
  'russell-feed-supply-decatur',
  'j-and-l-sales',
  'huntin-store',
  'oklaunion-outdoors',
  'wes-tex-steel',
  'potts-feed-store',
];

const renderDealer = (slug: string, openInquiry: () => void = () => undefined) =>
  render(
    <HelmetProvider>
      <CartProvider>
        <MemoryRouter initialEntries={[dealerPath(slug)]}>
          <Routes>
            <Route
              path="/dealers/:slug"
              element={
                <DealerPage openInquiry={openInquiry} productData={productData} />
              }
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </HelmetProvider>
  );

const metaContent = (selector: string) =>
  document.head.querySelector(selector)?.getAttribute('content');

const jsonLd = () => {
  const script = document.querySelector('script[type="application/ld+json"]');
  if (!script?.textContent) {
    return null;
  }
  return JSON.parse(script.textContent);
};

describe('Dealer page helmet', () => {
  beforeEach(() => {
    document.title = '';
    window.scrollTo = jest.fn();
  });

  test.each(EXPECTED_DEALER_SLUGS)(
    'sets unique title, description, canonical, and og tags for %s',
    async (slug) => {
      const dealer = dealerData.find((item) => item.slug === slug);
      if (!dealer) {
        throw new Error(`Expected ${slug} dealer`);
      }

      renderDealer(slug);

      const title = dealerPageTitle(dealer.name);
      const description = dealerPageDescription(
        dealer.name,
        dealer.address.city,
        dealer.address.state
      );
      const canonical = dealerCanonical(dealer.slug);

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
      expect(metaContent('meta[name="twitter:title"]')).toBe(title);
      expect(metaContent('meta[name="twitter:description"]')).toBe(description);
      expect(canonical).toBe(`https://pgmoutfitters.com/dealers/${slug}`);
    }
  );

  test('unknown slugs use DealerNotFound instead of a fake dealer title', async () => {
    renderDealer('not-a-real-dealer');

    await waitFor(() => {
      expect(metaContent('meta[name="robots"]')).toBe('noindex');
    });

    expect(document.title).not.toMatch(/\| PGM Outfitters Dealer$/);
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(screen.getByRole('heading', { name: /dealer not found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view deer feeders/i })).toHaveAttribute('href', '/');
    expect(document.querySelector('.dealerPage')).toBeNull();
    expect(document.querySelector('script[type="application/ld+json"]')).toBeNull();
  });
});

describe('Dealer page content', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
    window.localStorage.clear();
    window.gtag = jest.fn();
  });

  test('renders address, titled map embed, LocalBusiness JSON-LD, and the feeder listing', () => {
    const dealer = dealerData.find((item) => item.slug === 'renegade-firearms');
    if (!dealer) {
      throw new Error('Expected renegade-firearms dealer');
    }

    renderDealer(dealer.slug);

    expect(screen.getByRole('heading', { name: dealer.name })).toBeInTheDocument();
    expect(screen.getByText(dealer.address.street)).toBeInTheDocument();
    expect(
      screen.getByText(`${dealer.address.city}, ${dealer.address.state} ${dealer.address.zip}`)
    ).toBeInTheDocument();

    const map = screen.getByTitle(`Map of ${dealer.name}`);
    expect(map.tagName).toBe('IFRAME');
    expect(map).toHaveAttribute('src', dealerMapsEmbedUrl(dealer.address));

    const data = jsonLd();
    expect(data).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: dealer.name,
      url: dealerCanonical(dealer.slug),
      website: dealer.link,
      address: {
        '@type': 'PostalAddress',
        streetAddress: dealer.address.street,
        addressLocality: dealer.address.city,
        addressRegion: dealer.address.state,
        postalCode: dealer.address.zip,
      },
    });

    expect(screen.getAllByRole('button', { name: /add to cart/i }).length).toBe(
      productData.length
    );
    expect(screen.getByRole('button', { name: /inquire for purchase/i })).toBeInTheDocument();
    productData.forEach((product) => {
      expect(screen.getByRole('heading', { name: product.name })).toBeInTheDocument();
    });
  });

  test("omits the website control for Huntin' Store while keeping address and map", () => {
    const dealer = dealerData.find((item) => item.slug === 'huntin-store');
    if (!dealer) {
      throw new Error('Expected huntin-store dealer');
    }

    renderDealer(dealer.slug);

    expect(screen.getByRole('heading', { name: dealer.name })).toBeInTheDocument();
    expect(screen.getByText(dealer.address.street)).toBeInTheDocument();
    expect(screen.getByTitle(`Map of ${dealer.name}`)).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /^website$/i })).not.toBeInTheDocument();
    expect(document.querySelector('a[href="link"]')).toBeNull();
    expect(jsonLd()?.website).toBeUndefined();
  });

  test('inquire stays available the same way as the homepage listing', async () => {
    const openInquiry = jest.fn();
    renderDealer('delta-outdoors', openInquiry);

    await userEvent.click(screen.getByRole('button', { name: /inquire for purchase/i }));

    expect(openInquiry).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('heading', { name: /^cart$/i })).not.toBeInTheDocument();
  });

  test('add to cart from the dealer listing navigates to the cart', async () => {
    renderDealer('delta-outdoors');

    await userEvent.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);

    expect(screen.getByRole('heading', { name: /^cart$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(`${productData[0].name} quantity`)).toHaveValue(1);
  });

  test('scrolls the window to the top when a dealer page mounts', () => {
    renderDealer('potts-feed-store');
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});

describe('Dealer sitemap', () => {
  test('includes the eight known dealer URLs and omits cart, success, and unknown slugs', () => {
    const xml = fs.readFileSync(path.join(__dirname, '../../public/sitemap.xml'), 'utf8');

    EXPECTED_DEALER_SLUGS.forEach((slug) => {
      expect(xml).toContain(`https://pgmoutfitters.com/dealers/${slug}`);
    });

    expect(xml).not.toContain('/cart');
    expect(xml).not.toContain('/checkout/success');
    expect(xml).not.toContain('/dealers/not-a-real-dealer');
    expect(dealerData.map((dealer) => dealer.slug)).toEqual(EXPECTED_DEALER_SLUGS);
  });
});

describe('Dealer hard load', () => {
  const originalPath = window.location.pathname;

  afterEach(() => {
    window.history.pushState({}, '', originalPath || '/');
  });

  test('dismisses the boot loader on a hard load of /dealers/:slug', async () => {
    window.history.pushState({}, '', '/dealers/renegade-firearms');
    window.scrollTo = jest.fn();

    render(
      <HelmetProvider>
        <App productData={productData} testimonialData={[]} />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.querySelector('.loader')).not.toBeInTheDocument();
    });
    expect(screen.getByRole('heading', { level: 1, name: 'Renegade Firearms' })).toBeInTheDocument();
  });
});
