import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { dealerData } from '../assets/data/dealers';
import { dealerDirectionsUrl } from '../utils/dealerAddress';
import { dealerPath } from '../utils/dealerPath';
import DealerList from './dealerList';

const renderDealerList = () =>
  render(
    <MemoryRouter>
      <DealerList />
    </MemoryRouter>
  );

describe('DealerList', () => {
  test('links each dealer name to its SEO page and keeps the directions address', () => {
    renderDealerList();

    dealerData.forEach((dealer) => {
      expect(screen.getByRole('link', { name: dealer.name })).toHaveAttribute(
        'href',
        dealerPath(dealer.slug)
      );
    });

    const renegade = dealerData.find((dealer) => dealer.slug === 'renegade-firearms');
    if (!renegade) {
      throw new Error('Expected renegade-firearms dealer');
    }

    const addressLink = screen.getByText(new RegExp(renegade.address.street)).closest('a');
    expect(addressLink).toHaveAttribute('href', dealerDirectionsUrl(renegade.address));
    expect(addressLink).toHaveAttribute('target', '_blank');
  });

  test('keeps map pins as hover targets rather than links', () => {
    const { container } = renderDealerList();

    const pins = container.querySelectorAll('.dealerPin');
    expect(pins).toHaveLength(dealerData.length);
    pins.forEach((pin) => {
      expect(pin.tagName).toBe('DIV');
    });
  });
});
