'use client'

import { useState } from 'react'
import { CheckCircle, Edit2, FileText } from 'lucide-react'
import type { SellerFormData } from '../types'

interface StepReviewProps {
  data: SellerFormData
  onBack: () => void
  onGoToStep: (step: number) => void
}

export default function StepReview({ data, onBack, onGoToStep }: StepReviewProps) {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <CheckCircle size={56} color="#10B981" style={{ marginBottom: '24px' }} />
        <h2
          style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: '28px',
            color: '#FFFFFF',
            fontWeight: 400,
            margin: '0 0 12px',
          }}
        >
          Application submitted!
        </h2>
        <p style={{ color: '#8B8B90', fontSize: '14px', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto' }}>
          We&apos;ll review your application within 48 hours. You&apos;ll receive an email when your seller account is approved.
        </p>
      </div>
    )
  }

  const sectionStyle = {
    backgroundColor: '#0A0A0B',
    border: '1px solid #1F1F23',
    borderRadius: '12px',
    padding: '24px',
  }

  const headerStyle = {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: '16px',
  }

  const labelStyle = { color: '#6B6B70', fontSize: '12px', marginBottom: '4px', fontFamily: 'var(--font-inter), Inter, sans-serif' }
  const valueStyle = { color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-inter), Inter, sans-serif' }

  const editBtnStyle = {
    color: '#FF5C00',
    background: 'none' as const,
    border: 'none' as const,
    cursor: 'pointer' as const,
    fontSize: '13px',
    fontFamily: 'var(--font-inter), Inter, sans-serif',
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '4px',
  }

  const links = [
    { label: 'Portfolio', value: data.portfolioUrl },
    { label: 'Website', value: data.websiteUrl },
    { label: 'LinkedIn', value: data.linkedinUrl },
    { label: 'Dribbble/Behance', value: data.dribbbleUrl },
  ].filter(l => l.value)

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
        Review your application
      </h2>
      <p style={{ color: '#8B8B90', fontSize: '14px', margin: '0 0 32px' }}>
        Make sure everything looks good before submitting.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Profile section */}
        <div style={sectionStyle}>
          <div style={headerStyle}>
            <h3 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 600, margin: 0 }}>Profile</h3>
            <button onClick={() => onGoToStep(2)} style={editBtnStyle}>
              <Edit2 size={14} /> Edit
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={labelStyle}>Display name</p>
              <p style={valueStyle}>{data.displayName}</p>
            </div>
            <div>
              <p style={labelStyle}>Specialty</p>
              <p style={valueStyle}>{data.specialty}</p>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <p style={labelStyle}>Bio</p>
              <p style={{ ...valueStyle, lineHeight: 1.6 }}>{data.bio}</p>
            </div>
          </div>
        </div>

        {/* Links section */}
        <div style={sectionStyle}>
          <div style={headerStyle}>
            <h3 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 600, margin: 0 }}>Links</h3>
            <button onClick={() => onGoToStep(3)} style={editBtnStyle}>
              <Edit2 size={14} /> Edit
            </button>
          </div>
          {links.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {links.map(({ label, value }) => (
                <div key={label}>
                  <p style={labelStyle}>{label}</p>
                  <p style={valueStyle}>{value}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#6B6B70', fontSize: '13px', margin: 0 }}>No links provided</p>
          )}
        </div>

        {/* Template section */}
        <div style={sectionStyle}>
          <div style={headerStyle}>
            <h3 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 600, margin: 0 }}>Template</h3>
            <button onClick={() => onGoToStep(4)} style={editBtnStyle}>
              <Edit2 size={14} /> Edit
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={labelStyle}>Title</p>
              <p style={valueStyle}>{data.templateTitle}</p>
            </div>
            <div>
              <p style={labelStyle}>Price</p>
              <p style={valueStyle}>{data.templatePrice === 0 ? 'Free' : `$${data.templatePrice}`}</p>
            </div>
            <div>
              <p style={labelStyle}>Category</p>
              <p style={valueStyle}>{data.templateCategory}</p>
            </div>
            <div>
              <p style={labelStyle}>File</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={14} color="#FF5C00" />
                <p style={valueStyle}>{data.templateFile?.name ?? 'No file'}</p>
              </div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <p style={labelStyle}>Description</p>
              <p style={{ ...valueStyle, lineHeight: 1.6 }}>{data.templateDescription}</p>
            </div>
          </div>
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
          onClick={() => setSubmitted(true)}
          style={{
            padding: '14px 40px',
            backgroundColor: '#FF5C00',
            color: '#FFFFFF',
            borderRadius: '8px',
            border: 'none',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          Submit Application
        </button>
      </div>
    </div>
  )
}
