import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { JSDOM } from 'jsdom';
import { products as existingGfciProducts } from '../src/data/products.js';

// An opt-in, offline import. The archive stays outside the website; only product data
// and deduplicated, web-sized images used by the catalogue are brought into public.
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputFile = path.join(projectRoot, 'src/data/catalog/legacy-products.json');
const imageRoot = path.join(projectRoot, 'public/assets/images/catalog/models');
const text = (node) => node?.textContent.replace(/\s+/g, ' ').trim() || '';
const unique = (items) => [...new Set(items.filter(Boolean))];

export function extractLegacyProduct(html, file) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const root = doc.querySelector('.product_detalis');
  if (!root) { dom.window.close(); return null; }
  const model = text(root.querySelector('.right .tops h1'));
  const breadcrumb = text(root.querySelector('.mbx'));
  const family = breadcrumb.includes('USB Outlet') ? 'usb-outlets'
    : breadcrumb.includes('GFCI Outlet') ? 'gfci'
      : breadcrumb.includes('Receptacles') ? 'receptacles'
        : breadcrumb.includes('Wall Plates') ? 'wallplates'
          : breadcrumb.includes('Lighting Control') ? 'lighting-switches' : null;
  if (!model || !family) { dom.window.close(); return null; }
  const match = file.match(/^(.+)-(\d+)\.html\.html$/);
  const sourceUrl = `https://www.fahint.com/?${match[1]}/${match[2]}.html`;
  const images = (selector) => unique([...root.querySelectorAll(selector)]
    .map((node) => node.getAttribute('data-src') || node.getAttribute('src')));
  const result = {
    sourceUrl, sourceFile: `mirror/pages/${file}`, model, family, breadcrumb,
    description: text(root.querySelector('.right .desc')),
    rows: [...root.querySelectorAll('.specifications tr')].map((row) =>
      [...row.querySelectorAll('td, th')].map(text)).filter((row) => row.length === 2),
    features: [...root.querySelectorAll('.features .info p')].map(text).filter(Boolean),
    materials: [...root.querySelectorAll('.characteristics .info > p')].map(text).filter(Boolean),
    gallerySources: images('#gallery img'),
    drawingSources: images('.diemension img')
  };
  dom.window.close();
  return result;
}

function inspectImage(file) {
  const info = JSON.parse(execFileSync('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'json', file
  ], { encoding: 'utf8', windowsHide: true }));
  return info.streams[0];
}

export function importLegacyCatalog({ archive, family }) {
  if (!family) throw new Error('Pass --family to import one series at a time.');
  const archiveRoot = path.resolve(archive);
  const pagesRoot = path.join(archiveRoot, 'mirror/pages');
  const existing = existsSync(outputFile) ? JSON.parse(readFileSync(outputFile, 'utf8')) : [];
  const records = new Map(existing.map((record) => [record.sourceUrl, record]));
  const images = new Map();
  const selected = readdirSync(pagesRoot).filter((name) => /^(?:pro\d+|list_\d+)-\d+\.html\.html$/.test(name))
    .map((file) => extractLegacyProduct(readFileSync(path.join(pagesRoot, file), 'utf8'), file))
    .filter((record) => record?.family === family)
    .sort((a, b) => a.model.localeCompare(b.model, 'en', { numeric: true }));
  if (!selected.length) throw new Error(`No archived models found for ${family}.`);
  mkdirSync(imageRoot, { recursive: true });
  mkdirSync(path.dirname(outputFile), { recursive: true });

  function importImage(source, record) {
    const sourcePath = path.resolve(pagesRoot, source);
    if (!sourcePath.startsWith(`${archiveRoot}${path.sep}`)) throw new Error(`Image outside archive: ${source}`);
    if (!existsSync(sourcePath)) throw new Error(`Missing image for ${record.model}: ${source}`);
    const hash = createHash('sha256').update(readFileSync(sourcePath)).digest('hex').slice(0, 16);
    if (images.has(hash)) return images.get(hash);
    const output = path.join(imageRoot, `${hash}.webp`);
    if (!existsSync(output)) {
      execFileSync('ffmpeg', [
        '-nostdin', '-v', 'error', '-i', sourcePath,
        '-vf', "scale=w='min(1400,iw)':h='min(1400,ih)':force_original_aspect_ratio=decrease:flags=lanczos",
        '-frames:v', '1', '-c:v', 'libwebp', '-quality', '84', '-compression_level', '6', output
      ], { windowsHide: true });
    }
    const { width, height } = inspectImage(output);
    const asset = { src: `assets/images/catalog/models/${hash}.webp`, width, height };
    images.set(hash, asset);
    return asset;
  }

  for (const record of selected) {
    if (record.family === 'gfci' && existingGfciProducts.some((product) => product.sku === record.model)) {
      records.set(record.sourceUrl, { ...record, gallery: [], drawings: [] });
      console.log(`${record.model}: source rows retained for comparison; existing page assets preserved`);
      continue;
    }
    const gallery = record.gallerySources.map((source) => importImage(source, record));
    // These drawings conflict with the catalogue's rating / terminal descriptions.
    // Keep their source paths for review, but do not publish unapproved artwork.
    const drawings = ['FLB20', 'GTN15', 'GTN20'].includes(record.model) ? [] : record.drawingSources.map((source) => importImage(source, record));
    if (!gallery.length) throw new Error(`No genuine product image for ${record.model}.`);
    records.set(record.sourceUrl, { ...record, gallery, drawings });
    console.log(`${record.model}: ${record.rows.length} source rows; ${gallery.length} images; ${drawings.length} drawings`);
  }
  writeFileSync(outputFile, `${JSON.stringify([...records.values()], null, 2)}\n`, 'utf8');
  const files = readdirSync(imageRoot);
  console.log(`${family}: ${selected.length} models imported in sequence. ${files.length} deduplicated images, ${(files.reduce((sum, file) => sum + statSync(path.join(imageRoot, file)).size, 0) / 1024 / 1024).toFixed(1)} MB total.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const args = process.argv.slice(2);
  const option = (name) => args[args.indexOf(name) + 1];
  importLegacyCatalog({
    archive: args.includes('--archive') ? option('--archive') : path.resolve(projectRoot, '../fahint.com-archive-2026-08-23'),
    family: args.includes('--family') ? option('--family') : null
  });
}
