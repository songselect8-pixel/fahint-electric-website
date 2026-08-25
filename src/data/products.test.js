import { describe, expect, it } from 'vitest';
import {
  products,
  productReviewQueue,
  productGallery,
  productImage,
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

  it('returns the placeholder for an unsupported product image role', () => {
    expect(productImage('GF15', 'bogus')).toBe('assets/images/products/product-placeholder.svg');
  });

  it('does not publish unsupported outdoor or damp-location application claims', () => {
    for (const sku of ['GW15', 'GW20']) {
      const grade = products.find((product) => product.sku === sku)?.grade;
      expect(grade).toBe('Residential & Commercial Grade');
      expect(grade).not.toMatch(/outdoor|damp/i);
    }

    expect(filterGfciProducts(products, { application: 'outdoor' })).toEqual([]);
  });

  it('filters WR products through a non-installation classification taxonomy', () => {
    expect(filterGfciProducts(products, { classification: 'wr' }).map((product) => product.sku))
      .toEqual(['GW15', 'GW20']);
  });

  it('supports combined query, amperage, variant and classification filters', () => {
    expect(filterGfciProducts(products, {
      query: 'weather',
      amperage: '20A',
      variant: 'wr',
      classification: 'wr'
    }).map((product) => product.sku)).toEqual(['GW20']);
  });

  it('publishes dimensions verified in each model\'s own artwork', () => {
    for (const sku of ['GW15', 'GL20']) {
      expect(products.find((product) => product.sku === sku)?.dimensions).toEqual({
        face: '4.53 in (115 mm)',
        width: '2.75 in (70 mm)',
        depth: '1.56 in (39.7 mm)'
      });
    }
  });
});
