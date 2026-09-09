import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from './app';
import Product from './product';
import Footer from './footer';
import { CartProvider } from '../context/cartContext';
import { productData } from '../assets/data/products';
import { testimonialData } from '../assets/data/testimonials';
import { headingLevels, headingOrderSkips } from '../utils/headingOrder';

const renderApp = () =>
  render(
    <HelmetProvider>
      <App
        productData={productData}
        testimonialData={testimonialData}
        initialLoading={false}
      />
    </HelmetProvider>
  );

const renderProduct = (slug: string) =>
  render(
    <HelmetProvider>
      <CartProvider>
        <MemoryRouter initialEntries={[`/deer-feeders/${slug}`]}>
          <Routes>
            <Route
              path="/deer-feeders/:slug"
              element={
                <Product
                  testimonialData={[]}
                  isLoading={false}
                  setIsLoading={() => undefined}
                />
              }
            />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </HelmetProvider>
  );

describe('PageSpeed phase C accessibility', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  test('homepage exposes a main landmark, named controls, and sequential headings', async () => {
    renderApp();

    await waitFor(() => {
      expect(document.querySelector('.homeHeading h1')).toBeInTheDocument();
    });

    expect(document.querySelectorAll('main')).toHaveLength(1);
    expect(document.querySelector('main .homeHeading')).not.toBeNull();
    expect(document.querySelector('main footer')).toBeNull();

    expect(screen.getByRole('link', { name: 'PGM Outfitters home' })).toHaveAttribute(
      'href',
      '/'
    );
    expect(screen.getByRole('link', { name: /cart, 0 items/i })).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /add to cart/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('button', { name: 'Show next testimonial' })).toBeInTheDocument();
    expect(document.querySelector('.testimonialWrap')).toHaveClass('show');

    screen.getAllByRole('button').forEach((button) => {
      expect(button).toHaveAccessibleName();
    });
    screen.getAllByRole('link').forEach((link) => {
      expect(link).toHaveAccessibleName();
    });

    expect(document.querySelectorAll('.productCard h4, .productCard h5')).toHaveLength(0);
    expect(headingOrderSkips(headingLevels(document.body))).toEqual([]);
  });

  test('footer logo link is named without relying on the SVG', () => {
    render(
      <CartProvider>
        <MemoryRouter>
          <Footer />
        </MemoryRouter>
      </CartProvider>
    );

    const home = screen.getByRole('link', { name: 'PGM Outfitters home' });
    expect(home).toHaveAttribute('href', '/');
    expect(home.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  test('product gallery thumbs and close control have accessible names', async () => {
    const product = productData.find((item) => item.slug === '2-n-1');
    if (!product) {
      throw new Error('Expected 2-n-1 product');
    }

    renderProduct(product.slug);

    const gallery = document.querySelector('#productPage .imageGallery') as HTMLElement;
    expect(gallery).not.toBeNull();
    const thumbs = within(gallery).getAllByRole('button');
    expect(thumbs.length).toBeGreaterThan(0);
    thumbs.forEach((thumb) => {
      expect(thumb).toHaveAccessibleName();
    });

    await userEvent.click(thumbs[0]);

    const modal = document.querySelector('#productPage .imageModal') as HTMLElement;
    expect(modal).toHaveClass('show');
    expect(within(modal).getByRole('button', { name: 'Close' })).toHaveClass('closeModal');
    expect(headingOrderSkips(headingLevels(document.body))).toEqual([]);
  });
});
