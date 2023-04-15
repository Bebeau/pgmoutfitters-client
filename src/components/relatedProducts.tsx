import React from 'react';
import {productType} from '../assets/data/products';

type relatedType = {
  products: productType[];
}
const relatedProducts = (props: relatedType) => {
  return (
    <div className="related">
      {props.products.map((item: any, index: number) => {
        return (
          <div className="item">
            <a href={`/products/deer-feeders/${item.slug}`} key={index}>
              <img src={item.image} alt={item.name} />
              <h4>{item.name}</h4>
              <h5 className="details">View Details</h5>
            </a>
          </div>
        );
      })}
    </div>
  )
}

export default relatedProducts;
