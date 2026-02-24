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
