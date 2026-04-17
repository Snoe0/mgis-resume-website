'use client'

import { useState } from 'react'
import { Upload, ArrowRight, Sparkles, FileText, ClipboardCopy, Download, Check, Target, TrendingUp, BookOpen } from 'lucide-react'

type Step = 'upload' | 'job' | 'results'
type Tab = 'optimization' | 'cover-letter'

const optimizationSuggestions = [
  {
    type: 'keyword' as const,
    label: 'Keyword Match',
    title: 'Add "cross-functional collaboration"',
    original: 'Worked with multiple teams to deliver product features.',
    improved: 'Led cross-functional collaboration across engineering, design, and product teams to deliver 12 features per quarter.',
  },
  {
    type: 'keyword' as const,
    label: 'Keyword Match',
    title: 'Include "data-driven decision making"',
    original: 'Used analytics to guide product decisions.',
    improved: 'Leveraged data-driven decision making using Mixpanel and Amplitude to increase user retention by 18%.',
  },
  {
    type: 'impact' as const,
    label: 'Stronger Impact',
    title: 'Quantify leadership scope',
    original: 'Managed the engineering team and delivered projects on time.',
    improved: 'Led 8-person engineering team across 3 time zones, delivering 14 projects on schedule — 20% faster than prior year.',
  },
  {
    type: 'missing' as const,
    label: 'Missing Skill',
    title: 'Add "Agile/Scrum" methodology',
    original: '',
    improved: 'The job listing requires Agile/Scrum experience. Add this to your Skills section: "Agile methodologies (Scrum, Kanban, SAFe)".',
  },
  {
    type: 'tailor' as const,
    label: 'Tailored Rewrite',
    title: 'Align summary with role',
    original: 'Experienced product manager with a background in engineering.',
    improved: 'Product leader with 6+ years driving SaaS growth through cross-functional collaboration and data-driven strategy — passionate about scaling teams and shipping customer-centric solutions.',
  },
]

const typeColors: Record<string, string> = {
  keyword: '#FF5C00',
  impact: '#10B981',
  missing: '#8B5CF6',
  tailor: '#3B82F6',
}

const mockCoverLetter = `Dear Hiring Manager,

I am writing to express my strong interest in the Senior Product Manager position at Acme Corp. With over six years of experience driving product strategy and cross-functional collaboration at high-growth SaaS companies, I am confident in my ability to contribute meaningfully to your team.

In my current role at TechStart Inc., I led an 8-person engineering team across three time zones, delivering 14 projects on schedule — 20% faster than the prior year. I leveraged data-driven decision making using Mixpanel and Amplitude to increase user retention by 18%, directly contributing to $2.4M in incremental ARR.

What excites me most about this opportunity is Acme Corp's commitment to building customer-centric products at scale. My experience owning end-to-end product roadmaps for 3 product lines, combined with my background in Agile methodologies (Scrum and SAFe), positions me well to hit the ground running.

I would welcome the opportunity to discuss how my experience in cross-functional leadership, data-driven strategy, and SaaS growth can support Acme Corp's next chapter of product innovation.

Thank you for your consideration.

Sincerely,
Alexandra Johnson`

const INPUT_CLASS = 'w-full px-4 py-3 bg-bg-base border border-border-default rounded-lg text-text-primary text-sm outline-none box-border focus:border-accent transition-colors'

