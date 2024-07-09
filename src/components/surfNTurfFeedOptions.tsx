import {useState, useRef, useEffect} from 'react';

import { ReactComponent as FeedOptions } from '../assets/img/surf-n-turf/surf-n-turf-feed-options.svg';

const SurfNTurfFeedOptions = (props: {openInquiry: () => void}) => {
  const activeBtnRef = useRef(null);

  const timerBtnRef = useRef(null);
  const directionalBtnRef = useRef(null);
  const splitDirectionalBtnRef = useRef(null);
  const splitTimerBtnRef = useRef(null);

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
    <div className="block feedOptions surfNTurf">
      <article className="options">
        <div>
          <h3>Feed Options</h3>
          <p>Click the feed options below to see the settings change in on the feeder blueprint.</p>
          <button ref={timerBtnRef} className={activeBtnRef.current === timerBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'timer')}>650 lb full timer</button>
          <button ref={directionalBtnRef} className={activeBtnRef.current === directionalBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'directional')}>650 lb full directional</button>
          <button ref={splitDirectionalBtnRef} className={activeBtnRef.current === splitDirectionalBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'split directional')}>Left 350 lb gravity / 300 lb directional</button>
          <button ref={splitTimerBtnRef} className={activeBtnRef.current === splitTimerBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'split timer')}>Left 350 lb gravity / 300 lb full timer</button>
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

export default SurfNTurfFeedOptions;
