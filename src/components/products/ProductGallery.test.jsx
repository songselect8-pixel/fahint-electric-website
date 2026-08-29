import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { findProduct, productFinishImage } from '../../data/products.js';
import ProductGallery from './ProductGallery.jsx';

describe('ProductGallery', () => {
  let originalShowModal;
  let originalClose;

  beforeEach(() => {
    originalShowModal = HTMLDialogElement.prototype.showModal;
    originalClose = HTMLDialogElement.prototype.close;
    HTMLDialogElement.prototype.showModal = vi.fn(function showModal() {
      this.setAttribute('open', '');
    });
    HTMLDialogElement.prototype.close = vi.fn(function close() {
      this.removeAttribute('open');
      this.dispatchEvent(new Event('close'));
    });
  });

  afterEach(() => {
    HTMLDialogElement.prototype.showModal = originalShowModal;
    HTMLDialogElement.prototype.close = originalClose;
  });

  it('renders the finish image selected by the product detail panel', () => {
    const product = findProduct('GF15');
    render(
      <ProductGallery
        product={product}
        selectedImage={productFinishImage(product.sku, 'black')}
        selectedFinish="black"
        onSelectImage={vi.fn()}
      />
    );

    expect(screen.getByRole('img', { name: 'GF15 selected product view' })).toHaveAttribute(
      'src',
      `${import.meta.env.BASE_URL}assets/images/products/gf15-black.webp`
    );
    expect(screen.getByRole('img', { name: 'GF15 selected product view' })).toHaveAttribute(
      'width',
      '620'
    );
    expect(screen.getByRole('img', { name: 'GF15 selected product view' })).toHaveAttribute(
      'height',
      '620'
    );
  });

  it('renders five thumbnails without finish controls in the gallery', () => {
    const product = findProduct('GF15');
    const { container } = render(
      <ProductGallery
        product={product}
        selectedImage={product.assets.hero}
        selectedFinish={null}
        onSelectImage={vi.fn()}
      />
    );

    const main = screen.getByTestId('product-gallery-main');
    const mainImage = within(main).getByRole('img', { name: 'GF15 selected product view' });
    expect(main).toHaveClass('product-media-square');
    expect(mainImage).toHaveAttribute('width', '800');
    expect(mainImage).toHaveAttribute('height', '800');
    expect(mainImage).toHaveAttribute('loading', 'eager');

    const thumbnails = screen.getAllByRole('button', { name: /^View GF15 image [1-5]$/ });
    expect(thumbnails).toHaveLength(5);
    thumbnails.forEach((thumbnail) => {
      const image = thumbnail.querySelector('img');
      expect(thumbnail).toHaveAttribute('data-testid', 'product-gallery-thumb');
      expect(thumbnail).toHaveClass('product-media-square');
      expect(image).toHaveAttribute('alt', '');
      expect(image).toHaveAttribute('width', '800');
      expect(image).toHaveAttribute('height', '800');
      expect(image).toHaveAttribute('loading', 'lazy');
    });
    expect(container.querySelector('button button')).toBeNull();

    expect(screen.queryByRole('button', { name: 'Show GF15 in Black' })).toBeNull();
  });

  it('reports thumbnail selection to the product detail panel', async () => {
    const user = userEvent.setup();
    const product = findProduct('GF15');
    const onSelectImage = vi.fn();
    render(
      <ProductGallery
        product={product}
        selectedImage={product.assets.hero}
        selectedFinish={null}
        onSelectImage={onSelectImage}
      />
    );

    await user.click(screen.getByRole('button', { name: 'View GF15 image 2' }));

    expect(onSelectImage).toHaveBeenCalledWith(product.assets.gallery[1]);
  });

  it('opens an accessible native dialog and closes it by button, backdrop, or native cancel', async () => {
    const user = userEvent.setup();
    const product = findProduct('GF15');
    render(
      <ProductGallery
        product={product}
        selectedImage={product.assets.hero}
        selectedFinish={null}
        onSelectImage={vi.fn()}
      />
    );

    const trigger = screen.getByRole('button', { name: /GF15 selected product view Enlarge/ });
    const dialog = screen.getByRole('dialog', { hidden: true });

    await user.click(trigger);
    expect(dialog).toHaveAttribute('open');
    const enlargedImage = screen.getByRole('img', { name: 'GF15 enlarged product view' });
    expect(enlargedImage).toHaveAttribute('width', '800');
    expect(enlargedImage).toHaveAttribute('height', '800');

    const styles = readFileSync('src/styles/product-experience.css', 'utf8');
    const dialogImageRules = styles.match(/\.product-gallery__dialog-inner\s*>\s*img\s*\{[^}]+\}/)?.[0] || '';
    expect(dialogImageRules).toMatch(/width:\s*auto/);
    expect(dialogImageRules).toMatch(/height:\s*auto/);
    expect(dialogImageRules).toMatch(/max-width:\s*100%/);
    expect(dialogImageRules).toMatch(/max-height:\s*calc\(90vh\s*-\s*96px\)/);
    expect(dialogImageRules).toMatch(/object-fit:\s*contain/);

    await user.click(screen.getByRole('button', { name: 'Close enlarged product image' }));
    expect(dialog).not.toHaveAttribute('open');
    expect(trigger).toHaveFocus();

    await user.click(trigger);
    fireEvent.click(dialog);
    expect(dialog).not.toHaveAttribute('open');

    await user.click(trigger);
    fireEvent(dialog, new Event('cancel', { cancelable: true }));
    expect(dialog).not.toHaveAttribute('open');
    expect(trigger).toHaveFocus();
  });
});
