import { useEffect, useState } from 'react';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <h1>Cart</h1>

        <p className="alert info pickupAlert">
          Purchases are pickup only at <a href="https://www.google.com/maps/place/908+Joseph+St,+Shreveport,+LA+71107/@32.5293771,-93.7613823,750m/data=!3m2!1e3!4b1!4m6!3m5!1s0x8636ccd92aad605d:0xd962e00b360ec708!8m2!3d32.5293771!4d-93.7588074!16s%2Fg%2F11c1h99zbr?entry=ttu&g_ep=EgoyMDI2MDgxOS4wIKXMDSoASAFQAw%3D%3D" target="_BLANK" rel="noreferrer">{PICKUP_ADDRESS}</a> during regular business
          hours.<br />Call <a href="tel:3182278145">{PICKUP_PHONE}</a> or email <a href="mailto:sales@pgmoutfitters.com">sales@pgmoutfitters.com</a> to schedule pickup.
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
          <div className="cartActions">
            {!!items.length && (
              <Link to="/" className="btn outline">
                Keep Shopping
              </Link>
            )}
            <button
              type="button"
              className="btn"
              onClick={handleCheckout}
              disabled={!items.length || isCheckingOut}
            >
              {isCheckingOut ? 'Starting Checkout...' : 'Checkout'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;
