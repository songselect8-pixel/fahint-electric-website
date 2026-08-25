import { copyFile, readFile, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function preparePages({ distDir = 'dist', expectedBase = process.env.SITE_BASE } = {}) {
  if (!expectedBase) throw new Error('An expected base is required to prepare the Pages artifact.');

  const outputDir = resolve(distDir);
  const indexPath = join(outputDir, 'index.html');
  let indexHtml;

  try {
    indexHtml = await readFile(indexPath, 'utf8');
  } catch (error) {
    throw new Error(`Cannot prepare Pages artifact: index.html is missing at ${indexPath}.`, { cause: error });
  }

  const actualBase = indexHtml.match(/<base\s+href=["']([^"']+)["']/i)?.[1];
  if (actualBase !== expectedBase) {
    throw new Error(`Cannot prepare Pages artifact: expected base "${expectedBase}", found "${actualBase || 'none'}".`);
  }

  await copyFile(indexPath, join(outputDir, '404.html'));
  await writeFile(join(outputDir, '.nojekyll'), '');
}

const isDirectRun = process.argv[1]
  && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isDirectRun) {
  preparePages().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
