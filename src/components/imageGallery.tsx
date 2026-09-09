import React, {useState, useRef} from 'react';
import {productImage} from '../assets/data/products';
import { IMAGE_SIZES } from '../utils/responsiveImage';
import ResponsiveImage from './responsiveImage';

type imageGalleryType = {
  photos: productImage[],
}

const galleryThumbLabel = (item: productImage, index: number) =>
  item.title ? `View ${item.title}` : `View gallery image ${index + 1}`;

const ImageGallery = (props: imageGalleryType) => {
  const modalRef = useRef(null);
  const [selected, setSelected] = useState<productImage>({
    thumb: '',
    full: '',
    title: '',
    desc: '',
  });
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageClick = (item: productImage) => {
    setSelected(item);
    setShowImageModal(true);
  }
  const handleModalClose = () => {
    setShowImageModal(false);
  }
  return (
    <>
      <div className="imageGallery">
        {props.photos.map((item: productImage, index: number) => {
          return (
            <button
              key={index}
              type="button"
              className="image"
              onClick={() => handleImageClick(item)}
              aria-label={galleryThumbLabel(item, index)}
            >
              <ResponsiveImage src={item.thumb} alt='' sizes={IMAGE_SIZES.galleryThumb} lazy />
            </button>
          );
        })}
      </div>
      <div ref={modalRef} className={showImageModal ? "imageModal show" : "imageModal"}>
        <button type="button" className="closeModal" aria-label="Close" onClick={handleModalClose}></button>
        <div className="imageWrap">
          <div className="featureImage">
            <ResponsiveImage src={selected.full} alt='' sizes={IMAGE_SIZES.galleryFull} lazy={false} />
          </div>
          <div className="copy">
            <div>
              <p className="galleryTitle">{selected.title}</p>
              <p>{selected.desc}</p>
            </div>
            <div className="thumbs">
              {props.photos.map((item: productImage, index: number) => {
                return (
                  <button
                    key={index}
                    type="button"
                    className="image"
                    onClick={() => handleImageClick(item)}
                    aria-label={galleryThumbLabel(item, index)}
                  >
                    <ResponsiveImage src={item.thumb} alt='' sizes={IMAGE_SIZES.galleryThumb} lazy />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ImageGallery;
