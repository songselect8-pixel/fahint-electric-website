import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const sourceExtensions = new Set(['.js', '.jsx', '.css']);

function collectSourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) return collectSourceFiles(fullPath);
    return sourceExtensions.has(path.extname(entry.name)) ? [fullPath] : [];
  });
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
});
