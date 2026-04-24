'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { useAuth } from '@/components/AuthProvider'

const navLinks = [
  { label: 'Browse', href: '/browse' },
  { label: 'Editor', href: '/editor' },
  { label: 'Optimizer', href: '/optimizer' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-bg-elevated border-b border-border-default">
      <div className="w-full px-20 max-md:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          aria-label="ResumeForge home"
          className="flex items-center gap-[10px] font-serif text-[20px] text-text-primary font-normal no-underline"
        >
          <Image
            src="/logo.png"
            alt="ResumeForge logo"
            width={40}
            height={40}
            priority
            className="w-10 h-10 object-contain"
          />
          ResumeForge
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-[32px] items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-text-secondary text-sm no-underline transition-colors duration-150 hover:text-text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex gap-3 items-center">
          {user && (
            <>
              <span className="hidden sm:inline text-text-secondary text-[13px]">
                {user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="hidden sm:inline text-text-secondary text-[13px] bg-transparent border-0 cursor-pointer transition-colors duration-150 hover:text-text-primary"
              >
                Sign Out
              </button>
            </>
          )}
          <Link
            href="/sell"
            className="hidden sm:inline-flex px-4 py-2 bg-accent text-text-primary rounded-md text-sm font-semibold no-underline transition-colors duration-150 hover:bg-accent-hover"
          >
            Sell Templates
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className="md:hidden text-text-secondary bg-transparent border-0 cursor-pointer"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-elevated border-t border-border-default px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block text-text-secondary text-[15px] no-underline py-[10px] border-b border-border-default"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/sell"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 px-4 py-[10px] bg-accent text-text-primary rounded-md text-sm font-semibold no-underline text-center"
          >
            Sell Templates
          </Link>
        </div>
      )}
    </header>
  )
}
