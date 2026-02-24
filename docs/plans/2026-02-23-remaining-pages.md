# ResumeForge Remaining Pages — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the four remaining pages — Product Detail, Resume Editor, AI Reviewer, Creator Profile — faithfully from the design.pen dark theme.

**Architecture:** Next.js App Router route groups split pages into `app/(main)/` (with Header+Footer) and `app/editor/` (standalone full-screen, no chrome). Design tokens and coding patterns match the already-built Landing and Browse pages. All data is static mock data inline in each file. No animations (Framer Motion is landing-page only).

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, lucide-react. No new packages.

---

## Task 1: Route group refactor — isolate editor from global chrome

The current `app/layout.tsx` wraps every page with Header + Footer. The Editor page must be a standalone full-screen app with its own toolbar. Next.js App Router **route groups** (folders in parentheses) let us apply a nested layout to specific routes without changing URLs.

**Files:**
- Create: `app/(main)/layout.tsx`
- Move: `app/page.tsx` → `app/(main)/page.tsx`
- Move: `app/browse/page.tsx` → `app/(main)/browse/page.tsx`
- Modify: `app/layout.tsx` (remove Header/Footer imports)
- Keep: `app/editor/` will live outside `(main)` so it gets no chrome

**Step 1: Create `app/(main)/layout.tsx`**

This layout wraps only the `(main)` group pages with Header and Footer, replacing the role they used to play in the root layout.

```tsx
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
```

**Step 2: Move `app/page.tsx` → `app/(main)/page.tsx`**

```bash
mkdir -p app/\(main\)
cp app/page.tsx "app/(main)/page.tsx"
rm app/page.tsx
```

**Step 3: Move `app/browse/page.tsx` → `app/(main)/browse/page.tsx`**

```bash
mkdir -p "app/(main)/browse"
cp app/browse/page.tsx "app/(main)/browse/page.tsx"
rm app/browse/page.tsx
rmdir app/browse
```

**Step 4: Strip Header/Footer from `app/layout.tsx`**

Replace the entire file with this (fonts and metadata only — no Header/Footer):

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

**Step 5: Verify TypeScript**

```bash
cd /c/School/MGIS/mgis-resume-website && npx tsc --noEmit 2>&1
```

Expected: no output (clean). If errors appear about missing routes, delete the `.next/` cache and retry:

```bash
rm -rf .next && npx tsc --noEmit 2>&1
```

---

## Task 2: Product Detail page

**File:** Create `app/(main)/template/[id]/page.tsx`

Design reference: two-column above-fold (resume preview left, purchase card right), Light/Dark toggle on preview, tabs (Features / Reviews / Related) with tab content below.

```tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Check, Download, Eye } from 'lucide-react'
import TemplateCard from '@/components/TemplateCard'

const relatedTemplates = [
  { id: '2', title: 'Minimal Dark', creator: 'James Park', price: 18 as const, rating: 4.7 },
  { id: '4', title: 'Clean Modern', creator: 'Aria Lee', price: 22 as const, rating: 4.8 },
  { id: '6', title: 'Tech Startup', creator: 'Nina Patel', price: 26 as const, rating: 4.9 },
]

const features = [
  {
    title: 'ATS-Optimized',
    desc: 'Tested against Workday, Greenhouse, and Lever to ensure your resume is correctly parsed by applicant tracking systems.',
  },
  {
    title: 'Fully Editable',
    desc: 'Customize every section — fonts, colors, layout, and content — directly in the browser. No design software needed.',
  },
  {
    title: 'PDF & DOCX Export',
    desc: 'Download your resume in both PDF for applications and DOCX for further editing in Word or Google Docs.',
  },
]

const reviews = [
  {
    author: 'Alex M.',
    rating: 5,
    text: 'Landed a senior engineer role at a FAANG company two weeks after using this template. Clean and professional.',
    date: 'Jan 2026',
  },
  {
    author: 'Priya K.',
    rating: 5,
    text: "Best resume template I've ever used. Got callbacks from 4 out of 5 companies I applied to.",
    date: 'Dec 2025',
  },
  {
    author: 'David L.',
    rating: 4,
    text: 'Great template. Would love more color options, but the layout and typography are excellent.',
    date: 'Dec 2025',
  },
]

export default function TemplatePage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState<'features' | 'reviews' | 'related'>('features')
  const [previewTheme, setPreviewTheme] = useState<'dark' | 'light'>('dark')

  const template = {
    id: params.id,
    title: 'Executive Pro',
    creator: 'Sarah Chen',
    creatorId: '1',
    price: 24,
    rating: 4.9,
    reviewCount: 128,
    category: 'Technology',
  }

  const stars = Math.round(template.rating)
  const previewBg = previewTheme === 'dark' ? '#1A1A1D' : '#F8F8F5'
  const previewText = previewTheme === 'dark' ? '#FFFFFF' : '#0A0A0B'
  const previewMuted = previewTheme === 'dark' ? '#8B8B90' : '#666670'

  return (
    <div style={{ backgroundColor: '#0A0A0B', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 80px 0' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
          {[
            { label: 'Home', href: '/' },
            { label: 'Browse', href: '/browse' },
            { label: template.category, href: '/browse' },
          ].map(({ label, href }) => (
            <span key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Link
                href={href}
                style={{ color: '#8B8B90', textDecoration: 'none' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8B8B90')}
              >
                {label}
              </Link>
              <span style={{ color: '#6B6B70' }}>›</span>
            </span>
          ))}
          <span style={{ color: '#FFFFFF' }}>{template.title}</span>
        </div>
      </div>

      {/* Two-column section */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '32px 80px 64px',
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '48px',
          alignItems: 'flex-start',
        }}
      >
        {/* Left: Resume preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Theme toggle */}
          <div
            style={{
              display: 'inline-flex',
              backgroundColor: '#141417',
              border: '1px solid #1F1F23',
              borderRadius: '8px',
              padding: '4px',
              alignSelf: 'flex-start',
            }}
          >
            {(['dark', 'light'] as const).map((theme) => (
              <button
                key={theme}
                onClick={() => setPreviewTheme(theme)}
                style={{
                  padding: '6px 20px',
                  borderRadius: '6px',
                  backgroundColor: previewTheme === theme ? '#FF5C00' : 'transparent',
                  color: previewTheme === theme ? '#FFFFFF' : '#8B8B90',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '13px',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  fontWeight: previewTheme === theme ? '600' : '400',
                  transition: 'all 0.15s',
                  textTransform: 'capitalize',
                }}
              >
                {theme}
              </button>
            ))}
          </div>

          {/* Resume card */}
          <div
            style={{
              backgroundColor: previewBg,
              border: '1px solid #1F1F23',
              borderRadius: '12px',
              padding: '48px',
              minHeight: '640px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              transition: 'background-color 0.2s',
            }}
          >
            <div>
              <div style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif', fontSize: '28px', color: previewText, fontWeight: '400' }}>
                Alexandra Johnson
              </div>
              <div style={{ color: '#FF5C00', fontSize: '14px', fontWeight: '500', marginTop: '4px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Senior Product Manager
              </div>
              <div style={{ color: previewMuted, fontSize: '13px', marginTop: '6px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                alex.johnson@email.com · (555) 012-3456 · San Francisco, CA
              </div>
            </div>

            <div style={{ height: '1px', backgroundColor: '#FF5C00' }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ color: previewText, fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Experience
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ color: previewText, fontSize: '14px', fontWeight: '600', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                    Senior Product Manager — Stripe
                  </div>
                  <div style={{ color: previewMuted, fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>2022 – Present</div>
                </div>
                <div style={{ color: previewMuted, fontSize: '13px', lineHeight: '1.6', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                  Led 0→1 launch of Stripe Tax in EMEA markets. Grew revenue 40% YoY. Managed cross-functional team of 12 engineers and designers.
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ color: previewText, fontSize: '14px', fontWeight: '600', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                    Product Manager — Figma
                  </div>
                  <div style={{ color: previewMuted, fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>2019 – 2022</div>
                </div>
                <div style={{ color: previewMuted, fontSize: '13px', lineHeight: '1.6', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                  Shipped FigJam from 0 to 4M users in 18 months. Drove 3× revenue growth on Enterprise tier.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: previewText, fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Skills
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {['Product Strategy', 'Roadmapping', 'SQL', 'User Research', 'A/B Testing', 'Go-to-Market'].map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: '4px 12px',
                      backgroundColor: previewTheme === 'dark' ? '#1F1F23' : '#E8E8E4',
                      borderRadius: '100px',
                      color: previewMuted,
                      fontSize: '12px',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Purchase card */}
        <div
          style={{
            position: 'sticky',
            top: '80px',
            backgroundColor: '#141417',
            border: '1px solid #1F1F23',
            borderRadius: '16px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                fontSize: '28px',
                color: '#FFFFFF',
                fontWeight: '400',
                margin: '0',
              }}
            >
              {template.title}
            </h1>
            <Link
              href={`/creator/${template.creatorId}`}
              style={{ color: '#8B8B90', fontSize: '14px', textDecoration: 'none', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8B8B90')}
            >
              by {template.creator}
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#FF5C00', fontSize: '14px' }}>
              {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
            </span>
            <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              {template.rating.toFixed(1)}
            </span>
            <span style={{ color: '#8B8B90', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              ({template.reviewCount} reviews)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                fontSize: '40px',
                color: '#FFFFFF',
                fontWeight: '400',
              }}
            >
              ${template.price}
            </span>
            <span style={{ color: '#8B8B90', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>one-time</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              style={{
                padding: '14px',
                backgroundColor: '#FF5C00',
                color: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                fontSize: '15px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e05200')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5C00')}
            >
              <Download size={16} /> Purchase Template
            </button>
            <Link
              href={`/editor?template=${template.id}`}
              style={{
                padding: '14px',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                borderRadius: '8px',
                border: '1px solid #1F1F23',
                fontSize: '15px',
                fontWeight: '500',
                textDecoration: 'none',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8B8B90')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1F1F23')}
            >
              <Eye size={16} /> Preview in Editor
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '8px', borderTop: '1px solid #1F1F23' }}>
            {[
              'ATS-Optimized formatting',
              'PDF + DOCX download',
              'Fully editable in browser',
              '30-day support included',
            ].map((feat) => (
              <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Check size={14} color="#10B981" strokeWidth={2.5} />
                <span style={{ color: '#8B8B90', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderTop: '1px solid #1F1F23', borderBottom: '1px solid #1F1F23', backgroundColor: '#111113' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 80px', display: 'flex' }}>
          {(['features', 'reviews', 'related'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '16px 24px',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #FF5C00' : '2px solid transparent',
                color: activeTab === tab ? '#FFFFFF' : '#8B8B90',
                fontSize: '14px',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontWeight: activeTab === tab ? '600' : '400',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'color 0.15s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 80px 80px' }}>
        {activeTab === 'features' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {features.map(({ title, desc }) => (
              <div
                key={title}
                style={{
                  backgroundColor: '#141417',
                  border: '1px solid #1F1F23',
                  borderRadius: '12px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#FF5C0020',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Check size={16} color="#FF5C00" />
                </div>
                <div style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{title}</div>
                <div style={{ color: '#8B8B90', fontSize: '14px', lineHeight: '1.6', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{desc}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '720px' }}>
            {reviews.map((review) => (
              <div
                key={review.author}
                style={{
                  backgroundColor: '#141417',
                  border: '1px solid #1F1F23',
                  borderRadius: '12px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#1F1F23',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#8B8B90',
                        fontSize: '14px',
                        fontFamily: 'var(--font-inter), Inter, sans-serif',
                      }}
                    >
                      {review.author[0]}
                    </div>
                    <div>
                      <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                        {review.author}
                      </div>
                      <div style={{ color: '#FF5C00', fontSize: '12px' }}>{'★'.repeat(review.rating)}</div>
                    </div>
                  </div>
                  <span style={{ color: '#6B6B70', fontSize: '12px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{review.date}</span>
                </div>
                <p style={{ color: '#8B8B90', fontSize: '14px', lineHeight: '1.7', margin: '0', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'related' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {relatedTemplates.map((t) => (
              <TemplateCard key={t.id} {...t} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

**Step: Verify TypeScript**

```bash
cd /c/School/MGIS/mgis-resume-website && npx tsc --noEmit 2>&1
```

Expected: no output (clean).

---

## Task 3: Resume Editor page

**File:** Create `app/editor/page.tsx`

This page lives outside `(main)`, so it gets no Header or Footer from any layout — just the root layout (fonts, bg). It occupies the full viewport with its own toolbar + three-panel body.

Note: `toolbarIconBtn` is defined as a `const` style object outside the component so it can be used without recreating it per render.

```tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Undo2, Redo2, Bold, Italic, Underline, Eye, Download } from 'lucide-react'
import type { CSSProperties } from 'react'

