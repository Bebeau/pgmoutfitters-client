import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Product from './product';
import { productData } from '../assets/data/products';
import { productCanonical, productPageDescription, productPageTitle } from '../utils/siteMeta';

const renderProduct = (slug: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/deer-feeders/${slug}`]}>
        <Routes>
          <Route
            path="/deer-feeders/:slug"
            element={
              <Product
                openInquiry={() => undefined}
                testimonialData={[]}
                isLoading={false}
                setIsLoading={() => undefined}
              />
            }
          />
        </Routes>
      </MemoryRouter>
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
    expect(document.head.querySelector('meta[property="og:image"]')).toBeNull();
    expect(canonical).toBe('https://pgmoutfitters.com/deer-feeders/2-n-1');
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
