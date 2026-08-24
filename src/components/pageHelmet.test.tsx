import fs from 'fs';
import path from 'path';
import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import PageHelmet from './pageHelmet';
import {
  DEFAULT_OG_IMAGE,
  DEFAULT_TWITTER_IMAGE,
  productPageDescription,
  productPageTitle,
} from '../utils/siteMeta';

const INDEX_HTML_DESCRIPTION =
  'PGM Outfitters is a manufacturer of next generation deer feeders.';
const INDEX_HTML_TITLE = 'Next Generation Deer Feeders';

const metaContent = (selector: string) =>
  document.head.querySelector(selector)?.getAttribute('content');

const metaCount = (selector: string) => document.head.querySelectorAll(selector).length;

const seedIndexHtmlHead = () => {
  document.title = INDEX_HTML_TITLE;
  document.querySelector('title')?.setAttribute('data-rh', 'true');

  const tags: Array<Record<string, string>> = [
    { name: 'description', content: INDEX_HTML_DESCRIPTION, 'data-rh': 'true' },
    { property: 'og:title', content: INDEX_HTML_TITLE, 'data-rh': 'true' },
    { property: 'og:description', content: INDEX_HTML_DESCRIPTION, 'data-rh': 'true' },
    { property: 'og:url', content: 'https://pgmoutfitters.com', 'data-rh': 'true' },
    { property: 'og:image', content: DEFAULT_OG_IMAGE, 'data-rh': 'true' },
    { property: 'og:image:secure_url', content: DEFAULT_OG_IMAGE, 'data-rh': 'true' },
    { name: 'twitter:title', content: INDEX_HTML_TITLE, 'data-rh': 'true' },
    { name: 'twitter:description', content: INDEX_HTML_DESCRIPTION, 'data-rh': 'true' },
    { name: 'twitter:image:src', content: DEFAULT_TWITTER_IMAGE, 'data-rh': 'true' },
  ];

  tags.forEach((attrs) => {
    const el = document.createElement('meta');
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    document.head.appendChild(el);
  });
};

const clearSeededHead = () => {
  document.head
    .querySelectorAll(
      [
        'meta[name="description"]',
        'meta[property="og:title"]',
        'meta[property="og:description"]',
        'meta[property="og:url"]',
        'meta[property="og:image"]',
        'meta[property="og:image:secure_url"]',
        'meta[name="twitter:title"]',
        'meta[name="twitter:description"]',
        'meta[name="twitter:image:src"]',
        'link[rel="canonical"]',
      ].join(', ')
    )
    .forEach((el) => el.remove());
  document.title = '';
};

