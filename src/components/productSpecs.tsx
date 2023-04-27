import React from 'react';
import {productType} from '../assets/data/products';

type productSpecsType = {
  productInfo: productType,
  openInquiry: () => void
}
const ProductSpecs = (props: productSpecsType) => {
  return (
    <div className="content">
      <h2>{props.productInfo.name}</h2>
      <div className="about">
        <div className="blueprint">
          <img src={props.productInfo.blueprint} alt='blueprint' />
        </div>
        <div className="desc">
          <p>
            {props.productInfo.description}
          </p>
          <ul>
            {props.productInfo.specs.map((item: any, index: number) => {
              return (
                <li key={index}>{item}</li>
              );
            })}
          </ul>
          <button className="btn" onClick={props.openInquiry}>
            Inquire For Purchase
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductSpecs;