export default function OptimizerPage() {
  const [step, setStep] = useState<Step>('upload')
  const [activeTab, setActiveTab] = useState<Tab>('optimization')
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [appliedSet, setAppliedSet] = useState<Set<number>>(new Set())
  const [copied, setCopied] = useState(false)

  const toggleApplied = (i: number) => {
    setAppliedSet((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(mockCoverLetter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  /* ── Step 1: Upload ── */
  if (step === 'upload') {
    return (
      <div className="bg-bg-base min-h-screen flex items-center justify-center p-20">
        <div className="bg-bg-card border border-border-default rounded-[20px] p-14 text-center max-w-[480px] w-full flex flex-col items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#FF5C0020] flex items-center justify-center">
            <Sparkles size={28} color="#FF5C00" />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-[28px] text-text-primary font-normal m-0">
              Optimize My Resume
            </h1>
            <p className="text-text-secondary text-[15px] leading-relaxed m-0">
              Upload your resume, paste a job listing, and our AI will tailor your resume and generate a matching cover letter.
            </p>
          </div>

          <div
            className="w-full p-8 border-[1.5px] border-dashed border-border-default hover:border-accent rounded-xl flex flex-col items-center gap-3 cursor-pointer transition-colors"
            onClick={() => setStep('job')}
          >
            <Upload size={24} color="#6B6B70" />
            <div className="flex flex-col gap-1 text-center">
              <span className="text-text-primary text-sm font-medium">
                Drop your resume here
              </span>
              <span className="text-text-muted text-xs">
                PDF or DOCX · up to 5MB
              </span>
            </div>
          </div>

          <button
            onClick={() => setStep('job')}
            className="w-full py-[14px] bg-accent hover:bg-accent-hover border-none rounded-lg text-text-primary text-[15px] font-semibold cursor-pointer flex items-center justify-center gap-2 transition-colors"
          >
            Upload Resume <ArrowRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  /* ── Step 2: Job Listing ── */
  if (step === 'job') {
    return (
      <div className="bg-bg-base min-h-screen flex items-center justify-center p-20">
        <div className="bg-bg-card border border-border-default rounded-[20px] p-14 max-w-[560px] w-full flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF620] flex items-center justify-center flex-shrink-0">
              <FileText size={22} color="#8B5CF6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl text-text-primary font-normal m-0 mb-1">
                Paste the Job Listing
              </h1>
              <p className="text-text-secondary text-sm m-0">
                We&apos;ll match your resume to this role and generate a cover letter.
              </p>
            </div>
          </div>

          {/* Uploaded file indicator */}
          <div className="flex items-center gap-2.5 px-4 py-3 bg-[#10B98110] border border-[#10B98130] rounded-lg">
            <Check size={16} color="#10B981" />
            <span className="text-success text-[13px] font-medium">
              alexandra_johnson_resume.pdf uploaded
            </span>
            <button
              onClick={() => setStep('upload')}
              className="ml-auto bg-transparent border-none text-text-secondary text-xs cursor-pointer underline"
            >
              Change
            </button>
          </div>

          {/* Job title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-text-primary text-[13px] font-semibold">
              Job Title
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Product Manager"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className={INPUT_CLASS}
            />
          </div>

          {/* Job description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-text-primary text-[13px] font-semibold">
              Job Description
            </label>
            <textarea
              placeholder="Paste the full job listing here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              className={`${INPUT_CLASS} resize-y leading-relaxed`}
            />
          </div>

          <button
            onClick={() => setStep('results')}
            className="w-full py-[14px] bg-accent hover:bg-accent-hover border-none rounded-lg text-text-primary text-[15px] font-semibold cursor-pointer flex items-center justify-center gap-2 transition-colors"
          >
            <Sparkles size={16} /> Optimize & Generate Cover Letter
          </button>

          <p className="text-text-muted text-xs text-center m-0 leading-normal">
            This will use one AI credit. Results include tailored resume suggestions and a personalized cover letter.
          </p>
        </div>
      </div>
    )
  }

  /* ── Step 3: Results ── */
  return (
    <div className="bg-bg-base min-h-screen pb-[72px]">
      {/* Score bar */}
      <div className="bg-bg-elevated border-b border-border-default px-20 py-8">
        <div className="max-w-[1280px] mx-auto flex flex-col gap-7">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-serif text-2xl text-text-primary font-normal m-0 mb-1">
                Optimization Results
              </h1>
              <span className="text-text-secondary text-[13px]">
                alexandra_johnson_resume.pdf → Senior Product Manager at Acme Corp
              </span>
            </div>
            <button
              onClick={() => {
                setStep('upload')
                setAppliedSet(new Set())
                setActiveTab('optimization')
                setJobTitle('')
                setJobDescription('')
              }}
              className="px-4 py-2 bg-transparent border border-border-default rounded-md text-text-secondary text-[13px] cursor-pointer"
            >
              Start Over
            </button>
          </div>

          <div className="flex items-center gap-16">
            {/* Match score circle */}
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-full border-[3px] border-accent flex items-center justify-center flex-col">
                <span className="font-serif text-2xl text-text-primary leading-none">
                  74%
                </span>
              </div>
              <span className="text-text-secondary text-xs">Job Match</span>
            </div>

            {/* Category bars */}
            <div className="flex-1 flex flex-col gap-4">
              {[
                { label: 'Keyword Match', value: 68, color: '#FF5C00', icon: Target },
                { label: 'Experience Fit', value: 85, color: '#10B981', icon: TrendingUp },
                { label: 'Skills Alignment', value: 72, color: '#8B5CF6', icon: BookOpen },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="text-text-secondary text-[13px] w-[140px] flex-shrink-0">
                    {label}
                  </span>
                  <div className="flex-1 h-1.5 bg-border-default rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${value}%`, backgroundColor: color }}
                    />
                  </div>
                  <span className="text-text-primary text-[13px] font-semibold w-9 flex-shrink-0">
                    {value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-[1280px] mx-auto px-20">
        <div className="flex gap-0 border-b border-border-default mt-8">
          {([
            { key: 'optimization' as Tab, label: 'Resume Optimization', count: optimizationSuggestions.length },
            { key: 'cover-letter' as Tab, label: 'Cover Letter' },
          ]).map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 bg-transparent border-none border-b-2 text-sm cursor-pointer flex items-center gap-2 transition-colors ${
                  isActive
                    ? 'border-accent text-text-primary font-semibold'
                    : 'border-transparent text-text-secondary font-normal'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-[#FF5C0020] text-accent' : 'bg-border-default text-text-secondary'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-[1280px] mx-auto px-20 py-8">
        {activeTab === 'optimization' ? (
          <div className="flex flex-col gap-4">
            {optimizationSuggestions.map((s, i) => (
              <div
                key={i}
                className={`bg-bg-card border rounded-xl p-6 flex flex-col gap-3 transition-colors ${
                  appliedSet.has(i) ? 'border-[#10B98140]' : 'border-border-default'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                    style={{ backgroundColor: `${typeColors[s.type]}20`, color: typeColors[s.type] }}
                  >
                    {s.label}
                  </span>
                  {appliedSet.has(i) && <Check size={14} color="#10B981" />}
                </div>

                <div className="text-text-primary text-sm font-semibold">
                  {s.title}
                </div>

                {s.original && (
                  <div className="text-[13px] text-text-secondary leading-relaxed">
                    <span className="text-text-muted">Before: </span>{s.original}
                  </div>
                )}

                <div className="text-[13px] text-text-secondary leading-relaxed">
                  <span className="text-success">{s.original ? 'After: ' : '→ '}</span>{s.improved}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleApplied(i)}
                    className={`flex-1 p-2 border-none rounded-md text-text-primary text-xs font-semibold cursor-pointer transition-colors ${
                      appliedSet.has(i) ? 'bg-border-default' : 'bg-accent'
                    }`}
                  >
                    {appliedSet.has(i) ? 'Undo' : 'Apply'}
                  </button>
                  <button className="px-3 py-2 bg-transparent border border-border-default rounded-md text-text-secondary text-xs cursor-pointer">
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Cover Letter tab */
          <div className="bg-bg-card border border-border-default rounded-xl p-10 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <span className="text-text-primary text-base font-semibold">
                Generated Cover Letter
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className={`px-3.5 py-2 bg-transparent border border-border-default rounded-md text-[13px] cursor-pointer flex items-center gap-1.5 transition-colors ${
                    copied ? 'text-success' : 'text-text-secondary'
                  }`}
                >
                  {copied ? <Check size={14} /> : <ClipboardCopy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button className="px-3.5 py-2 bg-accent hover:bg-accent-hover border-none rounded-md text-text-primary text-[13px] font-semibold cursor-pointer flex items-center gap-1.5 transition-colors">
                  <Download size={14} /> Export PDF
                </button>
              </div>
            </div>

            {/* Letter content */}
            <div className="bg-white rounded-lg p-12 text-sm text-[#1a1a1a] leading-[1.8] whitespace-pre-line">
              {mockCoverLetter}
            </div>
          </div>
        )}
      </div>

      {/* Sticky export bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-bg-elevated border-t border-border-default px-20 py-4 z-10">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center">
          <span className="text-text-secondary text-sm">
            {appliedSet.size} of {optimizationSuggestions.length} suggestions applied
          </span>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => {
                setStep('upload')
                setAppliedSet(new Set())
                setActiveTab('optimization')
                setJobTitle('')
                setJobDescription('')
              }}
              className="bg-transparent border-none text-text-secondary text-sm cursor-pointer underline"
            >
              Start Over
            </button>
            <button className="px-6 py-2.5 bg-accent hover:bg-accent-hover border-none rounded-lg text-text-primary text-sm font-semibold cursor-pointer flex items-center gap-2 transition-colors">
              Export Optimized Resume <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
