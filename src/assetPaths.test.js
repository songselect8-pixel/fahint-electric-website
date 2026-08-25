import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { products } from './data/products.js';

const sourceExtensions = new Set(['.js', '.jsx', '.css']);
const requiredProductAssetFields = [
  'hero',
  'card',
  'feature',
  'installation',
  'dimensions'
];
const publicRoot = path.resolve('public');

function collectSourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) return collectSourceFiles(fullPath);
    return sourceExtensions.has(path.extname(entry.name)) ? [fullPath] : [];
  });
}

function flattenProductAssets(product) {
  const sku = String(product?.sku ?? 'UNKNOWN');
  const assets = product?.assets && typeof product.assets === 'object' && !Array.isArray(product.assets)
    ? product.assets
    : {};
  const entries = requiredProductAssetFields.map((field) => ({
    sku,
    field,
    asset: assets[field]
  }));

  if (Array.isArray(assets.gallery)) {
    entries.push(...assets.gallery.map((asset, index) => ({
      sku,
      field: `gallery[${index}]`,
      asset
    })));
  }

  if (assets.finishes && typeof assets.finishes === 'object' && !Array.isArray(assets.finishes)) {
    entries.push(...Object.entries(assets.finishes).map(([finish, asset]) => ({
      sku,
      field: `finishes.${finish}`,
      asset
    })));
  }

  return entries;
}

function validateAssetReference(sku, field, asset, root = publicRoot) {
  if (typeof asset !== 'string' || asset.trim() === '') {
    return `${sku}: ${field} must be a non-empty string.`;
  }

  const normalizedAsset = asset.trim();
  if (path.isAbsolute(normalizedAsset) || /^(?:[a-zA-Z]:[\\/]|[\\/]{1,2})/.test(normalizedAsset)) {
    return `${sku}: ${field} must use a relative public asset path.`;
  }

  if (normalizedAsset.split(/[\\/]+/).includes('..')) {
    return `${sku}: ${field} must not contain ".." path segments.`;
  }

  const normalizedRoot = path.resolve(root);
  const candidate = path.resolve(normalizedRoot, normalizedAsset);
  const isInsidePublic = candidate === normalizedRoot
    || candidate.startsWith(`${normalizedRoot}${path.sep}`);

  if (!isInsidePublic) {
    return `${sku}: ${field} resolves outside public (${normalizedAsset}).`;
  }

  if (!fs.existsSync(candidate)) {
    return `${sku}: ${field} does not exist inside public (${normalizedAsset}).`;
  }

  return null;
}

function validateProductAssets(product, root = publicRoot) {
  const sku = String(product?.sku ?? 'UNKNOWN');
  const assets = product?.assets && typeof product.assets === 'object' && !Array.isArray(product.assets)
    ? product.assets
    : {};
  const errors = [];

  if (!Array.isArray(assets.gallery) || assets.gallery.length === 0) {
    errors.push(`${sku}: gallery must be a non-empty array.`);
  }

  const finishesAreAnObject = assets.finishes
    && typeof assets.finishes === 'object'
    && !Array.isArray(assets.finishes);
  if (!finishesAreAnObject || Object.keys(assets.finishes).length === 0) {
    errors.push(`${sku}: finishes must be a non-empty object.`);
  }

  flattenProductAssets(product).forEach(({ field, asset }) => {
    const error = validateAssetReference(sku, field, asset, root);
    if (error) errors.push(error);
  });

  return errors;
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
    const invalidAssets = products.flatMap((product) => validateProductAssets(product));

    expect(invalidAssets).toEqual([]);
  });

  it('does not silently skip empty required product asset fields', () => {
    const fixture = structuredClone(products[0]);
    fixture.assets.hero = '';
    fixture.assets.card = undefined;
    fixture.assets.gallery[1] = '';
    fixture.assets.feature = null;
    fixture.assets.installation = '   ';
    fixture.assets.dimensions = false;
    fixture.assets.finishes.white = '';

    expect(flattenProductAssets(fixture)).toContainEqual({
      sku: 'GF15',
      field: 'hero',
      asset: ''
    });
    expect(validateProductAssets(fixture)).toEqual(expect.arrayContaining([
      'GF15: hero must be a non-empty string.',
      'GF15: card must be a non-empty string.',
      'GF15: gallery[1] must be a non-empty string.',
      'GF15: feature must be a non-empty string.',
      'GF15: installation must be a non-empty string.',
      'GF15: dimensions must be a non-empty string.',
      'GF15: finishes.white must be a non-empty string.'
    ]));
  });

  it.each([
    { gallery: [], finishes: {}, caseName: 'empty collections' },
    { gallery: {}, finishes: [], caseName: 'wrong collection types' }
  ])('requires a populated gallery array and finishes object for $caseName', ({ gallery, finishes }) => {
    const fixture = structuredClone(products[0]);
    fixture.assets.gallery = gallery;
    fixture.assets.finishes = finishes;

    expect(validateProductAssets(fixture)).toEqual(expect.arrayContaining([
      'GF15: gallery must be a non-empty array.',
      'GF15: finishes must be a non-empty object.'
    ]));
  });

  it.each([
    ['', 'TEST: hero must be a non-empty string.'],
    ['../package.json', 'TEST: hero must not contain ".." path segments.'],
    [path.resolve('package.json'), 'TEST: hero must use a relative public asset path.']
  ])('rejects invalid public asset reference %j', (asset, expectedError) => {
    expect(validateAssetReference('TEST', 'hero', asset, path.resolve('public')))
      .toBe(expectedError);
  });
});
