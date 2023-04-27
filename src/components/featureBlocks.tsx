import React, {useState, useEffect} from 'react';

import viewport from '../assets/img/viewport.png';
import camo from '../assets/img/camo.png';
import corn from '../assets/img/corn-kernals.png';
import solarPanel1 from '../assets/img/solarPanel1.png';
import solarPanel2 from '../assets/img/solarPanel2.png';

type featureBlockType = {
  name: string;
}
const FeatureBlocks = (props: featureBlockType) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * 0.2);
    }
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [offset]);
  return (
    <>
      <div className="block viewPort">
        <article className="copy">
          <div>
            <h3>Poly Sealed View Port</h3>
            <p>
              A practical solution for those who want to keep an eye on the feed level without having to open the feeder. The view port is made of a durable poly material that can withstand outdoor elements and is sealed to prevent moisture and debris from getting inside. This ensures that the feed remains clean and dry. The view port is clear, providing a good view of the feed level so that you can easily tell when it needs to be refilled.
            </p>
          </div>
        </article>
        <article className="camoWrap">
          <img className="camoImage" src={camo} alt='Camo Pattern' />
          <img 
            className="cornImage" 
            src={corn} 
            alt='Corn Feed' 
            style={{
              transform: `translateY(${offset * 0.5}px)`,
            }}
          />
          <img className="viewPortImage" src={viewport} alt='Poly Sealed View Port' />
        </article>
      </div>
      <div className="block solarPanel">
        <article className="camo">
          <div 
            className="glare"
            style={{
              transform: `translateY(${offset * -1}px)`,
            }}
          >
          </div>
          {
            props.name !== 'TreeHugger' && (
              <img src={solarPanel1} alt='' />
            )
          }
          {
            props.name === 'TreeHugger' && (
              <img src={solarPanel2} alt='' />
            )
          }
        </article>
        <article className="copy">
          <div>
            <h3>12 Volt Solar Panel</h3>
            <p>
              The solar panel makes it convenient and an eco-friendly solution for powering the feeder. The solar panel is mounted on the top of the feeder and is designed to absorb sunlight during the day, converting it into energy that can be used to power the feeder’s motor or other electrical components. This eliminates the need for traditional batteries or electrical outlets, making it easier and more cost-effective to maintain the feeder.
            </p>
          </div>
        </article>
      </div>
    </>
  )
}

export default FeatureBlocks;
