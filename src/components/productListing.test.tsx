import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductListing from './productListing';
import { CartProvider, useCart } from '../context/cartContext';
import { productData } from '../assets/data/products';
import { CART_STORAGE_KEY, QTY_LIMIT_MESSAGE } from '../utils/cartStorage';
import { CartLimitNotice } from './cartLink';

const CartCount = () => {
  const { itemCount } = useCart();
  return <div data-testid="cart-count">{itemCount}</div>;
};

const renderListing = () =>
  render(
    <CartProvider>
      <MemoryRouter>
        <ProductListing
          openInquiry={jest.fn()}
          products={productData.slice(0, 1)}
        />
        <CartLimitNotice />
        <CartCount />
      </MemoryRouter>
    </CartProvider>
  );

describe('ProductListing add to cart', () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.gtag = jest.fn();
  });

  test('adds the feeder without leaving the listing and keeps inquire', async () => {
    renderListing();

    const details = screen.getByRole('link', { name: /view details/i });
    expect(details).toHaveAttribute('href', `/deer-feeders/${productData[0].slug}`);

    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    expect(await screen.findByTestId('cart-count')).toHaveTextContent('2');
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')[0]).toMatchObject({
      slug: productData[0].slug,
      name: productData[0].name,
      qty: 2,
      unitPrice: productData[0].price.retail,
    });
    expect(screen.getByRole('button', { name: /inquire for purchase/i })).toBeInTheDocument();
    expect(window.location.pathname).not.toBe(`/deer-feeders/${productData[0].slug}`);
  });

  test('refuses a 21st of the same slug and shows the limit message', async () => {
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

    expect(await screen.findByText(QTY_LIMIT_MESSAGE)).toBeInTheDocument();
    expect(screen.getByTestId('cart-count')).toHaveTextContent('20');
  });
});
