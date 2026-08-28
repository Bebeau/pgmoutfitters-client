import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { dealerData } from '../assets/data/dealers';
import { productData } from '../assets/data/products';
import { CartProvider } from '../context/cartContext';
import Cart from './cart';
import DealerPage from './dealerPage';
import HomeHeading from './homeHeading';
import Privacy from './privacy';
import Product from './product';
import ScrollToTop from './scrollToTop';
import Terms from './terms';

const renderAt = (path: string) =>
  render(
    <HelmetProvider>
      <CartProvider>
        <MemoryRouter initialEntries={[path]}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomeHeading />} />
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
            <Route path="/dealers/:slug" element={<DealerPage productData={productData} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </HelmetProvider>
  );

describe('ScrollToTop', () => {
  beforeEach(() => {
    window.scrollTo = jest.fn();
  });

  test('scrolls to top and focuses the home H1', () => {
    renderAt('/');

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    const heading = screen.getByRole('heading', { level: 1, name: /next generation deer feeders/i });
    expect(document.activeElement).toBe(heading);
    expect(heading).toHaveAttribute('tabindex', '-1');
  });

  test('scrolls to top and focuses the product h2', () => {
    const product = productData.find((item) => item.slug === '2-n-1');
    if (!product) {
      throw new Error('Expected 2-n-1 product');
    }

    renderAt(`/deer-feeders/${product.slug}`);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    const heading = document.querySelector('#productPage .desc h2');
    expect(heading).toHaveTextContent(product.name);
    expect(document.activeElement).toBe(heading);
  });

  test('scrolls to top and focuses the dealer H1', () => {
    const dealer = dealerData.find((item) => item.slug === 'delta-outdoors');
    if (!dealer) {
      throw new Error('Expected delta-outdoors dealer');
    }

    renderAt(`/dealers/${dealer.slug}`);

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    const heading = screen.getByRole('heading', { level: 1, name: dealer.name });
    expect(document.activeElement).toBe(heading);
  });

  test('scrolls to top and focuses the cart H1', () => {
    renderAt('/cart');

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    const heading = screen.getByRole('heading', { level: 1, name: /^cart$/i });
    expect(document.activeElement).toBe(heading);
  });

  test('scrolls to top and focuses the terms H1', () => {
    renderAt('/terms');

    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    const heading = screen.getByRole('heading', { level: 1, name: 'Terms of Use' });
    expect(document.activeElement).toBe(heading);
  });
});
