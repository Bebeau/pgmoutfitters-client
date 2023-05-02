import React, {useState, useEffect} from 'react';

import { ReactComponent as Refresh } from '../assets/img/refresh.svg';

const SingleQuote = (props: any) => {
  return (
    <div className={props.transition ? "testimonialWrap show" : "testimonialWrap" }>
      <section className="testimonialImage">
        <div style={{backgroundImage: "url(" + props.image + ")"}}></div>
      </section>
      <section className="testimonialCopy">
        <blockquote>
          {props.quote}
        </blockquote>
        <cite>
          {props.name}
        </cite>
      </section>
    </div>
  )
}

const Testimonials = (props: any) => {
  const btnRef = React.useRef<any>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [show, setShow] = useState(false);
  const handleTransition = () => {
    setShow(false);
    setTimeout(() => setShow(true), 500);
  }
  const rotateBtnClick = () => {
    if(typeof btnRef.current !== 'undefined') {
      btnRef.current.classList.add('rotate');
      setTimeout(() => {
        btnRef.current.classList.remove('rotate');
      }, 1000 );
    }
  }
  const handleNavClick = () => {
    handleTransition();
    rotateBtnClick();
    if(activeIndex !== (props.testimonials.length - 1) ) {
      return setTimeout(() => setActiveIndex(activeIndex+1), 500);
    }
    setTimeout(() => setActiveIndex(0), 500);
  }
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="testimonials">
      <div className="contentWrap">
        <h3>Testimonials</h3>
        <SingleQuote {...props.testimonials[activeIndex]} transition={show} />
        <div ref={btnRef} className='change'>
          <Refresh onClick={() => handleNavClick()} />
        </div>
      </div>
    </div>
  )
}

export default Testimonials;
