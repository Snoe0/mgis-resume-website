'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Browse', href: '/browse' },
  { label: 'Creators', href: '/creators' },
  { label: 'Editor', href: '/editor' },
  { label: 'Optimizer', href: '/optimizer' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backgroundColor: '#111113',
        borderBottom: '1px solid #1F1F23',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 80px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: '20px',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontWeight: '400',
          }}
        >
          ResumeForge
        </Link>

        {/* Desktop nav */}
        <nav
          style={{
            display: 'flex',
            gap: '32px',
            alignItems: 'center',
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: '#8B8B90',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'color 0.15s',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8B8B90')}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Link
            href="/sell"
            style={{
              padding: '8px 16px',
              backgroundColor: '#FF5C00',
              color: '#FFFFFF',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e05200')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5C00')}
            className="hidden sm:inline-flex"
          >
            Sell Templates
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ color: '#8B8B90', background: 'none', border: 'none', cursor: 'pointer' }}
            className="md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          style={{
            backgroundColor: '#111113',
            borderTop: '1px solid #1F1F23',
            padding: '16px 24px',
          }}
          className="md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'block',
                color: '#8B8B90',
                fontSize: '15px',
                textDecoration: 'none',
                padding: '10px 0',
                borderBottom: '1px solid #1F1F23',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/sell"
            style={{
              display: 'block',
              marginTop: '12px',
              padding: '10px 16px',
              backgroundColor: '#FF5C00',
              color: '#FFFFFF',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              textAlign: 'center',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
            onClick={() => setMobileOpen(false)}
          >
            Sell Templates
          </Link>
        </div>
      )}
    </header>
  )
}
