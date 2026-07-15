/**
 * On-demand loader for the two vendor scripts (Splide, Masonry).
 *
 * They used to sit in <head> as deferred CDN tags, which cost ~1.4s of phone
 * CPU on every page load — including pages and viewports where the carousel
 * never scrolls into view. Now each component asks for its script only when
 * its section is about to enter the viewport, and the files are served from
 * our own origin (no third-party DNS/TLS round trips).
 */
const loaded = new Map<string, Promise<void>>();

/** The global each vendor script defines once it has executed (the same
    names the consuming components read off `window`). */
const GLOBAL_FOR_SRC: Record<string, string> = {
  '/vendor/splide.min.js': 'Splide',
  '/vendor/splide-auto-scroll.min.js': 'splide', // extension namespace object
  '/vendor/masonry.pkgd.min.js': 'Masonry',
};

export function loadScript(src: string): Promise<void> {
  const cached = loaded.get(src);
  if (cached) return cached;
  const p = new Promise<void>((resolve, reject) => {
    // A script tag we didn't create may have ALREADY fired its load event —
    // listeners added now would never be called and the promise would hang
    // forever. If the script's global is present, it has executed: resolve.
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
      const globalName = GLOBAL_FOR_SRC[src];
      if (globalName && (window as any)[globalName]) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error(src)));
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(src));
    document.head.appendChild(s);
  });
  loaded.set(src, p);
  return p;
}

/** Splide core + the auto-scroll extension, in order. */
export async function loadSplide(): Promise<void> {
  await loadScript('/vendor/splide.min.js');
  await loadScript('/vendor/splide-auto-scroll.min.js');
}

export function loadMasonry(): Promise<void> {
  return loadScript('/vendor/masonry.pkgd.min.js');
}

/**
 * Resolves once `el` is within `rootMargin` of the viewport (immediately if
 * IntersectionObserver is unavailable).
 */
export function whenNearViewport(el: Element, rootMargin = '400px'): Promise<void> {
  if (typeof IntersectionObserver === 'undefined') return Promise.resolve();
  return new Promise((resolve) => {
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          resolve();
        }
      },
      { rootMargin },
    );
    io.observe(el);
  });
}
