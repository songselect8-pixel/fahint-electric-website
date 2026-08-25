const EXTERNAL_URL_PATTERN = /^(?:https?:|data:|blob:)/i;

export function publicAsset(path = '') {
  if (EXTERNAL_URL_PATTERN.test(path)) return path;

  const base = import.meta.env.BASE_URL || '/';
  const normalizedBase = `${base.replace(/\/+$/, '')}/`;
  const normalizedPath = String(path).replace(/^\/+/, '');

  return `${normalizedBase}${normalizedPath}`;
}
