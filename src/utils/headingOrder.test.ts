import { headingLevels, headingOrderSkips } from './headingOrder';

describe('headingOrder', () => {
  test('flags an h1 to h4 skip and accepts sequential or rising levels', () => {
    document.body.innerHTML = `
      <h1>Home</h1>
      <h4>Card</h4>
      <h2>Company</h2>
      <h3>Dealers</h3>
    `;

    expect(headingLevels(document.body)).toEqual([1, 4, 2, 3]);
    expect(headingOrderSkips([1, 4, 2, 3])).toEqual([[1, 4]]);
    expect(headingOrderSkips([1, 2, 2, 3, 4])).toEqual([]);
  });
});
