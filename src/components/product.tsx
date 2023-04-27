import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import {productData, productType} from '../assets/data/products';
import {testimonialType} from '../assets/data/testimonials';
import ProductSpecs from './productSpecs';
import ImageGallery from './imageGallery';
import ProductHero from './productHero';
import FeatureBlocks from './featureBlocks';
import Spotlight from './spotlight';
import RelatedProducts from './relatedProducts';
import RiceBrand from './riceBrand';
import SpecialOpsFeedOptions from './specialOpsFeedOptions';
import FiveInOneFeedOptions from './fiveInOneFeedOptions';
// import APIUtils from '../utils/APIUtils';

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

  const preloadImages = () => {
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
  }

  useEffect(() => {
    if(slug) {
      setProductInfo(productData.filter(product => product.slug === slug)[0]);
      preloadImages();
      setRelatedProducts(productData.filter(product => product.slug !== slug));
    }
    
  }, [props, slug]);

  return (
    <div id="productPage">
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
      {productInfo.name === "TreeHugger" && (
        <RiceBrand />
      )}
      {productInfo.name === "Special-Ops" && (
        <SpecialOpsFeedOptions 
          openInquiry={props.openInquiry}
        />
      )}
      {productInfo.name === "5-N-1" && (
        <FiveInOneFeedOptions 
          openInquiry={props.openInquiry}
        />
      )}
      <FeatureBlocks 
        name={productInfo.name}
      />
      <Spotlight 
        image={productInfo.image}
        name={productInfo.name}
        openInquiry={props.openInquiry}
      />
      <RelatedProducts
        products={relatedProducts}
      />
    </div>
  )
}

export default Product;
