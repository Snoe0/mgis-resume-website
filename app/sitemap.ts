import type { MetadataRoute } from 'next'
import { templates } from '@/lib/templates'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mgis-resume-website-sigma.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/browse`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/optimizer`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const templateRoutes: MetadataRoute.Sitemap = templates.map((t) => ({
    url: `${baseUrl}/template/${t.slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...templateRoutes]
}
