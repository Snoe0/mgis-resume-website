import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTemplateBySlug } from '@/lib/templates'

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mgis-resume-website-sigma.vercel.app'

export interface TemplateReview {
  author: string
  rating: number
  text: string
  date: string
  datePublished: string
}

export const templateReviews: TemplateReview[] = [
  {
    author: 'Alex M.',
    rating: 5,
    text: 'Landed a senior engineer role at a FAANG company two weeks after using this template. Clean and professional.',
    date: 'Jan 2026',
    datePublished: '2026-01-15',
  },
  {
    author: 'Priya K.',
    rating: 5,
    text: "Best resume template I've ever used. Got callbacks from 4 out of 5 companies I applied to.",
    date: 'Dec 2025',
    datePublished: '2025-12-15',
  },
  {
    author: 'David L.',
    rating: 4,
    text: 'Great template. Would love more color options, but the layout and typography are excellent.',
    date: 'Dec 2025',
    datePublished: '2025-12-15',
  },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const template = getTemplateBySlug(slug)

  if (!template) {
    return {
      title: 'Template not found',
      robots: { index: false, follow: false },
    }
  }

  const priceLabel = template.price === 'free' ? 'Free' : `$${template.price}`
  const title = `${template.title} Resume Template by ${template.creator} — ${priceLabel}`
  const description = `${template.title} is an ATS-optimized resume template by ${template.creator}. ${template.rating.toFixed(1)} stars from ${template.reviewCount ?? 0}+ reviews. Customize in our editor and export to PDF or DOCX.`

  return {
    title,
    description,
    alternates: { canonical: `/template/${template.slug}` },
    openGraph: {
      title: `${template.title} — ResumeForge`,
      description,
      url: `/template/${template.slug}`,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${template.title} — ResumeForge`,
      description,
    },
  }
}

export default async function TemplateLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const template = getTemplateBySlug(slug)

  if (!template) notFound()

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${template.title} Resume Template`,
    description: `ATS-optimized resume template by ${template.creator}. Includes PDF and DOCX export.`,
    image: `${siteUrl}/og-default.svg`,
    brand: { '@type': 'Brand', name: 'ResumeForge' },
    category: template.category,
    sku: `template-${template.id}`,
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/template/${template.slug}`,
      priceCurrency: 'USD',
      price: template.price === 'free' ? '0' : String(template.price),
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'ResumeForge' },
    },
    aggregateRating: template.reviewCount
      ? {
          '@type': 'AggregateRating',
          ratingValue: template.rating.toFixed(1),
          reviewCount: template.reviewCount,
          bestRating: '5',
          worstRating: '1',
        }
      : undefined,
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Browse', item: `${siteUrl}/browse` },
      { '@type': 'ListItem', position: 3, name: template.title, item: `${siteUrl}/template/${template.slug}` },
    ],
  }

  const reviewJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${template.title} Resume Template`,
    review: templateReviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      datePublished: r.datePublished,
      reviewBody: r.text,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      {children}
    </>
  )
}
