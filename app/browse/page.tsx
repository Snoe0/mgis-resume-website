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
