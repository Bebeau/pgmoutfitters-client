import { render, waitFor } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import PageHelmet from './components/pageHelmet';

const metaContent = (selector: string) =>
  document.head.querySelector(selector)?.getAttribute('content');

test('PageHelmet writes matching title, description, canonical, and optional og:image', async () => {
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
});
