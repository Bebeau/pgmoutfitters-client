import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import App from './app';
import { productData } from '../assets/data/products';
import { HOME_HEADING } from '../utils/siteMeta';

describe('App homepage split', () => {
  test('renders the homepage without mounting inquiry or a product page', async () => {
    render(
      <HelmetProvider>
        <App productData={productData} testimonialData={[]} initialLoading={false} />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.querySelector('.homeHeading h1')).toHaveTextContent(HOME_HEADING);
    });

    expect(document.getElementById('productPage')).toBeNull();
    expect(document.querySelector('.inquiryModal')).toBeNull();
    expect(document.querySelector('.cartLink')).toBeInTheDocument();
  });
});
