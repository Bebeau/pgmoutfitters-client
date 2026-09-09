import { useCallback } from 'react';
import { getResponsiveImage } from '../utils/responsiveImage';
import '../assets/img/responsiveImages.generated';

export type ResponsiveImageProps = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  lazy?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
};

const ResponsiveImage = ({
  src,
  alt,
  className,
  sizes = '(max-width: 767px) 100vw, 800px',
  lazy = true,
  fetchPriority,
  width,
  height,
}: ResponsiveImageProps) => {
  const record = getResponsiveImage(src);
  const imgWidth = width ?? record?.width;
  const imgHeight = height ?? record?.height;
  const loading = lazy ? 'lazy' : 'eager';

  const setPriority = useCallback(
    (node: HTMLImageElement | null) => {
      if (!node || !fetchPriority || fetchPriority === 'auto') {
        return;
      }
      node.setAttribute('fetchpriority', fetchPriority);
    },
    [fetchPriority]
  );

  const img = (
    <img
      ref={setPriority}
      className={className}
      src={src}
      alt={alt}
      width={imgWidth}
      height={imgHeight}
      sizes={record ? sizes : undefined}
      srcSet={record?.fallbackSrcSet}
      loading={loading}
      decoding="async"
    />
  );

  if (!record?.avifSrcSet && !record?.webpSrcSet) {
    return img;
  }

  return (
    <picture className="responsiveImage">
      {record.avifSrcSet ? (
        <source type="image/avif" srcSet={record.avifSrcSet} sizes={sizes} />
      ) : null}
      {record.webpSrcSet ? (
        <source type="image/webp" srcSet={record.webpSrcSet} sizes={sizes} />
      ) : null}
      {img}
    </picture>
  );
};

export default ResponsiveImage;
