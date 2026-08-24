import { act, render, screen, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CartSuccess, {
  CHECKOUT_POLL_INTERVAL_MS,
  CHECKOUT_POLL_TIMEOUT_MS,
} from './cartSuccess';
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
        <MemoryRouter initialEntries={[`/checkout/success${search}`]}>
          <Routes>
            <Route
              path="/checkout/success"
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

const flushPromises = async () => {
  await act(async () => {
    await Promise.resolve();
    await Promise.resolve();
  });
};

describe('Cart success page', () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockedFetchCheckoutSession.mockReset();
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ slug: '2-n-1', name: '2-N-1', qty: 1, unitPrice: 1300 }])
    );
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('does not clear the cart from the success page load alone', async () => {
    jest.useFakeTimers();
    mockedFetchCheckoutSession.mockResolvedValue({ paid: false, status: 'open' });

    renderSuccess('?session_id=cs_test_unpaid');
    await flushPromises();

    expect(screen.getByText(/confirming your order/i)).toBeInTheDocument();
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');

    await act(async () => {
      jest.advanceTimersByTime(CHECKOUT_POLL_TIMEOUT_MS + CHECKOUT_POLL_INTERVAL_MS);
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(screen.getByText(/payment not confirmed/i)).toBeInTheDocument();
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

  test('polls a pending session and clears the cart only after paid:true', async () => {
    jest.useFakeTimers();
    mockedFetchCheckoutSession
      .mockResolvedValueOnce({ paid: false, status: 'open' })
      .mockResolvedValueOnce({ paid: true, status: 'complete' });

    renderSuccess('?session_id=cs_test_pending');
    await flushPromises();

    expect(mockedFetchCheckoutSession).toHaveBeenCalledTimes(1);
    expect(screen.getByText(/confirming your order/i)).toBeInTheDocument();
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1');
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')).toHaveLength(1);

    await act(async () => {
      jest.advanceTimersByTime(CHECKOUT_POLL_INTERVAL_MS);
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(mockedFetchCheckoutSession).toHaveBeenCalledTimes(2);
    expect(screen.getByRole('heading', { name: /order confirmed/i })).toBeInTheDocument();
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
