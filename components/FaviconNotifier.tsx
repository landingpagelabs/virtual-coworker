'use client';

import { useEffect } from 'react';

const DEFAULT_FAVICON = '/images/header/Tab=Default.png';
const CHANGED_FAVICON = '/images/header/Tab=Change.png';
const FLASH_TITLE = '(1) New Message!';

export function FaviconNotifier() {
  useEffect(() => {
    // Chrome doesn't reliably refresh the tab icon when you just change an
    // existing <link>'s href, so replace the element entirely each time.
    const setFavicon = (href: string) => {
      document.querySelectorAll("link[rel~='icon']").forEach((l) => l.remove());
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/png';
      link.href = href;
      document.head.appendChild(link);
    };

    setFavicon(DEFAULT_FAVICON);
    // Preload the "changed" icon so it appears instantly on the first tab switch.
    new Image().src = CHANGED_FAVICON;

    const originalTitle = document.title;
    let flashInterval: ReturnType<typeof setInterval> | null = null;

    const startFlashing = () => {
      if (flashInterval) return;
      let isFlashing = false;
      flashInterval = setInterval(() => {
        document.title = isFlashing ? FLASH_TITLE : originalTitle;
        isFlashing = !isFlashing;
      }, 1000);
    };

    const stopFlashing = () => {
      if (flashInterval) {
        clearInterval(flashInterval);
        flashInterval = null;
      }
      document.title = originalTitle;
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        setFavicon(CHANGED_FAVICON);
        startFlashing();
      } else {
        setFavicon(DEFAULT_FAVICON);
        stopFlashing();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      stopFlashing();
      setFavicon(DEFAULT_FAVICON);
    };
  }, []);

  return null;
}
