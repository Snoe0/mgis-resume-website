import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Purchase Complete',
  description: 'Your template purchase is complete.',
  robots: { index: false, follow: false },
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return children
}
