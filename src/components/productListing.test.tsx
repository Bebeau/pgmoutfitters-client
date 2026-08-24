import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import ProductListing from './productListing';
import { CartProvider, useCart } from '../context/cartContext';
import { productData } from '../assets/data/products';
import { CART_STORAGE_KEY } from '../utils/cartStorage';

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
});
