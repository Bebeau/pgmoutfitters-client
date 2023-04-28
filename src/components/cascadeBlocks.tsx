import React, {useState} from 'react';

import { ReactComponent as CascadeOptions } from '../assets/img/cascade.svg';
import { ReactComponent as MotorGraphic } from '../assets/img/motor.svg';

import motorImage from '../assets/img/special-ops/photos/full/6.jpg';
import guardImage from '../assets/img/guard.jpg';

const CascadeBlocks = () => {
  const [activeItem, setActiveItem] = useState('');
  return (
    <>
      <div className={activeItem ? `motor-blueprint ${activeItem}` : 'motor-blueprint'}>
        <CascadeOptions />
        <MotorGraphic />
      </div>
      <div className="block cascade">
        <img src={guardImage} alt="" />
        <article className="copy" onMouseEnter={() => setActiveItem('guard')} onMouseLeave={() => setActiveItem('')}>
          <div>
            <h3>Varmet Guard</h3>
            <p>
              The cascade timer feeders are equip with a 24in x 24in x 1/4in steel plate varmet guard. It prevents any varmets from reaching the motor and manually emptying your feed. It is also durable enough to discourage boars.
            </p>
          </div>
        </article>
        <img src={motorImage} alt="" />
        <article className="copy" onMouseEnter={() => setActiveItem('door')} onMouseLeave={() => setActiveItem('')}>
          <div>
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
