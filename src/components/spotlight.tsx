import React from 'react';
import { formatRetailPrice } from '../utils/cartStorage';
import { useAddToCartNavigate } from '../hooks/useAddToCartNavigate';

type spotlightType = {
  image: string;
  name: string;
  slug: string;
  price: number | any[];
}
const Spotlight = (props: spotlightType) => {
  const addToCartAndGo = useAddToCartNavigate();

  const handleAddToCart = () => {
    if (typeof props.price !== 'number') {
      return;
    }
    addToCartAndGo({
      slug: props.slug,
      name: props.name,
      unitPrice: props.price,
    });
  }

  return (
    <div className="spotlight">
      <img src={props.image} alt={props.name} />
      {props.name === 'Special Ops 2-N-1' || props.name === 'Special Ops 3-N-1' ? (
          <h2>Special Ops <span className="break">{props.name.replace('Special Ops ', '')}</span></h2>
      ) : (
          <h2>{props.name}</h2>
      )}
      {typeof props.price === "number" && (
        <div className="price">{formatRetailPrice(Number(props.price))}</div>
      )}
      <div className="ctaGroup">
        <button type="button" className="btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default Spotlight;
