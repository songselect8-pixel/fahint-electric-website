import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { findProduct } from '../../data/products.js';
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

  it('selects the base-safe GF15 Black finish image', async () => {
    const user = userEvent.setup();
    render(<ProductGallery product={findProduct('GF15')} />);

    await user.click(screen.getByRole('button', { name: 'Show GF15 in Black' }));

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
    expect(screen.getByRole('button', { name: 'Show GF15 in Black' })).toHaveAttribute(
      'aria-pressed',
      'true'
    );
  });

  it('renders five thumbnails and every available finish button', () => {
    const { container } = render(<ProductGallery product={findProduct('GF15')} />);

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

    ['White', 'Ivory', 'Light Almond', 'Black', 'Grey', 'Brown'].forEach((finish) => {
      expect(screen.getByRole('button', { name: `Show GF15 in ${finish}` })).toBeInTheDocument();
    });
  });

  it('resets the selected image and finish when the sku or hero changes', async () => {
    const user = userEvent.setup();
    const gf15 = findProduct('GF15');
    const { rerender } = render(<ProductGallery product={gf15} />);

    await user.click(screen.getByRole('button', { name: 'Show GF15 in Black' }));
    rerender(<ProductGallery product={findProduct('GF20')} />);

    expect(screen.getByRole('img', { name: 'GF20 selected product view' })).toHaveAttribute(
      'src',
      `${import.meta.env.BASE_URL}assets/images/products/gf20-main.webp`
    );
    expect(screen.getByRole('button', { name: 'Show GF20 in Black' })).toHaveAttribute(
      'aria-pressed',
      'false'
    );

    const changedHero = {
      ...gf15,
      assets: { ...gf15.assets, hero: 'assets/images/products/gf15-detail.webp' }
    };
    rerender(<ProductGallery product={changedHero} />);

    expect(screen.getByRole('img', { name: 'GF15 selected product view' })).toHaveAttribute(
      'src',
      `${import.meta.env.BASE_URL}assets/images/products/gf15-detail.webp`
    );
  });

  it('opens an accessible native dialog and closes it by button, backdrop, or native cancel', async () => {
    const user = userEvent.setup();
    render(<ProductGallery product={findProduct('GF15')} />);

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
