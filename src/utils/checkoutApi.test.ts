import { unwrapCheckoutUrl, unwrapSessionPayment } from './checkoutResponse';

describe('checkout response helpers', () => {
  test('reads a Stripe URL from the contract or Response wrapper', () => {
    expect(unwrapCheckoutUrl({ url: 'https://checkout.stripe.com/c/pay/cs_test' })).toBe(
      'https://checkout.stripe.com/c/pay/cs_test'
    );
    expect(
      unwrapCheckoutUrl({ status: 200, message: 'success', data: { url: 'https://checkout.stripe.com/pay' } })
    ).toBe('https://checkout.stripe.com/pay');
    expect(unwrapCheckoutUrl({ status: 400, message: 'empty cart' })).toBeUndefined();
  });

  test('treats only paid:true as paid and ignores HTTP status 200', () => {
    expect(unwrapSessionPayment({ paid: true, status: 'complete' })).toEqual({
      paid: true,
      status: 'complete',
    });
    expect(unwrapSessionPayment({ paid: false, status: 'open' })).toEqual({
      paid: false,
      status: 'open',
    });
    expect(unwrapSessionPayment({ status: 200, data: { paid: true, status: 'paid' } })).toEqual({
      paid: true,
      status: 'paid',
    });
    expect(unwrapSessionPayment({ status: 200, message: 'ok' })).toEqual({
      paid: false,
      status: undefined,
    });
  });
});
