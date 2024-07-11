import React from 'react';
import {productType} from '../assets/data/products';

type productSpecsType = {
  productInfo: productType,
  openInquiry: () => void
}
const ProductSpecs = (props: productSpecsType) => {
  const handleBtnClick = () => {
    window.gtag('event', 'productSpecsCTA');
    props.openInquiry();
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  return (
    <div className="content">
      <h2>{props.productInfo.name}</h2>
      <div className="price">${formatter.format(Number(props.productInfo.price.retail)).replace('$','')}</div>
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
          <button className="btn" onClick={handleBtnClick}>
            Inquire For Purchase
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductSpecs;
