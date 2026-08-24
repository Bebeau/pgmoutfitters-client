import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './components/app';
import { productData } from './assets/data/products';
import { testimonialData } from './assets/data/testimonials';
import { HOME_TITLE } from './utils/siteMeta';

test('renders the homepage with the unique site title', async () => {
  render(
    <HelmetProvider>
      <App
        productData={productData}
        testimonialData={testimonialData}
      />
    </HelmetProvider>
  );

  await waitFor(() => {
    expect(document.title).toBe(HOME_TITLE);
  });
});
