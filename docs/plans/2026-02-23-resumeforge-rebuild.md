# ResumeForge Rebuild — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Wipe the existing light-blue ResumeForge codebase and rebuild Landing + Browse pages faithfully from the design.pen dark theme.

**Architecture:** Next.js 16 App Router + TypeScript + Tailwind CSS v4. Design tokens in `globals.css` `@theme` block. Framer Motion for landing page scroll animations only. All data is static mock data.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, Framer Motion, lucide-react, next/font/google (Inter + Instrument_Serif).

**Design reference:** `docs/plans/2026-02-23-resumeforge-rebuild-design.md`

---

## Task 1: Delete old files and install Framer Motion

**Files to delete:**
- `app/page.tsx`
- `app/browse/page.tsx`
- `app/template/[id]/page.tsx`
- `app/editor/page.tsx`
- `app/reviewer/page.tsx`
- `app/creator/[id]/page.tsx`
- `components/Header.tsx`
- `components/Footer.tsx`
- `components/TemplateCard.tsx`
- `components/FAQSection.tsx`
- `nul` (stray file at project root)

**Step 1: Delete all old files**

```bash
rm app/page.tsx app/browse/page.tsx app/editor/page.tsx app/reviewer/page.tsx
rm -rf app/template app/creator
rm components/Header.tsx components/Footer.tsx components/TemplateCard.tsx components/FAQSection.tsx
rm -f nul
```

**Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

Expected: `added N packages` with no errors.

**Step 3: Verify**

```bash
ls app/ components/
```

Expected: `app/` has only `globals.css`, `layout.tsx`, `browse/` (empty dir or absent). `components/` is empty.

---

## Task 2: Update globals.css with dark design tokens

**File:** `app/globals.css` (full replacement)

**Step 1: Replace the entire file with:**

```css
@import "tailwindcss";

@theme {
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --font-family-serif: 'Instrument Serif', Georgia, serif;

  --color-bg-base: #0A0A0B;
  --color-bg-elevated: #111113;
  --color-bg-card: #141417;
  --color-border-default: #1F1F23;
  --color-accent: #FF5C00;
  --color-accent-purple: #8B5CF6;
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #8B8B90;
  --color-text-muted: #6B6B70;
  --color-success: #10B981;
  --color-warning: #FFC107;
}

@layer base {
  * {
    @apply antialiased;
  }

  html {
    @apply scroll-smooth;
    background-color: #0A0A0B;
    color: #FFFFFF;
  }

  body {
    background-color: #0A0A0B;
    color: #FFFFFF;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .font-serif {
    font-family: 'Instrument Serif', Georgia, serif;
  }
}
```

**Step 2: Update tailwind.config.ts to remove old blue tokens**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config
```

---

## Task 3: Update app/layout.tsx

**File:** `app/layout.tsx` (full replacement)

Load both fonts via `next/font/google`, update metadata to ResumeForge, remove Header/Footer imports (they'll be re-added once rebuilt).

```tsx
import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  title: 'ResumeForge — Professional Resume Templates',
  description: 'Browse hundreds of ATS-optimized resume templates. Customize in our editor, review with AI, and land your dream job.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
```

Note: Header and Footer will be added back in Task 4 after the components are created. For now this lets the app compile without missing imports.

---

## Task 4: Build Header component

**File:** Create `components/Header.tsx`

```tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Browse', href: '/browse' },
  { label: 'Creators', href: '/creators' },
  { label: 'Editor', href: '/editor' },
  { label: 'Reviewer', href: '/reviewer' },
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
```

---

## Task 5: Build Footer component

**File:** Create `components/Footer.tsx`

```tsx
import Link from 'next/link'

const productLinks = [
  { label: 'Browse Templates', href: '/browse' },
  { label: 'Editor', href: '/editor' },
  { label: 'AI Reviewer', href: '/reviewer' },
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
```

---

## Task 6: Wire Header + Footer into layout

**File:** `app/layout.tsx` — add Header and Footer back

```tsx
import type { Metadata } from 'next'
import { Inter, Instrument_Serif } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument-serif',
})

