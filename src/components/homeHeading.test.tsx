import { render } from '@testing-library/react';
import HomeHeading from './homeHeading';
import { HOME_HEADING } from '../utils/siteMeta';

describe('HomeHeading', () => {
  test('renders the shared homepage heading as a single H1', () => {
    const { container } = render(<HomeHeading />);

    const headings = container.querySelectorAll('h1');
    expect(headings).toHaveLength(1);
    expect(headings[0]).toHaveTextContent(HOME_HEADING);
    expect(HOME_HEADING).toBe('Next Generation Deer Feeders');
    expect(container.querySelector('.homeHeading')).not.toBeNull();
  });
});
