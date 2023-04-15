import React, {useState, useEffect} from 'react';

interface slide {
  name?: string;
  image?: string;
  slug?: string;
  transition?: string;
}

const ProductSlide = (props: slide) => {
  return (
    <div className="slide">
      <section className="slideImage">
        <img src={props.image} alt={props.name} />
      </section>
      <section className={props.transition ? "slideCopy fade" : "slideCopy"}>
        <h2>
          <a href={`/products/deer-feeders/${props.slug}`}>
            {props.name}
          </a>
        </h2>
      </section>
    </div>
  )
}

const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

const Carousel = (props: any) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(getWidth());
  const [resizing, setResizing] = useState(false);
  const [titleFade, setTitleFade] = useState(true);

  const handleDotClick = (index: number) => {
    handleTitleFade();
    setTimeout(() => setActiveSlide(index), 500);
  }
  const handleTitleFade = () => {
    setTitleFade(true);
    setTimeout(() => setTitleFade(false), 1500);
  }

  useEffect(() => {
    setTimeout(() => setTitleFade(false), 500);
    const resizeListener = () => {
      setResizing(true);
      setWindowWidth(getWidth())
      setTimeout(() => setResizing(false), 500);
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  return (
    <div className="carousel">
      <div className="dotNav">
        {props.slides.map((slideData: any, index: number) => {
          return (
            <div key={index} className={activeSlide === index ? 'dot active' : 'dot'} onClick={() => handleDotClick(index)} />
          );
        })}
      </div>
      <div className={resizing ? "carouselWrap resizing" : "carouselWrap"} style={{transform: `translateX(${(-(windowWidth * activeSlide))}px)`}}>
        {props.slides.map((slideData: any, index: number) => {
          return (
            <ProductSlide
              {...slideData}
              key={index}
              transition={titleFade}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
