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
