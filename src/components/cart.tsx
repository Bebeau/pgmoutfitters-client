import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import { productData } from '../assets/data/products';
import { productPath } from '../utils/productPath';
import { CART_QTY_MAX, formatRetailPrice, lineTotal } from '../utils/cartStorage';
import { createCheckoutSession } from '../utils/checkoutApi';
import { unwrapCheckoutUrl } from '../utils/checkoutResponse';
import PageHelmet from './pageHelmet';
import { CART_TITLE } from '../utils/siteMeta';

const PICKUP_PHONE = '(318) 227-8145';
const PICKUP_ADDRESS = '908 Joseph St, Shreveport, LA 71107';

const Cart = () => {
  const { items, subtotal, incrementQty, decrementQty, removeItem, limitMessage } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckout = () => {
    if (!items.length || isCheckingOut) {
      return;
    }

    setIsCheckingOut(true);
    setErrorMessage('');

    createCheckoutSession(items.map((item) => ({ slug: item.slug, qty: item.qty })))
      .then((res: any) => {
        const url = unwrapCheckoutUrl(res);
        if (url) {
          window.location.assign(url);
          return;
        }
        setErrorMessage(res?.message || 'Unable to start checkout. Please try again or call us.');
      })
      .catch(() => {
        setErrorMessage('Unable to start checkout. Please try again or call us.');
      })
      .finally(() => {
        setIsCheckingOut(false);
      });
  };

  return (
    <div className="cartPage">
      <PageHelmet title={CART_TITLE} noindex />

      <div className="contentWrap">
        <h2>Cart</h2>

        <p className="alert info pickupAlert">
          Purchases are currently pickup only at {PICKUP_ADDRESS} during business
          hours — call ahead at <a href="tel:3182278145">{PICKUP_PHONE}</a>.
        </p>

        {limitMessage && (
          <p className="alert error">{limitMessage}</p>
        )}

        {errorMessage && (
          <p className="alert error">{errorMessage}</p>
        )}

        {!items.length && (
          <section className="cartEmpty">
            <p>Your cart is empty.</p>
            <Link to="/" className="btn">
              View deer feeders
            </Link>
          </section>
        )}

        {!!items.length && (
          <section className="cartItems">
            {items.map((item) => {
              const product = productData.find((entry) => entry.slug === item.slug);
              return (
                <div key={item.slug} className="cartItem">
                  <div className="productCopy">
                    <div className="productImage">
                      {product?.image ? (
                        <img src={product.image} alt={item.name} />
                      ) : null}
                    </div>
                    <div>
                      <h4>
                        <Link to={productPath(item.slug)}>{item.name}</Link>
                      </h4>
                      <div className="price">
                        {formatRetailPrice(item.unitPrice)}
                        <span className="lineTotal">
                          {' '}
                          / {formatRetailPrice(lineTotal(item))}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="removeItem"
                        onClick={() => removeItem(item.slug)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <section className="formGroup">
                    <div className="inputWrap">
                      <button
                        type="button"
                        className="arrow up"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => incrementQty(item.slug)}
                        disabled={item.qty >= CART_QTY_MAX}
                      ></button>
                      <button
                        type="button"
                        className="arrow down"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => decrementQty(item.slug)}
                      ></button>
                      <input
                        type="number"
                        name={item.slug}
                        min="1"
                        max="20"
                        step="1"
                        value={item.qty}
                        readOnly
                        aria-label={`${item.name} quantity`}
                      />
                    </div>
                  </section>
                </div>
              );
            })}
          </section>
        )}

        <section className="cartSummary">
          <h4 className="subtotal">
            <span className="label">Subtotal</span>
            {formatRetailPrice(subtotal)}
          </h4>
          <button
            type="button"
            className="btn"
            onClick={handleCheckout}
            disabled={!items.length || isCheckingOut}
          >
            {isCheckingOut ? 'Starting Checkout...' : 'Checkout'}
          </button>
        </section>
      </div>
    </div>
  );
};

export default Cart;
