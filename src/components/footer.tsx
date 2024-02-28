import React from 'react';

import {ReactComponent as Logo} from '../assets/img/logo.svg';

import {ReactComponent as Pin} from '../assets/img/icons/pin.svg';
import {ReactComponent as Email} from '../assets/img/icons/email.svg';
import {ReactComponent as Phone} from '../assets/img/icons/phone.svg';

const Footer = (props: any) => {
  // const handleInquiryBtnClick = () => {
  //   window.gtag('event', 'dealerCTA');
  //   props.openInquiry();
  // }
  return (
    <footer>
      <div className="footerWrap">
      <iframe
        height="450"
        loading="lazy" 
        allowFullScreen
        src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJXWCtKtnMNoYRCMcONgvgYtk&key=AIzaSyBQGqPcLfspTJC6KKJplR9YFFrbOvD9xDs">
      </iframe>
      <div className="copyWrap">
        <article>
          <Logo />
          <section>
            <address>
              <Pin /> 908 Joseph St.
              <br />
              Shreveport, LA 71107
            </address>
          </section>
          <section>
            <a href="tel:3182278145"><Phone /> (318) 227-8145</a>
            <a href="mailto:sales@pgmoutfitters.com"><Email /> sales@pgmoutfitters.com</a>
          </section>
        </article>
      </div>
      </div>
    </footer>
  )
}

export default Footer;
