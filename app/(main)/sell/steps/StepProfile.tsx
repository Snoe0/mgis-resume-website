'use client'

import { useState, useRef } from 'react'
import { Camera } from 'lucide-react'

const specialties = [
  'Executive & Finance',
  'Tech & Startups',
  'Design & Creative',
  'Healthcare & Science',
  'Academic & Research',
  'Product & Engineering',
  'Other',
]

interface StepProfileProps {
  data: {
    displayName: string
    bio: string
    specialty: string
    avatar: File | null
  }
  onChange: (updates: Partial<StepProfileProps['data']>) => void
  onNext: () => void
  onBack: () => void
}

export default function StepProfile({ data, onChange, onNext, onBack }: StepProfileProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange({ avatar: file })
      const reader = new FileReader()
      reader.onloadend = () => setAvatarPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!data.displayName.trim()) errs.displayName = 'Display name is required.'
    if (!data.bio.trim()) errs.bio = 'Bio is required.'
    if (!data.specialty) errs.specialty = 'Please select a specialty.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validate()) onNext()
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
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
        Set up your profile
      </h2>
      <p style={{ color: '#8B8B90', fontSize: '14px', margin: '0 0 32px' }}>
        This is how buyers will see you on ResumeForge.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#1F1F23',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
              border: '2px dashed #1F1F23',
              flexShrink: 0,
            }}
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Camera size={24} color="#6B6B70" />
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              style={{
                color: '#FF5C00',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              Upload photo
            </button>
            <p style={{ color: '#6B6B70', fontSize: '12px', margin: '4px 0 0' }}>Optional. JPG, PNG, or WebP.</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
        </div>

        {/* Display Name */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Display name *
          </label>
          <input
            type="text"
            value={data.displayName}
            onChange={(e) => onChange({ displayName: e.target.value })}
            placeholder="How buyers will see your name"
            style={inputStyle}
          />
          {errors.displayName && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '6px' }}>{errors.displayName}</p>}
        </div>

        {/* Bio */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Bio *
          </label>
          <textarea
            value={data.bio}
            onChange={(e) => onChange({ bio: e.target.value.slice(0, 500) })}
            placeholder="Tell buyers about your design experience and style..."
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            {errors.bio ? <p style={{ color: '#EF4444', fontSize: '12px', margin: 0 }}>{errors.bio}</p> : <span />}
            <span style={{ color: '#6B6B70', fontSize: '12px' }}>{data.bio.length}/500</span>
          </div>
        </div>

        {/* Specialty */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Specialty *
          </label>
          <select
            value={data.specialty}
            onChange={(e) => onChange({ specialty: e.target.value })}
            style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
          >
            <option value="">Select a specialty</option>
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.specialty && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '6px' }}>{errors.specialty}</p>}
        </div>
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
          onClick={handleNext}
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
