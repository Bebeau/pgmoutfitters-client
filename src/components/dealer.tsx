import React from 'react';

const DealerInquiry = (props: any) => {
  const handleInquiryBtnClick = () => {
    window.gtag('event', 'dealerCTA');
    props.openInquiry();
  }
  return (
    <div className="dealerInquiry">
      <h3>Interested In Becoming A Dealer?</h3>
      <p>If you are interested in selling these next generation deer feeders on your lot, we are looking for select dealers to work with through the 2024 season.</p>
      <button className="btn" onClick={handleInquiryBtnClick}>Submit Dealer Inquiry</button>
    </div>
  )
}

export default DealerInquiry;
