import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { products } from './data/products.js';

const sourceExtensions = new Set(['.js', '.jsx', '.css']);

function collectSourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) return collectSourceFiles(fullPath);
    return sourceExtensions.has(path.extname(entry.name)) ? [fullPath] : [];
  });
}

function flattenProductAssets(product) {
  const assets = product.assets ?? {};

  return [
    assets.hero,
    assets.card,
    ...(assets.gallery ?? []),
    assets.feature,
    assets.installation,
    assets.dimensions,
    ...Object.values(assets.finishes ?? {})
  ].filter(Boolean);
}

describe('public asset paths', () => {
  it('keeps image URLs relative to the configured Vite base path', () => {
    const files = [...collectSourceFiles('src'), 'index.html'];
    const rootAssetPrefix = ['/assets', 'images/'].join('/');
    const rootAbsoluteReferences = files.flatMap((file) => {
      const contents = fs.readFileSync(file, 'utf8');
      return contents.includes(rootAssetPrefix) ? [file] : [];
    });

    expect(rootAbsoluteReferences).toEqual([]);
    expect(fs.readFileSync('index.html', 'utf8')).toContain('<base href="%BASE_URL%" />');
  });

  it('keeps every published GFCI asset inside public', () => {
    const missing = products.flatMap((product) => flattenProductAssets(product)
      .filter((asset) => !fs.existsSync(path.join('public', asset)))
      .map((asset) => `${product.sku}: ${asset}`));

    expect(missing).toEqual([]);
  });
});
