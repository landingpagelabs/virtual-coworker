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

export function loadScript(src: string): Promise<void> {
  const cached = loaded.get(src);
  if (cached) return cached;
  const p = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`);
    if (existing) {
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
