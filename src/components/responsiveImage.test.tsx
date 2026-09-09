import { render } from '@testing-library/react';
import ResponsiveImage from './responsiveImage';
import { productData } from '../assets/data/products';
import { getResponsiveImage } from '../utils/responsiveImage';

describe('ResponsiveImage', () => {
  test('renders picture with avif/webp sources and dimensions for a known product image', () => {
    const src = productData[0].image;
    const record = getResponsiveImage(src);
    expect(record).toBeDefined();

    const { container } = render(
      <ResponsiveImage src={src} alt={productData[0].name} sizes="360px" lazy={false} fetchPriority="high" />
    );

    const picture = container.querySelector('picture.responsiveImage');
    expect(picture).not.toBeNull();
    expect(container.querySelector('source[type="image/avif"]')).toHaveAttribute('sizes', '360px');
    expect(container.querySelector('source[type="image/webp"]')).toHaveAttribute('sizes', '360px');

    const img = container.querySelector('img');
    expect(img).toHaveAttribute('alt', productData[0].name);
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('width', String(record?.width));
    expect(img).toHaveAttribute('height', String(record?.height));
    expect(img).toHaveAttribute('fetchpriority', 'high');
    expect(img?.getAttribute('srcset')).toBeTruthy();
  });

  test('defaults to lazy loading and falls back to a plain img when src is unknown', () => {
    const { container } = render(<ResponsiveImage src="/unknown-feeder.png" alt="Unknown" />);

    expect(container.querySelector('picture')).toBeNull();
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', '/unknown-feeder.png');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).not.toHaveAttribute('srcset');
  });
});
