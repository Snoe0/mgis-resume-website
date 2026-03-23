'use client'

import Link from 'next/link'

const productLinks = [
  { label: 'Browse Templates', href: '/browse' },
  { label: 'Editor', href: '/editor' },
  { label: 'AI Optimizer', href: '/optimizer' },
  { label: 'Pricing', href: '/pricing' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#111113',
        borderTop: '1px solid #1F1F23',
        padding: '48px 80px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '48px',
          flexWrap: 'wrap',
        }}
      >
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: '20px',
              color: '#FFFFFF',
            }}
          >
            ResumeForge
          </span>
          <span
            style={{
              color: '#8B8B90',
              fontSize: '13px',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              maxWidth: '240px',
            }}
          >
            Professional templates for every career.
          </span>
        </div>

        {/* Link columns */}
        <div style={{ display: 'flex', gap: '64px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span
              style={{
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              Product
            </span>
            {productLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: '#8B8B90',
                  fontSize: '13px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8B8B90')}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span
              style={{
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              Company
            </span>
            {companyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: '#8B8B90',
                  fontSize: '13px',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8B8B90')}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1280px',
          margin: '32px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid #1F1F23',
          color: '#6B6B70',
          fontSize: '12px',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
        }}
      >
        © 2026 ResumeForge. All rights reserved.
      </div>
    </footer>
  )
}
