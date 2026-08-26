import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './components/app';
import reportWebVitals from './reportWebVitals';
import './assets/css/styles.css';
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

if (container.childElementCount > 0) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
