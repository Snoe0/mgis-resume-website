'use client'

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