describe('PageHelmet', () => {
  test('index.html marks Helmet-owned tags with data-rh so v3 can replace them', () => {
    const html = fs.readFileSync(path.join(__dirname, '../../public/index.html'), 'utf8');

    expect(html).toMatch(/name="description"[\s\S]*?data-rh="true"/);
    expect(html).toMatch(/property="og:title"[^>]*data-rh="true"/);
    expect(html).toMatch(/property="og:description"[\s\S]*?data-rh="true"/);
    expect(html).toMatch(/property="og:url"[^>]*data-rh="true"/);
    expect(html).toMatch(/name="twitter:description"[\s\S]*?data-rh="true"/);
    expect(html).toMatch(/name="twitter:title"[^>]*data-rh="true"/);
    expect(html).toMatch(/<title data-rh="true">/);
    expect(html).toMatch(
      /property="og:image"\s+content="https:\/\/init-public\.s3\.amazonaws\.com\/pgmFacebook\.jpg"\s+data-rh="true"/
    );
    expect(html).toMatch(
      /property="og:image:secure_url"\s+content="https:\/\/init-public\.s3\.amazonaws\.com\/pgmFacebook\.jpg"\s+data-rh="true"/
    );
    expect(html).toMatch(
      /name="twitter:image:src"\s+content="https:\/\/init-public\.s3\.amazonaws\.com\/pgmTwitter\.jpg"\s+data-rh="true"/
    );
  });

  beforeEach(() => {
    clearSeededHead();
  });

  afterEach(() => {
    clearSeededHead();
  });

  test('writes matching title, description, canonical, and optional og:image', async () => {
    render(
      <HelmetProvider>
        <PageHelmet
          title="2-N-1 Deer Feeder | PGM Outfitters"
          description="A split gravity and spin feeder."
          canonical="https://pgmoutfitters.com/deer-feeders/2-n-1"
          image="https://pgmoutfitters.com/feeder.png"
        />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe('2-N-1 Deer Feeder | PGM Outfitters');
    });

    expect(metaContent('meta[name="description"]')).toBe('A split gravity and spin feeder.');
    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe(
      'https://pgmoutfitters.com/deer-feeders/2-n-1'
    );
    expect(metaContent('meta[property="og:url"]')).toBe(
      'https://pgmoutfitters.com/deer-feeders/2-n-1'
    );
    expect(metaContent('meta[property="og:image"]')).toBe(
      'https://pgmoutfitters.com/feeder.png'
    );
    expect(metaContent('meta[property="og:image:secure_url"]')).toBe(
      'https://pgmoutfitters.com/feeder.png'
    );
    expect(metaContent('meta[name="twitter:image:src"]')).toBe(
      'https://pgmoutfitters.com/feeder.png'
    );
    expect(metaContent('meta[name="twitter:title"]')).toBe(
      '2-N-1 Deer Feeder | PGM Outfitters'
    );
    expect(metaContent('meta[name="twitter:description"]')).toBe(
      'A split gravity and spin feeder.'
    );
  });

  test('can emit noindex without a product title', async () => {
    render(
      <HelmetProvider>
        <PageHelmet noindex />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(metaContent('meta[name="robots"]')).toBe('noindex');
    });

    expect(document.title).not.toMatch(/Deer Feeder \| PGM Outfitters$/);
    expect(document.head.querySelector('link[rel="canonical"]')).toBeNull();
  });

  test('replaces pre-existing index.html description and og tags with one product set', async () => {
    seedIndexHtmlHead();

    expect(metaContent('meta[name="description"]')).toBe(INDEX_HTML_DESCRIPTION);
    expect(metaContent('meta[property="og:title"]')).toBe(INDEX_HTML_TITLE);

    const title = productPageTitle('2-N-1');
    const description = productPageDescription('2-N-1', '');
    const canonical = 'https://pgmoutfitters.com/deer-feeders/2-n-1';

    render(
      <HelmetProvider>
        <PageHelmet title={title} description={description} canonical={canonical} />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(metaContent('meta[name="description"]')).toBe(description);
    });

    expect(metaCount('meta[name="description"]')).toBe(1);
    expect(metaCount('meta[property="og:description"]')).toBe(1);
    expect(metaCount('meta[name="twitter:description"]')).toBe(1);
    expect(metaCount('meta[property="og:title"]')).toBe(1);
    expect(metaCount('meta[name="twitter:title"]')).toBe(1);
    expect(metaCount('meta[property="og:url"]')).toBe(1);
    expect(metaContent('meta[property="og:description"]')).toBe(description);
    expect(metaContent('meta[name="twitter:description"]')).toBe(description);
    expect(metaContent('meta[property="og:title"]')).toBe(title);
    expect(metaContent('meta[name="twitter:title"]')).toBe(title);
    expect(metaContent('meta[property="og:url"]')).toBe(canonical);
    expect(document.title).toBe(title);
    expect(metaCount('meta[property="og:image"]')).toBe(1);
    expect(metaCount('meta[property="og:image:secure_url"]')).toBe(1);
    expect(metaCount('meta[name="twitter:image:src"]')).toBe(1);
    expect(metaContent('meta[property="og:image"]')).toBe(DEFAULT_OG_IMAGE);
    expect(metaContent('meta[property="og:image:secure_url"]')).toBe(DEFAULT_OG_IMAGE);
    expect(metaContent('meta[name="twitter:image:src"]')).toBe(DEFAULT_TWITTER_IMAGE);
    expect(description).toBe(
      'The 2-N-1 deer feeder from PGM Outfitters. Built for hunters and dealers. Request pricing.'
    );
  });

  test('replaces pre-existing default images when PageHelmet gets an absolute image', async () => {
    seedIndexHtmlHead();

    expect(metaContent('meta[property="og:image"]')).toBe(DEFAULT_OG_IMAGE);
    expect(metaContent('meta[name="twitter:image:src"]')).toBe(DEFAULT_TWITTER_IMAGE);

    const productImage = 'https://pgmoutfitters.com/feeder.png';

    render(
      <HelmetProvider>
        <PageHelmet
          title={productPageTitle('2-N-1')}
          description={productPageDescription('2-N-1', '')}
          canonical="https://pgmoutfitters.com/deer-feeders/2-n-1"
          image={productImage}
        />
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(metaContent('meta[property="og:image"]')).toBe(productImage);
    });

    expect(metaCount('meta[property="og:image"]')).toBe(1);
    expect(metaCount('meta[property="og:image:secure_url"]')).toBe(1);
    expect(metaCount('meta[name="twitter:image:src"]')).toBe(1);
    expect(metaContent('meta[property="og:image:secure_url"]')).toBe(productImage);
    expect(metaContent('meta[name="twitter:image:src"]')).toBe(productImage);
  });
});
