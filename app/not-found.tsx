'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: 'calc(100vh - 140px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0B',
          padding: '80px',
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
            maxWidth: '480px',
          }}
        >
          {/* 404 number */}
          <span
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: '9rem',
              lineHeight: 1,
              color: '#FF5C00',
            }}
          >
            404
          </span>

          {/* Heading */}
          <h1
            style={{
              fontSize: '1.75rem',
              fontWeight: 600,
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            Page not found
          </h1>

          {/* Body */}
          <p
            style={{
              fontSize: '1rem',
              color: '#8B8B90',
              lineHeight: 1.6,
              margin: '0 0 8px',
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: '#FF5C00',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#e05200')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#FF5C00')}
            >
              Go Home
            </Link>
            <Link
              href="/browse"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.9rem',
                textDecoration: 'none',
                border: '1px solid #1F1F23',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#FF5C00')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#1F1F23')}
            >
              Browse Templates
            </Link>
          </div>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
