import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Footer from './Footer.jsx';
import { findProduct } from '../data/products.js';

function renderFooter(pathname) {
  return render(
    <MemoryRouter initialEntries={[pathname]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Footer />
    </MemoryRouter>
  );
}

describe('Footer product certification context', () => {
  it('marks only product-detail footers for mobile quote clearance', () => {
    const { container, unmount } = renderFooter('/products/gfci/gf15');

    expect(container.querySelector('footer')).toHaveClass('footer--product-detail');

    unmount();
    const unrelated = renderFooter('/about');
    expect(unrelated.container.querySelector('footer')).not.toHaveClass('footer--product-detail');
  });

  it('does not apply the GFCI file reference to the GL20 detail route', () => {
    renderFooter('/products/gfci/gl20');

    expect(screen.queryByText(/E504391/)).not.toBeInTheDocument();
    expect(screen.getByText(/model-specific certification review required/i)).toBeInTheDocument();
  });

  it('uses the verified detail product file instead of the company-level file', () => {
    const product = findProduct('GF15');
    const originalListing = product.listing;
    product.listing = { ...originalListing, file: 'MODEL-SCOPED-FILE' };

    try {
      renderFooter('/products/gfci/gf15');
      expect(screen.getByText(/MODEL-SCOPED-FILE/)).toBeInTheDocument();
    } finally {
      product.listing = originalListing;
    }
  });
});
