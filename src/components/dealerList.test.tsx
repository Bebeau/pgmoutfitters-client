import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { dealerData } from '../assets/data/dealers';
import { dealerPath } from '../utils/dealerPath';
import DealerList from './dealerList';

const renderDealerList = () =>
  render(
    <MemoryRouter>
      <DealerList />
    </MemoryRouter>
  );

describe('DealerList', () => {
  test('links each dealer card to its SEO page and shows the address', () => {
    renderDealerList();

    dealerData.forEach((dealer) => {
      expect(screen.getByRole('link', { name: new RegExp(dealer.name) })).toHaveAttribute(
        'href',
        dealerPath(dealer.slug)
      );
    });

    const renegade = dealerData.find((dealer) => dealer.slug === 'renegade-firearms');
    if (!renegade) {
      throw new Error('Expected renegade-firearms dealer');
    }

    const addressText = screen.getByText(new RegExp(renegade.address.street));
    expect(addressText).toBeInTheDocument();
    expect(addressText.closest('a')).toHaveAttribute('href', dealerPath(renegade.slug));
    expect(screen.queryByRole('link', { name: /get directions/i })).not.toBeInTheDocument();
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
