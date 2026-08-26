import { render, screen, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import userEvent from '@testing-library/user-event';
import ProductDetail from './ProductDetail.jsx';
import { ProductCertification } from '../components/products/ProductTechnicalSections.jsx';
import { findProduct } from '../data/products.js';

function LocationProbe() {
  const location = useLocation();
  return <span data-testid="location">{location.pathname}{location.search}{location.hash}</span>;
}

function renderDetail(sku, initialPath = `/products/gfci/${sku}`) {
  return render(
    <MemoryRouter
      initialEntries={[initialPath]}
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
  it('exposes product documents as a keyboard-focusable disclosure with direct links', async () => {
    const user = userEvent.setup();
    const product = {
      ...findProduct('gf15'),
      documents: [{ href: '/documents/gf15-datasheet.pdf', label: 'GF15 datasheet' }]
    };
    const { container } = render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ProductCertification product={product} />
      </MemoryRouter>
    );

    const disclosure = container.querySelector('details.product-documents');
    const summary = within(disclosure).getByText('Product documents').closest('summary');
    expect(summary).toHaveAttribute('tabindex', '0');
    expect(disclosure).not.toHaveAttribute('open');
    summary.focus();
    expect(summary).toHaveFocus();
    await user.click(summary);
    expect(disclosure).toHaveAttribute('open');
    expect(within(disclosure).getByRole('link', { name: 'GF15 datasheet' }))
      .toHaveAttribute('href', '/documents/gf15-datasheet.pdf');
  });

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
    expect(screen.getByRole('link', { name: /Request a quote/ })).toHaveAttribute(
      'href',
      '/products/gfci/gf15#inquiry'
    );
    expect(screen.getByRole('link', { name: 'Technical details' })).toHaveAttribute(
      'href',
      '/products/gfci/gf15#technical-details'
    );

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

  it('uses cool detail surfaces and six verified finish references', () => {
    renderDetail('gf15');

    expect(screen.getByTestId('product-oem-story')).toHaveClass('product-story--cool');
    const finishes = screen.getAllByTestId('product-finish-cell');
    expect(finishes).toHaveLength(6);
    finishes.forEach((finish) => {
      const image = within(finish).getByRole('img');
      expect(image).toHaveAttribute('src', expect.stringMatching(
        /assets\/images\/products\/gf15-(white|ivory|almond|black|grey|brown)\.webp$/
      ));
      expect(image).toHaveAttribute('width', '620');
      expect(image).toHaveAttribute('height', '620');
      expect(image).toHaveAttribute('loading', 'lazy');
    });

  });

  it('keeps related products as four lowercase full-card links', () => {
    const { container } = renderDetail('gf15');
    const related = container.querySelector('.product-related');
    const cards = within(related).getAllByRole('link');

    expect(cards).toHaveLength(4);
    cards.forEach((card) => {
      expect(card).toHaveClass('pcard');
      expect(card.getAttribute('href')).toMatch(/^\/products\/gfci\/[a-z0-9-]+$/);
      expect(within(card).getByRole('img')).toBeInTheDocument();
    });
  });

  it('defines square contained media, subtle radii, cool surfaces, and responsive related grids', () => {
    const styles = readFileSync('src/styles/product-experience.css', 'utf8');
    const mediaRules = (maxWidth) => {
      const start = styles.indexOf(`@media (max-width: ${maxWidth}px)`);
      const end = styles.indexOf('\n@media ', start + 1);
      return styles.slice(start, end === -1 ? undefined : end);
    };

    expect(styles).toMatch(/--product-surface-strong:\s*#[0-9a-f]{6}/i);
    expect(styles).not.toMatch(/--product-warm|beige|warm media surfaces/i);
    expect(styles).toMatch(/\.product-media-square\s*\{[\s\S]*?aspect-ratio:\s*1\s*\/\s*1/);
    expect(styles).toMatch(/\.product-gallery__main\s*>\s*img[\s\S]*?object-fit:\s*contain[\s\S]*?object-position:\s*center/);
    expect(styles).toMatch(/\.product-gallery__main[\s\S]*?border-radius:\s*var\(--product-radius-card\)/);
    const thumbRules = styles.match(/\.product-gallery__thumb\s*\{[^}]+\}/)?.[0] || '';
    expect(thumbRules).toMatch(/border-radius:\s*var\(--product-radius-card\)/);
    expect(styles).toMatch(/\.product-finish-strip\s*\{[\s\S]*?grid-template-columns:\s*repeat\(6,[^;]+\)[\s\S]*?border-radius:\s*var\(--product-radius-card\)/);
    const finishCellRules = styles.match(/\.product-finish-strip figure\s*\{[^}]+\}/)?.[0] || '';
    expect(finishCellRules).toMatch(/border-radius:\s*var\(--product-radius-card\)/);
    const finishImageRules = styles.match(/\.product-finish-strip img\s*\{[^}]+\}/)?.[0] || '';
    expect(finishImageRules).toMatch(/height:\s*auto/);
    expect(finishImageRules).toMatch(/object-fit:\s*contain/);
    expect(finishImageRules).toMatch(/border-radius:\s*var\(--product-radius-sm\)/);
    expect(styles).toMatch(/\.product-related \.prod-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(4,/);
    expect(mediaRules(1024)).toMatch(/\.product-related \.prod-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,/);
    expect(mediaRules(700)).not.toMatch(/\.product-related \.prod-grid/);
    expect(mediaRules(520)).toMatch(/\.product-related \.prod-grid\s*\{[^}]*grid-template-columns:\s*1fr/);
    expect(mediaRules(520)).toMatch(/\.product-finish-strip\s*\{[^}]*grid-template-columns:\s*1fr/);
    const reducedMotion = styles.slice(styles.indexOf('@media (prefers-reduced-motion: reduce)'));
    expect(reducedMotion).toContain('.product-gallery img');
    expect(reducedMotion).toContain('.product-finish-strip img');
    expect(reducedMotion).toMatch(/animation:\s*none\s*!important/);
    expect(reducedMotion).toMatch(/transform:\s*none\s*!important/);
    expect(reducedMotion).toMatch(/transition:\s*none\s*!important/);
  });

  it('gives breadcrumbs and detail action links real touch boxes without layout motion', () => {
    const styles = readFileSync('src/styles/product-experience.css', 'utf8');
    const reducedMotion = styles.slice(styles.indexOf('@media (prefers-reduced-motion: reduce)'));

    expect(styles).toMatch(/\.product-detail-breadcrumb a,[\s\S]*?\.product-inquiry \.textlink\s*\{[^}]*display:\s*inline-flex[^}]*min-width:\s*44px[^}]*min-height:\s*44px[^}]*align-items:\s*center/s);
    const textLinkHoverRule = styles.match(/[^{}]*\.product-story \.textlink:hover[^{}]*\.product-inquiry \.textlink:hover[^{}]*\{[^}]+\}/)?.[0] || '';
    expect(textLinkHoverRule).toMatch(/gap:\s*6px/);
    expect(styles).not.toMatch(/\.product-(?:detail|story|technical|inquiry)[^}]*transition:\s*all/);
    expect(reducedMotion).toContain('.product-detail-breadcrumb a');
    expect(reducedMotion).toContain('.product-gallery button');
    expect(reducedMotion).toContain('.product-story a');
    expect(reducedMotion).toContain('.product-technical a');
    expect(reducedMotion).toContain('.product-inquiry button');
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
    expect(technical.querySelector('.product-technical-table')).toBeInTheDocument();
    expect(technical.querySelector('.product-spec-mobile')).toBeInTheDocument();
    expect(container.querySelector('.product-key-facts')).toBeInTheDocument();
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
    expect(screen.getByRole('link', { name: 'Request quote for GF15' })).toHaveAttribute(
      'href',
      '/products/gfci/gf15#inquiry'
    );

    const styles = readFileSync('src/styles.css', 'utf8');
    expect(styles).toMatch(/@media \(min-width:\s*701px\)[\s\S]*?\.product-mobile-quote\s*\{[\s\S]*?display:\s*none/);
    expect(styles).toMatch(/@media \(max-width:\s*700px\)[\s\S]*?\.product-mobile-quote\s*\{[\s\S]*?right:\s*(?:7[0-9]|[89][0-9])px/);
    expect(styles).toMatch(
      /@media \(max-width:\s*700px\)[\s\S]*?\.footer--product-detail\s*\{[\s\S]*?padding-bottom:\s*calc\([^}]*env\(safe-area-inset-bottom/
    );
    expect(styles).toMatch(/\.footer--product-detail\s*\{[\s\S]*?padding-bottom:\s*calc\(176px\s*\+/);
  });

  it('preserves the exact current pathname when navigating to same-page anchors', async () => {
    const user = userEvent.setup();
    renderDetail('GF15', '/Products/GFCI/GF15/?source=review');

    expect(screen.getByRole('link', { name: /Request a quote/ })).toHaveAttribute(
      'href',
      '/Products/GFCI/GF15/?source=review#inquiry'
    );
    const technicalLink = screen.getByRole('link', { name: 'Technical details' });
    expect(technicalLink).toHaveAttribute('href', '/Products/GFCI/GF15/?source=review#technical-details');

    await user.click(technicalLink);
    expect(screen.getByTestId('location')).toHaveTextContent(
      '/Products/GFCI/GF15/?source=review#technical-details'
    );
  });

  it('keeps inquiry fields and synchronizes the model after related-product navigation', async () => {
    const user = userEvent.setup();
    renderDetail('gf15');

    await user.type(screen.getByLabelText('Your name *'), 'Avery Chen');
    await user.click(screen.getByRole('link', { name: 'GF20 20A Self-Test GFCI Receptacle' }));

    expect(await screen.findByRole('heading', { level: 1, name: '20A Self-Test GFCI Receptacle' })).toBeInTheDocument();
    expect(screen.getByLabelText('Model of interest')).toHaveValue('GF20');
    expect(screen.getByLabelText('Your name *')).toHaveValue('Avery Chen');
  });

  it('provides the wiring mappings, device markings, and dimensions as DOM text', () => {
    renderDetail('gf15');

    expect(screen.getByText(/Neutral wire.*white conductor.*silver screw/i)).toBeInTheDocument();
    expect(screen.getByText(/Hot wire.*black conductor.*brass screw/i)).toBeInTheDocument();
    expect(screen.getByText(/Ground wire.*copper or green conductor.*green screw/i)).toBeInTheDocument();
    expect(screen.getByText(/LINE and LOAD markings/i)).toBeInTheDocument();
    expect(screen.getByText(/terminal holes.*tighten.*clockwise.*RESET.*green LED/i)).toBeInTheDocument();
    expect(screen.getByText(/Face.*4\.53 in \(115 mm\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Width.*2\.75 in \(70 mm\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Depth.*1\.56 in \(39\.7 mm\)/i)).toBeInTheDocument();
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
