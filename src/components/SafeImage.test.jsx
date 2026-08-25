import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SafeImage from './SafeImage.jsx';

describe('SafeImage', () => {
  const expectedPlaceholder = ['', 'assets/images/products/product-placeholder.svg'].join('/');

  it('switches a failed image to the controlled product placeholder', () => {
    render(<SafeImage src="assets/images/products/missing.webp" alt="Missing product" />);

    const image = screen.getByRole('img', { name: 'Missing product' });
    fireEvent.error(image);

    expect(image).toHaveAttribute('src', expectedPlaceholder);
  });

  it('resets the displayed image when the src prop changes', () => {
    const { rerender } = render(
      <SafeImage src="assets/images/products/missing.webp" alt="Product" loading="lazy" />
    );
    const image = screen.getByRole('img', { name: 'Product' });
    fireEvent.error(image);

    rerender(<SafeImage src="assets/images/products/gf15-main.webp" alt="Product" loading="lazy" />);

    expect(image).toHaveAttribute('src', ['', 'assets/images/products/gf15-main.webp'].join('/'));
    expect(image).toHaveAttribute('loading', 'lazy');
  });
});
