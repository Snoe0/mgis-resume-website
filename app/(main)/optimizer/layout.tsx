import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Resume Optimizer',
  description:
    'Upload your resume and a job description. Our AI identifies keyword gaps, strengthens impact statements, and drafts a tailored cover letter in seconds.',
  alternates: { canonical: '/optimizer' },
  openGraph: {
    title: 'AI Resume Optimizer — ResumeForge',
    description:
      'AI-powered resume optimization: keyword gap analysis, impact rewriting, and cover letter generation.',
    url: '/optimizer',
  },
}

export default function OptimizerLayout({ children }: { children: React.ReactNode }) {
  return children
}
