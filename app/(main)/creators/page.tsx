'use client'

import Link from 'next/link'
import { Star, FileText, TrendingUp } from 'lucide-react'

const creators = [
  {
    id: '1',
    name: 'Sarah Chen',
    tagline: 'Helping professionals stand out with clean, ATS-optimized resume designs.',
    location: 'San Francisco, CA',
    stats: { templates: 12, sales: 3400, rating: 4.9 },
    specialty: 'Executive & Finance',
  },
  {
    id: '2',
    name: 'James Park',
    tagline: 'Minimal, impactful templates for the modern job seeker.',
    location: 'New York, NY',
    stats: { templates: 8, sales: 2100, rating: 4.7 },
    specialty: 'Tech & Startups',
  },
  {
    id: '3',
    name: 'Mia Torres',
    tagline: 'Creative layouts that balance aesthetics with ATS compatibility.',
    location: 'Austin, TX',
    stats: { templates: 15, sales: 4800, rating: 5.0 },
    specialty: 'Design & Creative',
  },
  {
    id: '4',
    name: 'Aria Lee',
    tagline: 'Polished, recruiter-tested templates for competitive industries.',
    location: 'Seattle, WA',
    stats: { templates: 10, sales: 1900, rating: 4.8 },
    specialty: 'Healthcare & Science',
  },
  {
    id: '5',
    name: 'Tom Walsh',
    tagline: 'Academic and research-focused templates for scholars and PhD candidates.',
    location: 'Boston, MA',
    stats: { templates: 6, sales: 980, rating: 4.6 },
    specialty: 'Academic & Research',
  },
  {
    id: '6',
    name: 'Nina Patel',
    tagline: 'Bold, modern templates tailored for fast-growing tech companies.',
    location: 'Chicago, IL',
    stats: { templates: 9, sales: 2700, rating: 4.9 },
    specialty: 'Product & Engineering',
  },
]

export default function CreatorsPage() {
  return (
    <div style={{ backgroundColor: '#0A0A0B', minHeight: '100vh' }}>

      {/* Page header */}
      <div style={{ backgroundColor: '#111113', borderBottom: '1px solid #1F1F23', padding: '48px 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ color: '#FF5C00', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '12px' }}>
            Community
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: '2.5rem',
              color: '#FFFFFF',
              margin: '0 0 12px',
              fontWeight: 400,
            }}
          >
            Browse Creators
          </h1>
          <p style={{ color: '#8B8B90', fontSize: '1rem', margin: 0 }}>
            {creators.length} professional designers crafting ATS-optimized resume templates.
          </p>
        </div>
      </div>

      {/* Creator grid */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 80px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {creators.map((creator) => (
            <div
              key={creator.id}
              style={{
                backgroundColor: '#141417',
                border: '1px solid #1F1F23',
                borderRadius: '12px',
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                transition: 'border-color 0.15s, transform 0.15s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#FF5C00'
                ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#1F1F23'
                ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
              }}
            >
              {/* Avatar + identity */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
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
                      fontSize: '22px',
                      color: '#FF5C00',
                    }}
                  >
                    {creator.name[0]}
                  </span>
                </div>
                <div>
                  <p style={{ color: '#FFFFFF', fontWeight: 600, fontSize: '1rem', margin: '0 0 4px' }}>
                    {creator.name}
                  </p>
                  <p style={{ color: '#6B6B70', fontSize: '12px', margin: 0 }}>
                    {creator.location}
                  </p>
                </div>
              </div>

              {/* Specialty badge */}
              <span
                style={{
                  alignSelf: 'flex-start',
                  padding: '4px 10px',
                  backgroundColor: '#8B5CF620',
                  color: '#8B5CF6',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                }}
              >
                {creator.specialty}
              </span>

              {/* Tagline */}
              <p style={{ color: '#8B8B90', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                {creator.tagline}
              </p>

              {/* Stats row */}
              <div
                style={{
                  display: 'flex',
                  gap: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid #1F1F23',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={14} color="#6B6B70" />
                  <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600 }}>{creator.stats.templates}</span>
                  <span style={{ color: '#6B6B70', fontSize: '12px' }}>templates</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <TrendingUp size={14} color="#6B6B70" />
                  <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600 }}>{creator.stats.sales.toLocaleString()}</span>
                  <span style={{ color: '#6B6B70', fontSize: '12px' }}>sales</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Star size={14} color="#FF5C00" />
                  <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 600 }}>{creator.stats.rating}</span>
                </div>
              </div>

              {/* CTA */}
              <Link
                href={`/creator/${creator.id}`}
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '10px 0',
                  backgroundColor: 'transparent',
                  color: '#FF5C00',
                  border: '1px solid #FF5C0040',
                  borderRadius: '8px',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  transition: 'background-color 0.15s, border-color 0.15s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FF5C0012'
                  e.currentTarget.style.borderColor = '#FF5C00'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = '#FF5C0040'
                }}
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
