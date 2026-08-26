import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductListing from './productListing';
import Cart from './cart';
import { CartProvider } from '../context/cartContext';
import { productData } from '../assets/data/products';
import { CART_STORAGE_KEY, QTY_LIMIT_MESSAGE } from '../utils/cartStorage';
import { CartLimitNotice } from './cartLink';

const renderListing = (openInquiry = jest.fn()) =>
  render(
    <HelmetProvider>
      <CartProvider>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ProductListing
                    openInquiry={openInquiry}
                    products={productData.slice(0, 1)}
                  />
                  <CartLimitNotice />
                </>
              }
            />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </HelmetProvider>
  );

describe('ProductListing add to cart', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.gtag = jest.fn();
    window.scrollTo = jest.fn();
  });

  test('adds the feeder and navigates to the cart', async () => {
    renderListing();

    const details = screen.getByRole('link', { name: /view details/i });
    expect(details).toHaveAttribute('href', `/deer-feeders/${productData[0].slug}`);

    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(screen.getByRole('heading', { name: /^cart$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: productData[0].name })).toBeInTheDocument();
    expect(screen.getByLabelText(`${productData[0].name} quantity`)).toHaveValue(1);
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')[0]).toMatchObject({
      slug: productData[0].slug,
      name: productData[0].name,
      qty: 1,
      unitPrice: productData[0].price.retail,
    });
  });

  test('increments a slug already in the cart then navigates to the cart', async () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([
        {
          slug: productData[0].slug,
          name: productData[0].name,
          qty: 1,
          unitPrice: productData[0].price.retail,
        },
      ])
    );

    renderListing();

    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(screen.getByRole('heading', { name: /^cart$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(`${productData[0].name} quantity`)).toHaveValue(2);
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')[0]).toMatchObject({
      slug: productData[0].slug,
      qty: 2,
    });
  });

  test('navigates to the cart at qty 20 without incrementing past the cap', async () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([
        {
          slug: productData[0].slug,
          name: productData[0].name,
          qty: 20,
          unitPrice: productData[0].price.retail,
        },
      ])
    );

    renderListing();

    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(screen.getByRole('heading', { name: /^cart$/i })).toBeInTheDocument();
    expect(screen.getByLabelText(`${productData[0].name} quantity`)).toHaveValue(20);
    expect(screen.getByText(QTY_LIMIT_MESSAGE)).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')[0]).toMatchObject({
      slug: productData[0].slug,
      qty: 20,
    });
  });

  test('keeps inquire on the listing and does not add to the cart or navigate', async () => {
    const openInquiry = jest.fn();
    renderListing(openInquiry);

    await userEvent.click(screen.getByRole('button', { name: /inquire for purchase/i }));

    expect(openInquiry).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole('heading', { name: /^cart$/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')).toEqual([]);
  });
});
