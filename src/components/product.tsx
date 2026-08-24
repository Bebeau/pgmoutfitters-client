import {useState, useEffect, useCallback} from 'react';
import {useParams} from 'react-router-dom';
import {productData, productType} from '../assets/data/products';
import PageHelmet from './pageHelmet';
import ProductNotFound from './productNotFound';
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

const Product = (props: singleProductType) => {
  // Use once data is pulled from database
  // const productFetchRef = useRef(false);
  const {slug} = useParams();
  const matchedProduct = productData.find(product => product.slug === slug);
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
    if (!matchedProduct) {
      props.setIsLoading(false);
      return;
    }

    let images = matchedProduct.photos.map((item) => {
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
  }, [matchedProduct, props]);

  useEffect(() => {
    if (!matchedProduct) {
      setRelatedProducts([]);
      props.setIsLoading(false);
      return;
    }

    setRelatedProducts(productData.filter(product => product.slug !== slug));
    preloadImages();
  }, [matchedProduct, props, slug, preloadImages]);

  if (!matchedProduct) {
    return <ProductNotFound />;
  }

  return (
    <div id="productPage" className={matchedProduct.name}>
      <PageHelmet
        title={productPageTitle(matchedProduct.name)}
        description={productPageDescription(matchedProduct.name, matchedProduct.description)}
        canonical={productCanonical(matchedProduct.slug)}
        image={isAbsoluteHttpUrl(matchedProduct.image) ? matchedProduct.image : undefined}
      />
      
      {/* <ProductHero 
        image={matchedProduct.image}
        name={matchedProduct.name}
        openInquiry={props.openInquiry}
      /> */}

      <ProductSpecs
        productInfo={matchedProduct}
        openInquiry={props.openInquiry}
      />

      <ImageGallery 
        photos={matchedProduct.photos}
        openInquiry={props.openInquiry}
      />

      {/* {matchedProduct.name === "Surf-N-Turf" && (
        <SurfNTurfFeedOptions 
          openInquiry={props.openInquiry}
        />
      )} */}

      {matchedProduct.name === "2-N-1" && (
        <>
          <TwoInOneFeedOptions 
            openInquiry={props.openInquiry}
          />
          <CascadeBlocks />
        </>
      )}

      {matchedProduct.name === "3-N-1" && (
        <>
          <ThreeInOneFeedOptions 
            openInquiry={props.openInquiry}
          />
          <CascadeBlocks />
        </>
      )}

      {matchedProduct.name === "4-N-1" && (
        <>
          <FourInOneFeedOptions 
            openInquiry={props.openInquiry}
          />
        </>
      )}

      {matchedProduct.name === "5-N-1" && (
        <>
          <FiveInOneFeedOptions 
            openInquiry={props.openInquiry}
          />
          <CascadeBlocks />
        </>
      )}

      {matchedProduct.name === "Rice Brand" && (
        <RiceBrand />
      )}

      <FeatureBlocks 
        name={matchedProduct.name}
      />
      <Spotlight 
        image={matchedProduct.image}
        name={matchedProduct.name}
        price={matchedProduct.price.retail}
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
