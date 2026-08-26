import React, {useState, useRef} from 'react';
import {productImage} from '../assets/data/products';

type imageGalleryType = {
  photos: productImage[],
}
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
        {props.photos.map((item: any, index: number) => {
          return (
            <div key={index} className="image" onClick={() => handleImageClick(item)}>
              <img src={item.thumb} alt='' />
            </div>
          );
        })}
      </div>
      <div ref={modalRef} className={showImageModal ? "imageModal show" : "imageModal"}>
        <button className="closeModal" onClick={handleModalClose}></button>
        <div className="imageWrap">
          <div className="featureImage">
            <img src={selected.full} alt='' />
          </div>
          <div className="copy">
            <div>
              <h5>{selected.title}</h5>
              <p>{selected.desc}</p>
            </div>
            <div className="thumbs">
              {props.photos.map((item: any, index: number) => {
                return (
                  <div key={index} className="image" onClick={() => handleImageClick(item)}>
                    <img src={item.thumb} alt='' />
                  </div>
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
