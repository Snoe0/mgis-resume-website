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
            <Sparkles size={28} color="#FF5C00" />
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
              Optimize My Resume
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
              Upload your resume, paste a job listing, and our AI will tailor your resume and generate a matching cover letter.
            </p>
          </div>

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
            onClick={() => setStep('job')}
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
            onClick={() => setStep('job')}
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
            Upload Resume <ArrowRight size={16} />
          </button>
        </div>
      </div>
    )
  }

  /* ── Step 2: Job Listing ── */
  if (step === 'job') {
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
            maxWidth: '560px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#8B5CF620',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <FileText size={22} color="#8B5CF6" />
            </div>
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
                Paste the Job Listing
              </h1>
              <p
                style={{
                  color: '#8B8B90',
                  fontSize: '14px',
                  margin: '0',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                We&apos;ll match your resume to this role and generate a cover letter.
              </p>
            </div>
          </div>

          {/* Uploaded file indicator */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              backgroundColor: '#10B98110',
              border: '1px solid #10B98130',
              borderRadius: '8px',
            }}
          >
            <Check size={16} color="#10B981" />
            <span style={{ color: '#10B981', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif', fontWeight: '500' }}>
              alexandra_johnson_resume.pdf uploaded
            </span>
            <button
              onClick={() => setStep('upload')}
              style={{
                marginLeft: 'auto',
                background: 'none',
                border: 'none',
                color: '#8B8B90',
                fontSize: '12px',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                textDecoration: 'underline',
              }}
            >
              Change
            </button>
          </div>

          {/* Job title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label
              style={{
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              Job Title
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Product Manager"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#0A0A0B',
                border: '1px solid #1F1F23',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                outline: 'none',
                transition: 'border-color 0.15s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#FF5C00')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#1F1F23')}
            />
          </div>

          {/* Job description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label
              style={{
                color: '#FFFFFF',
                fontSize: '13px',
                fontWeight: '600',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              Job Description
            </label>
            <textarea
              placeholder="Paste the full job listing here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={8}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#0A0A0B',
                border: '1px solid #1F1F23',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontSize: '14px',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                outline: 'none',
                resize: 'vertical',
                lineHeight: '1.6',
                transition: 'border-color 0.15s',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#FF5C00')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#1F1F23')}
            />
          </div>

          <button
            onClick={() => setStep('results')}
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
            <Sparkles size={16} /> Optimize & Generate Cover Letter
          </button>

          <p
            style={{
              color: '#6B6B70',
              fontSize: '12px',
              textAlign: 'center',
              margin: '0',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              lineHeight: '1.5',
            }}
          >
            This will use one AI credit. Results include tailored resume suggestions and a personalized cover letter.
          </p>
        </div>
      </div>
    )
  }

  /* ── Step 3: Results ── */
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
                Optimization Results
              </h1>
              <span style={{ color: '#8B8B90', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
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
              Start Over
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '64px' }}>
            {/* Match score circle */}
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
                  74%
                </span>
              </div>
              <span style={{ color: '#8B8B90', fontSize: '12px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>Job Match</span>
            </div>

            {/* Category bars */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Keyword Match', value: 68, color: '#FF5C00', icon: Target },
                { label: 'Experience Fit', value: 85, color: '#10B981', icon: TrendingUp },
                { label: 'Skills Alignment', value: 72, color: '#8B5CF6', icon: BookOpen },
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

      {/* Tabs */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 80px' }}>
        <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid #1F1F23', marginTop: '32px' }}>
          {([
            { key: 'optimization' as Tab, label: 'Resume Optimization', count: optimizationSuggestions.length },
            { key: 'cover-letter' as Tab, label: 'Cover Letter' },
          ]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: activeTab === tab.key ? '2px solid #FF5C00' : '2px solid transparent',
                color: activeTab === tab.key ? '#FFFFFF' : '#8B8B90',
                fontSize: '14px',
                fontWeight: activeTab === tab.key ? '600' : '400',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'color 0.15s, border-color 0.15s',
              }}
            >
              {tab.label}
              {tab.count !== undefined && (
                <span
                  style={{
                    backgroundColor: activeTab === tab.key ? '#FF5C0020' : '#1F1F23',
                    color: activeTab === tab.key ? '#FF5C00' : '#8B8B90',
                    fontSize: '11px',
                    fontWeight: '600',
                    padding: '2px 8px',
                    borderRadius: '100px',
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 80px' }}>
        {activeTab === 'optimization' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {optimizationSuggestions.map((s, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#141417',
                  border: `1px solid ${appliedSet.has(i) ? '#10B98140' : '#1F1F23'}`,
                  borderRadius: '12px',
                  padding: '24px',
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
                  <div style={{ fontSize: '13px', color: '#8B8B90', fontFamily: 'var(--font-inter), Inter, sans-serif', lineHeight: '1.6' }}>
                    <span style={{ color: '#6B6B70' }}>Before: </span>{s.original}
                  </div>
                )}

                <div style={{ fontSize: '13px', color: '#8B8B90', fontFamily: 'var(--font-inter), Inter, sans-serif', lineHeight: '1.6' }}>
                  <span style={{ color: '#10B981' }}>{s.original ? 'After: ' : '→ '}</span>{s.improved}
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
        ) : (
          /* Cover Letter tab */
          <div
            style={{
              backgroundColor: '#141417',
              border: '1px solid #1F1F23',
              borderRadius: '12px',
              padding: '40px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: '600', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Generated Cover Letter
              </span>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={handleCopy}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: 'transparent',
                    border: '1px solid #1F1F23',
                    borderRadius: '6px',
                    color: copied ? '#10B981' : '#8B8B90',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'color 0.15s, border-color 0.15s',
                  }}
                >
                  {copied ? <Check size={14} /> : <ClipboardCopy size={14} />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  style={{
                    padding: '8px 14px',
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
                  <Download size={14} /> Export PDF
                </button>
              </div>
            </div>

            {/* Letter content */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                padding: '48px',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontSize: '14px',
                color: '#1a1a1a',
                lineHeight: '1.8',
                whiteSpace: 'pre-line',
              }}
            >
              {mockCoverLetter}
            </div>
          </div>
        )}
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
            {appliedSet.size} of {optimizationSuggestions.length} suggestions applied
          </span>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={() => {
                setStep('upload')
                setAppliedSet(new Set())
                setActiveTab('optimization')
                setJobTitle('')
                setJobDescription('')
              }}
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
              Export Optimized Resume <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
