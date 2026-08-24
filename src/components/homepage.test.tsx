import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import Homepage from './homepage';
import { productData } from '../assets/data/products';
import { HOME_DESCRIPTION, HOME_TITLE } from '../utils/siteMeta';

const renderHomepage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <Homepage
          openInquiry={() => undefined}
          productData={productData}
          testimonialData={[]}
          isLoading={false}
          setIsLoading={() => undefined}
        />
      </MemoryRouter>
    </HelmetProvider>
  );

const metaContent = (selector: string) =>
  document.head.querySelector(selector)?.getAttribute('content');

describe('Homepage helmet', () => {
  test('sets a unique homepage title, description, canonical, and og:url', async () => {
    renderHomepage();

    await waitFor(() => {
      expect(document.title).toBe(HOME_TITLE);
    });

    expect(metaContent('meta[name="description"]')).toBe(HOME_DESCRIPTION);
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://pgmoutfitters.com/'
    );
    expect(metaContent('meta[property="og:title"]')).toBe(HOME_TITLE);
    expect(metaContent('meta[property="og:description"]')).toBe(HOME_DESCRIPTION);
    expect(metaContent('meta[property="og:url"]')).toBe('https://pgmoutfitters.com/');
  });
});
