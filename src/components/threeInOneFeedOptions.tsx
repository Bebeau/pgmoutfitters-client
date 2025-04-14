import {useState, useRef, useEffect} from 'react';

import { ReactComponent as FeedOptions } from '../assets/img/feeders/3n1/modes.svg';

export const ThreeInOneFeedOptions = (props: {openInquiry: () => void}) => {
  const activeBtnRef = useRef(null);

  const timerBtnRef = useRef(null);
  const leftBtnRef = useRef(null);
  const rightBtnRef = useRef(null);
  const gravityBtnRef = useRef(null);

  const [setting, setSetting] = useState('');

  const handleBtnClick = (target: any, setting: string) => {
    activeBtnRef.current = target;
    setSetting(setting);
  }

  const handleInquiryBtnClick = () => {
    window.gtag('event', 'feedOptionsCTA');
    props.openInquiry();
  }

  useEffect(() => {
    activeBtnRef.current = timerBtnRef.current;
    setSetting('timer');
  }, []);

  return (
    <div className="block feedOptions specialOps">
      <article className="options">
        <div>
          <h3>Feed Options</h3>
          <p>Click the feed options below to see the settings change in on the feeder blueprint.</p>
          <button ref={timerBtnRef} className={activeBtnRef.current === timerBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'timer')}>650 lb Spin Mode</button>
          <button ref={leftBtnRef} className={activeBtnRef.current === leftBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'left')}>Right 250 lb Gravity / 350 lb Spin</button>
          <button ref={rightBtnRef} className={activeBtnRef.current === rightBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'right')}>Left 250 lb Gravity / 350 lb Spin</button>
          <button ref={gravityBtnRef} className={activeBtnRef.current === gravityBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'gravity')}>500 lb Gravity</button>
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
