import { dealerDirectionsUrl, dealerMapsEmbedUrl } from './dealerAddress';

const address = {
  street: '3148 MS-1',
  city: 'Greenville',
  state: 'MS',
  zip: '38701',
};

describe('dealerAddress', () => {
  test('encodes the directions destination and embed query', () => {
    expect(dealerDirectionsUrl(address)).toBe(
      'https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=3148%20MS-1%20Greenville%20MS%2038701'
    );
    expect(dealerMapsEmbedUrl(address)).toBe(
      'https://maps.google.com/maps?q=3148%20MS-1%20Greenville%20MS%2038701&output=embed'
    );
  });
});
