import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProductCard from './ProductCard.jsx';

const product = {
  sku: 'GF15',
  name: '15A Self-Test GFCI Receptacle',
  feature: 'Standard',
  rating: '15A, 125V',
  nema: '5-15R'
};

describe('ProductCard', () => {
  it('uses one accessible full-card link to the lowercase product route', () => {
    const { container } = render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', {
      name: 'GF15 15A Self-Test GFCI Receptacle'
    });
    expect(link).toHaveAttribute('href', '/products/gfci/gf15');
    expect(link).toHaveClass('pcard');
    expect(container.querySelectorAll('a')).toHaveLength(1);
    expect(within(link).getByText('View details')).toBeVisible();
    expect(within(link).getByRole('img', { name: /GF15/ })).toHaveAttribute('loading', 'lazy');
  });
});
