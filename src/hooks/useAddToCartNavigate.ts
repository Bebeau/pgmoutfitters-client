import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import { CartProductInput } from '../utils/cartStorage';

export const useAddToCartNavigate = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return useCallback((product: CartProductInput) => {
    window.gtag('event', 'addToCart');
    addToCart(product);
    navigate('/cart');
  }, [addToCart, navigate]);
};
