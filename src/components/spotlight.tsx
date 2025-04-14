import React from 'react';

type spotlightType = {
  image: string;
  name: string;
  price: number | any[];
  openInquiry: () => void;
}
const Spotlight = (props: spotlightType) => {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
});

  const handleBtnClick = () => {
    window.gtag('event', 'productSpotlightCTA');
    props.openInquiry();
  }

  return (
    <div className="spotlight">
      <img src={props.image} alt={props.name} />
      {props.name === 'Special Ops 2-N-1' || props.name === 'Special Ops 3-N-1' ? (
          <h2>Special Ops <span className="break">{props.name.replace('Special Ops ', '')}</span></h2>
      ) : (
          <h2>{props.name}</h2>
      )}
      {typeof props.price === "number" && (
        <div className="price">${formatter.format(Number(props.price)).replace('$','')}</div>
      )}
      <button className="btn" onClick={handleBtnClick}>
        Inquire For Purchase
      </button>
    </div>
  )
}

export default Spotlight;
