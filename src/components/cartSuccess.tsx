import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import { fetchCheckoutSession } from '../utils/checkoutApi';
import { unwrapSessionPayment } from '../utils/checkoutResponse';
import PageHelmet from './pageHelmet';
import { CART_SUCCESS_TITLE } from '../utils/siteMeta';

type confirmationState = 'loading' | 'paid' | 'unpaid' | 'missing' | 'error';

export const CHECKOUT_POLL_INTERVAL_MS = 1000;
export const CHECKOUT_POLL_TIMEOUT_MS = 12000;

const CartSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [state, setState] = useState<confirmationState>(sessionId ? 'loading' : 'missing');
  const [status, setStatus] = useState<string | undefined>();

  useEffect(() => {
    if (!sessionId) {
      setState('missing');
      return;
    }

    let cancelled = false;
    let timeoutId: number | undefined;
    const startedAt = Date.now();

    const poll = () => {
      fetchCheckoutSession(sessionId)
        .then((res: any) => {
          if (cancelled) {
            return;
          }
          const payment = unwrapSessionPayment(res);
          setStatus(payment.status);
          if (payment.paid) {
            clearCart();
            setState('paid');
            return;
          }
          if (Date.now() - startedAt >= CHECKOUT_POLL_TIMEOUT_MS) {
            setState('unpaid');
            return;
          }
          timeoutId = window.setTimeout(poll, CHECKOUT_POLL_INTERVAL_MS);
        })
        .catch(() => {
          if (cancelled) {
            return;
          }
          if (Date.now() - startedAt >= CHECKOUT_POLL_TIMEOUT_MS) {
            setState('error');
            return;
          }
          timeoutId = window.setTimeout(poll, CHECKOUT_POLL_INTERVAL_MS);
        });
    };

    poll();

    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [sessionId, clearCart]);

  return (
    <div className="cartPage cartSuccess">
      <PageHelmet title={CART_SUCCESS_TITLE} noindex />

      <div className="contentWrap">
        {state === 'loading' && (
          <section className="cartEmpty">
            <h2>Confirming your order</h2>
            <p>Please wait while we confirm your pickup payment.</p>
          </section>
        )}

        {state === 'paid' && (
          <section className="cartEmpty">
            <h2>Order confirmed</h2>
            <p>
              Thank you. Your payment is complete. Pickup is at 908 Joseph St,
              Shreveport, LA 71107 during business hours. Call ahead at{' '}
              <a href="tel:3182278145">(318) 227-8145</a>.
            </p>
            <Link to="/" className="btn">
              Back to feeders
            </Link>
          </section>
        )}

        {state === 'unpaid' && (
          <section className="cartEmpty">
            <h2>Payment not confirmed</h2>
            <p>
              This checkout session is not paid
              {status ? ` (status: ${status})` : ''}. Your cart has been kept so
              you can try again.
            </p>
            <Link to="/cart" className="btn">
              Return to cart
            </Link>
          </section>
        )}

        {state === 'missing' && (
          <section className="cartEmpty">
            <h2>Missing checkout session</h2>
            <p>
              We could not find a checkout session on this page, so the cart was
              not cleared.
            </p>
            <Link to="/cart" className="btn">
              Return to cart
            </Link>
          </section>
        )}

        {state === 'error' && (
          <section className="cartEmpty">
            <h2>Unable to confirm payment</h2>
            <p>
              We could not confirm this checkout session. Your cart has been
              kept. Call (318) 227-8145 if you were charged.
            </p>
            <Link to="/cart" className="btn">
              Return to cart
            </Link>
          </section>
        )}
      </div>
    </div>
  );
};

export default CartSuccess;
