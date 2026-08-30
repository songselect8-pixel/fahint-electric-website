import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import ProductDetail from './ProductDetail.jsx';
import { catalogProducts, findCatalogProduct, productHref } from '../data/catalogProducts.js';
import { publicAsset } from '../utils/publicAsset.js';

function renderModel(path) {
  return render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/products/:line/:sku" element={<ProductDetail />} />
        <Route path="/products/:line" element={<div>Series fallback</div>} />
        <Route path="/products" element={<div>Products fallback</div>} />
      </Routes>
    </MemoryRouter>
  );
}

describe('catalogue product details', () => {
  it.each(catalogProducts.filter((product) => !product.draft).map((product) => [product.sku, product]))('renders the correct image, model and inquiry for %s', (_sku, product) => {
    const { container } = renderModel(productHref(product));
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe(product.name);
    expect(screen.getByRole('img', { name: `${product.sku} selected product view` })).toHaveAttribute('src', publicAsset(product.assets.hero));
    expect(screen.getByLabelText('Model of interest')).toHaveValue(product.sku);
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    const specs = container.querySelector('#technical-details');
    expect(specs).not.toBeNull();
    for (const group of product.specificationGroups) {
      for (const [, value] of group.rows) expect(specs.textContent).toContain(value);
    }
    if (product.reviewNotice) expect(screen.getByRole('note')).toHaveTextContent(product.reviewNotice);
  });

  it.each(['USW8811', 'EUW8811'])('switches %s to the exact selected finish photograph', async (sku) => {
    const user = userEvent.setup();
    const product = findCatalogProduct('smart-switches', sku);
    renderModel(productHref(product));
    const image = screen.getByRole('img', { name: `${sku} selected product view` });
    for (const finish of product.finishes) {
      await user.click(screen.getByRole('button', { name: `Show ${sku} in ${finish.name}` }));
      expect(image).toHaveAttribute('src', publicAsset(product.assets.finishes[finish.slug]));
    }
  });

  it('shows all seven original finishes on FTR15C-3100 and changes the actual product photograph', async () => {
    const user = userEvent.setup();
    const product = findCatalogProduct('usb-outlets', 'FTR15C-3100');
    renderModel(productHref(product));
    expect(screen.getByRole('group', { name: 'Available finishes' })).toBeInTheDocument();
    const image = screen.getByRole('img', { name: `${product.sku} selected product view` });
    for (const name of ['White', 'Ivory', 'Light Almond', 'Black', 'Grey', 'Brown', 'Graphite']) {
      const button = screen.getByRole('button', { name: `Show ${product.sku} in ${name}` });
      await user.click(button);
      const finish = product.finishes.find((f) => f.name === name);
      expect(image).toHaveAttribute('src', publicAsset(finish.image));
      expect(button).toHaveAttribute('aria-pressed', 'true');
      expect(screen.getByRole('img', { name: `${product.sku} enlarged product view`, hidden: true })).toHaveAttribute('src', publicAsset(finish.image));
    }
    await user.click(screen.getByRole('button', { name: `View ${product.sku} image 1` }));
    expect(image).toHaveAttribute('src', publicAsset(product.assets.gallery[0]));
    expect(screen.getByRole('button', { name: `Show ${product.sku} in Graphite` })).toHaveAttribute('aria-pressed', 'false');
  });

  it('does not resolve a model from the wrong product family', () => {
    renderModel('/products/wallplates/gf20');
    expect(screen.getByText('Series fallback')).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });
  it('renders the USB model with its own ratings, ports and inquiry model', () => {
    const { container } = renderModel('/products/usb-outlets/ftr15-3100');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/15A.*USB-A/i);
    expect(container.querySelectorAll('h1')).toHaveLength(1);
    expect(container.querySelector('.product-detail-hero__model')).toHaveTextContent('FTR15-3100');
    const specs = container.querySelector('#technical-details');
    expect(specs).toHaveTextContent(/3\.1\s?A/);
    expect(specs).toHaveTextContent(/5-15R/);
    expect(specs).not.toHaveTextContent(/Trip level|4–6 mA|UL 943/);
    expect(screen.getByRole('link', { name: 'Technical details' })).toHaveAttribute('href', '/products/usb-outlets/ftr15-3100#technical-details');
    expect(screen.getByRole('heading', { name: 'Request a quotation for FTR15-3100.' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /View original model specifications/i }))
      .toHaveAttribute('href', 'https://www.fahint.com/?pro3/175.html');
    expect(container.querySelectorAll('img:not([width]), img:not([height])')).toHaveLength(0);
  });
});
