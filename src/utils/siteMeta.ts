import { dealerPath } from './dealerPath';
import { productPath } from './productPath';

export const SITE_ORIGIN = 'https://pgmoutfitters.com';

export const HOME_TITLE = 'Next Generation Deer Feeders | PGM Outfitters';
export const HOME_DESCRIPTION =
  'PGM Outfitters is a manufacturer of next generation deer feeders.';

export const CART_TITLE = 'Cart | PGM Outfitters';
export const CART_SUCCESS_TITLE = 'Order Confirmed | PGM Outfitters';

export const DEFAULT_OG_IMAGE =
  'https://init-public.s3.amazonaws.com/pgmFacebook.jpg';
export const DEFAULT_TWITTER_IMAGE =
  'https://init-public.s3.amazonaws.com/pgmTwitter.jpg';

export const homeCanonical = () => `${SITE_ORIGIN}/`;

export const productCanonical = (slug: string) =>
  `${SITE_ORIGIN}${productPath(slug)}`;

export const dealerCanonical = (slug: string) =>
  `${SITE_ORIGIN}${dealerPath(slug)}`;

export const dealerPageTitle = (name: string) =>
  `${name} | PGM Outfitters Dealer`;

export const dealerPageDescription = (name: string, city: string, state: string) =>
  `Shop Next Generation deer feeders at ${name} in ${city}, ${state}. Address, directions, and the full PGM Outfitters lineup.`;

export const productPageTitle = (name: string) => {
  const suffix = /feeder$/i.test(name.trim()) ? '' : ' Deer Feeder';
  return `${name}${suffix} | PGM Outfitters`;
};

export const productPageDescription = (name: string, description?: string) => {
  const trimmed = description?.trim();
  if (trimmed) {
    return trimmed;
  }
  return `The ${name} deer feeder from PGM Outfitters. Built for hunters and dealers. Request pricing.`;
};

export const isAbsoluteHttpUrl = (value?: string) =>
  Boolean(value && /^https?:\/\//i.test(value));
