import {useState, useRef, useEffect} from 'react';

import { ReactComponent as FeedOptions } from '../assets/img/feeders/4n1/modes.svg';

const FourInOneFeedOptions = () => {
  const fullBtnRef = useRef(null);
  const singleBtnRef = useRef(null);
  const activeBtnRef = useRef(null);

  const [setting, setSetting] = useState('');

  const handleBtnClick = (target: any, setting: string) => {
    activeBtnRef.current = target;
    setSetting(setting);
  }

  useEffect(() => {
    activeBtnRef.current = fullBtnRef.current;
    setSetting('timer');
  }, []);

  return (
    <div className="block feedOptions fiveInOne">
      <article className="options">
        <div>
          <h3>Feed Options</h3>
          <p>Click the feed options below to see the settings change in on the feeder blueprint.</p>
          <button ref={fullBtnRef} className={activeBtnRef.current === fullBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'full')}>4 chambers @ 425lb each</button>
          <button ref={singleBtnRef} className={activeBtnRef.current === singleBtnRef.current ? 'btn outline active' : 'btn outline'} onClick={(e) => handleBtnClick(e.target, 'single')}>425 lb single chamber</button>
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

export default FourInOneFeedOptions;
