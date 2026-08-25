import { describe, expect, it } from 'vitest';
import {
  products,
  productReviewQueue,
  productGallery,
  productFinishImage,
  filterGfciProducts
} from './products.js';

describe('verified GFCI product data', () => {
  it('publishes only the seven models backed by local source folders', () => {
    expect(products.map((product) => product.sku)).toEqual([
      'GF15',
      'GF20',
      'GT15',
      'GT20',
      'GW15',
      'GW20',
      'GL20'
    ]);
  });

  it('keeps FLB20 out of public pages until its assets are verified', () => {
    expect(productReviewQueue).toContainEqual(
      expect.objectContaining({ sku: 'FLB20', publish: false })
    );
  });

  it('maps every product to its own gallery and finish images', () => {
    for (const product of products) {
      const key = product.sku.toLowerCase();
      expect(productGallery(product.sku)).toHaveLength(5);
      expect(productGallery(product.sku).every((path) => path.includes(`/products/${key}-`))).toBe(true);
      expect(productFinishImage(product.sku, 'black')).toContain(`/products/${key}-black.webp`);
    }
  });

  it('supports combined query, amperage, variant and application filters', () => {
    expect(filterGfciProducts(products, {
      query: 'weather',
      amperage: '20A',
      variant: 'wr',
      application: 'outdoor'
    }).map((product) => product.sku)).toEqual(['GW20']);
  });
});
