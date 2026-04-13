import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  title: 'ResumeForge — Professional Resume Templates',
  description: 'Browse hundreds of ATS-optimized resume templates. Customize in our editor, review with AI, and land your dream job.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <head>
        {/* Google Tag Manager — GTM-THB6WFRX */}
        <Script
          id="gtm-script-2"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-THB6WFRX');` }}
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
        {/* Google Tag Manager (noscript) — GTM-THB6WFRX */}
        <noscript dangerouslySetInnerHTML={{ __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-THB6WFRX" height="0" width="0" style="display:none;visibility:hidden"></iframe>` }} />
        {children}
      </body>
    </html>
  )
}
