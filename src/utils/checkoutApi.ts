import APIUtils from './APIUtils';
import { unwrapCheckoutUrl, unwrapSessionPayment } from './checkoutResponse';

export type CheckoutItem = {
  slug: string;
  qty: number;
};

export { unwrapCheckoutUrl, unwrapSessionPayment };

export const createCheckoutSession = (items: CheckoutItem[]) =>
  APIUtils.callPost('api/checkout/session', {
    items: items.map((item) => ({ slug: item.slug, qty: item.qty })),
  });

export const fetchCheckoutSession = (sessionId: string) =>
  APIUtils.callGet(`api/checkout/session/${encodeURIComponent(sessionId)}`);
