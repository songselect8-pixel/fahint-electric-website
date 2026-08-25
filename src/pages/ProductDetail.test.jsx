import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import ProductDetail from './ProductDetail.jsx';

function LocationProbe() {
  const location = useLocation();
  return <span data-testid="location">{location.pathname}</span>;
}

function renderDetail(sku) {
  return render(
    <MemoryRouter
      initialEntries={[`/products/gfci/${sku}`]}
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Routes>
        <Route path="/products/gfci/:sku" element={<ProductDetail />} />
        <Route path="/products/gfci" element={<div>GFCI series fallback</div>} />
      </Routes>
      <LocationProbe />
    </MemoryRouter>
  );
}

describe('ProductDetail', () => {
  it('renders the GF15 brand-led hero with verified facts and quote action', () => {
    const { container } = renderDetail('gf15');

    expect(screen.getByRole('heading', {
      level: 1,
      name: '15A Self-Test GFCI Receptacle'
    })).toBeInTheDocument();
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(container.querySelector('.product-detail-hero__model')).toHaveTextContent('GF15');

    const facts = container.querySelector('.product-detail-hero__facts');
    expect(facts).not.toBeNull();
    expect(within(facts).getByText('Rating').nextElementSibling).toHaveTextContent('15A, 125V');
    expect(within(facts).getByText('Configuration').nextElementSibling).toHaveTextContent('NEMA 5-15R');
    expect(screen.getByText('UL / cUL listed · file E504391')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Request a quote/ })).toHaveAttribute('href', '#inquiry');
  });

  it('does not claim the E504391 certification for GL20', () => {
    renderDetail('gl20');

    expect(screen.getByRole('heading', {
      level: 1,
      name: '20A Blank Face GFCI Module'
    })).toBeInTheDocument();
    expect(screen.queryByText(/E504391/)).not.toBeInTheDocument();
  });

  it('redirects an unknown sku to the GFCI series route', () => {
    renderDetail('unknown-model');

    expect(screen.getByText('GFCI series fallback')).toBeInTheDocument();
    expect(screen.getByTestId('location')).toHaveTextContent('/products/gfci');
  });

  it('defines visible focus states for the gallery controls and enlarged view', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(/\.product-gallery__main:focus-visible\s*\{[\s\S]*?outline:/);
    expect(styles).toMatch(/\.product-gallery__dialog-close:focus-visible\s*\{[\s\S]*?outline:/);
  });

  it('stacks the product hero at tablet widths', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(
      /@media \(max-width:\s*900px\)[\s\S]*?\.product-detail-hero__grid\s*\{[\s\S]*?grid-template-columns:\s*1fr/
    );
  });
});
