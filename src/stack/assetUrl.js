/** Resolve public-folder paths for Vite base (e.g. GitHub Pages subpath). */
export function assetUrl(path) {
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}
