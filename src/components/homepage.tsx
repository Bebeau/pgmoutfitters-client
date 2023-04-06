import React from 'react';
import Carousel from './carousel';
import Company from './company';
import Testimonials from './testimonials';
import ProductListing from './productListing';

import {productType} from '../assets/data/products';
import {testimonialType} from '../assets/data/testimonials';

type homepageType = {
  openInquiry: () => void;
  productData: productType[];
  testimonialData: testimonialType[];
}

const Homepage = (props: homepageType) => {
  return (
    <>
    <div className="hero">
      <div className="heroTitle">
        <div></div>
        <h1>
          Next <br />
          Generation <br />
          Deer <br />
          Feeders
        </h1>
      </div>
      <Carousel 
        type="Product"
        slides={props.productData}
      />
    </div>
    <Company />
    <Testimonials 
      testimonials={props.testimonialData}
    />
    <ProductListing 
      openInquiry={props.openInquiry}
      products={props.productData} 
    />
    </>
  );
}

export default Homepage;
