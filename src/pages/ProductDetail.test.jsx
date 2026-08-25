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
  it('renders the GF15 product story and technical proof in the approved order', () => {
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

    const headings = [
      'Protection engineered for everyday installation.',
      'Designed for the environments in the specification.',
      'Configure the product around your program.',
      'Technical specifications.',
      'Wiring and dimensions.',
      'Certification your team can verify.',
      'Manufacturing evidence.',
      'Other verified GFCI models.',
      'Request a quotation for GF15.'
    ];
    headings.forEach((heading) => {
      expect(screen.getByRole('heading', { level: 2, name: heading })).toBeInTheDocument();
    });

    const sectionIndexes = headings.map((heading) =>
      Array.from(container.querySelectorAll('h2')).findIndex((node) => node.textContent === heading)
    );
    expect(sectionIndexes).toEqual([...sectionIndexes].sort((a, b) => a - b));
  });

  it('renders one technical anchor with table and mobile disclosures generated from verified rows', () => {
    const { container } = renderDetail('gf15');

    expect(container.querySelectorAll('#technical-details')).toHaveLength(1);
    const technical = container.querySelector('#technical-details');
    expect(technical).not.toBeNull();
    expect(within(technical).getByRole('table')).toBeInTheDocument();
    expect(within(technical).getAllByText('Item code')).toHaveLength(2);
    expect(within(technical).getAllByText('GF15')).toHaveLength(2);
    expect(within(technical).getAllByText('Rating')).toHaveLength(2);
    expect(within(technical).getAllByText('Certification')).toHaveLength(2);
    expect(within(technical).getAllByText(/E504391/)).toHaveLength(2);
    expect(within(technical).queryByText(/warranty/i)).not.toBeInTheDocument();
  });

  it('keeps GL20 certification neutral everywhere', () => {
    const { container } = renderDetail('gl20');

    expect(screen.getByRole('heading', {
      level: 1,
      name: '20A Blank Face GFCI Module'
    })).toBeInTheDocument();
    expect(screen.queryByText(/E504391/)).not.toBeInTheDocument();
    expect(screen.queryByAltText(/UL.*certification/i)).not.toBeInTheDocument();

    const technical = container.querySelector('#technical-details');
    expect(technical).not.toBeNull();
    expect(within(technical).getAllByText('Certification')).toHaveLength(2);
    expect(within(technical).getAllByText(/documentation review required/i)).toHaveLength(2);
    expect(screen.getByRole('heading', { level: 2, name: 'Documentation review for GL20.' })).toBeInTheDocument();
  });

  it('limits product engineering points and removes unverified commercial promises', () => {
    const { container } = renderDetail('gf15');
    const featureStory = screen
      .getByRole('heading', { level: 2, name: 'Protection engineered for everyday installation.' })
      .closest('section');

    expect(featureStory).not.toBeNull();
    const engineeringPoints = within(featureStory).getAllByRole('listitem');
    expect(engineeringPoints.length).toBeLessThanOrEqual(4);
    expect(engineeringPoints.filter((point) => /self-test/i.test(point.textContent))).toHaveLength(1);
    expect(container).not.toHaveTextContent(/3[ -]?year|400 cartons|within 6 hours|warehouse stock|MOQ from/i);
  });

  it('prefills the inquiry model and exposes one non-colliding mobile quote action', () => {
    const { container } = renderDetail('gf15');

    expect(container.querySelectorAll('#inquiry')).toHaveLength(1);
    expect(screen.getByLabelText('Model of interest')).toHaveValue('GF15');
    expect(screen.getByRole('heading', { level: 3, name: 'Send a product brief.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Request quote for GF15' })).toHaveAttribute('href', '#inquiry');

    const styles = readFileSync('src/styles.css', 'utf8');
    expect(styles).toMatch(/@media \(min-width:\s*701px\)[\s\S]*?\.product-mobile-quote\s*\{[\s\S]*?display:\s*none/);
    expect(styles).toMatch(/@media \(max-width:\s*700px\)[\s\S]*?\.product-mobile-quote\s*\{[\s\S]*?right:\s*(?:7[0-9]|[89][0-9])px/);
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
