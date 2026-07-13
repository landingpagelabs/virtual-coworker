import type { Metadata } from 'next';
import './globals.css';
import { FaviconNotifier } from '@/components/FaviconNotifier';
import { ModalSmall } from '@/components/ModalSmall';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

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
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.jpg'],
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
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"
          defer
        />
        <script
          src="https://cdn.jsdelivr.net/npm/@splidejs/splide-extension-auto-scroll@0.5.3/dist/js/splide-extension-auto-scroll.min.js"
          defer
        />
        <script
          src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"
          defer
        />
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
