import type { Metadata, Viewport } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import CookieBanner from '@/components/CookieBanner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mgis-resume-website-sigma.vercel.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'ResumeForge — Professional Resume Templates',
    template: '%s — ResumeForge',
  },
  description:
    'Browse hundreds of ATS-optimized resume templates. Customize in our editor, review with AI, and land your dream job.',
  applicationName: 'ResumeForge',
  keywords: [
    'resume templates',
    'ATS-friendly resume',
    'professional resume',
    'resume builder',
    'AI resume optimizer',
    'CV templates',
    'DOCX resume',
    'PDF resume',
  ],
  authors: [{ name: 'ResumeForge' }],
  creator: 'ResumeForge',
  publisher: 'ResumeForge',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'ResumeForge',
    title: 'ResumeForge — Professional Resume Templates',
    description:
      'Browse hundreds of ATS-optimized resume templates. Customize in our editor, review with AI, and land your dream job.',
    images: [
      {
        url: '/og-default.svg',
        width: 1200,
        height: 630,
        alt: 'ResumeForge — Professional Resume Templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ResumeForge — Professional Resume Templates',
    description:
      'Browse hundreds of ATS-optimized resume templates. Customize in our editor, review with AI, and land your dream job.',
    images: ['/og-default.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'productivity',
}

export const viewport: Viewport = {
  themeColor: '#0A0A0B',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'ResumeForge',
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  description:
    'A resume template marketplace with a browser-based editor and AI-powered resume optimizer.',
  sameAs: ['https://github.com/Snoe0/mgis-resume-website'],
}

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'ResumeForge',
  url: siteUrl,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/browse?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />

        {/* Google Consent Mode v2 defaults — must run before GA/GTM */}
        <Script
          id="gtag-consent-default"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            var stored = null;
            try { stored = localStorage.getItem('rf_cookie_consent'); } catch (e) {}
            var granted = stored === 'accepted';
            gtag('consent', 'default', {
              ad_storage: granted ? 'granted' : 'denied',
              ad_user_data: granted ? 'granted' : 'denied',
              ad_personalization: granted ? 'granted' : 'denied',
              analytics_storage: granted ? 'granted' : 'denied',
              security_storage: 'granted',
              wait_for_update: 500
            });
          `}}
        />

        {/* Google tag (gtag.js) — G-E41LRQ6G83 */}
        <Script
          id="gtag-script"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-E41LRQ6G83"
        />
        <Script
          id="gtag-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E41LRQ6G83');
          `}}
        />
      </head>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        {/* Google Tag Manager — GTM-THB6WFRX */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-THB6WFRX');`}
        </Script>
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-THB6WFRX" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
