import React from 'react';

import riceBrand from '../assets/img/tree-hugger/massxl-feed.png';

const RiceBrand = () => {
  return (
    <div className="block riceBrand">
      <article>
        <img src={riceBrand} alt='Rice Brand' />
      </article>
      <article>
        <div className="copy">
          <h3>Mass XL Supplement</h3>
          <p>Mass XL is made up of 100% legumes. It is not formulated in a lab. There are no additives to make it appealing to deer. It is all natural and is a major part of the deer diet were these legumes grow.</p>
          <p>Legumes are plants that are able to convert or "fix" atmospheric nitrogen into a form usable by plants and animals. Once fixed the nitrogen found in legumes become an essential building block for various proteins which plants and animals require. Protein is needed for deer to grow massive antlers and boasting 40%, Mass XL surpasses any other on the market.</p>
          <a className="btn full" target="_blank" rel="noreferrer" href="https://www.makemonsterdeer.com/products/mass-xl-30lb-bucket/">Buy Now</a>
        </div>
      </article>
    </div>
  )
}

export default RiceBrand;