export const metadata: Metadata = {
  title: 'ResumeForge — Professional Resume Templates',
  description: 'Browse hundreds of ATS-optimized resume templates. Customize in our editor, review with AI, and land your dream job.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

**Step: Verify dev server starts**

```bash
npm run dev
```

Expected: Compiled successfully, no TypeScript errors. Open `http://localhost:3000` — should show a dark page with the header and footer (no page content yet since `app/page.tsx` was deleted).

Create a temporary placeholder so Next.js doesn't 404:

```tsx
// app/page.tsx (temporary)
export default function Page() {
  return <div style={{ padding: '80px', color: 'white' }}>Coming soon</div>
}
```

---

## Task 7: Build TemplateCard component

**File:** Create `components/TemplateCard.tsx`

```tsx
import Link from 'next/link'

interface TemplateCardProps {
  id: string
  title: string
  creator: string
  price: number | 'free'
  rating: number
  previewBg?: string
}

export default function TemplateCard({
  id,
  title,
  creator,
  price,
  rating,
  previewBg = '#1A1A1D',
}: TemplateCardProps) {
  const stars = Math.round(rating)

  return (
    <Link
      href={`/template/${id}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          backgroundColor: '#141417',
          border: '1px solid #1F1F23',
          borderRadius: '12px',
          overflow: 'hidden',
          transition: 'border-color 0.2s, transform 0.2s',
          cursor: 'pointer',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget
          el.style.borderColor = '#FF5C00'
          el.style.transform = 'translateY(-2px)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget
          el.style.borderColor = '#1F1F23'
          el.style.transform = 'translateY(0)'
        }}
      >
        {/* Preview image area */}
        <div
          style={{
            height: '200px',
            backgroundColor: previewBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Placeholder resume lines */}
          <div style={{ opacity: 0.15, display: 'flex', flexDirection: 'column', gap: '8px', padding: '24px', width: '100%' }}>
            <div style={{ height: '10px', backgroundColor: '#FFFFFF', borderRadius: '4px', width: '60%' }} />
            <div style={{ height: '7px', backgroundColor: '#FFFFFF', borderRadius: '4px', width: '40%' }} />
            <div style={{ height: '1px', backgroundColor: '#FF5C00', margin: '8px 0' }} />
            <div style={{ height: '6px', backgroundColor: '#FFFFFF', borderRadius: '4px', width: '80%' }} />
            <div style={{ height: '6px', backgroundColor: '#FFFFFF', borderRadius: '4px', width: '70%' }} />
            <div style={{ height: '6px', backgroundColor: '#FFFFFF', borderRadius: '4px', width: '75%' }} />
          </div>
        </div>

        {/* Meta */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span
            style={{
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: '600',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            {title}
          </span>
          <span
            style={{
              color: '#8B8B90',
              fontSize: '13px',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            by {creator}
          </span>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '4px',
            }}
          >
            <span style={{ color: '#FF5C00', fontSize: '13px' }}>
              {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}&nbsp;&nbsp;{rating.toFixed(1)}
            </span>
            <span
              style={{
                color: price === 'free' ? '#10B981' : '#FFFFFF',
                fontSize: '15px',
                fontWeight: '700',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              {price === 'free' ? 'Free' : `$${price}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
```

---

## Task 8: Build Landing page — Hero + Featured Templates sections

**File:** Create `app/page.tsx`

This task adds the first two sections. Subsequent tasks add the remaining sections.

```tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import TemplateCard from '@/components/TemplateCard'

const featuredTemplates = [
  { id: '1', title: 'Executive Pro', creator: 'Sarah Chen', price: 24 as const, rating: 4.9 },
  { id: '2', title: 'Minimal Dark', creator: 'James Park', price: 18 as const, rating: 4.7 },
  { id: '3', title: 'Creative Portfolio', creator: 'Mia Torres', price: 29 as const, rating: 5.0 },
  { id: '4', title: 'Clean Modern', creator: 'Aria Lee', price: 22 as const, rating: 4.8 },
  { id: '5', title: 'Academic Scholar', creator: 'Tom Walsh', price: 'free' as const, rating: 4.6 },
  { id: '6', title: 'Tech Startup', creator: 'Nina Patel', price: 26 as const, rating: 4.9 },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function HomePage() {
  return (
    <div style={{ backgroundColor: '#0A0A0B', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section
        style={{
          padding: '120px 80px 100px',
          textAlign: 'center',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                backgroundColor: '#FF5C0015',
                border: '1px solid #FF5C0040',
                borderRadius: '100px',
                color: '#FF5C00',
                fontSize: '13px',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontWeight: '500',
              }}
            >
              ✦ Over 10,000 professionals hired
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: 'clamp(40px, 6vw, 64px)',
              color: '#FFFFFF',
              fontWeight: '400',
              lineHeight: '1.1',
              maxWidth: '800px',
              margin: '0',
            }}
          >
            Stand Out With a Resume That Gets You Hired
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              color: '#8B8B90',
              fontSize: '18px',
              lineHeight: '1.6',
              maxWidth: '560px',
              margin: '0',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            Choose from hundreds of professionally designed templates.
            Customize in our editor, review with AI, and land your dream job.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link
              href="/browse"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#FF5C00',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                textDecoration: 'none',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e05200')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5C00')}
            >
              Browse Templates <ArrowRight size={16} />
            </Link>
            <Link
              href="/browse?filter=free"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid #1F1F23',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                textDecoration: 'none',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8B8B90')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1F1F23')}
            >
              Start Free
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              gap: '32px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '8px',
            }}
          >
            {['ATS-Friendly', 'Easy Customization', 'Instant Download'].map((badge) => (
              <span
                key={badge}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#8B8B90',
                  fontSize: '13px',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', flexShrink: 0 }} />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Featured Templates ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        style={{
          padding: '80px 80px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: '36px',
              color: '#FFFFFF',
              fontWeight: '400',
              margin: '0 0 12px',
            }}
          >
            Featured Templates
          </h2>
          <p style={{ color: '#8B8B90', fontSize: '16px', margin: '0', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Handpicked by our design team. Used by thousands to land great jobs.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {featuredTemplates.map((template) => (
            <motion.div key={template.id} variants={fadeUp}>
              <TemplateCard {...template} />
            </motion.div>
          ))}
        </motion.div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link
            href="/browse"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              border: '1px solid #1F1F23',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '14px',
              textDecoration: 'none',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8B8B90')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1F1F23')}
          >
            View All Templates <ArrowRight size={14} />
          </Link>
        </div>
      </motion.section>

    </div>
  )
}
```

**Step: Verify**

```bash
npm run dev
```

Open `http://localhost:3000`. Should see dark hero with serif heading, orange CTA, and 6 template cards.

---

## Task 9: Add How It Works + Creator CTA + FAQ sections to Landing page

**File:** `app/page.tsx` — append the remaining sections inside the outer `<div>` before the closing tag.

Add these imports at the top of the file:
```tsx
import { FileText, Zap, TrendingUp } from 'lucide-react'
```

Then add the following sections after the Featured Templates `</motion.section>`:

```tsx
      {/* ── How It Works ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        style={{
          padding: '80px',
          backgroundColor: '#111113',
          borderTop: '1px solid #1F1F23',
          borderBottom: '1px solid #1F1F23',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                fontSize: '36px',
                color: '#FFFFFF',
                fontWeight: '400',
                margin: '0 0 12px',
              }}
            >
              How It Works
            </h2>
            <p style={{ color: '#8B8B90', fontSize: '16px', margin: '0', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              Three simple steps to your perfect resume
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
          >
            {[
              {
                step: '01',
                icon: <FileText size={28} color="#FF5C00" />,
                title: 'Choose Your Template',
                desc: 'Browse our curated collection and pick a design that matches your style and industry.',
              },
              {
                step: '02',
                icon: <Zap size={28} color="#FF5C00" />,
                title: 'Customize & Edit',
                desc: 'Use our intuitive editor to personalize your resume with your information and experience.',
              },
              {
                step: '03',
                icon: <TrendingUp size={28} color="#FF5C00" />,
                title: 'Download & Apply',
                desc: 'Export your polished resume and start applying to your dream jobs with confidence.',
              },
            ].map(({ step, icon, title, desc }) => (
              <motion.div
                key={step}
                variants={fadeUp}
                style={{
                  backgroundColor: '#141417',
                  border: '1px solid #1F1F23',
                  borderRadius: '12px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  {icon}
                  <span
                    style={{
                      color: '#FF5C00',
                      fontSize: '12px',
                      fontWeight: '700',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      letterSpacing: '1px',
                    }}
                  >
                    {step}
                  </span>
                </div>
                <h3
                  style={{
                    color: '#FFFFFF',
                    fontSize: '17px',
                    fontWeight: '600',
                    margin: '0',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: '#8B8B90',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    margin: '0',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Creator CTA ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        style={{
          padding: '80px',
          background: 'linear-gradient(135deg, #111113 0%, #1a1012 100%)',
          borderBottom: '1px solid #1F1F23',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: '40px',
              color: '#FFFFFF',
              fontWeight: '400',
              margin: '0 0 16px',
            }}
          >
            Are You a Designer?
          </h2>
          <p
            style={{
              color: '#8B8B90',
              fontSize: '17px',
              lineHeight: '1.6',
              maxWidth: '520px',
              margin: '0 auto 32px',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            Join our creator community and earn money by selling your resume
            templates to thousands of professionals.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '64px' }}>
            <Link
              href="/sell"
              style={{
                padding: '12px 28px',
                backgroundColor: '#FF5C00',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                textDecoration: 'none',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e05200')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5C00')}
            >
              Become a Creator
            </Link>
            <Link
              href="/about"
              style={{
                padding: '12px 28px',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid #1F1F23',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                textDecoration: 'none',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8B8B90')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1F1F23')}
            >
              Learn More
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', maxWidth: '600px', margin: '0 auto' }}
          >
            {[
              { num: '10K+', label: 'Active Users' },
              { num: '500+', label: 'Templates' },
              { num: '$2M+', label: 'Paid to Creators' },
            ].map(({ num, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                style={{ textAlign: 'center', padding: '0 24px', borderRight: '1px solid #1F1F23' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                    fontSize: '40px',
                    color: '#FFFFFF',
                    lineHeight: '1',
                    marginBottom: '8px',
                  }}
                >
                  {num}
                </div>
                <div style={{ color: '#8B8B90', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── FAQ ── */}
      <FAQ />
```

Then add the FAQ component at the bottom of the file (outside the default export):

```tsx
'use client'
// Add this after the HomePage export at the bottom of app/page.tsx:

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Are the templates ATS-compatible?',
      a: 'Yes. Every template is tested against major ATS platforms including Workday, Greenhouse, and Lever. Clean formatting and standard section headings ensure your resume is parsed correctly.',
    },
    {
      q: 'Can I edit the template after purchase?',
      a: 'Absolutely. All templates are fully editable in our browser-based editor. You can change fonts, colors, section order, and content without any design software.',
    },
    {
      q: 'What file formats do I get?',
      a: 'You receive PDF (for applications) and DOCX (for further editing in Word or Google Docs). Both are included in every purchase.',
    },
    {
      q: 'Is there a free option?',
      a: 'Yes. Several templates are permanently free. Filter by "Free" on the Browse page to see all available free templates.',
    },
    {
      q: 'How does the AI Reviewer work?',
      a: 'Upload your resume and our AI analyzes it for ATS compatibility, clarity, impact, and missing sections. You receive an overall score and specific suggestions with before/after examples.',
    },
  ]

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      variants={fadeUp}
      style={{ padding: '80px', maxWidth: '1280px', margin: '0 auto' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: '36px',
            color: '#FFFFFF',
            fontWeight: '400',
            margin: '0 0 12px',
          }}
        >
          Frequently Asked Questions
        </h2>
      </div>

      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{ borderBottom: '1px solid #1F1F23' }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '20px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                gap: '16px',
              }}
            >
              <span
                style={{
                  color: '#FFFFFF',
                  fontSize: '15px',
                  fontWeight: '500',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                {faq.q}
              </span>
              <span
                style={{
                  color: '#FF5C00',
                  fontSize: '20px',
                  flexShrink: 0,
                  transition: 'transform 0.2s',
                  transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)',
                }}
              >
                +
              </span>
            </button>
            {openIndex === i && (
              <p
                style={{
                  color: '#8B8B90',
                  fontSize: '14px',
                  lineHeight: '1.7',
                  paddingBottom: '20px',
                  margin: '0',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>
    </motion.section>
  )
}
```

Also add `useState` to the imports at the top: `import { useState } from 'react'`

**Step: Verify**

```bash
npm run dev
```

Scroll through all landing page sections. Each should animate in as it enters the viewport.

---

## Task 10: Build Browse page

**File:** Create `app/browse/page.tsx`

```tsx
'use client'

import { useState } from 'react'
import TemplateCard from '@/components/TemplateCard'

const templates = [
  { id: '1', title: 'Executive Pro', creator: 'Sarah Chen', price: 24 as const, rating: 4.9 },
  { id: '2', title: 'Minimal Dark', creator: 'James Park', price: 18 as const, rating: 4.7 },
  { id: '3', title: 'Creative Portfolio', creator: 'Mia Torres', price: 29 as const, rating: 5.0 },
  { id: '4', title: 'Clean Modern', creator: 'Aria Lee', price: 22 as const, rating: 4.8 },
  { id: '5', title: 'Academic Scholar', creator: 'Tom Walsh', price: 'free' as const, rating: 4.6 },
  { id: '6', title: 'Tech Startup', creator: 'Nina Patel', price: 26 as const, rating: 4.9 },
]

const industryFilters = ['Technology', 'Design', 'Business', 'Healthcare']
const experienceFilters = ['Entry Level', 'Mid-Level', 'Senior']

export default function BrowsePage() {
  const [activeIndustry, setActiveIndustry] = useState<string[]>(['Technology', 'Design'])
  const [activeExp, setActiveExp] = useState<string[]>(['Mid-Level'])
  const [currentPage, setCurrentPage] = useState(1)

  const toggleFilter = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const activeFilters = [...activeIndustry, ...activeExp]

  return (
    <div style={{ backgroundColor: '#0A0A0B', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flex: 1 }}>

        {/* ── Sidebar ── */}
        <aside
          style={{
            width: '280px',
            flexShrink: 0,
            backgroundColor: '#111113',
            borderRight: '1px solid #1F1F23',
            padding: '32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            alignSelf: 'stretch',
          }}
        >
          <span
            style={{
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            Filter Templates
          </span>

          {/* Industry */}
          <FilterGroup
            label="INDUSTRY"
            options={industryFilters}
            active={activeIndustry}
            onToggle={(v) => toggleFilter(activeIndustry, setActiveIndustry, v)}
          />

          {/* Experience */}
          <FilterGroup
            label="EXPERIENCE LEVEL"
            options={experienceFilters}
            active={activeExp}
            onToggle={(v) => toggleFilter(activeExp, setActiveExp, v)}
          />
        </aside>

        {/* ── Main ── */}
        <main
          style={{
            flex: 1,
            padding: '32px 40px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Top bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                  fontSize: '36px',
                  color: '#FFFFFF',
                  fontWeight: '400',
                  margin: '0',
                }}
              >
                Browse Templates
              </h1>
              <span style={{ color: '#8B8B90', fontSize: '14px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Showing {templates.length * 4} templates
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 12px',
                backgroundColor: '#141417',
                border: '1px solid #1F1F23',
                borderRadius: '6px',
              }}
            >
              <span style={{ color: '#8B8B90', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Sort: Most Popular
              </span>
              <span style={{ color: '#8B8B90', fontSize: '10px' }}>▾</span>
            </div>
          </div>

          {/* Active filter pills */}
          {activeFilters.length > 0 && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ color: '#6B6B70', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Active:
              </span>
              {activeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    if (activeIndustry.includes(filter)) toggleFilter(activeIndustry, setActiveIndustry, filter)
                    else toggleFilter(activeExp, setActiveExp, filter)
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 10px',
                    backgroundColor: '#FF5C0015',
                    border: '1px solid #FF5C0040',
                    borderRadius: '100px',
                    color: '#FF5C00',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  {filter} <span style={{ fontSize: '14px' }}>×</span>
                </button>
              ))}
            </div>
          )}

          {/* Card grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {templates.map((t) => (
              <TemplateCard key={t.id} {...t} />
            ))}
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', paddingTop: '8px' }}>
            {['←', '1', '2', '3', '→'].map((label, i) => (
              <button
                key={label + i}
                onClick={() => {
                  if (label === '←' && currentPage > 1) setCurrentPage(currentPage - 1)
                  else if (label === '→') setCurrentPage(currentPage + 1)
                  else if (!isNaN(Number(label))) setCurrentPage(Number(label))
                }}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  backgroundColor: label === String(currentPage) ? '#FF5C00' : '#141417',
                  border: `1px solid ${label === String(currentPage) ? 'transparent' : '#1F1F23'}`,
                  color: label === String(currentPage) ? '#FFFFFF' : '#8B8B90',
                  fontSize: '14px',
                  fontWeight: label === String(currentPage) ? '600' : '400',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  transition: 'background-color 0.15s',
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

function FilterGroup({
  label,
  options,
  active,
  onToggle,
}: {
  label: string
  options: string[]
  active: string[]
  onToggle: (v: string) => void
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <span
        style={{
          color: '#6B6B70',
          fontSize: '11px',
          fontWeight: '600',
          letterSpacing: '1px',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
      {options.map((option) => (
        <label
          key={option}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
          }}
        >
          <span
            onClick={() => onToggle(option)}
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '3px',
              border: `1.5px solid #1F1F23`,
              backgroundColor: active.includes(option) ? '#FF5C00' : '#141417',
              flexShrink: 0,
              display: 'inline-block',
              cursor: 'pointer',
              transition: 'background-color 0.15s',
            }}
          />
          <span
            style={{
              color: '#8B8B90',
              fontSize: '14px',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            {option}
          </span>
        </label>
      ))}
    </div>
  )
}
```

**Step: Verify**

```bash
npm run dev
```

Open `http://localhost:3000/browse`. Sidebar with filters on left, card grid on right, filter pills appear when filters are active, pagination changes current page highlight.

---

## Task 11: Final check and cleanup

**Step 1: Update CLAUDE.md brand name**

In `CLAUDE.md`, change `ResumeForge` → `ResumeForge` in the project description line.

**Step 2: Run lint**

```bash
npm run lint
```

Fix any reported errors (unused imports, missing keys, etc.).

**Step 3: Run build**

```bash
npm run build
```

Expected: ✓ Compiled successfully. Zero errors. If build fails, fix TypeScript errors before proceeding.

**Step 4: Commit**

```bash
git add -A
git commit -m "feat: rebuild UI from design.pen — dark theme, ResumeForge brand, Framer Motion scroll animations

- Wipe old ResumeForge blue design system
- New dark design tokens in globals.css (@theme)
- Instrument Serif + Inter via next/font/google
- Header: sticky dark nav with orange CTA
- Footer: brand + two link columns
- TemplateCard: dark card with hover lift effect
- Landing: hero, featured templates, how it works, creator CTA, FAQ
  with Framer Motion fade/slide scroll animations
- Browse: sidebar with interactive filters, card grid, pagination"
```
