import React, {useState} from 'react';
import motorImage from '../assets/img/special-ops/photos/full/6.jpg';
import guardImage from '../assets/img/guard.jpg';

const CascadeBlocks = () => {
  const [activeItem, setActiveItem] = useState('');
  return (
    <>
      {/* <div className={activeItem ? `motor-blueprint ${activeItem}` : 'motor-blueprint'}>
        <CascadeOptions />
        <MotorGraphic />
      </div> */}
      <div className="block cascade">
        <article onMouseEnter={() => setActiveItem('guard')} onMouseLeave={() => setActiveItem('')}>
          <div className="image">
            <img src={guardImage} alt="" />
          </div>
          <div className="copy">
            <h3>Varment Guard</h3>
            <p>
              The cascade timer feeders are equip with a 24in x 24in x 1/8in steel plate varment guard. This feature prevents any varments from reaching the motor and manually emptying your feed, and is durable enough to discourage boars.
            </p>
          </div>
        </article>
        <article onMouseEnter={() => setActiveItem('door')} onMouseLeave={() => setActiveItem('')}>
          <div className="image">
            <img src={motorImage} alt="" />
          </div>
          <div className="copy">
            <h3>Funnel Drop Door</h3>
            <p>
              We have specifically cut an access door around the motor casing to allow for easy funnel access. This door is toggled by a latch to make maintenance, upkeep, and funnel cleaning as convenient as possible.
            </p>
          </div>
        </article>
      </div>
    </>
  )
}

export default CascadeBlocks;
