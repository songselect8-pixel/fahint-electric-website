import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import GfciSeries from './GfciSeries.jsx';
import { publicAsset } from '../utils/publicAsset.js';

function renderSeries() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <GfciSeries />
    </MemoryRouter>
  );
}

describe('GfciSeries', () => {
  it('shows complete poster artwork above the copy on phones', () => {
    const styles = readFileSync('src/styles/product-experience.css', 'utf8');
    const phone = styles.slice(styles.lastIndexOf('@media (max-width: 520px)'));

    expect(phone).toMatch(
      /\.gfci-series__poster-image\s*\{[^}]*position:\s*relative[^}]*aspect-ratio:\s*3\s*\/\s*2[^}]*object-fit:\s*contain/
    );
    expect(phone).toMatch(/\.gfci-series__poster-copy[^}]*\{[^}]*position:\s*relative/);
  });

  it('defines product-page-only scene layers backed by a verified GFCI product asset', async () => {
    const { gfciSeriesHeroVisual, gfciSeriesVisuals } = await import('../data/productPageVisuals.js');

    expect(gfciSeriesHeroVisual).toMatchObject({
      scene: 'assets/images/editorial-products/family-gfci-background.webp',
      product: 'assets/images/products/gf15-main.webp'
    });
    expect(gfciSeriesHeroVisual.scene).toMatch(/^assets\/images\/editorial-products\/[a-z0-9-]+\.(?:webp|png)$/);
    expect(gfciSeriesVisuals.applicationPoster).toBe(
      'assets/images/editorial-products/gfci-application-installed-poster-v2-optimized.webp'
    );
    expect(gfciSeriesVisuals.oemPoster).toBe(
      'assets/images/editorial-products/gfci-oem-program-poster-v3-optimized.webp'
    );
    [
      gfciSeriesHeroVisual.scene,
      gfciSeriesVisuals.applicationPoster,
      gfciSeriesVisuals.oemPoster
    ].forEach((scene) => {
      expect(existsSync(`public/${scene}`)).toBe(true);
    });
    expect([
      gfciSeriesHeroVisual.scene,
      gfciSeriesHeroVisual.product,
      gfciSeriesVisuals.applicationPoster,
      gfciSeriesVisuals.oemPoster
    ].join(' ')).not.toContain('editorial-home');
    expect(existsSync(`public/${gfciSeriesHeroVisual.product}`)).toBe(true);
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
    expect(container.querySelector('.gfci-series__oem-rail')).toBeInTheDocument();

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

    expect(screen.getByText(/Match the published model, rating and variant to the project brief/)).toBeInTheDocument();
    ['Finish coordination', 'Brand marking', 'Packaging coordination', 'Documentation support'].forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('emits only known lowercase deployment paths for product cards and comparison links', () => {
    const { container } = renderSeries();
    const productLinks = [...container.querySelectorAll('a[href^="/products/gfci/"]')];

    expect(productLinks).toHaveLength(18);
    ['gtn15', 'gtn20'].forEach((sku) => {
      expect(screen.getByRole('link', { name: `View ${sku.toUpperCase()} details` })).toHaveAttribute('href', `/products/gfci/${sku}`);
    });
    productLinks.forEach((link) => {
      expect(link.getAttribute('href')).toMatch(/^\/products\/gfci\/[a-z0-9]+$/);
    });
  });

  it('renders a full-bleed looping GFCI hero video instead of the static hero product card', async () => {
    const { container } = renderSeries();
    const { gfciSeriesVisuals } = await import('../data/productPageVisuals.js');
    const markup = container.innerHTML;
    const video = screen.getByTestId('gfci-hero-video');
    const source = video.querySelector('source');

    expect.soft(markup).not.toContain('editorial-home');
    [
      gfciSeriesVisuals.applicationPoster,
      gfciSeriesVisuals.oemPoster
    ].forEach((visual) => {
      expect.soft(markup).toContain(visual);
    });
    expect(video).toHaveProperty('autoplay', true);
    expect(video).toHaveProperty('muted', true);
    expect(video).toHaveProperty('loop', true);
    expect(video).toHaveProperty('playsInline', true);
    expect(source).toHaveAttribute('src', publicAsset('assets/videos/gfci-product-video-optimized.mp4'));
    expect(source).toHaveAttribute('type', 'video/mp4');
    expect(video).toHaveAttribute('poster', publicAsset('assets/videos/gfci-product-video-poster.webp'));
    expect(video).toHaveAttribute('preload', 'metadata');
    expect(container.querySelector('.gfci-series__hero-product')).not.toBeInTheDocument();
    expect(screen.queryByTestId('gfci-hero-scene')).not.toBeInTheDocument();
    expect(screen.queryByTestId('gfci-hero-product')).not.toBeInTheDocument();
    expect(screen.getByTestId('gfci-application-poster')).toHaveAttribute(
      'src',
      publicAsset(gfciSeriesVisuals.applicationPoster)
    );
    expect(screen.getByTestId('gfci-application-poster')).toHaveAttribute('width', '1536');
    expect(screen.getByTestId('gfci-application-poster')).toHaveAttribute('height', '1024');
    expect(screen.getByTestId('gfci-application-poster')).toHaveAttribute('loading', 'lazy');
    expect(screen.getByTestId('gfci-oem-poster')).toHaveAttribute(
      'src',
      publicAsset(gfciSeriesVisuals.oemPoster)
    );
    expect(screen.getByTestId('gfci-oem-poster')).toHaveAttribute('width', '1536');
    expect(screen.getByTestId('gfci-oem-poster')).toHaveAttribute('height', '1024');
    expect(container.querySelector('.gfci-series__poster--application')).toBeInTheDocument();
    expect(container.querySelector('.gfci-series__poster-copy--left')).toBeInTheDocument();
    expect(container.querySelector('.gfci-series__poster--oem')).toBeInTheDocument();
    expect(container.querySelector('.gfci-series__poster-copy--right')).toBeInTheDocument();
    expect(container.querySelector('.gfci-series__oem-rail')).toBeInTheDocument();
    expect(container.querySelector('.gfci-series__application-product-stage')).not.toBeInTheDocument();
    expect(container.querySelector('.gfci-series__oem-platform')).not.toBeInTheDocument();
  });

  it('uses constrained comparison and full-width application and OEM posters', () => {
    const { container } = renderSeries();
    const comparison = screen.getByRole('region', { name: 'GFCI model comparison' });

    expect(comparison).toHaveClass('gfci-series__table-wrap');
    expect(comparison.parentElement).toHaveClass('gfci-series__comparison-panel');
    expect(container.querySelector('.gfci-series__poster--application')).toBeInTheDocument();
    expect(container.querySelector('.gfci-series__poster--oem')).toBeInTheDocument();

    const styles = readFileSync('src/styles/product-experience.css', 'utf8');
    expect(styles).toMatch(/\.pcard__media\s*\{[^}]*aspect-ratio:\s*1/s);
    expect(styles).toMatch(/\.pcard__media img\s*\{[^}]*object-fit:\s*contain[^}]*padding:/s);
    expect(styles).toMatch(/\.pcard__name\s*\{[^}]*overflow-wrap:\s*anywhere/s);
    expect(styles).toMatch(/\.gfci-series__comparison-panel\s*\{[^}]*border-radius:/s);
    expect(styles).toMatch(/\.gfci-comparison \.spec-table\s*\{[^}]*min-width:\s*760px/s);
    expect(styles).toMatch(/\.gfci-comparison tbody tr:nth-child\(even\)/);
    expect(styles).toMatch(/\.gfci-series__poster\s*\{[^}]*min-height:\s*clamp\(/s);
    expect(styles).toMatch(/\.gfci-series__poster-image\s*\{[^}]*position:\s*absolute[^}]*inset:\s*0/s);
    expect(styles).toMatch(/\.gfci-series__poster--application \.gfci-series__poster-shade\s*\{[^}]*background:/s);
    expect(styles).toMatch(/\.gfci-series__poster--oem \.gfci-series__poster-shade\s*\{[^}]*background:/s);
    expect(styles).toMatch(/\.gfci-series__poster-copy--right\s*\{[^}]*justify-self:\s*end/s);
    expect(styles).not.toMatch(/\.gfci-series__oem::before\s*\{/s);
    expect(styles).toMatch(/@media \(max-width: 520px\)[\s\S]*?\.gfci-series__poster-copy\s*\{[^}]*padding-right:\s*max\(78px,[^}]*safe-area-inset-right/s);
    expect(styles).toMatch(/@media \(prefers-reduced-motion:\s*reduce\)[\s\S]*?\.gfci-series__poster-image/s);
    expect(styles).toMatch(/\.gfci-series__poster-section--oem\s*\{[^}]*margin-bottom:\s*-1px/s);
    expect(styles).not.toContain('.gfci-series__application-product-stage');
    expect(styles).not.toContain('.gfci-series__oem-platform');
    expect(styles).not.toMatch(/\.gfci-series__oem(?:-panel)?\s*\{[^}]*(?:#f7f5f0|#ece8e1|beige)/is);
  });

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
    expect(lineDetail).toContain('<ModelCatalogue key={line.slug} line={line} />');
    expect(lineDetail).toContain('getCatalogProducts(line.slug)');
  });

  it('defines visible keyboard focus for the search field and comparison region', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(/\.gfci-series__search-field:focus-within\s*\{[\s\S]*?outline:/);
    expect(styles).toMatch(/\.gfci-series__table-wrap:focus-visible\s*\{[\s\S]*?outline:/);
  });

  it('keeps the GFCI catalogue at four columns at 1280, two at 768, and one at 390', () => {
    const styles = readFileSync('src/styles/product-experience.css', 'utf8');

    expect(styles).toMatch(
      /@media \(min-width: 1200px\) and \(max-width: 1439px\)[\s\S]*?\.gfci-series \.gfci-product-grid\s*\{[^}]*grid-template-columns:\s*repeat\(4,\s*minmax\(0,\s*1fr\)\)/
    );
    expect(styles).toMatch(
      /@media \(max-width: 768px\)[\s\S]*?\.gfci-series \.gfci-product-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/
    );
    expect(styles).toMatch(
      /@media \(max-width: 520px\)[\s\S]*?\.gfci-series \.gfci-product-grid\s*\{[^}]*grid-template-columns:\s*1fr/
    );
  });

  it('uses a pure-white square product stage with restrained card chrome', () => {
    const styles = readFileSync('src/styles/product-experience.css', 'utf8');

    expect(styles).toMatch(/\.pcard\s*\{[^}]*border-radius:\s*12px[^}]*background:\s*#fff/s);
    expect(styles).toMatch(/\.pcard__media\s*\{[^}]*aspect-ratio:\s*1[^}]*background:\s*#fff/s);
    expect(styles).toMatch(/\.pcard__media img\s*\{[^}]*padding:\s*0/s);
    expect(styles).toMatch(/\.pcard__tag\s*\{[^}]*top:\s*14px[^}]*left:\s*14px/s);
  });

  it('gives series inline actions 44px boxes and removes inherited layout motion', () => {
    const styles = readFileSync('src/styles/product-experience.css', 'utf8');
    const reducedMotion = styles.slice(styles.indexOf('@media (prefers-reduced-motion: reduce)'));

    expect(styles).toMatch(/\.gfci-comparison tbody th a\s*\{[^}]*display:\s*inline-flex[^}]*min-width:\s*44px[^}]*min-height:\s*44px[^}]*justify-content:\s*center/s);
    expect(styles).toMatch(/\.gfci-series :where\([^)]*\.btn[^)]*\.textlink[^)]*\)\s*\{[^}]*display:\s*inline-flex[^}]*min-width:\s*44px[^}]*min-height:\s*44px/s);
    expect(styles).toMatch(/\.gfci-comparison tbody tr\s*\{[^}]*transition:\s*none/s);
    expect(styles).toMatch(/[^{}]*\.gfci-series \.textlink:hover[^{}]*\{[^}]*gap:\s*6px/s);
    expect(reducedMotion).toContain('.gfci-series button');
    expect(reducedMotion).toContain('.gfci-series input');
    expect(reducedMotion).toContain('.gfci-series select');
  });
});
