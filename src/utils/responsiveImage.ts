export type ResponsiveImageRecord = {
  src: string;
  width: number;
  height: number;
  fallbackSrcSet?: string;
  webpSrcSet?: string;
  avifSrcSet?: string;
};

export const IMAGE_SIZES = {
  productCard: '(max-width: 767px) 92vw, (max-width: 1199px) 45vw, 360px',
  productMain: '(max-width: 767px) 60vw, 400px',
  productSpotlight: '(max-width: 767px) 90vw, 640px',
  related: '(max-width: 767px) 60vw, 280px',
  galleryThumb: '(max-width: 767px) 23vw, 160px',
  galleryFull: '(max-width: 767px) 92vw, 800px',
  feature: '(max-width: 767px) 90vw, 50vw',
  company: '(max-width: 767px) 92vw, 480px',
  cart: '80px',
  inquiry: '80px',
  riceBrand: '(max-width: 767px) 80vw, 420px',
} as const;

const recordsBySrc = new Map<string, ResponsiveImageRecord>();

export function registerResponsiveImages(records: ResponsiveImageRecord[]): void {
  records.forEach((record) => {
    recordsBySrc.set(record.src, record);
  });
}

export function getResponsiveImage(src?: string): ResponsiveImageRecord | undefined {
  if (!src) {
    return undefined;
  }
  return recordsBySrc.get(src);
}

export function buildSrcSet(entries: { src: string; width: number }[]): string {
  return entries.map((entry) => `${entry.src} ${entry.width}w`).join(', ');
}
