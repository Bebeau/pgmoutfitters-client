import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const PRIMARY_HEADING_SELECTOR =
  '.homeHeading h1, #productPage .desc h2, .dealerPage h1, .cartPage h1, .legalPage h1';

const focusPrimaryHeading = () => {
  const heading = document.querySelector(PRIMARY_HEADING_SELECTOR) as HTMLElement | null;
  if (!heading) {
    return;
  }
  if (!heading.hasAttribute('tabindex')) {
    heading.tabIndex = -1;
  }
  heading.focus({ preventScroll: true });
};

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    focusPrimaryHeading();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
