import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  CartLine,
  CartProductInput,
  CART_QTY_MAX,
  QTY_LIMIT_MESSAGE,
  applyAddLine,
  applyIncrementLine,
  cartCount,
  cartSubtotal,
  decrementLine,
  readStoredCart,
  removeLine,
  setLineQty,
  writeStoredCart,
} from '../utils/cartStorage';

type cartContextType = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  limitMessage: string;
  addToCart: (product: CartProductInput) => void;
  incrementQty: (slug: string) => void;
  decrementQty: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<cartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartLine[]>(() => readStoredCart());
  const [limitMessage, setLimitMessage] = useState('');

  useEffect(() => {
    writeStoredCart(items);
  }, [items]);

  const addToCart = useCallback((product: CartProductInput) => {
    setItems((current) => {
      const result = applyAddLine(current, product);
      setLimitMessage(result.limited ? QTY_LIMIT_MESSAGE : '');
      return result.items;
    });
  }, []);

  const incrementQty = useCallback((slug: string) => {
    setItems((current) => {
      const result = applyIncrementLine(current, slug);
      setLimitMessage(result.limited ? QTY_LIMIT_MESSAGE : '');
      return result.items;
    });
  }, []);

  const decrementQty = useCallback((slug: string) => {
    setLimitMessage('');
    setItems((current) => decrementLine(current, slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((current) => {
      const next = setLineQty(current, slug, qty);
      const requested = Number(qty);
      const limited = Number.isFinite(requested) && requested > CART_QTY_MAX;
      setLimitMessage(limited ? QTY_LIMIT_MESSAGE : '');
      return next;
    });
  }, []);

  const removeItem = useCallback((slug: string) => {
    setLimitMessage('');
    setItems((current) => removeLine(current, slug));
  }, []);

  const clearCart = useCallback(() => {
    setLimitMessage('');
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount: cartCount(items),
      subtotal: cartSubtotal(items),
      limitMessage,
      addToCart,
      incrementQty,
      decrementQty,
      setQty,
      removeItem,
      clearCart,
    }),
    [items, limitMessage, addToCart, incrementQty, decrementQty, setQty, removeItem, clearCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
