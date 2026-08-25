import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Product from './product';
import Cart from './cart';
import { productData } from '../assets/data/products';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
  productCanonical,
  productPageDescription,
  productPageTitle,
} from '../utils/siteMeta';
import { CartProvider } from '../context/cartContext';
import { CART_STORAGE_KEY } from '../utils/cartStorage';

const renderProduct = (slug: string, openInquiry: () => void = () => undefined) =>
  render(
    <HelmetProvider>
      <CartProvider>
        <MemoryRouter initialEntries={[`/deer-feeders/${slug}`]}>
          <Routes>
            <Route
              path="/deer-feeders/:slug"
              element={
                <Product
                  openInquiry={openInquiry}
                  testimonialData={[]}
                  isLoading={false}
                  setIsLoading={() => undefined}
                />
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

describe('Product helmet', () => {
  beforeEach(() => {
    document.title = '';
  });

  test('sets unique title, description, canonical, and og tags for a real feeder', async () => {
    const product = productData.find((item) => item.slug === '2-n-1');
    if (!product) {
      throw new Error('Expected 2-n-1 product');
    }

    renderProduct(product.slug);

    const title = productPageTitle(product.name);
    const description = productPageDescription(product.name, product.description);
    const canonical = productCanonical(product.slug);

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
    expect(metaContent('meta[property="og:image"]')).toBe(DEFAULT_OG_IMAGE);
    expect(metaContent('meta[name="twitter:image:src"]')).toBe(DEFAULT_TWITTER_IMAGE);
    expect(canonical).toBe('https://pgmoutfitters.com/deer-feeders/2-n-1');
    expect(screen.getAllByRole('button', { name: /add to cart/i }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole('button', { name: /inquire for purchase/i }).length).toBeGreaterThan(0);
  });

  test('unknown slugs use ProductNotFound instead of the product layout', async () => {
    renderProduct('not-a-real-feeder');

    await waitFor(() => {
      expect(metaContent('meta[name="robots"]')).toBe('noindex');
    });

    expect(document.title).not.toMatch(/Deer Feeder \| PGM Outfitters$/);
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
    expect(screen.getByRole('heading', { name: /deer feeder not found/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view deer feeders/i })).toHaveAttribute('href', '/');
    expect(document.getElementById('productPage')).toBeNull();
    expect(screen.queryByRole('button', { name: /inquire for purchase/i })).not.toBeInTheDocument();
  });
});

describe('Product add to cart', () => {
  const product = productData.find((item) => item.slug === '2-n-1');

  beforeEach(() => {
    if (!product) {
      throw new Error('Expected 2-n-1 product');
    }
    window.localStorage.clear();
    window.gtag = jest.fn();
    window.scrollTo = jest.fn();
  });

  test('add to cart from specs navigates to the cart', async () => {
    if (!product) {
      throw new Error('Expected 2-n-1 product');
    }

    renderProduct(product.slug);

    await userEvent.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);

    expect(screen.getByRole('heading', { name: /^cart$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(`${product.name} quantity`)).toHaveValue(1);
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')[0]).toMatchObject({
      slug: product.slug,
      qty: 1,
    });
  });

  test('add to cart from spotlight navigates to the cart', async () => {
    if (!product) {
      throw new Error('Expected 2-n-1 product');
    }

    renderProduct(product.slug);

    const spotlight = document.querySelector('.spotlight');
    if (!spotlight) {
      throw new Error('Expected spotlight');
    }

    await userEvent.click(within(spotlight as HTMLElement).getByRole('button', { name: /add to cart/i }));

    expect(screen.getByRole('heading', { name: /^cart$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(`${product.name} quantity`)).toHaveValue(1);
  });

  test('increments a slug already in the cart then navigates to the cart', async () => {
    if (!product) {
      throw new Error('Expected 2-n-1 product');
    }

    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ slug: product.slug, name: product.name, qty: 1, unitPrice: product.price.retail }])
    );

    renderProduct(product.slug);

    await userEvent.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);

    expect(screen.getByRole('heading', { name: /^cart$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(`${product.name} quantity`)).toHaveValue(2);
  });

  test('inquire stays on the product page and does not add to the cart', async () => {
    if (!product) {
      throw new Error('Expected 2-n-1 product');
    }

    const openInquiry = jest.fn();
    renderProduct(product.slug, openInquiry);

    await userEvent.click(screen.getAllByRole('button', { name: /inquire for purchase/i })[0]);

    expect(openInquiry).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('heading', { name: /^cart$/i })).not.toBeInTheDocument();
    expect(document.getElementById('productPage')).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')).toEqual([]);
  });
});

