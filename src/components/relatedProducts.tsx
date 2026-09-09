import React from 'react';
import { Link } from 'react-router-dom';
import {productType} from '../assets/data/products';
import { productPath } from '../utils/productPath';
import { IMAGE_SIZES } from '../utils/responsiveImage';
import ResponsiveImage from './responsiveImage';

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
              <ResponsiveImage src={item.image} alt={item.name} sizes={IMAGE_SIZES.related} lazy />
              {item.name === 'Special Ops 2-N-1' || item.name === 'Special Ops 3-N-1' ? (
                  <h2>Special Ops <span className="break">{item.name.replace('Special Ops ', '')}</span></h2>
              ) : (
                  <h2>{item.name}</h2>
              )}
              <span className="details">View Details</span>
            </Link>
          </div>
        );
      })}
    </div>
  )
}

export default relatedProducts;
