import {useState, useEffect, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {productData, productType} from '../assets/data/products';
import PageHelmet from './pageHelmet';
import {
  isAbsoluteHttpUrl,
  productCanonical,
  productPageDescription,
  productPageTitle,
} from '../utils/siteMeta';
import ProductSpecs from './productSpecs';
import ImageGallery from './imageGallery';
// import ProductHero from './productHero';
import FeatureBlocks from './featureBlocks';
import Spotlight from './spotlight';
import RelatedProducts from './relatedProducts';
import RiceBrand from './riceBrand';

// import SurfNTurfFeedOptions from './surfNTurfFeedOptions';
import FourInOneFeedOptions from './fourInOneFeedOptions';
import FiveInOneFeedOptions from './fiveInOneFeedOptions';
import {ThreeInOneFeedOptions} from './threeInOneFeedOptions';
import {TwoInOneFeedOptions} from './twoInOneFeedOptions';
import CascadeBlocks from './cascadeBlocks';
// import DealerInquiry from './dealer';

// import Testimonials from './testimonials';
import {testimonialType} from '../assets/data/testimonials';

type singleProductType = {
  openInquiry: () => void;
  testimonialData: testimonialType[];
  isLoading: boolean;
  setIsLoading: (value: boolean) => void; 
}

const emptyProduct: productType = {
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
};

const Product = (props: singleProductType) => {
  // Use once data is pulled from database
  // const productFetchRef = useRef(false);
  const {slug} = useParams();
  const matchedProduct = productData.find(product => product.slug === slug);
  const [productInfo, setProductInfo] = useState<productType>(emptyProduct);
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
    if (matchedProduct) {
      setProductInfo(matchedProduct);
      setRelatedProducts(productData.filter(product => product.slug !== slug));
      preloadImages();
      return;
    }

    setProductInfo(emptyProduct);
    setRelatedProducts([]);
    props.setIsLoading(false);
  }, [matchedProduct, props, slug, preloadImages]);

  const productHelmet = matchedProduct ? (
    <PageHelmet
      title={productPageTitle(matchedProduct.name)}
      description={productPageDescription(matchedProduct.name, matchedProduct.description)}
      canonical={productCanonical(matchedProduct.slug)}
      image={isAbsoluteHttpUrl(matchedProduct.image) ? matchedProduct.image : undefined}
    />
  ) : (
    <Helmet>
      <meta name="robots" content="noindex" />
    </Helmet>
  );

  return (
    <div id="productPage" className={productInfo.name}>
      {productHelmet}
      
      {/* <ProductHero 
        image={productInfo.image}
        name={productInfo.name}
        openInquiry={props.openInquiry}
      /> */}

      <ProductSpecs
        productInfo={productInfo}
        openInquiry={props.openInquiry}
      />

      <ImageGallery 
        photos={productInfo.photos}
        openInquiry={props.openInquiry}
      />

      {/* {productInfo.name === "Surf-N-Turf" && (
        <SurfNTurfFeedOptions 
          openInquiry={props.openInquiry}
        />
      )} */}

      {productInfo.name === "2-N-1" && (
        <>
          <TwoInOneFeedOptions 
            openInquiry={props.openInquiry}
          />
          <CascadeBlocks />
        </>
      )}

      {productInfo.name === "3-N-1" && (
        <>
          <ThreeInOneFeedOptions 
            openInquiry={props.openInquiry}
          />
          <CascadeBlocks />
        </>
      )}

      {productInfo.name === "4-N-1" && (
        <>
          <FourInOneFeedOptions 
            openInquiry={props.openInquiry}
          />
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

      {productInfo.name === "Rice Brand" && (
        <RiceBrand />
      )}

      <FeatureBlocks 
        name={productInfo.name}
      />
      <Spotlight 
        image={productInfo.image}
        name={productInfo.name}
        price={productInfo.price.retail}
        openInquiry={props.openInquiry}
      />
      {/* <Testimonials 
        testimonials={props.testimonialData}
      /> */}
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
