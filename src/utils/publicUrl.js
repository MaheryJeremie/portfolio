export function publicUrl(path) {
  const base = process.env.PUBLIC_URL || '';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}
