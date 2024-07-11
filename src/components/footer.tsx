/* eslint-disable jsx-a11y/iframe-has-title */
import DealerList from './dealerList';

import {ReactComponent as Logo} from '../assets/img/logo.svg';

import PinIcon from '../assets/img/icons/png/pin.png';
import EmailIcon from '../assets/img/icons/png/email.png';
import PhoneIcon from '../assets/img/icons/png/phone.png';

const Footer = (props: any) => {
  // const handleInquiryBtnClick = () => {
  //   window.gtag('event', 'dealerCTA');
  //   props.openInquiry();
  // }
  return (
    <footer>
        <DealerList />
        <div className="footerWrap">
            <div className="copyWrap">
                <article>
                    <Logo />
                    <section className="addressWrap">
                        <div className="icon">
                            <img src={PinIcon} alt="" />
                        </div>
                        <address>
                            908 Joseph St.
                            <br />
                            Shreveport, LA 71107
                        </address>
                    </section>
                    <section className="contactWrap">
                        <a href="tel:3182278145" className="phone">
                            <div className="icon">
                                <img src={PhoneIcon} alt="" />
                            </div>
                            <span>(318) 227-8145</span>
                        </a>
                        <a href="mailto:sales@pgmoutfitters.com" className="email">
                            <div className="icon">
                                <img src={EmailIcon} alt="" />
                            </div>
                            <span>sales@pgmoutfitters.com</span>
                        </a>
                    </section>
                </article>
            </div>
            <iframe
                height="450"
                loading="lazy" 
                allowFullScreen
                src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJXWCtKtnMNoYRCMcONgvgYtk&key=AIzaSyBQGqPcLfspTJC6KKJplR9YFFrbOvD9xDs">
            </iframe>
        </div>
    </footer>
  )
}

export default Footer;
