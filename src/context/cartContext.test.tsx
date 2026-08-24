import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from './cartContext';
import { CART_STORAGE_KEY } from '../utils/cartStorage';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartProvider', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('loads stored lines and survives an add after mount', () => {
    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify([{ slug: '2-n-1', name: '2-N-1', qty: 2, unitPrice: 1300 }])
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.itemCount).toBe(2);
    expect(result.current.subtotal).toBe(2600);

    act(() => {
      result.current.addToCart({ slug: '2-n-1', name: '2-N-1', unitPrice: 1300 });
    });

    expect(result.current.itemCount).toBe(3);
    expect(JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')[0].qty).toBe(3);
  });

  test('clearCart empties localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({ slug: 'xxx', name: 'XXX', unitPrice: 900 });
      result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
    expect(window.localStorage.getItem(CART_STORAGE_KEY)).toBe('[]');
  });
});
