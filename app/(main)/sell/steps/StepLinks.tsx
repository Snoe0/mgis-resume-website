'use client'

import { Globe, Linkedin, Palette, Link as LinkIcon } from 'lucide-react'

interface StepLinksProps {
  data: {
    portfolioUrl: string
    websiteUrl: string
    linkedinUrl: string
    dribbbleUrl: string
  }
  onChange: (updates: Partial<StepLinksProps['data']>) => void
  onNext: () => void
  onBack: () => void
}

const fields = [
  { key: 'portfolioUrl' as const, label: 'Portfolio URL', icon: LinkIcon, placeholder: 'https://portfolio.example.com' },
  { key: 'websiteUrl' as const, label: 'Personal website', icon: Globe, placeholder: 'https://yoursite.com' },
  { key: 'linkedinUrl' as const, label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/yourname' },
  { key: 'dribbbleUrl' as const, label: 'Dribbble or Behance', icon: Palette, placeholder: 'https://dribbble.com/yourname' },
]

export default function StepLinks({ data, onChange, onNext, onBack }: StepLinksProps) {
  const inputStyle = {
    width: '100%',
    padding: '12px 16px 12px 44px',
    backgroundColor: '#0A0A0B',
    border: '1px solid #1F1F23',
    borderRadius: '8px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'var(--font-inter), Inter, sans-serif',
    outline: 'none',
  } as const

  return (
    <div>
      <h2
        style={{
          fontFamily: 'var(--font-instrument-serif), Georgia, serif',
          fontSize: '28px',
          color: '#FFFFFF',
          fontWeight: 400,
          margin: '0 0 8px',
        }}
      >
        Portfolio & links
      </h2>
      <p style={{ color: '#8B8B90', fontSize: '14px', margin: '0 0 32px' }}>
        Sharing your portfolio helps buyers trust your work. All fields are optional.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {fields.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key}>
            <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              {label}
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6B6B70', pointerEvents: 'none' }}>
                <Icon size={16} />
              </div>
              <input
                type="url"
                value={data[key]}
                onChange={(e) => onChange({ [key]: e.target.value })}
                placeholder={placeholder}
                style={inputStyle}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
        <button
          onClick={onBack}
          style={{
            color: '#8B8B90',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          Back
        </button>
        <button
          onClick={onNext}
          style={{
            padding: '12px 32px',
            backgroundColor: '#FF5C00',
            color: '#FFFFFF',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
