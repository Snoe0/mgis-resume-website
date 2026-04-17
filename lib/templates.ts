import { getSupabaseBrowser } from './supabase-browser'

export interface Template {
  id: string
  slug: string
  title: string
  creator: string
  creatorId: string
  price: number | 'free'
  rating: number
  reviewCount?: number
  category?: string
  previewUrl?: string
  preview?: string
  fileUrl?: string
  description?: string
  tags?: string[]
}

const PDFS = 'https://quvhavtxrwdlweaiwwyt.supabase.co/storage/v1/object/public/template-pdfs'
const SELLER_ID = '9939da3b-0da4-428e-b43c-763bebf2894c'
const STUDIO = 'ResumeForge Studio'

export const templates: Template[] = [
  {
    id: '118cca33-ce68-415c-992e-25cbb1994866',
    slug: 'biomedical-sciences-cover-letter',
    title: 'Biomedical Sciences Cover Letter',
    creator: STUDIO,
    creatorId: SELLER_ID,
    price: 5,
    rating: 4.7,
    reviewCount: 42,
    category: 'Healthcare',
    fileUrl: `${PDFS}/biomedical-sciences-cover-letter.pdf`,
    previewUrl: `${PDFS}/biomedical-sciences-cover-letter.pdf`,
    description: 'Polished cover letter template tailored for Biomedical Sciences BS graduates.',
    tags: ['Cover Letter', 'Entry-Level', 'Biomedical', 'BS'],
  },
  {
    id: 'f44f5edd-06df-4fdd-9478-d254a87f3217',
    slug: 'computer-engineering-cover-letter',
    title: 'Computer Engineering Cover Letter',
    creator: STUDIO,
    creatorId: SELLER_ID,
    price: 7,
    rating: 4.8,
    reviewCount: 63,
    category: 'Technology',
    fileUrl: `${PDFS}/computer-engineering-cover-letter.pdf`,
    previewUrl: `${PDFS}/computer-engineering-cover-letter.pdf`,
    description: 'Mid-level cover letter template for Computer Engineering MS candidates.',
    tags: ['Cover Letter', 'Engineering', 'MS', 'Mid-Level'],
  },
  {
    id: 'a0888fce-d35b-4477-9c41-af9d012df0a8',
    slug: 'developer-resume',
    title: 'Developer Resume',
    creator: STUDIO,
    creatorId: SELLER_ID,
    price: 12,
    rating: 4.9,
    reviewCount: 188,
    category: 'Technology',
    fileUrl: `${PDFS}/developer-resume.pdf`,
    previewUrl: `${PDFS}/developer-resume.pdf`,
    description: 'Modern resume template for software developers. Clean, ATS-friendly layout.',
    tags: ['Resume', 'Software', 'Developer', 'ATS-Friendly'],
  },
  {
    id: 'e5f3e479-9af7-4ee4-bdf9-2a958dc1fe2e',
    slug: 'finance-cover-letter',
    title: 'Finance Cover Letter',
    creator: STUDIO,
    creatorId: SELLER_ID,
    price: 5,
    rating: 4.6,
    reviewCount: 51,
    category: 'Business',
    fileUrl: `${PDFS}/finance-cover-letter.pdf`,
    previewUrl: `${PDFS}/finance-cover-letter.pdf`,
    description: 'Entry-level cover letter for Finance BS graduates.',
    tags: ['Cover Letter', 'Finance', 'Entry-Level', 'BS'],
  },
  {
    id: 'dd5955bc-3be9-4e38-bbd4-f6ef261f70dc',
    slug: 'graphic-designer-resume',
    title: 'Graphic Designer Resume',
    creator: STUDIO,
    creatorId: SELLER_ID,
    price: 14,
    rating: 4.8,
    reviewCount: 127,
    category: 'Design',
    fileUrl: `${PDFS}/graphic-designer-resume.pdf`,
    previewUrl: `${PDFS}/graphic-designer-resume.pdf`,
    description: 'Visually balanced resume template for graphic designers.',
    tags: ['Resume', 'Designer', 'Creative', 'Portfolio'],
  },
  {
    id: '8ac14b69-8926-4abd-9074-8c68dd8bb4ff',
    slug: 'healthcare-systems-admin-resume',
    title: 'Healthcare Systems Admin Resume',
    creator: STUDIO,
    creatorId: SELLER_ID,
    price: 13,
    rating: 4.7,
    reviewCount: 74,
    category: 'Healthcare',
    fileUrl: `${PDFS}/healthcare-systems-admin-resume.pdf`,
    previewUrl: `${PDFS}/healthcare-systems-admin-resume.pdf`,
    description: 'Mid-level resume for Healthcare Systems Administration MS graduates.',
    tags: ['Resume', 'Healthcare', 'Admin', 'MS'],
  },
  {
    id: 'aeab4afe-f341-45dd-826f-bd0f81bc3598',
    slug: 'journalism-resume',
    title: 'Journalism Resume',
    creator: STUDIO,
    creatorId: SELLER_ID,
    price: 11,
    rating: 4.7,
    reviewCount: 58,
    category: 'Media',
    fileUrl: `${PDFS}/journalism-resume.pdf`,
    previewUrl: `${PDFS}/journalism-resume.pdf`,
    description: 'Resume template for journalists, writers, and media professionals.',
    tags: ['Resume', 'Journalism', 'Media', 'Writing'],
  },
  {
    id: '3bba0884-8c6d-44d1-80d4-8a34c9c7221c',
    slug: 'marketing-resume',
    title: 'Marketing Resume',
    creator: STUDIO,
    creatorId: SELLER_ID,
    price: 11,
    rating: 4.8,
    reviewCount: 143,
    category: 'Business',
    fileUrl: `${PDFS}/marketing-resume.pdf`,
    previewUrl: `${PDFS}/marketing-resume.pdf`,
    description: 'Resume template for marketing professionals. Highlights campaign metrics.',
    tags: ['Resume', 'Marketing', 'Brand', 'Growth'],
  },
  {
    id: '088d67c1-74b0-41ac-b225-71a3d1de888b',
    slug: 'science-resume',
    title: 'Science Resume',
    creator: STUDIO,
    creatorId: SELLER_ID,
    price: 10,
    rating: 4.6,
    reviewCount: 89,
    category: 'Science',
    fileUrl: `${PDFS}/science-resume.pdf`,
    previewUrl: `${PDFS}/science-resume.pdf`,
    description: 'Research-oriented resume template for scientists.',
    tags: ['Resume', 'Research', 'Lab', 'Publications'],
  },
]

