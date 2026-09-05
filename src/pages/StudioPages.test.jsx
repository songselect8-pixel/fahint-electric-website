import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import HomeStudio from './HomeStudio.jsx';
import ProductsStudio from './ProductsStudio.jsx';
import Header from '../components/Header.jsx';
import { productLines } from '../data/lines.js';
import { products } from '../data/products.js';
import { getCatalogProducts } from '../data/catalogProducts.js';
import { certificates } from '../data/certificates.js';
import { company, faqs } from '../data/company.js';
import { publicAsset } from '../utils/publicAsset.js';
import { studioRanges } from '../data/studioCatalog.js';
import userEvent from '@testing-library/user-event';
import { publicAssetFile } from '../test/publicAssetFile.js';

function show(Component, path = '/home-studio') {
  return render(<MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Component /></MemoryRouter>);
}

describe('studio homepage and catalog', () => {
  it('publishes the completed homepage and catalog while preserving local review routes', () => {
    const source = readFileSync('src/main.jsx', 'utf8');
    for (const route of ['path="/" element={<HomeStudio />}', 'path="/products" element={<ProductsStudio />}']) expect(source).toContain(route);
    expect(source).toContain('{import.meta.env.DEV && <Route path="/home-next"');
    expect(source).toContain('{import.meta.env.DEV && <Route path="/home-legacy"');
    expect(source).toContain('{import.meta.env.DEV && <Route path="/products-legacy"');
    expect(source).toContain('path="/home-studio" element={<HomeStudio />}');
    expect(source).toContain('path="/products-studio" element={<ProductsStudio />}');
  });

  it('directs preview navigation to the published pages', () => {
    show(Header, '/products-studio');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /^Products/ })).toHaveAttribute('href', '/products');
  });

  it('connects the studio homepage header inquiry button to its own form', () => {
    show(Header);
    expect(screen.getByRole('link', { name: 'Send Inquiry' })).toHaveAttribute('href', '/#studio-inquiry');
  });

  it('introduces the brand and gives each canonical family a usable entrance', () => {
    show(HomeStudio);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Wiring devices. Built for your market.');
    const nav = screen.getByRole('navigation', { name: 'Explore product families' });
    for (const line of productLines) expect(within(nav).getByRole('tab', { name: line.name })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Explore FAHINT products' })).toHaveAttribute('href', '/products');
  });

  it('switches between the three real application scenes without a floating product card', () => {
    show(HomeStudio);
    fireEvent.click(screen.getByRole('button', { name: 'Bedside charging' }));
    expect(screen.getByRole('button', { name: 'Bedside charging' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByRole('link', { name: 'Explore the featured product family' })).not.toBeInTheDocument();
  });

  it('keeps the hero within the first viewport and aligns the scene controls on the right', () => {
    const css = readFileSync('src/styles/studio.css', 'utf8');
    expect(css).toMatch(/\.studio-hero\s*\{[^}]*min-height:\s*100(?:svh|dvh)/s);
    expect(css).toMatch(/\.studio-hero__bottom\s*\{[^}]*justify-content:\s*flex-end/s);
  });

  it('rotates the three hero scenes every five seconds and restarts after a manual choice', () => {
    vi.useFakeTimers();
    try {
      show(HomeStudio);
      expect(screen.getByRole('button', { name: 'Kitchen essentials' })).toHaveAttribute('aria-pressed', 'true');

      act(() => vi.advanceTimersByTime(5000));
      expect(screen.getByRole('button', { name: 'Bedside charging' })).toHaveAttribute('aria-pressed', 'true');

      fireEvent.click(screen.getByRole('button', { name: 'Kitchen essentials' }));
      act(() => vi.advanceTimersByTime(4999));
      expect(screen.getByRole('button', { name: 'Kitchen essentials' })).toHaveAttribute('aria-pressed', 'true');
      act(() => vi.advanceTimersByTime(1));
      expect(screen.getByRole('button', { name: 'Bedside charging' })).toHaveAttribute('aria-pressed', 'true');
    } finally {
      vi.useRealTimers();
    }
  });

  it('pauses the hero rotation while a visitor is interacting with it', () => {
    vi.useFakeTimers();
    try {
      show(HomeStudio);
      const hero = screen.getByRole('region', { name: 'Wiring devices. Built for your market.' });
      fireEvent.mouseEnter(hero);
      act(() => vi.advanceTimersByTime(10000));
      expect(screen.getByRole('button', { name: 'Kitchen essentials' })).toHaveAttribute('aria-pressed', 'true');

      fireEvent.mouseLeave(hero);
      act(() => vi.advanceTimersByTime(5000));
      expect(screen.getByRole('button', { name: 'Bedside charging' })).toHaveAttribute('aria-pressed', 'true');
    } finally {
      vi.useRealTimers();
    }
  });

  it('does not auto-rotate when the visitor prefers reduced motion', () => {
    vi.useFakeTimers();
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn()
      })
    });
    try {
      show(HomeStudio);
      act(() => vi.advanceTimersByTime(10000));
      expect(screen.getByRole('button', { name: 'Kitchen essentials' })).toHaveAttribute('aria-pressed', 'true');
    } finally {
      Object.defineProperty(window, 'matchMedia', { configurable: true, value: originalMatchMedia });
      vi.useRealTimers();
    }
  });

  it('stops the hero timer while the poster is outside the viewport', () => {
    vi.useFakeTimers();
    const OriginalIntersectionObserver = window.IntersectionObserver;
    class HiddenHeroObserver {
      constructor(callback) { this.callback = callback; }
      observe(target) { this.callback([{ isIntersecting: false, target }]); }
      disconnect() {}
    }
    Object.defineProperty(window, 'IntersectionObserver', { configurable: true, value: HiddenHeroObserver });
    try {
      show(HomeStudio);
      act(() => vi.advanceTimersByTime(10000));
      expect(screen.getByRole('button', { name: 'Kitchen essentials' })).toHaveAttribute('aria-pressed', 'true');
    } finally {
      Object.defineProperty(window, 'IntersectionObserver', { configurable: true, value: OriginalIntersectionObserver });
      vi.useRealTimers();
    }
  });

  it('groups the hero actions around project buyers and private-label brands', () => {
    show(HomeStudio);
    const hero = screen.getByRole('region', { name: 'Wiring devices. Built for your market.' });
    const projects = within(hero).getByRole('group', { name: 'For your projects' });
    const brands = within(hero).getByRole('group', { name: 'For your brand' });
    expect(within(projects).getByRole('link', { name: 'Explore FAHINT products' })).toHaveAttribute('href', '/products');
    expect(within(brands).getByRole('link', { name: 'Build a range with us' })).toHaveAttribute('href', '/#studio-oem');
    expect(within(hero).getByText(/North American wiring devices/)).toBeInTheDocument();
    expect(within(hero).getByText(`${productLines.length} product families`)).toBeInTheDocument();
    expect(within(hero).getByText('Model-specific documentation')).toBeInTheDocument();
  });

  it('shows two real models for each selected family with source facts, photos and model-specific inquiries', () => {
    show(HomeStudio);
    for (const range of studioRanges) {
      fireEvent.click(screen.getByRole('tab', { name: range.name }));
      const panel = screen.getByRole('tabpanel', { name: range.name });
      expect(within(panel).getAllByRole('article')).toHaveLength(2);
      expect(within(panel).getByRole('link', { name: `Explore all ${range.name}` })).toHaveAttribute('href', `/products/${range.slug}`);
      for (const product of range.featured) {
        const card = within(panel).getByRole('article', { name: product.sku });
        expect(within(card).getByRole('heading')).toHaveTextContent(product.name);
        expect(within(card).getByRole('img')).toHaveAttribute('src', publicAsset(product.assets.card));
        for (const [label, value] of product.keyFacts.slice(0, 2)) {
          expect(within(card).getByText(label, { exact: true })).toBeInTheDocument();
          expect(within(card).getByText(value, { exact: true })).toBeInTheDocument();
        }
        expect(within(card).getByRole('link', { name: `View ${product.sku} details` })).toHaveAttribute('href', product.href);
        expect(within(card).getByRole('link', { name: `Request a quote for ${product.sku}` })).toHaveAttribute('href', `/contact?model=${encodeURIComponent(product.sku)}`);
      }
    }
  });

  it('supports arrow, Home and End navigation with a single family tab in the keyboard order', async () => {
    const user = userEvent.setup();
    show(HomeStudio);
    const tabs = screen.getAllByRole('tab');
    tabs[0].focus();
    await user.keyboard('{ArrowRight}');
    expect(tabs[1]).toHaveFocus();
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveAccessibleName(productLines[1].name);
    await user.keyboard('{End}');
    expect(tabs.at(-1)).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(tabs[0]).toHaveFocus();
    await user.keyboard('{ArrowLeft}');
    expect(tabs.at(-1)).toHaveFocus();
    await user.keyboard('{Home}');
    expect(tabs[0]).toHaveFocus();
    expect(tabs.filter(tab => tab.tabIndex === 0)).toHaveLength(1);
  });

  it('introduces FAHINT and its company in place of the single-product finish demo', () => {
    show(HomeStudio);
    const section = screen.getByRole('region', { name: 'Everyday power. Made by FAHINT.' });
    expect(within(section).getByRole('heading', { name: company.name })).toBeInTheDocument();
    expect(within(section).getByText(/Based in Wenzhou, China/)).toHaveTextContent('North American market');
    expect(within(section).getByText('FAHINT products')).toBeInTheDocument();
    expect(within(section).getByText('Your brand, our manufacturing')).toBeInTheDocument();
    const companyPhoto = within(section).getByRole('img', { name: 'Product testing equipment in the FAHINT laboratory, from the company catalog' });
    expect(companyPhoto).toHaveAttribute('src', publicAsset('assets/images/company/fahint-laboratory-catalog.webp'));
    expect(companyPhoto).toHaveAttribute('width', '1417');
    expect(companyPhoto).toHaveAttribute('height', '422');
    expect(within(section).queryByRole('img', { name: /FAHINT collection of/ })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'The finish is personal.' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Preview White' })).not.toBeInTheDocument();
  });

  it('connects the brand introduction to company details and the existing OEM chapter', () => {
    show(HomeStudio);
    const section = screen.getByRole('region', { name: 'Everyday power. Made by FAHINT.' });
    expect(within(section).getByRole('link', { name: 'Get to know FAHINT' })).toHaveAttribute('href', '/about');
    expect(within(section).getByRole('link', { name: 'Explore OEM / ODM' })).toHaveAttribute('href', '/#studio-oem');
    const nav = screen.getByRole('navigation', { name: 'Homepage sections' });
    expect(within(nav).getByRole('link', { name: 'About FAHINT' })).toHaveAttribute('href', '/#studio-brand');
    expect(within(nav).queryByRole('link', { name: 'Finishes' })).not.toBeInTheDocument();
  });

  it('has real local images/documents and explicit certification scope', () => {
    const { container } = show(HomeStudio);
    for (const img of container.querySelectorAll('img')) expect(existsSync(publicAssetFile(img.getAttribute('src')))).toBe(true);
    for (const link of container.querySelectorAll('a[href$=".pdf"]')) expect(existsSync(publicAssetFile(link.getAttribute('href')))).toBe(true);
    expect(screen.getByText(/Certification coverage is model-specific/)).toBeInTheDocument();
  });

  it('restores the complete original certificate library, without blanket certification claims', () => {
    show(HomeStudio);
    const section = screen.getByRole('region', { name: 'Confidence, documented.' });
    for (const certificate of certificates) {
      expect(within(section).getByRole('button', { name: `View ${certificate.name} certificate` })).toBeInTheDocument();
      expect(within(section).getByRole('link', { name: `Download ${certificate.name} PDF` })).toHaveAttribute('href', certificate.document);
    }
    expect(within(section).getByText(/Certification coverage is model-specific/)).toBeInTheDocument();
  });

  it('restores buyer questions with accessible expand/collapse behavior', () => {
    show(HomeStudio);
    const section = screen.getByRole('region', { name: 'Before we begin.' });
    for (const item of faqs) expect(within(section).getByRole('button', { name: item.q })).toBeInTheDocument();
    const question = within(section).getByRole('button', { name: faqs[1].q });
    fireEvent.click(question);
    expect(question).toHaveAttribute('aria-expanded', 'true');
    expect(within(section).getByText(faqs[1].a)).toBeVisible();
  });

  it('provides company contacts and the complete product list in the homepage inquiry', () => {
    show(HomeStudio);
    const section = screen.getByRole('region', { name: 'Send an inquiry' });
    expect(within(section).getByRole('link', { name: company.email })).toHaveAttribute('href', `mailto:${company.email}`);
    expect(within(section).getByRole('link', { name: company.phone })).toHaveAttribute('href', `tel:${company.phone.replace(/\s/g, '')}`);
    expect(within(section).getByRole('link', { name: 'WhatsApp' })).toHaveAttribute('href', `https://wa.me/${company.whatsapp.replace(/\D/g, '')}`);
    const select = within(section).getByLabelText('Model of interest');
    expect(within(select).getByRole('option', { name: /^FTR15C-3100 / })).toBeInTheDocument();
    expect(within(select).queryByRole('option', { name: /^FLB20 / })).not.toBeInTheDocument();
  });

  it('validates the restored form and accurately describes the configured delivery method', () => {
    show(HomeStudio);
    const section = screen.getByRole('region', { name: 'Send an inquiry' });
    fireEvent.click(within(section).getByRole('button', { name: 'Open email app' }));
    expect(within(section).getByLabelText('Your name *')).toHaveAttribute('aria-invalid', 'true');
    expect(within(section).getByText(/This opens your email app/)).toBeInTheDocument();
    expect(within(section).queryByText(/Your inquiry has been received/)).not.toBeInTheDocument();
  });

  it('offers section navigation with real targets while keeping motion an optional enhancement', () => {
    const { container } = show(HomeStudio);
    const nav = screen.getByRole('navigation', { name: 'Homepage sections' });
    for (const link of within(nav).getAllByRole('link')) expect(container.querySelector(new URL(link.getAttribute('href'), 'https://example.test').hash)).not.toBeNull();
    const css = readFileSync('src/styles/studio.css', 'utf8');
    expect(css).toContain('@supports (animation-timeline: view())');
    expect(css).toContain('studio-factory-open');
    expect(css).toContain('prefers-reduced-motion: no-preference');
  });

  it('keeps four concise OEM steps visible with one inquiry action and one capabilities link', () => {
    show(HomeStudio);
    const section = screen.getByRole('region', { name: 'Your product range. Our manufacturing.' });
    const process = within(section).getByRole('list', { name: 'OEM / ODM process' });
    expect(within(process).getAllByRole('listitem')).toHaveLength(4);
    for (const title of ['Select your products', 'Make the details yours', 'Review the sample', 'Confirm production']) {
      expect(within(process).getByRole('heading', { name: title })).toBeVisible();
    }
    for (const step of within(process).getAllByRole('listitem')) {
      expect(step.querySelectorAll('p')).toHaveLength(1);
      expect(step.querySelector('p').textContent.trim().split(/\s+/).length).toBeLessThanOrEqual(22);
    }
    expect(within(process).getByText(/authorized artwork/)).toBeVisible();
    expect(within(process).getByText(/quantities and lead times/i)).toBeVisible();
    expect(within(section).getAllByRole('link', { name: 'Discuss your OEM / ODM project' })).toHaveLength(1);
    expect(within(section).getByRole('link', { name: 'Discuss your OEM / ODM project' })).toHaveAttribute('href', '/#studio-inquiry');
    expect(within(section).getByRole('link', { name: 'Explore OEM / ODM capabilities' })).toHaveAttribute('href', '/capabilities#oem');
    expect(within(section).queryByText('Have a product range in mind?')).not.toBeInTheDocument();
    expect(within(section).queryByText('Model selection & product brief')).not.toBeInTheDocument();
    expect(screen.queryByText(/1,000,000|20,000\+|12 hours|15 Days|UC60-GAN/)).not.toBeInTheDocument();
  });

  it('replaces the distorted OEM image with a concept based on identified FAHINT models', () => {
    show(HomeStudio);
    const section = screen.getByRole('region', { name: 'Your product range. Our manufacturing.' });
    const image = within(section).getByRole('img');
    expect(image).toHaveAttribute('src', publicAsset('assets/images/editorial-products/oem-fahint-product-samples-v1.webp'));
    expect(image).toHaveAttribute('width', '1536');
    expect(image).toHaveAttribute('height', '1024');
    for (const sku of ['GF15', 'FTR15C-3100', 'DS15']) expect(image.getAttribute('alt')).toContain(sku);
    expect(section.querySelector('figcaption')).toHaveTextContent('Product and packaging concept');
    expect(section.querySelector('img[src*="brand-program-review-v2"]')).toBeNull();
  });

  it('pairs manufacturing photography with readable inspection and documentation context', () => {
    show(HomeStudio);
    const section = screen.getByRole('region', { name: 'Manufacturing you can see.' });
    expect(within(section).getByRole('img', { name: /FAHINT workers and GFCI/ })).toHaveAttribute('src', publicAsset('assets/images/editorial-home/factory-optimized.webp'));
    for (const title of ['Product development & assembly', 'Functional inspection', 'Model documentation']) {
      expect(within(section).getByRole('heading', { name: title })).toBeVisible();
    }
    expect(within(section).getByRole('link', { name: 'Review model certificates' })).toHaveAttribute('href', '/#studio-certificates');
  });

  it('shows seven product ranges and derives every count from the existing catalogue', () => {
    show(ProductsStudio, '/products-studio');
    const ranges = screen.getByRole('region', { name: 'Product ranges' });
    for (const line of productLines) {
      const item = within(ranges).getByRole('article', { name: line.name });
      const count = getCatalogProducts(line.slug).length + (line.slug === 'gfci' ? products.length : 0);
      expect(within(item).getByText(`${count} models`)).toBeInTheDocument();
      expect(within(item).getByRole('link', { name: `Explore ${line.name}` })).toHaveAttribute('href', `/products/${line.slug}`);
    }
  });

  it('searches models, filters families and recovers from an empty result', () => {
    show(ProductsStudio, '/products-studio');
    const search = screen.getByRole('searchbox', { name: 'Search model or feature' });
    fireEvent.change(search, { target: { value: 'FTR15C-3100' } });
    expect(screen.getByRole('status')).toHaveTextContent('1 model');
    expect(screen.getByRole('link', { name: 'View FTR15C-3100' })).toHaveAttribute('href', '/products/usb-outlets/ftr15c-3100');
    fireEvent.change(search, { target: { value: 'nothing-matches-here' } });
    expect(screen.getByRole('heading', { name: 'No matching products' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Reset filters' }));
    fireEvent.click(screen.getByRole('button', { name: 'Filter Dimmers' }));
    expect(screen.getByRole('status')).toHaveTextContent('2 models');
    expect(screen.getByRole('link', { name: 'View DM2010S' })).toBeInTheDocument();
  });

  it('paginates the full catalogue and resets pagination on category changes', () => {
    show(ProductsStudio, '/products-studio');
    fireEvent.click(screen.getByRole('button', { name: 'Browse all models' }));
    expect(screen.getAllByRole('link', { name: /^View / })).toHaveLength(12);
    fireEvent.click(screen.getByRole('button', { name: /Show more models/ }));
    expect(screen.getAllByRole('link', { name: /^View / })).toHaveLength(24);
    fireEvent.click(screen.getByRole('button', { name: 'Filter Lighting Switches' }));
    expect(screen.getAllByRole('link', { name: /^View / })).toHaveLength(6);
  });

  it('marks each experimental route noindex and restores metadata on exit', () => {
    const oldTitle = document.title;
    const { unmount } = show(HomeStudio);
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    unmount();
    expect(document.title).toBe(oldTitle);
    expect(document.querySelector('meta[name="robots"]')).toBeNull();
  });
});
