import { copyFile, readFile, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function validateExpectedBase(expectedBase) {
  if (typeof expectedBase !== 'string' || expectedBase.length === 0) {
    throw new Error('Unsafe expected base: a non-empty pathname is required.');
  }

  let decodedBase;
  try {
    decodedBase = decodeURIComponent(expectedBase);
  } catch {
    throw new Error(`Unsafe expected base "${expectedBase}": invalid percent encoding.`);
  }

  const isInvalidPathname = (value) => (
    !value.startsWith('/')
    || value.startsWith('//')
    || !value.endsWith('/')
    || /[\\?#\s\u0000-\u001f\u007f]/.test(value)
  );

  if (isInvalidPathname(expectedBase) || isInvalidPathname(decodedBase)) {
    throw new Error(`Unsafe expected base "${expectedBase}": use an internal pathname with one leading slash and a trailing slash.`);
  }

  const segments = decodedBase.slice(1, -1).split('/');
  if (decodedBase !== '/' && segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    throw new Error(`Unsafe expected base "${expectedBase}": empty, dot and parent-directory segments are not allowed.`);
  }

  return expectedBase;
}

function validateCustomDomain(customDomain) {
  if (customDomain === undefined || customDomain === null || customDomain === '') return '';
  if (typeof customDomain !== 'string' || customDomain.length > 253 || /\s/.test(customDomain)) {
    throw new Error('Unsafe custom domain: provide a hostname of 1-253 ASCII characters.');
  }

  const labels = customDomain.split('.');
  const validLabel = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/i;
  if (labels.some((label) => !validLabel.test(label))) {
    throw new Error(`Unsafe custom domain "${customDomain}": schemes, ports, paths and shell syntax are not allowed.`);
  }

  return customDomain.toLowerCase();
}

export async function preparePages({
  distDir = 'dist',
  expectedBase = process.env.SITE_BASE,
  customDomain = process.env.CUSTOM_DOMAIN
} = {}) {
  const validatedBase = validateExpectedBase(expectedBase);
  const validatedDomain = validateCustomDomain(customDomain);

  const outputDir = resolve(distDir);
  const indexPath = join(outputDir, 'index.html');
  let indexHtml;

  try {
    indexHtml = await readFile(indexPath, 'utf8');
  } catch (error) {
    throw new Error(`Cannot prepare Pages artifact: index.html is missing at ${indexPath}.`, { cause: error });
  }

  const actualBase = indexHtml.match(/<base\s+href=["']([^"']+)["']/i)?.[1];
  if (actualBase !== validatedBase) {
    throw new Error(`Cannot prepare Pages artifact: expected base "${validatedBase}", found "${actualBase || 'none'}".`);
  }

  await copyFile(indexPath, join(outputDir, '404.html'));
  await writeFile(join(outputDir, '.nojekyll'), '');

  const cnamePath = join(outputDir, 'CNAME');
  if (validatedDomain) {
    await writeFile(cnamePath, `${validatedDomain}\n`, 'utf8');
  } else {
    await rm(cnamePath, { force: true });
  }
}

const isDirectRun = process.argv[1]
  && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirectRun) {
  preparePages().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
