import { describe, expect, it } from 'vitest';
import { publicAsset } from './publicAsset.js';

describe('publicAsset', () => {
  const expectedProductPath = ['', 'assets/images/products/gf15-main.webp'].join('/');

  it('resolves logical public assets against the current base path', () => {
    expect(publicAsset('assets/images/products/gf15-main.webp'))
      .toBe(expectedProductPath);
  });

  it('normalizes leading slashes on logical public assets', () => {
    const pathWithLeadingSlashes = ['', '', '', 'assets/images/products/gf15-main.webp'].join('/');

    expect(publicAsset(pathWithLeadingSlashes))
      .toBe(expectedProductPath);
  });

  it.each([
    'https://cdn.example.com/gf15.webp',
    'http://cdn.example.com/gf15.webp',
    'data:image/svg+xml;base64,PHN2Zy8+',
    'blob:https://example.com/image-id'
  ])('leaves externally resolved URL %s unchanged', (url) => {
    expect(publicAsset(url)).toBe(url);
  });
});
