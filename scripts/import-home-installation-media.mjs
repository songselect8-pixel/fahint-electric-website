// Format-only import. The built-in image tool owns all photographic edits.
// Usage: node scripts/import-home-installation-media.mjs <sharp-module> <embed-prompt-script> [manifest]
import { existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, dirname, sep } from 'node:path';
import { createRequire } from 'node:module';
import { spawnSync } from 'node:child_process';

const sharp = createRequire(import.meta.url)(process.argv[2] || 'sharp');
const embedScript = process.argv[3];
if (!embedScript || !existsSync(embedScript)) throw new Error('Provide the prompt provenance script.');
const manifest = JSON.parse(readFileSync(process.argv[4] || 'docs/product-data/home-installation-showcase-assets.json', 'utf8'));
const outputRoot = resolve('public/assets/images/home-installations');

for (const asset of manifest.assets) {
  const target = resolve(asset.output_path);
  if (!target.startsWith(outputRoot + sep)) throw new Error(`Out-of-scope output: ${target}`);
  if (existsSync(target)) throw new Error(`Preserving existing asset; choose a new version: ${target}`);
  if (!existsSync(asset.generated_source)) throw new Error(`Missing generated original: ${asset.generated_source}`);
}

for (const asset of manifest.assets) {
  const target = resolve(asset.output_path);
  mkdirSync(dirname(target), { recursive: true });
  await sharp(asset.generated_source).webp({ quality: 84, effort: 6 }).toFile(target);
  const provenance = [asset.prompt, ...(asset.revisions || []).map(revision => `Targeted revision:\n${revision.prompt}`)].join('\n\n');
  const embedded = spawnSync(process.execPath, [embedScript, target, '--prompt', provenance], { encoding: 'utf8' });
  if (embedded.status !== 0) throw new Error(embedded.stderr || embedded.stdout);
  const { width, height } = await sharp(target).metadata();
  console.log(JSON.stringify({ id: asset.id, output: asset.output_path, width, height, bytes: statSync(target).size }));
}
