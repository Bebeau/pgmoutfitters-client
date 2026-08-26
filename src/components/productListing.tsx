import React from 'react';
import { Link } from 'react-router-dom';
import { productPath } from '../utils/productPath';
import { formatRetailPrice } from '../utils/cartStorage';
import { useAddToCartNavigate } from '../hooks/useAddToCartNavigate';

const ProductListing = (props: any) => {
  const addToCartAndGo = useAddToCartNavigate();

  const handleAddToCart = (event: React.MouseEvent, item: any) => {
    event.preventDefault();
    event.stopPropagation();
    addToCartAndGo({
      slug: item.slug,
      name: item.name,
      unitPrice: item.price.retail,
    });
  }

  return (
    <div className="productListing">
      <div className="contentWrap">
        {props.products.map((item: any, index: number) => {
          return (
            <div className="productCard" key={index}>
              <Link to={productPath(item.slug)}>

                <img src={item.image} alt={item.name} />
                {item.name === 'Special Ops 1-N-1' || item.name === 'Special Ops 2-N-1' || item.name === 'Special Ops 3-N-1' ? (
                    <h4>Special Ops <span className="break">{item.name.replace('Special Ops ', '')}</span></h4>
                ) : (
                    <h4>{item.name}</h4>
                )}

                <div className="price">
                  {formatRetailPrice(Number(item.price.retail))}
                </div>

                <h5 className="details">View Details</h5>

              </Link>
              <button
                type="button"
                className="btn"
                onClick={(event) => handleAddToCart(event, item)}
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default ProductListing;