const accentColors = ['#FF5C00', '#8B5CF6', '#10B981', '#3B82F6', '#EC4899', '#F59E0B']

const sections = [
  { id: 'contact', label: 'Contact' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
]

const toolbarBtn: CSSProperties = {
  padding: '4px 6px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '4px',
  color: '#8B8B90',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export default function EditorPage() {
  const [accentColor, setAccentColor] = useState('#FF5C00')
  const [font, setFont] = useState('Inter')
  const [layout, setLayout] = useState<'single' | 'two'>('single')
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(sections.map((s) => s.id))
  )

  const toggleSection = (id: string) => {
    setVisibleSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0A0A0B',
        overflow: 'hidden',
      }}
    >
      {/* ── Toolbar ── */}
      <div
        style={{
          height: '52px',
          backgroundColor: '#111113',
          borderBottom: '1px solid #1F1F23',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: '24px',
          flexShrink: 0,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: '18px',
            color: '#FFFFFF',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          ResumeForge
        </Link>

        {/* Document name + undo/redo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, justifyContent: 'center' }}>
          <span style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Untitled Resume
          </span>
          <div style={{ display: 'flex', gap: '2px' }}>
            <button style={toolbarBtn}><Undo2 size={15} /></button>
            <button style={toolbarBtn}><Redo2 size={15} /></button>
          </div>
        </div>

        {/* Formatting + export */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div
            style={{
              display: 'flex',
              gap: '2px',
              backgroundColor: '#141417',
              borderRadius: '6px',
              padding: '2px',
            }}
          >
            <button style={toolbarBtn}><Bold size={14} /></button>
            <button style={toolbarBtn}><Italic size={14} /></button>
            <button style={toolbarBtn}><Underline size={14} /></button>
          </div>
          <button
            style={{
              padding: '6px 14px',
              backgroundColor: 'transparent',
              border: '1px solid #1F1F23',
              borderRadius: '6px',
              color: '#8B8B90',
              fontSize: '13px',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Eye size={13} /> Preview
          </button>
          <button
            style={{
              padding: '6px 14px',
              backgroundColor: '#FF5C00',
              border: 'none',
              borderRadius: '6px',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e05200')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5C00')}
          >
            <Download size={13} /> Export PDF
          </button>
        </div>
      </div>

      {/* ── Three-panel body ── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Left: Sections panel */}
        <aside
          style={{
            width: '240px',
            flexShrink: 0,
            backgroundColor: '#111113',
            borderRight: '1px solid #1F1F23',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #1F1F23',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            Sections
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
            {sections.map((section) => (
              <div
                key={section.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  cursor: 'grab',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#141417')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <span style={{ color: '#6B6B70', fontSize: '10px', letterSpacing: '1px', flexShrink: 0 }}>⠿</span>
                <span style={{ flex: 1, color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                  {section.label}
                </span>
                <button
                  onClick={() => toggleSection(section.id)}
                  title={visibleSections.has(section.id) ? 'Hide section' : 'Show section'}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: visibleSections.has(section.id) ? '#10B981' : '#6B6B70',
                    border: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
                    padding: 0,
                    transition: 'background-color 0.15s',
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ padding: '12px', borderTop: '1px solid #1F1F23' }}>
            <button
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: 'transparent',
                border: '1px dashed #1F1F23',
                borderRadius: '6px',
                color: '#8B8B90',
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              + Add Section
            </button>
          </div>
        </aside>

        {/* Center: Canvas */}
        <main
          style={{
            flex: 1,
            backgroundColor: '#0A0A0B',
            overflow: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '40px 32px',
          }}
        >
          {/* A4 resume card */}
          <div
            style={{
              width: '600px',
              backgroundColor: '#FFFFFF',
              borderRadius: '4px',
              padding: '48px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              color: '#111113',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              minHeight: '800px',
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                  fontSize: '26px',
                  fontWeight: '400',
                  lineHeight: '1.2',
                  color: '#111113',
                }}
              >
                Alexandra Johnson
              </div>
              <div style={{ color: accentColor, fontSize: '13px', fontWeight: '600', marginTop: '4px', letterSpacing: '0.5px' }}>
                Senior Product Manager
              </div>
            </div>

            <div style={{ height: '2px', backgroundColor: accentColor }} />

            {visibleSections.has('contact') && (
              <div style={{ color: '#666', fontSize: '12px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <span>alex.johnson@email.com</span>
                <span>(555) 012-3456</span>
                <span>San Francisco, CA</span>
                <span>linkedin.com/in/alexj</span>
              </div>
            )}

            {visibleSections.has('experience') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#222' }}>
                  Experience
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>Senior Product Manager — Stripe</span>
                    <span style={{ fontSize: '12px', color: '#777' }}>2022 – Present</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#555', lineHeight: '1.6', marginTop: '4px' }}>
                    Led 0→1 launch of Stripe Tax in EMEA markets. Grew revenue 40% YoY.
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', fontWeight: '600' }}>Product Manager — Figma</span>
                    <span style={{ fontSize: '12px', color: '#777' }}>2019 – 2022</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#555', lineHeight: '1.6', marginTop: '4px' }}>
                    Shipped FigJam from 0 to 4M users in 18 months.
                  </div>
                </div>
              </div>
            )}

            {visibleSections.has('education') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#222' }}>
                  Education
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '13px', fontWeight: '600' }}>B.S. Computer Science — Stanford University</span>
                  <span style={{ fontSize: '12px', color: '#777' }}>2015 – 2019</span>
                </div>
              </div>
            )}

            {visibleSections.has('skills') && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', color: '#222' }}>
                  Skills
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {['Product Strategy', 'Roadmapping', 'SQL', 'User Research', 'A/B Testing', 'Go-to-Market'].map((skill) => (
                    <span
                      key={skill}
                      style={{
                        padding: '3px 10px',
                        backgroundColor: '#F4F4F0',
                        borderRadius: '100px',
                        fontSize: '11px',
                        color: '#555',
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Right: Customize panel */}
        <aside
          style={{
            width: '280px',
            flexShrink: 0,
            backgroundColor: '#111113',
            borderLeft: '1px solid #1F1F23',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #1F1F23',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            Customize
          </div>
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Accent color */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span
                style={{
                  color: '#8B8B90',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                Accent Color
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {accentColors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    title={color}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: accentColor === color ? '2px solid #FFFFFF' : '2px solid transparent',
                      cursor: 'pointer',
                      outline: accentColor === color ? `2px solid ${color}` : 'none',
                      outlineOffset: '2px',
                      transition: 'transform 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                ))}
              </div>
            </div>

            {/* Font */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span
                style={{
                  color: '#8B8B90',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                Font
              </span>
              <select
                value={font}
                onChange={(e) => setFont(e.target.value)}
                style={{
                  backgroundColor: '#141417',
                  border: '1px solid #1F1F23',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  cursor: 'pointer',
                }}
              >
                {['Inter', 'Instrument Serif', 'Georgia', 'Times New Roman'].map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>

            {/* Layout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span
                style={{
                  color: '#8B8B90',
                  fontSize: '11px',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                Layout
              </span>
              <div
                style={{
                  display: 'flex',
                  backgroundColor: '#141417',
                  border: '1px solid #1F1F23',
                  borderRadius: '6px',
                  padding: '3px',
                }}
              >
                {(['single', 'two'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLayout(l)}
                    style={{
                      flex: 1,
                      padding: '6px 0',
                      borderRadius: '4px',
                      backgroundColor: layout === l ? '#FF5C00' : 'transparent',
                      border: 'none',
                      color: layout === l ? '#FFFFFF' : '#8B8B90',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: layout === l ? '600' : '400',
                      transition: 'all 0.15s',
                    }}
                  >
                    {l === 'single' ? 'Single Col' : 'Two Col'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
```

**Step: Verify TypeScript**

```bash
cd /c/School/MGIS/mgis-resume-website && npx tsc --noEmit 2>&1
```

Expected: no output (clean).

---

## Task 4: AI Reviewer page

**File:** Create `app/(main)/reviewer/page.tsx`

Two states controlled by `hasFile` — upload state (centered card with drop zone) and analysis state (score bar + two-column body + sticky export bar).

```tsx
'use client'

import { useState } from 'react'
import { Upload, Star, Check, ArrowRight } from 'lucide-react'

type SuggestionType = 'improvement' | 'applied' | 'missing'

const suggestions: {
  type: SuggestionType
  label: string
  title: string
  original: string
  improved: string
}[] = [
  {
    type: 'improvement',
    label: 'Improvement',
    title: 'Add quantified achievements',
    original: 'Managed the engineering team and delivered projects on time.',
    improved: 'Led 8-person engineering team, delivering 14 projects on schedule — 20% faster than prior year.',
  },
  {
    type: 'applied',
    label: 'Applied',
    title: 'Strengthen action verbs',
    original: 'Was responsible for product roadmap.',
    improved: 'Owned and executed product roadmap for 3 product lines.',
  },
  {
    type: 'missing',
    label: 'Missing Section',
    title: 'Add a Skills section',
    original: '',
    improved: 'ATS systems scan for keywords. Adding a Skills section with relevant technologies increases your match rate significantly.',
  },
]

const typeColors: Record<SuggestionType, string> = {
  improvement: '#FF5C00',
  applied: '#10B981',
  missing: '#8B5CF6',
}

export default function ReviewerPage() {
  const [hasFile, setHasFile] = useState(false)
  const [appliedSet, setAppliedSet] = useState<Set<number>>(new Set([1]))

  const toggleApplied = (i: number) => {
    setAppliedSet((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  if (!hasFile) {
    return (
      <div
        style={{
          backgroundColor: '#0A0A0B',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            backgroundColor: '#141417',
            border: '1px solid #1F1F23',
            borderRadius: '20px',
            padding: '56px',
            textAlign: 'center',
            maxWidth: '480px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: '#FF5C0020',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Star size={28} color="#FF5C00" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                fontSize: '28px',
                color: '#FFFFFF',
                fontWeight: '400',
                margin: '0',
              }}
            >
              Analyze My Resume
            </h1>
            <p
              style={{
                color: '#8B8B90',
                fontSize: '15px',
                lineHeight: '1.6',
                margin: '0',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              Upload your resume and our AI will score it for ATS compatibility, clarity, and impact.
            </p>
          </div>

          {/* Drop zone */}
          <div
            style={{
              width: '100%',
              padding: '32px',
              border: '1.5px dashed #1F1F23',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#FF5C00')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1F1F23')}
            onClick={() => setHasFile(true)}
          >
            <Upload size={24} color="#6B6B70" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center' }}>
              <span style={{ color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: '500' }}>
                Drop your resume here
              </span>
              <span style={{ color: '#6B6B70', fontSize: '12px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                PDF or DOCX · up to 5MB
              </span>
            </div>
          </div>

          <button
            onClick={() => setHasFile(true)}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#FF5C00',
              border: 'none',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e05200')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5C00')}
          >
            Upload & Analyze <ArrowRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#0A0A0B', minHeight: '100vh', paddingBottom: '72px' }}>

      {/* Score bar */}
      <div style={{ backgroundColor: '#111113', borderBottom: '1px solid #1F1F23', padding: '32px 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1
                style={{
                  fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                  fontSize: '24px',
                  color: '#FFFFFF',
                  fontWeight: '400',
                  margin: '0 0 4px',
                }}
              >
                AI Resume Analysis
              </h1>
              <span style={{ color: '#8B8B90', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                alexandra_johnson_resume.pdf
              </span>
            </div>
            <button
              onClick={() => setHasFile(false)}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                border: '1px solid #1F1F23',
                borderRadius: '6px',
                color: '#8B8B90',
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              Upload New
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
            {/* Score circle */}
            <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  border: '3px solid #FF5C00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                    fontSize: '24px',
                    color: '#FFFFFF',
                    lineHeight: '1',
                  }}
                >
                  8.2
                </span>
                <span style={{ color: '#8B8B90', fontSize: '10px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>/10</span>
              </div>
              <span style={{ color: '#8B8B90', fontSize: '12px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>Overall</span>
            </div>

            {/* Category bars */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'ATS Compatibility', value: 92, color: '#10B981' },
                { label: 'Clarity', value: 78, color: '#FF5C00' },
                { label: 'Impact', value: 85, color: '#8B5CF6' },
              ].map(({ label, value, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span
                    style={{
                      color: '#8B8B90',
                      fontSize: '13px',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      width: '140px',
                      flexShrink: 0,
                    }}
                  >
                    {label}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: '6px',
                      backgroundColor: '#1F1F23',
                      borderRadius: '100px',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${value}%`,
                        backgroundColor: color,
                        borderRadius: '100px',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: '#FFFFFF',
                      fontSize: '13px',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: '600',
                      width: '36px',
                      flexShrink: 0,
                    }}
                  >
                    {value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '40px 80px',
          display: 'grid',
          gridTemplateColumns: '1fr 380px',
          gap: '40px',
        }}
      >
        {/* Left: Resume with highlights */}
        <div
          style={{
            backgroundColor: '#141417',
            border: '1px solid #1F1F23',
            borderRadius: '12px',
            padding: '40px',
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '8px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            <div style={{ fontFamily: 'var(--font-instrument-serif), Georgia, serif', fontSize: '22px', color: '#0A0A0B' }}>
              Alexandra Johnson
            </div>
            <div style={{ height: '2px', backgroundColor: '#FF5C00' }} />

            {/* Warning highlight */}
            <div
              style={{
                backgroundColor: '#FFC10715',
                border: '1px solid #FFC10740',
                borderRadius: '4px',
                padding: '10px 12px',
              }}
            >
              <div style={{ fontSize: '13px', color: '#444', lineHeight: '1.6' }}>
                Managed the engineering team and delivered projects on time.
              </div>
              <div style={{ color: '#FFC107', fontSize: '11px', marginTop: '6px', fontWeight: '600' }}>
                ⚠ Weak phrasing — consider adding metrics
              </div>
            </div>

            {/* Good highlight */}
            <div
              style={{
                backgroundColor: '#10B98115',
                border: '1px solid #10B98140',
                borderRadius: '4px',
                padding: '10px 12px',
              }}
            >
              <div style={{ fontSize: '13px', color: '#444', lineHeight: '1.6' }}>
                Led 0→1 launch of Stripe Tax in EMEA markets. Grew revenue 40% YoY.
              </div>
              <div style={{ color: '#10B981', fontSize: '11px', marginTop: '6px', fontWeight: '600' }}>
                ✓ Strong — quantified impact
              </div>
            </div>

            <div style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
              Managed cross-functional team of 12 engineers and designers across three time zones.
            </div>
          </div>
        </div>

        {/* Right: Suggestions panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              AI Suggestions
            </span>
            <span style={{ color: '#8B8B90', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              {suggestions.length} found
            </span>
          </div>

          {suggestions.map((s, i) => (
            <div
              key={i}
              style={{
                backgroundColor: '#141417',
                border: `1px solid ${appliedSet.has(i) ? '#10B98140' : '#1F1F23'}`,
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'border-color 0.2s',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    padding: '2px 10px',
                    borderRadius: '100px',
                    backgroundColor: `${typeColors[s.type]}20`,
                    color: typeColors[s.type],
                    fontSize: '11px',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    fontWeight: '600',
                  }}
                >
                  {s.label}
                </span>
                {appliedSet.has(i) && <Check size={14} color="#10B981" />}
              </div>

              <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '600', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                {s.title}
              </div>

              {s.original && (
                <div style={{ fontSize: '12px', color: '#8B8B90', fontFamily: 'var(--font-inter), Inter, sans-serif', lineHeight: '1.5' }}>
                  <span style={{ color: '#6B6B70' }}>Before: </span>{s.original}
                </div>
              )}

              <div style={{ fontSize: '12px', color: '#8B8B90', fontFamily: 'var(--font-inter), Inter, sans-serif', lineHeight: '1.5' }}>
                <span style={{ color: '#10B981' }}>After: </span>{s.improved}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => toggleApplied(i)}
                  style={{
                    flex: 1,
                    padding: '8px',
                    backgroundColor: appliedSet.has(i) ? '#1F1F23' : '#FF5C00',
                    border: 'none',
                    borderRadius: '6px',
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    transition: 'background-color 0.15s',
                  }}
                >
                  {appliedSet.has(i) ? 'Undo' : 'Apply'}
                </button>
                <button
                  style={{
                    padding: '8px 12px',
                    backgroundColor: 'transparent',
                    border: '1px solid #1F1F23',
                    borderRadius: '6px',
                    color: '#8B8B90',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  Dismiss
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky export bar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#111113',
          borderTop: '1px solid #1F1F23',
          padding: '16px 80px',
          zIndex: 10,
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#8B8B90', fontSize: '14px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            {appliedSet.size} of {suggestions.length} suggestions applied
          </span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => { setHasFile(false); setAppliedSet(new Set()) }}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#8B8B90',
                fontSize: '14px',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                textDecoration: 'underline',
              }}
            >
              Start Over
            </button>
            <button
              style={{
                padding: '10px 24px',
                backgroundColor: '#FF5C00',
                border: 'none',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e05200')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5C00')}
            >
              Export Improved Resume <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Step: Verify TypeScript**

```bash
cd /c/School/MGIS/mgis-resume-website && npx tsc --noEmit 2>&1
```

Expected: no output (clean).

---

## Task 5: Creator Profile page

**File:** Create `app/(main)/creator/[id]/page.tsx`

Profile hero with avatar, name, tagline, stats row (Templates / Sales / Rating). Template grid below using TemplateCard.

```tsx
import TemplateCard from '@/components/TemplateCard'

const creatorTemplates = [
  { id: '1', title: 'Executive Pro', creator: 'Sarah Chen', price: 24 as const, rating: 4.9 },
  { id: '7', title: 'Finance Analyst', creator: 'Sarah Chen', price: 22 as const, rating: 4.8 },
  { id: '8', title: 'Consulting Edge', creator: 'Sarah Chen', price: 28 as const, rating: 5.0 },
  { id: '9', title: 'C-Suite Classic', creator: 'Sarah Chen', price: 32 as const, rating: 4.9 },
]

export default function CreatorPage({ params }: { params: { id: string } }) {
  const creator = {
    id: params.id,
    name: 'Sarah Chen',
    tagline: 'Helping professionals stand out with clean, ATS-optimized resume designs.',
    location: 'San Francisco, CA',
    memberSince: 'March 2024',
    stats: { templates: 12, sales: 3400, rating: 4.9 },
  }

  return (
    <div style={{ backgroundColor: '#0A0A0B', minHeight: '100vh' }}>

      {/* Profile hero */}
      <div style={{ backgroundColor: '#111113', borderBottom: '1px solid #1F1F23', padding: '64px 80px' }}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            flexWrap: 'wrap',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              backgroundColor: '#FF5C0020',
              border: '2px solid #FF5C0040',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                fontSize: '36px',
                color: '#FF5C00',
              }}
            >
              {creator.name[0]}
            </span>
          </div>

          {/* Name, tagline, meta */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '240px' }}>
            <h1
              style={{
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                fontSize: '32px',
                color: '#FFFFFF',
                fontWeight: '400',
                margin: '0',
              }}
            >
              {creator.name}
            </h1>
            <p
              style={{
                color: '#8B8B90',
                fontSize: '15px',
                margin: '0',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                maxWidth: '480px',
                lineHeight: '1.6',
              }}
            >
              {creator.tagline}
            </p>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '4px' }}>
              <span style={{ color: '#6B6B70', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                📍 {creator.location}
              </span>
              <span style={{ color: '#6B6B70', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Member since {creator.memberSince}
              </span>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', flexShrink: 0 }}>
            {[
              { num: String(creator.stats.templates), label: 'Templates' },
              { num: creator.stats.sales.toLocaleString(), label: 'Sales' },
              { num: creator.stats.rating.toFixed(1) + ' ★', label: 'Rating' },
            ].map(({ num, label }, i) => (
              <div
                key={label}
                style={{
                  textAlign: 'center',
                  padding: '0 32px',
                  borderLeft: i > 0 ? '1px solid #1F1F23' : 'none',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                    fontSize: '28px',
                    color: '#FFFFFF',
                    lineHeight: '1',
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    color: '#8B8B90',
                    fontSize: '12px',
                    marginTop: '6px',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Template grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 80px 80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: '28px',
              color: '#FFFFFF',
              fontWeight: '400',
              margin: '0',
            }}
          >
            Templates by {creator.name}
          </h2>
          <span style={{ color: '#8B8B90', fontSize: '14px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            {creatorTemplates.length} templates
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {creatorTemplates.map((t) => (
            <TemplateCard key={t.id} {...t} />
          ))}
        </div>
      </div>
    </div>
  )
}
```

**Step: Verify TypeScript**

```bash
cd /c/School/MGIS/mgis-resume-website && npx tsc --noEmit 2>&1
```

Expected: no output (clean).

---

## Task 6: Final check, lint, build, commit

**Step 1: Run TypeScript check**

```bash
cd /c/School/MGIS/mgis-resume-website && npx tsc --noEmit 2>&1
```

Expected: no output. If errors, fix before proceeding.

**Step 2: Run build**

```bash
cd /c/School/MGIS/mgis-resume-website && npm run build 2>&1
```

Expected output shows these routes compiled successfully:
```
○ /
○ /browse
○ /creator/[id]
○ /reviewer
○ /template/[id]
○ /editor
```

If build fails with TypeScript or module errors, fix them. Common issues:
- Missing `'use client'` on components that use browser events or useState
- `params` type errors in dynamic routes — use `{ params: { id: string } }` as the prop type

**Step 3: Commit**

```bash
cd /c/School/MGIS/mgis-resume-website
git add app/ components/ docs/plans/2026-02-23-remaining-pages.md
git commit -m "feat: add product detail, editor, reviewer, and creator pages

- Route group refactor: (main) layout for chrome pages, editor standalone
- Product Detail: resume preview with light/dark toggle, purchase card,
  tab switcher (Features / Reviews / Related)
- Resume Editor: full-screen standalone, three-panel layout, section
  visibility toggles, accent color picker, font selector, layout toggle
- AI Reviewer: upload state, score bar (8.2/10 + category bars),
  inline resume highlights, suggestion cards with apply/dismiss,
  sticky export bar
- Creator Profile: profile hero with stats, 4-col template grid

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```
