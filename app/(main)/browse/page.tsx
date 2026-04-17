'use client'

import { useState } from 'react'
import TemplateCard from '@/components/TemplateCard'
import { templates } from '@/lib/templates'

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
    <div className="bg-bg-base min-h-screen flex flex-col">
      <div className="flex flex-1">

        {/* ── Sidebar ── */}
        <aside className="w-[280px] flex-shrink-0 bg-bg-elevated border-r border-border-default px-6 py-8 flex flex-col gap-8 self-stretch">
          <span className="text-text-primary text-base font-semibold">
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
        <main className="flex-1 px-10 py-8 flex flex-col gap-6">
          {/* Top bar */}
          <div className="flex justify-between items-end">
            <div className="flex flex-col gap-1">
              <h1 className="font-serif text-4xl text-text-primary font-normal m-0">
                Browse Templates
              </h1>
              <span className="text-text-secondary text-sm">
                Showing {templates.length * 4} templates
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-bg-card border border-border-default rounded-md">
              <span className="text-text-secondary text-[13px]">
                Sort: Most Popular
              </span>
              <span className="text-text-secondary text-[10px]">▾</span>
            </div>
          </div>

          {/* Active filter pills */}
          {activeFilters.length > 0 && (
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-text-muted text-[13px]">
                Active:
              </span>
              {activeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    if (activeIndustry.includes(filter)) toggleFilter(activeIndustry, setActiveIndustry, filter)
                    else toggleFilter(activeExp, setActiveExp, filter)
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FF5C0015] border border-[#FF5C0040] rounded-full text-accent text-xs cursor-pointer"
                >
                  {filter} <span className="text-sm">×</span>
                </button>
              ))}
            </div>
          )}

          {/* Card grid */}
          <div className="grid grid-cols-3 gap-4">
            {templates.map((t) => (
              <TemplateCard key={t.id} {...t} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-1 pt-2">
            {['←', '1', '2', '3', '→'].map((label, i) => {
              const isActive = label === String(currentPage)
              return (
                <button
                  key={label + i}
                  onClick={() => {
                    if (label === '←' && currentPage > 1) setCurrentPage(currentPage - 1)
                    else if (label === '→') setCurrentPage(currentPage + 1)
                    else if (!isNaN(Number(label))) setCurrentPage(Number(label))
                  }}
                  className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                    isActive
                      ? 'bg-accent border border-transparent text-text-primary font-semibold'
                      : 'bg-bg-card border border-border-default text-text-secondary font-normal'
                  }`}
                >
                  {label}
                </button>
              )
            })}
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
    <div className="flex flex-col gap-3">
      <span className="text-text-muted text-[11px] font-semibold tracking-[1px] uppercase">
        {label}
      </span>
      {options.map((option) => (
        <label
          key={option}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <span
            onClick={() => onToggle(option)}
            className={`w-4 h-4 rounded-[3px] border-[1.5px] border-border-default flex-shrink-0 inline-block cursor-pointer transition-colors ${
              active.includes(option) ? 'bg-accent' : 'bg-bg-card'
            }`}
          />
          <span className="text-text-secondary text-sm">
            {option}
          </span>
        </label>
      ))}
    </div>
  )
}
