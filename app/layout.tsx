import type { Metadata } from 'next';
import './globals.css';
import { FaviconNotifier } from '@/components/FaviconNotifier';
import { ModalSmall } from '@/components/ModalSmall';

// Canonical production domain. Never fall back to VERCEL_URL — that bakes a
// per-deployment host into og/canonical tags, which breaks link previews as
// soon as that deployment is pruned.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://try.virtualcoworker.com';

const title = 'Virtual Coworker | Top Filipino Talent';
const description =
  'Hire a virtual assistant who\'s so good, you forget they\'re offshore. Hand-picked Philippines talent, managed HR, lifetime replacement guarantee.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: {
    icon: { url: '/images/header/Tab=Default.png', type: 'image/png' },
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: 'Virtual Coworker',
    type: 'website',
    locale: 'en_AU',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KSMWT6QM');`,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Above-the-fold font weights: without these the browser only finds
            them after parsing the CSS, so the hero H1 (the LCP element)
            repaints late. */}
        <link rel="preload" as="font" type="font/woff2" href="/fonts/inter-400.woff2" crossOrigin="anonymous" />
        <link rel="preload" as="font" type="font/woff2" href="/fonts/inter-600.woff2" crossOrigin="anonymous" />

        {/* Splide + Masonry are self-hosted and loaded on demand by the
            components that need them (see lib/loadVendor.ts) — they used to
            be render-path CDN scripts costing ~1.4s of phone CPU up front. */}
        <link rel="stylesheet" href="/vendor/splide.min.css" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KSMWT6QM"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <FaviconNotifier />
        {children}
        <ModalSmall />
      </body>
    </html>
  );
}
