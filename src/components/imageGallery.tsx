import React, {useState, useRef} from 'react';
import {productImage} from '../assets/data/products';

type imageGalleryType = {
  photos: productImage[]
}
const ImageGallery = (props: imageGalleryType) => {
  const modalRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState();
  const [showImageModal, setShowImageModal] = useState(false);

  const handleImageClick = (image: any) => {
    setSelectedImage(image);
    setShowImageModal(true);
  }
  const handleModalClose = () => {
    setShowImageModal(false);
  }
  return (
    <>
      <div className="imageGallery">
        {props.photos.map((item: any, index: number) => {
          return (
            <div className="image" onClick={() => handleImageClick(item.full)}>
              <img src={item.thumb} alt='' />
            </div>
          );
        })}
      </div>
      <div ref={modalRef} className={showImageModal ? "imageModal show" : "imageModal"} onClick={handleModalClose}>
        <img src={selectedImage} alt='' />
      </div>
    </>
  )
}

export default ImageGallery;
