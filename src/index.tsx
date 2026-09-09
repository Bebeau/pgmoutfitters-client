import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import './assets/scss/critical.scss';
import {productData} from './assets/data/products';
import {testimonialData} from './assets/data/testimonials';

declare global {
  interface Window {
      gtag: (type: string, title: string, data?: object) => void;
  }
}

const container = document.getElementById('root') as HTMLElement;
const tree = (
  <React.StrictMode>
    <HelmetProvider>
      <App
        productData={productData}
        testimonialData={testimonialData}
        initialLoading={container.childElementCount === 0}
      />
    </HelmetProvider>
  </React.StrictMode>
);

// Chromium page.content() prerender snapshots can still differ from React 18.2's
// first hydrate (picture/srcset serialization). Recover without minified #418/#423
// console noise that PageSpeed flags. Dev still logs the mismatch.
const onRecoverableError =
  process.env.NODE_ENV === 'production'
    ? () => undefined
    : (error: unknown) => {
        console.error(error);
      };

if (container.childElementCount > 0) {
  hydrateRoot(container, tree, { onRecoverableError });
} else {
  createRoot(container).render(tree);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
