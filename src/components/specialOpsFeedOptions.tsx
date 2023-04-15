import React, {useState, useRef} from 'react';

import { ReactComponent as FeedOptions } from '../assets/img/special-ops/special-ops-feed-options.svg';

const SpecialOpsFeedOptions = (props: {openInquiry: () => void}) => {
  const activeBtnRef = useRef(null);
  const gravityBtnRef = useRef(null);
  const splitBtnRef = useRef(null);
  const timerBtnRef = useRef(null);

  const [setting, setSetting] = useState('');

  const handleBtnClick = (target: any, setting: string) => {
    activeBtnRef.current = target;
    setSetting(setting);
  }

  return (
    <div className="block feedOptions specialOps">
      <article className="options">
        <div>
          <h3>Feed Options</h3>
          <p>Click the feed options below to see the settings change in on the feeder blueprint.</p>
          <button ref={timerBtnRef} className={activeBtnRef.current === timerBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'timer')}>800 lb full timer</button>
          <button ref={splitBtnRef} className={activeBtnRef.current === splitBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'split')}>350 lb gravity / 450 lb timer</button>
          <button ref={gravityBtnRef} className={activeBtnRef.current === gravityBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'gravity')}>600 lb full gravity</button>
          <button className="btn" onClick={props.openInquiry}>
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

export default SpecialOpsFeedOptions;
