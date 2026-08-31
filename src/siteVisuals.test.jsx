import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import Footer from './components/Footer.jsx';
import ProductsOverview from './pages/ProductsOverview.jsx';
import Capabilities from './pages/Capabilities.jsx';
import { ProductManufacturingProof } from './components/products/ProductTechnicalSections.jsx';
import ProductDetailHero from './components/products/ProductDetailHero.jsx';
import { getCatalogProducts } from './data/catalogProducts.js';
import { publicAssetFile } from './test/publicAssetFile.js';

const show = (Component) => render(<MemoryRouter future={{ v7_startTransition:true,v7_relativeSplatPath:true }}><Component /></MemoryRouter>);

describe('Shared visual finish and original company imagery', () => {
  it('uses the official FAHINT wordmark in the footer', () => {
    show(Footer);
    expect(screen.getByRole('img', { name:'FAHINT' })).toHaveAttribute('src',expect.stringContaining('assets/images/brand/fahint-logo-navy.png'));
    expect(document.querySelector('.footer .logo__mark')).toBeNull();
  });
  it('replaces the early generated product montage with the real exhibition display', () => {
    show(ProductsOverview);
    const section = screen.getByRole('region',{name:'Built for brands and OEM programs.'});
    expect(within(section).getByRole('img')).toHaveAttribute('src',expect.stringContaining('company/exhibition-source.webp'));
    expect(section.querySelector('figcaption')).toHaveTextContent('FAHINT exhibition');
    expect(section.querySelector('img[src*="brand-program-review-v2"]')).toBeNull();
  });
  it('shows complete original manufacturing photos instead of low-resolution diagonal brochure fragments', () => {
    show(ProductManufacturingProof);
    const images=screen.getAllByRole('img');
    expect(images).toHaveLength(3);
    for(const image of images) {
      expect(image.getAttribute('src')).not.toContain('/facility-');
      expect(Number(image.getAttribute('width'))).toBeGreaterThan(700);
      expect(existsSync(publicAssetFile(image.getAttribute('src')))).toBe(true);
    }
    expect(screen.getByText('Tooling')).toBeInTheDocument();
  });
  it('illustrates the manufacturing stages with their own original catalog photographs', () => {
    show(Capabilities);
    const production=document.getElementById('production');
    expect(production.querySelectorAll('.company-columns img')).toHaveLength(3);
    expect([...production.querySelectorAll('.company-columns img')].every(img=>!img.getAttribute('src').includes('/facility-'))).toBe(true);
  });
  it('loads a shared system without altering the retained homepage source', () => {
    expect(existsSync('src/styles/site-system.css')).toBe(true);
    expect(readFileSync('src/main.jsx','utf8')).toContain("import './styles/site-system.css'");
  });
  it('keeps USB connector names together when a model heading wraps', () => {
    const product=getCatalogProducts('usb-outlets').find(model=>model.sku==='FTR15C-3100');
    show(()=> <ProductDetailHero product={product} />);
    const heading=screen.getByRole('heading',{level:1});
    expect(heading).toHaveTextContent(product.name);
    expect([...heading.querySelectorAll('.product-name-token')].map(node=>node.textContent)).toEqual(['USB-A','USB-C']);
  });
  it('owns the foreground of dark product sections instead of inheriting page ink', () => {
    const styles = readFileSync('src/styles/site-system.css', 'utf8');
    expect(styles).toMatch(/:is\(\.product-story--application,\.product-certification\)\s*\{[^}]*color:\s*#fff/);
    expect(styles).toMatch(/:is\(\.product-story--application,\.product-certification\) h2\s*\{[^}]*color:\s*#fff/);
    expect(styles).not.toMatch(/\.product-story--application h2\s*\{[^}]*color:\s*inherit/);
  });
  it('keeps packaging comparison text readable and certificate previews bounded', () => {
    const styles = readFileSync('src/styles/product-experience.css', 'utf8');
    expect(styles).toMatch(/\.product-packaging__program-panel thead th\s*\{[^}]*font-size:\s*14px/);
    expect(styles).toMatch(/\.product-packaging__program-panel tbody td\s*\{[^}]*font-size:\s*16px/);
    expect(styles).toMatch(/\.product-certification__document-viewer\s*\{[^}]*max-width:\s*480px/);
    expect(styles).toMatch(/\.product-certification__verification h2\s*\{[^}]*max-width:\s*24ch/);
  });
  it('lets long catalogue configuration actions wrap instead of widening a phone viewport', () => {
    const styles = readFileSync('src/styles/site-system.css', 'utf8');
    expect(styles).toMatch(/\.catalog-presentation__body > \*\s*\{[^}]*min-width:\s*0/);
    expect(styles).toMatch(/\.catalog-presentation__copy \.btn\s*\{[^}]*max-width:\s*100%[^}]*white-space:\s*normal/);
  });
});
