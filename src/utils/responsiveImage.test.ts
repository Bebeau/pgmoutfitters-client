import {
  buildSrcSet,
  getResponsiveImage,
  registerResponsiveImages,
} from './responsiveImage';

describe('responsiveImage registry', () => {
  test('registers records by src and builds srcset strings', () => {
    registerResponsiveImages([
      {
        src: '/media/feeder.png',
        width: 800,
        height: 1200,
        webpSrcSet: '/media/feeder.w480.webp 480w, /media/feeder.w800.webp 800w',
      },
    ]);

    expect(getResponsiveImage('/media/feeder.png')).toMatchObject({
      width: 800,
      height: 1200,
    });
    expect(getResponsiveImage('/missing.png')).toBeUndefined();
    expect(
      buildSrcSet([
        { src: '/a.webp', width: 480 },
        { src: '/b.webp', width: 800 },
      ])
    ).toBe('/a.webp 480w, /b.webp 800w');
  });
});
