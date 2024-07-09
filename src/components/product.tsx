import React, {useState, useEffect, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {productData, productType} from '../assets/data/products';
import ProductSpecs from './productSpecs';
import ImageGallery from './imageGallery';
import ProductHero from './productHero';
import FeatureBlocks from './featureBlocks';
import Spotlight from './spotlight';
import RelatedProducts from './relatedProducts';

import SurfNTurfFeedOptions from './surfNTurfFeedOptions';
import SpecialOpsFeedOptions from './specialOpsFeedOptions';
import FiveInOneFeedOptions from './fiveInOneFeedOptions';
import CascadeBlocks from './cascadeBlocks';
// import DealerInquiry from './dealer';

import Testimonials from './testimonials';
import {testimonialType} from '../assets/data/testimonials';

type singleProductType = {
  openInquiry: () => void;
  testimonialData: testimonialType[];
  isLoading: boolean;
  setIsLoading: (value: boolean) => void; 
}

const Product = (props: singleProductType) => {
  // Use once data is pulled from database
  // const productFetchRef = useRef(false);
  const {slug} = useParams();
  const [productInfo, setProductInfo] = useState<productType>({
    name: '',
    image: '',
    slug: '',
    blueprint: '',
    description: '',
    specs: [],
    photos: [],
    price: {
      retail: 0,
      dealer: 0,
    }
  });
  const [relatedProducts, setRelatedProducts] = useState<productType[]>([]);

  // Use once data is pulled from database
  // const fetchProductData = () => {
  //   if (productFetchRef.current) return props.setIsLoading(false);
  //   productFetchRef.current = true;
  //   APIUtils.callGet(productData)
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {

  //   })
  //   .finally(() => {
  //     props.setIsLoading(false);
  //   });
  // }

  const preloadImages = useCallback(() => {
    let images = productInfo.photos.map((item) => {
      return new Promise<void>((resolve, reject) => {
        let img = new Image();
        img.src = item.full;
        img.onload = function(){
          resolve();
        }
      })
    });

    Promise.all(images)
    .then(() => {
      props.setIsLoading(false);
    });
  }, [productInfo.photos, props]);

  useEffect(() => {
    if(slug) {
      setProductInfo(productData.filter(product => product.slug === slug)[0]);
      preloadImages();
      setRelatedProducts(productData.filter(product => product.slug !== slug));
    }
    
  }, [props, slug, preloadImages]);

  return (
    <div id="productPage" className={productInfo.name}>
      <ProductHero 
        image={productInfo.image}
        name={productInfo.name}
        openInquiry={props.openInquiry}
      />
      <ProductSpecs
        productInfo={productInfo}
        openInquiry={props.openInquiry}
      />
      <ImageGallery 
        photos={productInfo.photos}
        openInquiry={props.openInquiry}
      />
      {productInfo.name === "Surf-N-Turf" && (
        <SurfNTurfFeedOptions 
          openInquiry={props.openInquiry}
        />
      )}
      {productInfo.name === "Special-Ops" && (
        <>
          <SpecialOpsFeedOptions 
            openInquiry={props.openInquiry}
          />
          <CascadeBlocks />
        </>
      )}
      {productInfo.name === "5-N-1" && (
        <>
          <FiveInOneFeedOptions 
            openInquiry={props.openInquiry}
          />
          <CascadeBlocks />
        </>
      )}
      <FeatureBlocks 
        name={productInfo.name}
      />
      <Spotlight 
        image={productInfo.image}
        name={productInfo.name}
        openInquiry={props.openInquiry}
      />
      <Testimonials 
        testimonials={props.testimonialData}
      />
      <RelatedProducts
        products={relatedProducts}
      />
      {/* <DealerInquiry 
        openInquiry={props.openInquiry}
      /> */}
    </div>
  )
}

export default Product;
