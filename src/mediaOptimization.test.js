import { existsSync, statSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  gfciSeriesVisuals,
  productFamilyVisuals
} from './data/productPageVisuals.js';

describe('production media budget', () => {
  it('serves product-family scenes and GFCI posters as lightweight WebP assets', () => {
    const assets = [
      ...productFamilyVisuals.map(({ scene }) => scene),
      ...Object.values(gfciSeriesVisuals)
    ];

    assets.forEach((asset) => {
      expect(asset).toMatch(/-optimized\.webp$/);
      expect(existsSync(`public/${asset}`)).toBe(true);
      expect(statSync(`public/${asset}`).size).toBeLessThanOrEqual(500 * 1024);
    });
  });

  it('ships a compact fast-start GFCI video and a lightweight poster frame', () => {
    const video = 'public/assets/videos/gfci-product-video-optimized.mp4';
    const poster = 'public/assets/videos/gfci-product-video-poster.webp';

    expect(existsSync(video)).toBe(true);
    expect(existsSync(poster)).toBe(true);
    expect(statSync(video).size).toBeLessThanOrEqual(6 * 1024 * 1024);
    expect(statSync(poster).size).toBeLessThanOrEqual(200 * 1024);
  });
});
