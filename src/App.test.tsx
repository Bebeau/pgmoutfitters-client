import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './components/homepage';

import {productData} from './assets/data/products';
import {testimonialData} from './assets/data/testimonials';

test('renders learn react link', () => {
  render(
    <App 
      openInquiry={() => {}}
      productData={productData}
      testimonialData={testimonialData}
    />
  );
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
