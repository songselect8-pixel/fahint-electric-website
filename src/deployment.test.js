import fs from 'node:fs';
import { mkdtemp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';

const workflow = fs.readFileSync('.github/workflows/deploy.yml', 'utf8');
const scriptPath = join(process.cwd(), 'scripts', 'prepare-pages.mjs');
const temporaryRoots = [];

const loadPreparePages = async () => {
  expect(fs.existsSync(scriptPath), 'prepare-pages script should exist').toBe(true);
  return import('../scripts/prepare-pages.mjs');
};

const createDist = async (html) => {
  const root = await mkdtemp(join(tmpdir(), 'fahint-pages-'));
  const distDir = join(root, 'dist');
  temporaryRoots.push(root);
  await mkdir(distDir, { recursive: true });
  if (html !== undefined) await writeFile(join(distDir, 'index.html'), html);
  return distDir;
};

afterEach(async () => {
  await Promise.all(temporaryRoots.splice(0).map((root) => rm(root, { recursive: true, force: true })));
});

describe('GitHub Pages deployment', () => {
  it('runs tests before the build and prepares the artifact after the build', () => {
    const testStep = workflow.indexOf('- run: npm test');
    const buildStep = workflow.indexOf('- name: Build');
    const prepareStep = workflow.indexOf('node scripts/prepare-pages.mjs');

    expect(testStep).toBeGreaterThan(-1);
    expect(buildStep).toBeGreaterThan(testStep);
    expect(prepareStep).toBeGreaterThan(buildStep);
  });

  it('copies index byte-for-byte to 404 and creates .nojekyll', async () => {
    const { preparePages } = await loadPreparePages();
    const html = '<!doctype html><base href="/fahint-electric-website/"><main>fixture</main>';
    const distDir = await createDist(html);

    await preparePages({ distDir, expectedBase: '/fahint-electric-website/' });

    expect(await readFile(join(distDir, '404.html'))).toEqual(await readFile(join(distDir, 'index.html')));
    expect((await stat(join(distDir, '.nojekyll'))).isFile()).toBe(true);
  });

  it('fails when index.html is missing', async () => {
    const { preparePages } = await loadPreparePages();
    const distDir = await createDist();

    await expect(preparePages({ distDir, expectedBase: '/fahint-electric-website/' }))
      .rejects.toThrow(/index\.html/i);
  });

  it('fails when index.html does not contain the expected repository base', async () => {
    const { preparePages } = await loadPreparePages();
    const distDir = await createDist('<!doctype html><base href="/wrong-base/">');

    await expect(preparePages({ distDir, expectedBase: '/fahint-electric-website/' }))
      .rejects.toThrow(/expected base.*fahint-electric-website/i);
  });
});
