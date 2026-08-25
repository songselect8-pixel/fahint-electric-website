import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProductsOverview from './ProductsOverview.jsx';

function renderProductsOverview() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ProductsOverview />
    </MemoryRouter>
  );
}

describe('ProductsOverview', () => {
  it('presents exactly the five approved product families as complete links', () => {
    const { container } = renderProductsOverview();

    [
      ['GFCI Outlets', '/products/gfci'],
      ['USB & Type-C Outlets', '/products/usb-outlets'],
      ['Receptacles', '/products/receptacles'],
      ['Smart Home Controls', '/products/smart-switches'],
      ['Switches & Dimmers', '/products/dimmers']
    ].forEach(([name, href]) => {
      expect(screen.getByRole('heading', { name }).closest('a')).toHaveAttribute('href', href);
    });

    expect(container.querySelectorAll('.product-family-section .editorial-product-panel')).toHaveLength(5);
  });

  it('uses the approved brand-led narrative and removes the catalogue interface', () => {
    renderProductsOverview();

    [
      'One coordinated product platform.',
      'Built for brands and OEM programs.',
      'Specified for real projects.',
      'Verified manufacturing and compliance.'
    ].forEach((name) => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    });

    expect(screen.queryByRole('heading', { name: 'Browse by Series and Model' })).not.toBeInTheDocument();
    expect(screen.queryByRole('searchbox')).not.toBeInTheDocument();
  });

  it('keeps the approved semantic section order', () => {
    const { container } = renderProductsOverview();

    expect([...container.querySelectorAll('section')].map((section) => section.classList[0])).toEqual([
      'product-overview-hero',
      'product-family-section',
      'product-brand-system',
      'product-market-section',
      'product-evidence-section',
      'product-proof-strip',
      'product-overview-cta'
    ]);
  });

  it('prioritizes the coordinated family image in the hero', () => {
    renderProductsOverview();

    const heroImage = screen.getByAltText('Fahint coordinated wiring-device family');
    expect(heroImage.getAttribute('src').endsWith('assets/images/editorial-home/brand-system-family-final.png')).toBe(true);
    expect(heroImage).toHaveAttribute('loading', 'eager');
    expect(heroImage).toHaveAttribute('fetchpriority', 'high');
  });
});
