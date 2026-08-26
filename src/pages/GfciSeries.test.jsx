import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import GfciSeries from './GfciSeries.jsx';

function renderSeries() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <GfciSeries />
    </MemoryRouter>
  );
}

describe('GfciSeries', () => {
  it('defines product-page-only scene layers backed by a verified GFCI product asset', async () => {
    const { gfciSeriesVisuals, productFamilyVisuals, productOverviewVisuals } = await import('../data/productPageVisuals.js');
    const gfciVisual = productFamilyVisuals.find(({ id }) => id === 'gfci');

    expect(gfciVisual).toMatchObject({
      id: 'gfci',
      href: '/products/gfci',
      scene: 'assets/images/editorial-products/family-gfci-background.webp',
      product: 'assets/images/products/gf15-main.webp'
    });
    [
      gfciVisual.scene,
      gfciSeriesVisuals.application,
      productOverviewVisuals.brandProgram
    ].forEach((scene) => {
      expect(scene).toMatch(/^assets\/images\/editorial-products\/[a-z0-9-]+\.webp$/);
    });
    expect([
      gfciVisual.scene,
      gfciVisual.product,
      gfciSeriesVisuals.application,
      productOverviewVisuals.brandProgram
    ].join(' ')).not.toContain('editorial-home');
    expect(existsSync(`public/${gfciVisual.product}`)).toBe(true);
  });

  it('shows full-card links for exactly the seven published public models', () => {
    const { container } = renderSeries();
    const grid = container.querySelector('.gfci-series__product-grid');

    expect(grid).not.toBeNull();
    expect(grid).toHaveClass('prod-grid', 'gfci-series__product-grid');
    ['GF15', 'GF20', 'GT15', 'GT20', 'GW15', 'GW20', 'GL20'].forEach((sku) => {
      expect(within(grid).getByRole('link', { name: new RegExp(`^${sku} `) })).toHaveAttribute(
        'href',
        `/products/gfci/${sku.toLowerCase()}`
      );
    });
    expect(within(grid).getAllByRole('link')).toHaveLength(7);
    expect(screen.queryByText('FLB20')).not.toBeInTheDocument();
  });

  it('combines 20A and WR filters without returning the 15A WR model', async () => {
    const user = userEvent.setup();
    const { container } = renderSeries();

    await user.selectOptions(screen.getByLabelText('Amperage'), '20A');
    await user.selectOptions(screen.getByLabelText('Variant'), 'wr');

    const grid = container.querySelector('.gfci-series__product-grid');
    expect(within(grid).getByRole('link', { name: /^GW20 / })).toBeInTheDocument();
    expect(within(grid).queryByRole('link', { name: /^GW15 / })).not.toBeInTheDocument();
    expect(within(grid).getAllByRole('link')).toHaveLength(1);
    expect(screen.getByText('1 published model')).toHaveAttribute('aria-live', 'polite');
  });

  it('offers recovery actions when no model matches and clears every filter', async () => {
    const user = userEvent.setup();
    renderSeries();

    await user.selectOptions(screen.getByLabelText('Amperage'), '20A');
    await user.type(screen.getByRole('searchbox', { name: 'Search GFCI models' }), 'not-a-model');

    const emptyState = screen.getByRole('status', { name: 'No published models match these filters.' });
    expect(within(emptyState).getByRole('heading', { name: 'No published models match these filters.' })).toBeInTheDocument();
    expect(within(emptyState).getByText(/clear the current filters/i)).toBeInTheDocument();
    expect(within(emptyState).getByRole('link', { name: 'Contact sales' })).toHaveAttribute('href', '/contact');

    await user.click(within(emptyState).getByRole('button', { name: 'Clear filters' }));

    expect(screen.getByRole('searchbox', { name: 'Search GFCI models' })).toHaveValue('');
    expect(screen.getByLabelText('Amperage')).toHaveValue('');
    expect(screen.getByText('7 published models')).toHaveAttribute('aria-live', 'polite');
  });

  it('toggles the mobile filter drawer while preserving the desktop filter bar structure', async () => {
    const user = userEvent.setup();
    const { container } = renderSeries();
    const toggle = screen.getByRole('button', { name: 'Filter GFCI models' });
    const filters = container.querySelector('#gfci-filters');

    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(toggle).toHaveAttribute('aria-controls', 'gfci-filters');
    expect(filters).toHaveClass('gfci-series__filters');
    expect(filters).not.toHaveClass('is-open');

    await user.click(toggle);

    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(filters).toHaveClass('is-open');
  });

  it('uses the approved controls and omits an outdoor application option', () => {
    renderSeries();

    expect(screen.getByText('Search models')).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: 'Search GFCI models' })).toBeInTheDocument();
    expect(screen.getByLabelText('Amperage')).toHaveDisplayValue('All');
    expect(screen.getByLabelText('Variant')).toHaveDisplayValue('All');
    expect(screen.getByLabelText('Application')).toHaveDisplayValue('All');
    expect(screen.queryByRole('option', { name: /outdoor|damp/i })).not.toBeInTheDocument();
  });

  it('keeps the approved series evidence and program language intact', () => {
    const { container } = renderSeries();

    expect(container.querySelector('.gfci-series-hero')).toBeInTheDocument();
    expect(container.querySelector('.gfci-filter-toggle')).toBeInTheDocument();
    expect(container.querySelector('.gfci-filter-bar')).toBeInTheDocument();
    expect(container.querySelector('.gfci-product-grid')).toBeInTheDocument();
    expect(container.querySelector('.gfci-comparison')).toBeInTheDocument();
    expect(container.querySelector('.gfci-proof-grid')).toBeInTheDocument();
    expect(container.querySelector('.gfci-oem-list')).toBeInTheDocument();

    expect(screen.getByText('GFCI product family')).toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 1,
      name: 'GFCI Product Range'
    })).toBeInTheDocument();
    const styles = readFileSync('src/styles/product-experience.css', 'utf8');
    expect(styles).not.toMatch(/\.gfci-series-hero h1\s*\{[^}]*max-width:\s*15ch/);
    const filterRule = styles.match(/\.gfci-filter-bar\s*\{([^}]*)\}/)?.[1] || '';
    expect(filterRule).toMatch(/top:\s*calc\(var\(--header-h\)\s*\+\s*26px\)/);
    expect(screen.getByText(
      'Compare seven published models, then confirm the finish and program requirements for your market.'
    )).toBeInTheDocument();
    expect(screen.queryByText(/seven verified models/i)).not.toBeInTheDocument();
    expect(screen.getByRole('search', { name: 'GFCI model filters' })).toBeInTheDocument();

    const comparison = screen.getByRole('region', { name: 'GFCI model comparison' });
    ['Model', 'Rating', 'NEMA', 'Variant', 'Application'].forEach((heading) => {
      expect(within(comparison).getByRole('columnheader', { name: heading })).toBeInTheDocument();
    });
    expect(within(comparison).getAllByRole('rowheader')).toHaveLength(7);
    expect(within(comparison).getByRole('rowheader', { name: 'GF15' }))
      .toContainElement(within(comparison).getByRole('link', { name: 'GF15' }));
    expect(within(comparison).getAllByRole('link')).toHaveLength(7);

    [
      ['Self-test protection', 'Automatic protection monitoring across the published GFCI platform.'],
      ['Reverse-wiring lockout', 'Line/load reversal prevents power at the receptacle face.'],
      [
        'Verified GFCI platform',
        'Six published models are named under UL / cUL file E504391; GL20 documentation remains under review.'
      ]
    ].forEach(([heading, body]) => {
      expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument();
      expect(screen.getByText(body)).toBeInTheDocument();
    });

    expect(screen.getByText(/Match the published model, rating and variant to documented project requirements/)).toBeInTheDocument();
    ['Finish coordination', 'Brand marking', 'Packaging coordination', 'Documentation support'].forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it.todo('Task 4 renders GFCI hero, application, and OEM DOM without editorial-home assets');

  it('keeps the series route ahead of product and generic family routes', () => {
    const main = readFileSync('src/main.jsx', 'utf8');
    const lineDetail = readFileSync('src/pages/LineDetail.jsx', 'utf8');
    const seriesRoute = main.indexOf('path="/products/gfci"');
    const productRoute = main.indexOf('path="/products/gfci/:sku"');
    const familyRoute = main.indexOf('path="/products/:line"');

    expect(seriesRoute).toBeGreaterThan(-1);
    expect(seriesRoute).toBeLessThan(productRoute);
    expect(productRoute).toBeLessThan(familyRoute);
    expect(lineDetail).not.toContain('GfciBody');
    expect(lineDetail).toContain('<GenericBody line={line} />');
  });

  it('defines visible keyboard focus for the search field and comparison region', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(/\.gfci-series__search-field:focus-within\s*\{[\s\S]*?outline:/);
    expect(styles).toMatch(/\.gfci-series__table-wrap:focus-visible\s*\{[\s\S]*?outline:/);
  });

  it('keeps the GFCI product grid at two columns through 768px and one column through 520px', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(
      /@media \(max-width: 768px\)[\s\S]*?\.gfci-series \.gfci-series__product-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/
    );
    expect(styles).toMatch(
      /@media \(max-width: 520px\)[\s\S]*?\.gfci-series \.gfci-series__product-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr/
    );
  });
});
