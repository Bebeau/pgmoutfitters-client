import React from 'react';
import { Link } from 'react-router-dom';
import {productType} from '../assets/data/products';
import { productPath } from '../utils/productPath';

type relatedType = {
  products: productType[];
}
const relatedProducts = (props: relatedType) => {
  return (
    <div className="related">
      {props.products.map((item: any, index: number) => {
        if (index >= 9) return;
        return (
          <div key={index} className="item">
            <Link to={productPath(item.slug)} key={index}>
              <img src={item.image} alt={item.name} />
              {item.name === 'Special Ops 2-N-1' || item.name === 'Special Ops 3-N-1' ? (
                  <h4>Special Ops <span className="break">{item.name.replace('Special Ops ', '')}</span></h4>
              ) : (
                  <h4>{item.name}</h4>
              )}
              <h5 className="details">View Details</h5>
            </Link>
          </div>
        );
      })}
    </div>
  )
}

export default relatedProducts;
