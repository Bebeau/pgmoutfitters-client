import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartProvider } from '../context/cartContext';
import CartLink from './cartLink';
import Footer from './footer';

const renderFooter = () =>
  render(
    <CartProvider>
      <MemoryRouter>
        <CartLink />
        <Footer />
      </MemoryRouter>
    </CartProvider>
  );

describe('Footer', () => {
  test('keeps dealers, phone, and email, and leaves cart to the header CartLink', () => {
    renderFooter();

    expect(screen.getByRole('heading', { name: /dealers/i })).toBeInTheDocument();
    expect(document.querySelector('footer .map')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '(318) 227-8145' })).toHaveAttribute(
      'href',
      'tel:3182278145'
    );
    expect(screen.getByRole('link', { name: 'sales@pgmoutfitters.com' })).toHaveAttribute(
      'href',
      'mailto:sales@pgmoutfitters.com'
    );

    expect(screen.getByRole('link', { name: /cart/i })).toHaveClass('cartLink');
    expect(document.querySelector('footer a[href="/cart"]')).toBeNull();
    expect(document.querySelector('footer a.cart')).toBeNull();

    expect(screen.getByRole('link', { name: 'Terms of Use' })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: 'Privacy Policy' })).toHaveAttribute(
      'href',
      '/privacy'
    );
  });
});
