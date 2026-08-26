import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { productFamilies } from '../data/productFamilies.js';
import ProductsOverview from './ProductsOverview.jsx';

function renderProductsOverview() {
  return render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ProductsOverview />
    </MemoryRouter>
  );
}

describe('ProductsOverview', () => {
  it('defines dedicated scene and verified product layers for every approved family', async () => {
    const { productFamilyVisuals } = await import('../data/productPageVisuals.js');

    expect(productFamilies.map(({ id }) => id)).toEqual([
      'gfci',
      'usb',
      'receptacles',
      'smart',
      'switches'
    ]);
    expect(productFamilyVisuals.map(({ id, name, href }) => ({ id, name, href })))
      .toEqual(productFamilies.map(({ id, name, href }) => ({ id, name, href })));

    productFamilyVisuals.forEach(({ scene, product }) => {
      expect(scene).toMatch(/^assets\/images\/editorial-products\/[a-z0-9-]+\.webp$/);
      expect(product).toMatch(/^assets\/images\/(?:products|catalog)\/[a-z0-9.-]+\.webp$/);
      expect(existsSync(`public/${product}`)).toBe(true);
      expect(`${scene} ${product}`).not.toContain('editorial-home');
    });
  });

  it('reserves product-page-only artwork for hero, OEM, market, and application scenes', async () => {
    const { productOverviewVisuals } = await import('../data/productPageVisuals.js');

    expect(Object.keys(productOverviewVisuals)).toEqual([
      'hero',
      'brandProgram',
      'marketResidential',
      'marketHospitality',
      'marketCommercial'
    ]);
    Object.values(productOverviewVisuals).forEach((visual) => {
      expect(visual).toMatch(/^assets\/images\/editorial-products\/[a-z0-9-]+\.webp$/);
      expect(visual).not.toContain('editorial-home');
    });
  });

  it('ships the product experience responsive and accessibility contract', () => {
    const styles = readFileSync('src/styles/product-experience.css', 'utf8');

    expect(styles).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(styles).toMatch(/@media \(max-width:\s*1024px\)/);
    expect(styles).toMatch(/@media \(max-width:\s*768px\)/);
    expect(styles).toMatch(/@media \(max-width:\s*700px\)/);
    expect(styles).toMatch(/min-height:\s*44px/);

    const leadFamilyRule = styles.match(/\.product-family-card:first-child\s*\{([^}]*)\}/)?.[1] || '';
    expect(leadFamilyRule).toMatch(/520px/);
    expect(leadFamilyRule).not.toMatch(/560px/);
    const familyGridRule = styles.match(/\.product-family-grid\s*\{([^}]*)\}/)?.[1] || '';
    expect(familyGridRule).toMatch(/grid-auto-rows:\s*clamp\([^;]*520px\)/);

    const productCardRule = styles.match(/\.pcard\s*\{([^}]*)\}/)?.[1] || '';
    const productCardTransition = productCardRule.match(/transition:\s*([^;]+)/)?.[1] || '';
    expect(productCardTransition).toMatch(/transform\s+\d+ms[^,]*,\s*opacity\s+\d+ms/);
    expect(productCardTransition).not.toMatch(/border-color|box-shadow/);
    expect(styles).not.toMatch(/will-change:\s*transform/);
  });

  it('presents exactly the five approved product families as complete links', () => {
    const { container } = renderProductsOverview();

    [
      [
        'Ground-fault protection GFCI Outlets Self-test protection for residential, commercial and demanding installation environments. Explore the family',
        '/products/gfci'
      ],
      [
        'In-wall charging USB & Type-C Outlets Integrated charging devices for homes, hospitality and workplace projects. Explore the family',
        '/products/usb-outlets'
      ],
      [
        'Wiring devices Receptacles Duplex and decorator receptacles with coordinated plates and finish options. Explore the family',
        '/products/receptacles'
      ],
      [
        'Connected control Smart Home Controls Wi-Fi and Zigbee controls designed for coordinated connected-home programs. Explore the family',
        '/products/smart-switches'
      ],
      [
        'Lighting control Switches & Dimmers Switching and dimming platforms for residential and commercial specifications. Explore the family',
        '/products/dimmers'
      ]
    ].forEach(([accessibleName, href]) => {
      const link = screen.getByRole('link', { name: accessibleName });
      expect(link).toHaveAttribute('href', href);
      expect(link.querySelector('img')).toHaveAttribute('alt', '');
    });

    expect(container.querySelectorAll('.product-family-section .editorial-product-panel')).toHaveLength(5);
  });

  it('uses complete accessible links for the three approved market cards', () => {
    const { container } = renderProductsOverview();

    [
      [
        'Everyday protection Residential & renovation Coordinated protection and wiring devices for kitchens, bathrooms and renovation programs.',
        '/products/gfci'
      ],
      [
        'In-room convenience Hospitality & multifamily Integrated charging platforms for guest rooms, shared spaces and multifamily developments.',
        '/products/usb-outlets'
      ],
      [
        'Project coordination Commercial fit-out Specification and manufacturing support for coordinated commercial wiring-device programs.',
        '/capabilities'
      ]
    ].forEach(([accessibleName, href]) => {
      const link = screen.getByRole('link', { name: accessibleName });
      expect(link).toHaveAttribute('href', href);
      expect(link.querySelector('img')).toHaveAttribute('alt', '');
    });

    expect(container.querySelector('.product-market-grid')).toBeInTheDocument();
  });

  it('defines a stable responsive three-card market grid without implicit placements', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(
      /\.product-market-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\);[\s\S]*?grid-auto-rows:/
    );
    expect(styles).toMatch(
      /\.product-market-grid \.editorial-application:nth-child\(n\)\s*\{[\s\S]*?grid-column:\s*auto;/
    );
    expect(styles).toMatch(
      /@media \(max-width:\s*1100px\)[\s\S]*?\.product-market-grid\s*\{[\s\S]*?grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/
    );
    expect(styles).toMatch(
      /@media \(max-width:\s*760px\)[\s\S]*?\.product-market-grid\s*\{[\s\S]*?grid-template-columns:\s*1fr/
    );
  });

  it('gives the dark capability button a high-contrast focus outline', () => {
    const styles = readFileSync('src/styles.css', 'utf8');

    expect(styles).toMatch(
      /\.editorial-button--dark:focus-visible\s*\{[\s\S]*?outline-color:\s*#0d274b;/
    );
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

    expect(container.querySelector('.product-overview-hero__inner')).toBeInTheDocument();
    expect(container.querySelector('.product-family-grid')).toBeInTheDocument();
    expect(container.querySelectorAll('.product-family-card')).toHaveLength(5);
    expect(container.querySelector('.product-brand-system__inner')).toBeInTheDocument();
    expect(container.querySelector('.product-evidence-section__grid')).toBeInTheDocument();
    expect(container.querySelector('.product-market-grid')?.parentElement).toHaveClass('container');
    expect(container.querySelector('.product-evidence-section__grid')).toHaveClass('container');
  });

  it.fails('Task 3 renders product overview hero, family, market, and OEM visual layers without editorial-home assets', async () => {
    const { container } = renderProductsOverview();
    const { productFamilyVisuals, productOverviewVisuals } = await import('../data/productPageVisuals.js');
    const markup = container.innerHTML;

    expect.soft(markup).not.toContain('editorial-home');
    Object.values(productOverviewVisuals).forEach((scene) => {
      expect.soft(markup).toContain(scene);
    });
    productFamilyVisuals.forEach(({ scene, product }) => {
      expect.soft(markup).toContain(scene);
      expect.soft(markup).toContain(product);
    });
  });

  it('keeps the product hero headline to two intentional lines', () => {
    const { container } = renderProductsOverview();
    const titleLines = container.querySelectorAll('.product-overview-hero__title-line');

    expect(titleLines).toHaveLength(2);
    expect([...titleLines].map((line) => line.textContent)).toEqual([
      'One platform.',
      'Complete product lines.'
    ]);
  });
});
