import { render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CartSuccess from './cartSuccess';
import { CartProvider, useCart } from '../context/cartContext';
import { CART_STORAGE_KEY } from '../utils/cartStorage';
import { CART_SUCCESS_TITLE } from '../utils/siteMeta';
import { fetchCheckoutSession } from '../utils/checkoutApi';

jest.mock('../utils/checkoutApi', () => ({
  fetchCheckoutSession: jest.fn(),
}));

const mockedFetchCheckoutSession = fetchCheckoutSession as jest.Mock;

const CartCount = () => {
  const { itemCount } = useCart();
  return <div data-testid="cart-count">{itemCount}</div>;
};

const renderSuccess = (search: string) =>
  render(
    <HelmetProvider>
      <CartProvider>
        <MemoryRouter initialEntries={[`/cart/success${search}`]}>
          <Routes>
            <Route
              path="/cart/success"
              element={
                <>
                  <CartSuccess />
                  <CartCount />
                </>
              }
            />
          </Routes>
        </MemoryRouter>
      </CartProvider>
    </HelmetProvider>
  );

describe('Cart success page', () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockedFetchCheckoutSession.mockReset();
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ slug: '2-n-1', name: '2-N-1', qty: 1, unitPrice: 1300 }])
    );
  });

  test('does not clear the cart from the success page load alone', async () => {
    mockedFetchCheckoutSession.mockResolvedValue({ paid: false, status: 'open' });

    renderSuccess('?session_id=cs_test_unpaid');

    await waitFor(() => {
      expect(screen.getByText(/payment not confirmed/i)).toBeInTheDocument();
    });
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')).toHaveLength(1);
  });

  test('clears the cart only after the server reports paid:true', async () => {
    mockedFetchCheckoutSession.mockResolvedValue({ paid: true, status: 'complete' });

    renderSuccess('?session_id=cs_test_paid');

    await waitFor(() => {
      expect(document.title).toBe(CART_SUCCESS_TITLE);
    });
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /order confirmed/i })).toBeInTheDocument();
    });
    expect(mockedFetchCheckoutSession).toHaveBeenCalledWith('cs_test_paid');
    expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')).toEqual([]);
  });

  test('keeps the cart when session_id is missing', async () => {
    renderSuccess('');

    await waitFor(() => {
      expect(screen.getByText(/missing checkout session/i)).toBeInTheDocument();
    });
    expect(mockedFetchCheckoutSession).not.toHaveBeenCalled();
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
  });
});
