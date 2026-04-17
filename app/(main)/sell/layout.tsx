import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Become a Creator — Sell Resume Templates',
  description:
    'Join the ResumeForge creator community. Design resume templates and earn money by selling them to thousands of professionals worldwide.',
  alternates: { canonical: '/sell' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Become a Creator — ResumeForge',
    description:
      'Design resume templates and earn money by selling them to thousands of professionals.',
    url: '/sell',
  },
}

export default function SellLayout({ children }: { children: React.ReactNode }) {
  return children
}
