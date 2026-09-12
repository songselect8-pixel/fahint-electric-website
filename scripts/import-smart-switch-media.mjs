// Import only presentation media. Model specifications and source records stay untouched.
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalogueModelSources } from './catalogue-model-sources.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const library = path.resolve(root, '../公司资料&产品/产品图片');
const assetRoot = 'assets/images/catalog/smart-switches';
const jobs = new Map();
const records = {};
const image = (source, mask) => {
  const original = path.resolve(library, source);
  if (!original.startsWith(`${library}${path.sep}`) || !existsSync(original)) throw new Error(`Missing source: ${source}`);
  const sourceHash = createHash('sha256').update(readFileSync(original)).digest('hex');
  const filename = `${sourceHash.slice(0, 16)}-${mask ? 'white-v1.webp' : `original${path.extname(source)}`}`;
  if (!jobs.has(filename)) jobs.set(filename, { original, filename, mask, sourceHash,
    refresh: process.argv.includes('--refresh') && Boolean(mask) });
  return { src: `${assetRoot}/${filename}`, source, sourceHash, background: mask ? 'white' : 'original' };
};

for (const record of catalogueModelSources.filter((r) => r.family === 'smart-switches')) {
  const us = record.model.startsWith('US');
  const folder = path.posix.dirname(record.gallerySources[0]);
  const relative = (file) => path.posix.join(folder, file);
  const finishes = (us ? [['black', '1.png'], ['white', '1-2.png'], ['grey', '1-3.png'], ['gold', '1-4.png']]
    : [['black', '黑.jpg'], ['white', '白.jpg'], ['gold', '金.jpg'], ['grey', '灰.jpg']])
    .map(([slug, file]) => ({ slug, ...image(relative(file), us ? 'front' : null) }));
  const structural = (us ? [['rear', '3.png', 'rear'], ['side', '4.png', 'low'], ['rear-angle', '5.png', 'rear-angle'], ['terminals', '6.png', 'terminals']]
    : [['front', '正面黑.jpg'], ['side', '侧面.jpg'], ['rear', '背面.jpg']])
    .map(([kind, file, mask]) => ({ kind, ...image(relative(file), mask) }));
  const gallery = [{ ...finishes[0], kind: 'front' }, ...structural];
  const detailViews = ['front', 'side', 'rear'].map((kind) => ({
    ...((!us && kind === 'front' ? structural : gallery).find((entry) => entry.kind === kind))
  }));
  const drawings = [
    { kind: 'dimensions', ...image(relative(us ? '11.png' : '../3.jpg')) },
    { kind: 'wiring', ...image(relative(us ? '10.png' : '../5.jpg')) }
  ];
  records[record.model] = { gallery, finishes, detailViews, drawings };
}

const result = JSON.parse(execFileSync(process.env.SMART_MEDIA_PYTHON || 'python', [
  '-X', 'utf8', path.join(root, 'scripts/smart-switch-white-background.py'), path.join(root, 'public', assetRoot)
], { input: JSON.stringify([...jobs.values()]), encoding: 'utf8', maxBuffer: 4 * 1024 * 1024, windowsHide: true }));
for (const media of Object.values(records)) for (const entries of Object.values(media)) for (const entry of entries) {
  const size = result[path.posix.basename(entry.src)];
  if (!size) throw new Error(`Missing processed image: ${entry.src}`);
  [entry.width, entry.height] = size;
}
writeFileSync(path.join(root, 'src/data/catalog/smart-switch-media.json'), `${JSON.stringify(records, null, 2)}\n`);
console.log(`Imported ${Object.keys(records).length} smart-switch models; ${jobs.size} unique assets; original sources preserved.`);
