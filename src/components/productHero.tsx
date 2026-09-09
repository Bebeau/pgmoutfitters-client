import React from 'react';
import { IMAGE_SIZES } from '../utils/responsiveImage';
import ResponsiveImage from './responsiveImage';

type productHeroType = {
  image: string;
  name: string;
  openInquiry: () => void;
}
const ProductHero = (props: productHeroType) => {
  const handleBtnClick = () => {
    window.gtag('event', 'productHeroCTA');
    props.openInquiry();
  }
  return (
    <div className="hero">
      {/* <div className="heroTitle">
        <div></div>
        <div>
          <h1>
            Next <br />
            Generation <br />
            Deer <br />
            Feeders
          </h1>
          <button className="btn" onClick={handleBtnClick}>
            Inquire For Purchase
          </button>
        </div>
      </div> */}
      <div className={props.name === 'Mass XL' ? "heroImage" : "heroImage pad"}>
        <ResponsiveImage src={props.image} alt={props.name} sizes={IMAGE_SIZES.productSpotlight} lazy={false} fetchPriority="high" />
      </div>
    </div>
  )
}

export default ProductHero;
