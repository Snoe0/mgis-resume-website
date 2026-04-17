'use client'

import { useState, useEffect } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import TemplateCard from '@/components/TemplateCard'
import { fetchTemplates, type Template } from '@/lib/templates'

const industryFilters = ['Technology', 'Design', 'Business', 'Healthcare', 'Media', 'Science']
const experienceFilters = ['Entry Level', 'Mid-Level', 'Senior']

export default function BrowsePage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndustry, setActiveIndustry] = useState<string[]>([])
  const [activeExp, setActiveExp] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const PAGE_SIZE = 9

  useEffect(() => {
    fetchTemplates()
      .then(setTemplates)
      .finally(() => setLoading(false))
  }, [])

  const toggleFilter = (list: string[], setList: (v: string[]) => void, value: string) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const filtered = templates.filter((t) => {
    const industryMatch = activeIndustry.length === 0 || activeIndustry.includes(t.category ?? '')
    return industryMatch
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
  const activeFilters = [...activeIndustry, ...activeExp]

  return (
    <div className="bg-bg-base min-h-screen flex flex-col">
      <div className="flex flex-1">

        {/* ── Sidebar (desktop) ── */}
        <aside className="hidden md:flex w-[280px] flex-shrink-0 bg-bg-elevated border-r border-border-default px-6 py-8 flex-col gap-8 self-stretch">
          <span className="text-text-primary text-base font-semibold">
            Filter Templates
          </span>

          <FilterGroup
            label="INDUSTRY"
            options={industryFilters}
            active={activeIndustry}
            onToggle={(v) => { toggleFilter(activeIndustry, setActiveIndustry, v); setCurrentPage(1) }}
          />

          <FilterGroup
            label="EXPERIENCE LEVEL"
            options={experienceFilters}
            active={activeExp}
            onToggle={(v) => { toggleFilter(activeExp, setActiveExp, v); setCurrentPage(1) }}
          />
        </aside>

        {/* ── Filter drawer (mobile) ── */}
        {filtersOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/60"
              onClick={() => setFiltersOpen(false)}
              aria-hidden="true"
            />
            <aside className="relative w-[85%] max-w-[320px] bg-bg-elevated border-r border-border-default px-6 py-6 flex flex-col gap-6 overflow-y-auto">
              <div className="flex items-center justify-between">
                <span className="text-text-primary text-base font-semibold">
                  Filter Templates
                </span>
                <button
                  onClick={() => setFiltersOpen(false)}
                  aria-label="Close filters"
                  className="text-text-secondary bg-transparent border-0 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
              <FilterGroup
                label="INDUSTRY"
                options={industryFilters}
                active={activeIndustry}
                onToggle={(v) => { toggleFilter(activeIndustry, setActiveIndustry, v); setCurrentPage(1) }}
              />
              <FilterGroup
                label="EXPERIENCE LEVEL"
                options={experienceFilters}
                active={activeExp}
                onToggle={(v) => { toggleFilter(activeExp, setActiveExp, v); setCurrentPage(1) }}
              />
            </aside>
          </div>
        )}

        {/* ── Main ── */}
        <main className="flex-1 px-6 py-6 md:px-10 md:py-8 flex flex-col gap-6 min-w-0">
          {/* Top bar */}
          <div className="flex justify-between items-end gap-3 flex-wrap">
            <div className="flex flex-col gap-1">
              <h1 className="font-serif text-3xl md:text-4xl text-text-primary font-normal m-0">
                Browse Templates
              </h1>
              <span className="text-text-secondary text-sm">
                {loading ? 'Loading…' : `Showing ${filtered.length} template${filtered.length !== 1 ? 's' : ''}`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiltersOpen(true)}
                aria-label="Open filters"
                className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-bg-card border border-border-default rounded-md text-text-secondary text-[13px] cursor-pointer"
              >
                <SlidersHorizontal size={14} /> Filters
                {activeFilters.length > 0 && (
                  <span className="inline-flex items-center justify-center w-[18px] h-[18px] rounded-full bg-accent text-text-primary text-[11px] font-semibold">
                    {activeFilters.length}
                  </span>
                )}
              </button>
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-bg-card border border-border-default rounded-md">
                <span className="text-text-secondary text-[13px]">Sort: Most Popular</span>
                <span className="text-text-secondary text-[10px]">▾</span>
              </div>
            </div>
          </div>

          {/* Active filter pills */}
          {activeFilters.length > 0 && (
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-text-muted text-[13px]">Active:</span>
              {activeFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    if (activeIndustry.includes(filter)) toggleFilter(activeIndustry, setActiveIndustry, filter)
                    else toggleFilter(activeExp, setActiveExp, filter)
                    setCurrentPage(1)
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FF5C0015] border border-[#FF5C0040] rounded-full text-accent text-xs cursor-pointer"
                >
                  {filter} <span className="text-sm">×</span>
                </button>
              ))}
            </div>
          )}

          {/* Card grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-bg-card border border-border-default rounded-xl overflow-hidden animate-pulse">
                  <div className="h-[220px] bg-[#1F1F23]" />
                  <div className="p-4 flex flex-col gap-2">
                    <div className="h-4 bg-[#1F1F23] rounded w-3/4" />
                    <div className="h-3 bg-[#1F1F23] rounded w-1/2" />
                    <div className="h-3 bg-[#1F1F23] rounded w-full mt-1" />
                  </div>
                </div>
              ))}
            </div>
          ) : paginated.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 py-20">
              <span className="text-text-secondary text-lg">No templates match your filters</span>
              <button
                onClick={() => { setActiveIndustry([]); setActiveExp([]); setCurrentPage(1) }}
                className="text-accent text-sm underline cursor-pointer bg-transparent border-none"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginated.map((t) => (
                <TemplateCard key={t.id} {...t} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center gap-1 pt-2">
              <PaginationBtn label="←" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} active={false} />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <PaginationBtn key={page} label={String(page)} active={page === currentPage} onClick={() => setCurrentPage(page)} />
              ))}
              <PaginationBtn label="→" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} active={false} />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function PaginationBtn({ label, active, disabled, onClick }: { label: string; active: boolean; disabled?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-2 rounded-md text-sm cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        active
          ? 'bg-accent border border-transparent text-white font-semibold'
          : 'bg-bg-card border border-border-default text-text-secondary font-normal'
      }`}
    >
      {label}
    </button>
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
        <label key={option} className="flex items-center gap-2.5 cursor-pointer">
          <span
            onClick={() => onToggle(option)}
            className={`w-4 h-4 rounded-[3px] border-[1.5px] border-border-default flex-shrink-0 inline-block cursor-pointer transition-colors ${
              active.includes(option) ? 'bg-accent' : 'bg-bg-card'
            }`}
          />
          <span className="text-text-secondary text-sm">{option}</span>
        </label>
      ))}
    </div>
  )
}
