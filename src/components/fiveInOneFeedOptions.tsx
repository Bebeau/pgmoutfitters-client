import React, {useState, useRef} from 'react';

import { ReactComponent as FeedOptions } from '../assets/img/5-n-1/fiveInOne-feed-options.svg';

const FiveInOneFeedOptions = (props: {openInquiry: () => void}) => {
  const activeBtnRef = useRef(null);
  const gravityBtnRef = useRef(null);
  const timerBtnRef = useRef(null);

  const [setting, setSetting] = useState('');

  const handleBtnClick = (target: any, setting: string) => {
    activeBtnRef.current = target;
    setSetting(setting);
  }

  const handleInquiryBtnClick = () => {
    window.gtag('event', 'feedOptionsCTA');
    props.openInquiry();
  }

  return (
    <div className="block feedOptions fiveInOne">
      <article className="options">
        <div>
          <h3>Feed Options</h3>
          <p>Click the feed options below to see the settings change in on the feeder blueprint.</p>
          <button ref={timerBtnRef} className={activeBtnRef.current === timerBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'timer')}>450 lb cascade</button>
          <button ref={gravityBtnRef} className={activeBtnRef.current === gravityBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'gravity')}>650 lb gravity</button>
          <button className="btn" onClick={handleInquiryBtnClick}>
            Inquire For Purchase
          </button>
        </div>
      </article>
      <article className={setting ? `graphic ${setting}` : 'graphic'}>
        <div className="imageWrap">
          <FeedOptions />
        </div>
      </article>
    </div>
  )
}

export default FiveInOneFeedOptions;
