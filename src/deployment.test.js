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
  it('ships a sitemap for every published route without preview or draft pages', async () => {
    const { PUBLIC_ROUTES } = await loadPreparePages();
    const sitemap = await readFile('public/sitemap.xml', 'utf8');
    const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname.replace(/^\/|\/$/g, ''));
    expect(new Set(paths)).toEqual(new Set(['', ...PUBLIC_ROUTES]));
    expect(sitemap).not.toMatch(/home-studio|home-next|products-studio|flb20/);
  });
  it('runs tests before the build and prepares the artifact after the build', () => {
    const testStep = workflow.indexOf('- run: npm test');
    const buildStep = workflow.indexOf('- name: Build');
    const prepareStep = workflow.indexOf('node scripts/prepare-pages.mjs');

    expect(testStep).toBeGreaterThan(-1);
    expect(buildStep).toBeGreaterThan(testStep);
    expect(prepareStep).toBeGreaterThan(buildStep);
    expect(workflow).toContain('CUSTOM_DOMAIN: ${{ vars.CUSTOM_DOMAIN }}');
    expect(workflow).not.toMatch(/run:\s*(?:echo|printf)[^\n]*CUSTOM_DOMAIN/i);
  });

  it('copies index byte-for-byte to 404 and creates .nojekyll', async () => {
    const { preparePages } = await loadPreparePages();
    const html = '<!doctype html><base href="/fahint-electric-website/"><main>fixture</main>';
    const distDir = await createDist(html);

    await preparePages({ distDir, expectedBase: '/fahint-electric-website/' });

    expect(await readFile(join(distDir, '404.html'))).toEqual(await readFile(join(distDir, 'index.html')));
    expect((await stat(join(distDir, '.nojekyll'))).isFile()).toBe(true);
  });

  it('materializes every public SPA route as a real Pages entry file', async () => {
    const { preparePages } = await loadPreparePages();
    const html = '<!doctype html><base href="/fahint-electric-website/"><main>fixture</main>';
    const distDir = await createDist(html);

    await preparePages({ distDir, expectedBase: '/fahint-electric-website/' });

    const publicRoutes = [
      'products',
      'products/gfci',
      'products/gfci/gf15',
      'products/gfci/gl20',
      'products/usb-outlets',
      'products/receptacles',
      'products/dimmers',
      'products/smart-switches',
      'products/lighting-switches',
      'products/wallplates',
      'blog',
      'capabilities',
      'about',
      'contact'
    ];

    for (const route of publicRoutes) {
      expect(await readFile(join(distDir, route, 'index.html'), 'utf8')).toBe(html);
    }
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

  it('writes a validated custom domain with Node rather than shell interpolation', async () => {
    const { preparePages } = await loadPreparePages();
    const distDir = await createDist('<!doctype html><base href="/fahint-electric-website/">');

    await preparePages({
      distDir,
      expectedBase: '/fahint-electric-website/',
      customDomain: 'www.fahint.com'
    });

    expect(await readFile(join(distDir, 'CNAME'), 'utf8')).toBe('www.fahint.com\n');
  });

  it('removes a stale CNAME when no custom domain is configured', async () => {
    const { preparePages } = await loadPreparePages();
    const distDir = await createDist('<!doctype html><base href="/fahint-electric-website/">');
    await writeFile(join(distDir, 'CNAME'), 'stale.example\n');

    await preparePages({ distDir, expectedBase: '/fahint-electric-website/', customDomain: '' });

    expect(fs.existsSync(join(distDir, 'CNAME'))).toBe(false);
  });

  it.each([
    '$(touch injected)',
    '`touch injected`',
    'evil.example\nsecond.example',
    'https://www.fahint.com',
    'www.fahint.com/path',
    'www.fahint.com:443'
  ])('rejects unsafe custom domain %j without creating CNAME', async (customDomain) => {
    const { preparePages } = await loadPreparePages();
    const distDir = await createDist('<!doctype html><base href="/fahint-electric-website/">');

    await expect(preparePages({
      distDir,
      expectedBase: '/fahint-electric-website/',
      customDomain
    })).rejects.toThrow(/custom domain/i);
    expect(fs.existsSync(join(distDir, 'CNAME'))).toBe(false);
  });

  it.each([
    '',
    '//evil.example/',
    'https://evil.example/',
    '/repo\\name/',
    '/repo/?query=1',
    '/repo/#hash',
    '/./',
    '/../',
    '/%2e%2e/',
    '/%E0%A4%A/'
  ])('rejects unsafe site base %j before preparing files', async (expectedBase) => {
    const { preparePages } = await loadPreparePages();
    const distDir = await createDist(`<!doctype html><base href="${expectedBase}">`);

    await expect(preparePages({ distDir, expectedBase })).rejects.toThrow(/expected base/i);
    expect(fs.existsSync(join(distDir, '404.html'))).toBe(false);
  });
});
