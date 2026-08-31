import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import HomeStudio from './pages/HomeStudio.jsx';
import ProductsStudio from './pages/ProductsStudio.jsx';
import Header from './components/Header.jsx';

const show = (Component, path) => render(<MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><Component /></MemoryRouter>);

describe('published homepage and product overview', () => {
  it('serves the completed pages at the canonical entry routes', () => {
    const source = readFileSync('src/main.jsx', 'utf8');
    expect(source).toContain('path="/" element={<HomeStudio />}');
    expect(source).toContain('path="/products" element={<ProductsStudio />}');
    expect(source).not.toContain('path="/" element={<Home />}');
  });

  it('makes the published homepage indexable with production metadata', () => {
    show(HomeStudio, '/');
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    expect(document.title).toBe('FAHINT | Wiring Devices & OEM/ODM Manufacturing');
    expect(document.querySelector('meta[name="description"]')?.content).toContain('North American');
    expect(screen.getByRole('link', { name: 'Explore FAHINT products' })).toHaveAttribute('href', '/products');
    const nav = screen.getByRole('navigation', { name: 'Homepage sections' });
    for (const link of within(nav).getAllByRole('link')) {
      expect(link.getAttribute('href')).toMatch(/^\/#studio-/);
    }
  });

  it('makes the published catalog indexable and links back to the homepage', () => {
    show(ProductsStudio, '/products');
    expect(document.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    expect(document.title).toBe('FAHINT | Product Catalog');
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });

  it.each(['/', '/about', '/products', '/products/usb-outlets'])('keeps navigation on published routes from %s', path => {
    show(Header, path);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /^Products/ })).toHaveAttribute('href', '/products');
    expect(screen.getByRole('link', { name: 'Send Inquiry' })).toHaveAttribute('href', path === '/' ? '/#studio-inquiry' : '/contact');
  });

  it('has current sharing copy without the former five-range claim', () => {
    const html = readFileSync('index.html', 'utf8');
    expect(html).not.toContain('Five coordinated');
    expect(html).toContain('Seven product families');
  });
});
