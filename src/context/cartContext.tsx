import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  CartLine,
  CartProductInput,
  addLine,
  cartCount,
  cartSubtotal,
  decrementLine,
  incrementLine,
  readStoredCart,
  removeLine,
  setLineQty,
  writeStoredCart,
} from '../utils/cartStorage';

type cartContextType = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
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

  useEffect(() => {
    writeStoredCart(items);
  }, [items]);

  const addToCart = useCallback((product: CartProductInput) => {
    setItems((current) => addLine(current, product));
  }, []);

  const incrementQty = useCallback((slug: string) => {
    setItems((current) => incrementLine(current, slug));
  }, []);

  const decrementQty = useCallback((slug: string) => {
    setItems((current) => decrementLine(current, slug));
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((current) => setLineQty(current, slug, qty));
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((current) => removeLine(current, slug));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      itemCount: cartCount(items),
      subtotal: cartSubtotal(items),
      addToCart,
      incrementQty,
      decrementQty,
      setQty,
      removeItem,
      clearCart,
    }),
    [items, addToCart, incrementQty, decrementQty, setQty, removeItem, clearCart]
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
