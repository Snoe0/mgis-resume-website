import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { FileQuestion, Home, LayoutGrid } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        aria-labelledby="not-found-heading"
        className="min-h-[calc(100vh-140px)] flex items-center justify-center bg-bg-base px-6 py-20"
      >
        <div className="flex flex-col items-center text-center gap-6 max-w-lg">
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-2">
            <FileQuestion className="w-10 h-10 text-accent" />
          </div>

          {/* 404 number */}
          <span className="font-serif text-[9rem] leading-none text-accent tracking-tight">
            404
          </span>

          {/* Heading */}
          <h1
            id="not-found-heading"
            className="text-3xl font-semibold text-text-primary"
          >
            Page not found
          </h1>

          {/* Body */}
          <p className="text-base text-text-secondary leading-relaxed max-w-sm">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>

          {/* CTAs */}
          <div className="flex gap-3 flex-wrap justify-center mt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-semibold text-sm hover:bg-[#e05200] transition-colors"
            >
              <Home className="w-4 h-4" />
              Go Home
            </Link>
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-white rounded-lg font-semibold text-sm border border-border-default hover:border-text-muted transition-colors"
            >
              <LayoutGrid className="w-4 h-4" />
              Browse Templates
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
