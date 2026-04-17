import type { Metadata } from 'next'
import { templates } from '@/lib/templates'

export const metadata: Metadata = {
  title: 'Browse Resume Templates',
  description:
    'Browse 500+ ATS-optimized resume templates. Filter by industry, experience level, and price. Free and premium options available.',
  alternates: { canonical: '/browse' },
  openGraph: {
    title: 'Browse Resume Templates — ResumeForge',
    description:
      'Browse 500+ ATS-optimized resume templates. Filter by industry, experience level, and price.',
    url: '/browse',
  },
}

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://mgis-resume-website-sigma.vercel.app'

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${baseUrl}/`,
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Browse',
      item: `${baseUrl}/browse`,
    },
  ],
}

const collectionPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Browse Resume Templates',
  description:
    'Browse 500+ ATS-optimized resume templates. Filter by industry, experience level, and price. Free and premium options available.',
  url: `${baseUrl}/browse`,
}

const itemListJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Resume Templates',
  itemListElement: templates.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    url: `${baseUrl}/template/${t.slug}`,
    name: t.title,
  })),
}

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      {children}
    </>
  )
}
