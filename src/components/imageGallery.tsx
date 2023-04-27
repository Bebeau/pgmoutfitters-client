import React, {useState, useRef} from 'react';
import {productImage} from '../assets/data/products';

type imageGalleryType = {
  photos: productImage[],
  openInquiry: () => void
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
  const handleModalInquiry = () => {
    setShowImageModal(false);
    props.openInquiry();
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
          <img src={selected.full} alt='' />
          <div className="copy">
            <div>
              <h5>{selected.title}</h5>
              <p>{selected.desc}</p>
              <button className="btn" onClick={handleModalInquiry}>
                Inquire For Purchase
              </button>
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
