import React from 'react';

type spotlightType = {
  image: string;
  name: string;
  openInquiry: () => void;
}
const Spotlight = (props: spotlightType) => {
  const handleBtnClick = () => {
    window.dataLayer.push({'event': 'productSpotlightCTA'});
    props.openInquiry();
  }
  return (
    <div className="spotlight">
      <img src={props.image} alt={props.name} />
      <h2>{props.name}</h2>
      <button className="btn" onClick={handleBtnClick}>
        Inquire For Purchase
      </button>
    </div>
  )
}

export default Spotlight;
