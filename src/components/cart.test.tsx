import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import Cart from './cart';
import { CartProvider } from '../context/cartContext';
import { CART_STORAGE_KEY, QTY_LIMIT_MESSAGE } from '../utils/cartStorage';
import { CART_TITLE } from '../utils/siteMeta';
import { createCheckoutSession } from '../utils/checkoutApi';

jest.mock('../utils/checkoutApi', () => ({
  createCheckoutSession: jest.fn(),
}));

const mockedCreateCheckoutSession = createCheckoutSession as jest.Mock;

const renderCart = () =>
  render(
    <HelmetProvider>
      <CartProvider>
        <MemoryRouter>
          <Cart />
        </MemoryRouter>
      </CartProvider>
    </HelmetProvider>
  );

describe('Cart page', () => {
  beforeEach(() => {
    window.localStorage.clear();
    mockedCreateCheckoutSession.mockReset();
    window.gtag = jest.fn();
  });

  test('shows an empty state, home link, pickup alert, and disabled checkout', async () => {
    renderCart();

    await waitFor(() => {
      expect(document.title).toBe(CART_TITLE);
    });
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute('content')).toBe(
      'noindex'
    );
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view deer feeders/i })).toHaveAttribute('href', '/');
    expect(
      screen.getByText(/pickup only at 908 Joseph St, Shreveport, LA 71107/i)
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '(318) 227-8145' })).toHaveAttribute(
      'href',
      'tel:3182278145'
    );
    expect(screen.getByRole('button', { name: /checkout/i })).toBeDisabled();
  });

  test('renders line items with image, prices, qty controls, and checkout slugs only', async () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ slug: '2-n-1', name: '2-N-1', qty: 2, unitPrice: 1300 }])
    );
    mockedCreateCheckoutSession.mockResolvedValue({ url: 'https://checkout.stripe.com/c/pay/cs_test' });
    const assign = jest.fn();
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...window.location, assign },
    });

    renderCart();

    expect(screen.getByRole('heading', { name: '2-N-1' })).toBeInTheDocument();
    expect(screen.getByAltText('2-N-1')).toBeInTheDocument();
    expect(screen.getByText('$1,300')).toBeInTheDocument();
    expect(screen.getAllByText(/\$2,600/).length).toBeGreaterThan(0);
    expect(screen.getByLabelText('2-N-1 quantity')).toHaveValue(2);

    await userEvent.click(screen.getByRole('button', { name: /checkout/i }));

    await waitFor(() => {
      expect(mockedCreateCheckoutSession).toHaveBeenCalledWith([{ slug: '2-n-1', qty: 2 }]);
    });
    expect(mockedCreateCheckoutSession.mock.calls[0][0][0]).not.toHaveProperty('unitPrice');
    expect(assign).toHaveBeenCalledWith('https://checkout.stripe.com/c/pay/cs_test');
  });

  test('qty up at 20 stays at 20 and shows the limit message', async () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ slug: '2-n-1', name: '2-N-1', qty: 20, unitPrice: 1300 }])
    );

    renderCart();

    await userEvent.click(document.querySelector('.arrow.up') as HTMLElement);

    expect(screen.getByLabelText('2-N-1 quantity')).toHaveValue(20);
    expect(screen.getByText(QTY_LIMIT_MESSAGE)).toBeInTheDocument();
  });
});
