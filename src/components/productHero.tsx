import React from 'react';

type productHeroType = {
  image: string;
  name: string;
  openInquiry: () => void;
}
const ProductHero = (props: productHeroType) => {
  return (
    <div className="hero">
      <div className="heroTitle">
        <div></div>
        <div>
          <h1>
            Next <br />
            Generation <br />
            Deer <br />
            Feeders
          </h1>
          <button className="btn" onClick={props.openInquiry}>
            Inquire For Purchase
          </button>
        </div>
      </div>
      <div className={props.name === 'TreeHugger' ? "heroImage" : "heroImage pad"}>
        <img src={props.image} alt={props.name} />
      </div>
    </div>
  )
}

export default ProductHero;
