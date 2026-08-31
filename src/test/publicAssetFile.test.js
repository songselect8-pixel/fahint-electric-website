import { describe, expect, it } from 'vitest';
import { publicAssetFile } from './publicAssetFile.js';

describe('public asset file lookup', () => {
  it.each([
    ['/assets/image.webp', '/'],
    ['assets/image.webp', '/'],
    ['/fahint-electric-website/assets/image.webp', '/fahint-electric-website/'],
    ['assets/image.webp', '/fahint-electric-website/'],
  ])('resolves %s with base %s', (url, base) => {
    expect(publicAssetFile(url, base)).toBe('public/assets/image.webp');
  });
  it('rejects an asset that omits the required deployment prefix', () => {
    expect(() => publicAssetFile('/assets/image.webp', '/fahint-electric-website/')).toThrow(/outside/);
  });
});
