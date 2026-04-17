import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Editor',
  description:
    'Edit your resume in the browser. Drag-and-drop sections, customize fonts and colors, and export to PDF or DOCX.',
  alternates: { canonical: '/editor' },
  robots: { index: false, follow: false },
}

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return children
}
