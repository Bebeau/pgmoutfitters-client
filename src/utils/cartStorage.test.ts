import {
  CART_STORAGE_KEY,
  addLine,
  cartCount,
  cartSubtotal,
  checkoutItems,
  decrementLine,
  incrementLine,
  readStoredCart,
  removeLine,
  sanitizeCart,
  setLineQty,
  writeStoredCart,
} from './cartStorage';

const feeder = {
  slug: '2-n-1',
  name: '2-N-1',
  unitPrice: 1300,
};

describe('cartStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('adding the same slug increments qty and keeps retail unit price', () => {
    const once = addLine([], feeder);
    const twice = addLine(once, feeder);

    expect(once).toEqual([{ ...feeder, qty: 1 }]);
    expect(twice).toEqual([{ ...feeder, qty: 2 }]);
    expect(cartCount(twice)).toBe(2);
    expect(cartSubtotal(twice)).toBe(2600);
  });

  test('qty stays an integer of at least 1 and remove deletes the line', () => {
    const items = addLine([], feeder);
    expect(decrementLine(items, feeder.slug)[0].qty).toBe(1);
    expect(setLineQty(items, feeder.slug, 0)).toEqual(items);
    expect(incrementLine(items, feeder.slug)[0].qty).toBe(2);
    expect(removeLine(items, feeder.slug)).toEqual([]);
  });

  test('checkout payload is slugs and qtys only', () => {
    expect(checkoutItems([{ ...feeder, qty: 3 }])).toEqual([{ slug: '2-n-1', qty: 3 }]);
  });

  test('persists a sanitized cart in localStorage', () => {
    writeStoredCart([
      { ...feeder, qty: 2 },
      { slug: '', name: 'bad', qty: 1, unitPrice: 1 },
    ]);

    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')).toEqual([
      { ...feeder, qty: 2 },
    ]);
    expect(readStoredCart()).toEqual([{ ...feeder, qty: 2 }]);
    expect(sanitizeCart('nope')).toEqual([]);
  });
});