interface DbTemplate {
  id: string
  seller_id: string
  title: string
  description: string | null
  price: number
  category: string | null
  file_url: string | null
  rating: number
  review_count: number
  status: string
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function deriveTags(title: string, category: string | null): string[] {
  const tags: string[] = []
  if (/cover letter/i.test(title)) tags.push('Cover Letter')
  else tags.push('Resume')
  if (/\bMS\b/.test(title)) tags.push('MS')
  if (/\bBS\b/.test(title)) tags.push('BS')
  if (category) tags.push(category)
  return tags
}

function mapDbToTemplate(row: DbTemplate): Template {
  return {
    id: row.id,
    slug: slugify(row.title),
    title: row.title,
    creator: STUDIO,
    creatorId: row.seller_id,
    price: row.price === 0 ? 'free' : Math.round(row.price / 100),
    rating: Number(row.rating),
    reviewCount: row.review_count,
    category: row.category ?? undefined,
    fileUrl: row.file_url ?? undefined,
    previewUrl: row.file_url ?? undefined,
    description: row.description ?? undefined,
    tags: deriveTags(row.title, row.category),
  }
}

export async function fetchTemplates(): Promise<Template[]> {
  const supabase = getSupabaseBrowser()
  const { data, error } = await supabase
    .from('templates')
    .select('id, seller_id, title, description, price, category, file_url, rating, review_count, status')
    .eq('status', 'published')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Failed to fetch templates from Supabase:', error)
    return templates
  }
  return (data ?? []).map(mapDbToTemplate)
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find(t => t.id === id)
}

export function getTemplateBySlug(slug: string): Template | undefined {
  return templates.find(t => t.slug === slug)
}
