import React from 'react';

const ProductListing = (props: any) => {
  
  const handleBtnClick = () => {
    window.gtag('event', 'productListingCTA');
    props.openInquiry();
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return (
    <div className="productListing">
      <div className="contentWrap">
        {props.products.map((item: any, index: number) => {
          return (
            <a href={`/products/deer-feeders/${item.slug}`} key={index}>

              <img src={item.image} alt={item.name} />
              {item.name === 'Special Ops 2-N-1' || item.name === 'Special Ops 3-N-1' ? (
                  <h4>Special Ops <span className="break">{item.name.replace('Special Ops ', '')}</span></h4>
              ) : (
                  <h4>{item.name}</h4>
              )}

              <div className="price">
                ${formatter.format(Number(item.price.retail)).replace('$','')}
              </div>

              <h5 className="details">View Details</h5>

            </a>
          );
        })}
      </div>
      <button className="btn" onClick={handleBtnClick}>
        Inquire For Purchase
      </button>
    </div>
  )
}

export default ProductListing;
