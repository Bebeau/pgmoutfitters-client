import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/cartContext';

export const CartLimitNotice = () => {
  const { limitMessage } = useCart();
  const location = useLocation();

  if (!limitMessage || location.pathname === '/cart') {
    return null;
  }

  return (
    <p className="alert error cartLimitAlert" role="status">
      {limitMessage}
    </p>
  );
};

const CartLink = () => {
  const { itemCount } = useCart();

  return (
    <Link
      to="/cart"
      className="cartLink"
      aria-label={`Cart, ${itemCount} ${itemCount === 1 ? 'item' : 'items'}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM7.2 14.8l.1.2c.2.5.7.9 1.3.9H19v-2H9.4l-.9-2h11.1c.6 0 1.1-.4 1.3-.9l2.1-6.1c.1-.4 0-.8-.3-1.1-.3-.3-.7-.4-1.1-.4H6.2L5.3 2H2v2h2l3.6 7.6-1.4 2.4c-.4.6-.5 1.4-.2 2.1zM6.2 6h13.4l-1.4 4H8.1L6.2 6z" />
      </svg>
      <span>Cart</span>
      <span className="count">{itemCount}</span>
    </Link>
  );
};

export default CartLink;
