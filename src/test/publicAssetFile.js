// Map a rendered asset URL back to its source file without treating the Pages
// deployment prefix as a directory inside public/.
export function publicAssetFile(url, base = import.meta.env.BASE_URL) {
  const asset = new URL(url, `https://assets.test${base}`);
  if (asset.origin !== 'https://assets.test' || !asset.pathname.startsWith(base)) {
    throw new Error(`Asset is outside the configured site base: ${url}`);
  }
  return `public/${decodeURIComponent(asset.pathname.slice(base.length))}`;
}
