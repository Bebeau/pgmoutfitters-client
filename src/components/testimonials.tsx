import React, {useState, useEffect} from 'react';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const [show, setShow] = useState(false);
  const handleTransition = () => {
    setShow(false);
    setTimeout(() => setShow(true), 500);
  }
  const handleNavClick = (index: number) => {
    handleTransition();
    setTimeout(() => setActiveIndex(index), 500);
  }
  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="testimonials">
      <div className="contentWrap">
        <h3>Customer Testimonials</h3>
        <SingleQuote {...props.testimonials[activeIndex]} transition={show} />
        <div className="dotNav">
          {props.testimonials.map((item: any, index: number) => {
          return (
              <div key={index} className={activeIndex === index ? 'dot active' : 'dot'} onClick={() => handleNavClick(index)} />
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Testimonials;
