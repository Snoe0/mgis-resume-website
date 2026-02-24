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
