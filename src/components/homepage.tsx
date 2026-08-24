import React, {useEffect} from 'react';
// import Carousel from './carousel';
import Company from './company';
import Testimonials from './testimonials';
import ProductListing from './productListing';
// import DealerInquiry from './dealer';

import {productType} from '../assets/data/products';
import {testimonialType} from '../assets/data/testimonials';
import PageHelmet from './pageHelmet';
import { HOME_DESCRIPTION, HOME_TITLE, homeCanonical } from '../utils/siteMeta';

type homepageType = {
  openInquiry: () => void;
  productData: productType[];
  testimonialData: testimonialType[];
  isLoading: boolean;
  setIsLoading: (value: boolean) => void; 
}

const Homepage = (props: homepageType) => {

  useEffect(() => {
    if(props.isLoading) {
      props.setIsLoading(false);
    }
  }, [props]);

  return (
    <>
    <PageHelmet
      title={HOME_TITLE}
      description={HOME_DESCRIPTION}
      canonical={homeCanonical()}
    />
    {/* <div className="hero">
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
    </div> */}
    <ProductListing 
      openInquiry={props.openInquiry}
      products={props.productData} 
    />
    <Company />
    <Testimonials 
      testimonials={props.testimonialData}
    />
    {/* <DealerInquiry 
      openInquiry={props.openInquiry}
    /> */}
    </>
  );
}

export default Homepage;
