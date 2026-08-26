import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import Homepage from './homepage';
import { productData } from '../assets/data/products';
import { HOME_DESCRIPTION, HOME_HEADING, HOME_TITLE } from '../utils/siteMeta';
import { CartProvider } from '../context/cartContext';

const renderHomepage = () =>
  render(
    <HelmetProvider>
      <CartProvider>
        <MemoryRouter>
          <Homepage
            openInquiry={() => undefined}
            productData={productData}
            testimonialData={[]}
            isLoading={false}
            setIsLoading={() => undefined}
          />
        </MemoryRouter>
      </CartProvider>
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

    expect(document.title).toBe(`${HOME_HEADING} | PGM Outfitters`);
    expect(document.title).toBe('Next Generation Deer Feeders | PGM Outfitters');
    expect(HOME_DESCRIPTION).toBe(
      'Shreveport-made deer feeders that run protein and corn on gravity or timer. Built by PGM Outfitters for hunters and dealers.'
    );
    expect(metaContent('meta[name="description"]')).toBe(HOME_DESCRIPTION);
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://pgmoutfitters.com/'
    );
    expect(metaContent('meta[property="og:title"]')).toBe(HOME_TITLE);
    expect(metaContent('meta[property="og:description"]')).toBe(HOME_DESCRIPTION);
    expect(metaContent('meta[property="og:url"]')).toBe('https://pgmoutfitters.com/');
    expect(metaContent('meta[name="twitter:title"]')).toBe(HOME_TITLE);
    expect(metaContent('meta[name="twitter:description"]')).toBe(HOME_DESCRIPTION);
  });

  test('renders one visible H1 above the product listing and keeps Company as H2', () => {
    const { container } = renderHomepage();

    const headings = container.querySelectorAll('h1');
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(HOME_HEADING);
    expect(headings[0].closest('.homeHeading')).not.toBeNull();

    const listing = container.querySelector('.productListing');
    expect(headings[0].compareDocumentPosition(listing as Node) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    expect(container.querySelector('.company h2.sectionHeading')).toHaveTextContent('PGM Outfitters');
    expect(container.querySelector('.company h3')).toBeNull();
    expect(container.querySelector('.testimonials h2.sectionHeading')).toHaveTextContent('Testimonials');
    expect(container.querySelector('.testimonials h3')).toBeNull();
    expect(container.querySelectorAll('.productCard h4').length).toBeGreaterThan(0);
  });
});
