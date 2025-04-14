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
          <div key={index} className="item">
            <a href={`/products/deer-feeders/${item.slug}`} key={index}>
              <img src={item.image} alt={item.name} />
              {/* <h4>{item.name}</h4> */}
              {item.name === 'Special Ops 2-N-1' || item.name === 'Special Ops 3-N-1' ? (
                  <h4>Special Ops <span className="break">{item.name.replace('Special Ops ', '')}</span></h4>
              ) : (
                  <h4>{item.name}</h4>
              )}
              <h5 className="details">View Details</h5>
            </a>
          </div>
        );
      })}
    </div>
  )
}

export default relatedProducts;
