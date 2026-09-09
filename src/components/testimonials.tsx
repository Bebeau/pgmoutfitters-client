import React, {useState} from 'react';

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
  const [show, setShow] = useState(true);
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
  return (
    <div className="testimonials">
      <div className="contentWrap">
        <h2 className="sectionHeading">Testimonials</h2>
        {props.testimonials[activeIndex] ? (
          <SingleQuote {...props.testimonials[activeIndex]} transition={show} />
        ) : null}
        {props.testimonials.length > 1 ? (
          <button
            type="button"
            ref={btnRef}
            className="change"
            aria-label="Show next testimonial"
            onClick={handleNavClick}
          >
            <Refresh aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default Testimonials;
