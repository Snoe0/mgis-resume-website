'use client'

import Link from 'next/link'
import { use, useState } from 'react'
import { Check, Download, Eye, Loader2 } from 'lucide-react'
import TemplateCard from '@/components/TemplateCard'
import { getTemplateBySlug, templates } from '@/lib/templates'

const relatedTemplates = templates.filter(t => !['1', '3', '5'].includes(t.id)).slice(0, 3)

const features = [
  {
    title: 'ATS-Optimized',
    desc: 'Tested against Workday, Greenhouse, and Lever to ensure your resume is correctly parsed by applicant tracking systems.',
  },
  {
    title: 'Fully Editable',
    desc: 'Customize every section — fonts, colors, layout, and content — directly in the browser. No design software needed.',
  },
  {
    title: 'PDF & DOCX Export',
    desc: 'Download your resume in both PDF for applications and DOCX for further editing in Word or Google Docs.',
  },
]

const reviews = [
  {
    author: 'Alex M.',
    rating: 5,
    text: 'Landed a senior engineer role at a FAANG company two weeks after using this template. Clean and professional.',
    date: 'Jan 2026',
  },
  {
    author: 'Priya K.',
    rating: 5,
    text: "Best resume template I've ever used. Got callbacks from 4 out of 5 companies I applied to.",
    date: 'Dec 2025',
  },
  {
    author: 'David L.',
    rating: 4,
    text: 'Great template. Would love more color options, but the layout and typography are excellent.',
    date: 'Dec 2025',
  },
]

const REVIEW_CARD_CLASS = 'bg-bg-card border border-border-default rounded-xl p-6 flex flex-col gap-3'
const FEATURE_CARD_CLASS = 'bg-bg-card border border-border-default rounded-xl p-7 flex flex-col gap-3'

export default function TemplatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [activeTab, setActiveTab] = useState<'features' | 'reviews' | 'related'>('features')
  const [purchasing, setPurchasing] = useState(false)

  const template = getTemplateBySlug(slug) ?? {
    id: '1',
    slug: slug,
    title: 'Executive Pro',
    creator: 'Sarah Chen',
    creatorId: '1',
    price: 24,
    rating: 4.9,
    reviewCount: 128,
    category: 'Technology',
  }

  const handlePurchase = async () => {
    if (template.price === 'free') {
      window.location.href = `/checkout/success?free=true&templateId=${template.id}`
      return
    }
    setPurchasing(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: template.id }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Purchase error:', error)
      setPurchasing(false)
    }
  }

  const stars = Math.round(template.rating)

  return (
    <div className="bg-bg-base min-h-screen">

      {/* Breadcrumb */}
      <div className="max-w-[1280px] mx-auto px-20 pt-6">
        <div className="flex gap-2 items-center text-[13px]">
          {[
            { label: 'Home', href: '/' },
            { label: 'Browse', href: '/browse' },
            { label: template.category, href: '/browse' },
          ].map(({ label, href }) => (
            <span key={label} className="flex items-center gap-2">
              <Link
                href={href}
                className="text-text-secondary hover:text-text-primary no-underline transition-colors"
              >
                {label}
              </Link>
              <span className="text-text-muted">›</span>
            </span>
          ))}
          <span className="text-text-primary">{template.title}</span>
        </div>
      </div>

      {/* Two-column section */}
      <div className="max-w-[1280px] mx-auto px-20 pt-8 pb-16 grid grid-cols-[1fr_380px] gap-12 items-start">
        {/* Left: Resume preview */}
        <div className="flex flex-col gap-4">
          {/* Resume card */}
          <div className="bg-[#F8F8F5] border border-border-default rounded-xl p-12 min-h-[640px] flex flex-col gap-6 transition-colors">
            <div>
              <div className="font-serif text-[28px] text-[#0A0A0B] font-normal">
                Alexandra Johnson
              </div>
              <div className="text-accent text-sm font-medium mt-1">
                Senior Product Manager
              </div>
              <div className="text-[#666670] text-[13px] mt-1.5">
                alex.johnson@email.com · (555) 012-3456 · San Francisco, CA
              </div>
            </div>

            <div className="h-px bg-accent" />

            <div className="flex flex-col gap-4">
              <div className="text-[#0A0A0B] text-[11px] font-bold tracking-[2px] uppercase">
                Experience
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <div className="text-[#0A0A0B] text-sm font-semibold">
                    Senior Product Manager — Stripe
                  </div>
                  <div className="text-[#666670] text-[13px]">2022 – Present</div>
                </div>
                <div className="text-[#666670] text-[13px] leading-[1.6]">
                  Led 0→1 launch of Stripe Tax in EMEA markets. Grew revenue 40% YoY. Managed cross-functional team of 12 engineers and designers.
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <div className="text-[#0A0A0B] text-sm font-semibold">
                    Product Manager — Figma
                  </div>
                  <div className="text-[#666670] text-[13px]">2019 – 2022</div>
                </div>
                <div className="text-[#666670] text-[13px] leading-[1.6]">
                  Shipped FigJam from 0 to 4M users in 18 months. Drove 3× revenue growth on Enterprise tier.
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-[#0A0A0B] text-[11px] font-bold tracking-[2px] uppercase">
                Skills
              </div>
              <div className="flex flex-wrap gap-2">
                {['Product Strategy', 'Roadmapping', 'SQL', 'User Research', 'A/B Testing', 'Go-to-Market'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-[#E8E8E4] rounded-full text-[#666670] text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Purchase card */}
        <div className="sticky top-20 bg-bg-card border border-border-default rounded-2xl p-8 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-[28px] text-text-primary font-normal m-0">
              {template.title}
            </h1>
            <span className="text-text-secondary text-sm">
              by {template.creator}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-accent text-sm">
              {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
            </span>
            <span className="text-text-primary text-sm font-semibold">
              {template.rating.toFixed(1)}
            </span>
            <span className="text-text-secondary text-[13px]">
              ({template.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="font-serif text-[40px] text-text-primary font-normal">
              {template.price === 'free' ? 'Free' : `$${template.price}`}
            </span>
            {template.price !== 'free' && (
              <span className="text-text-secondary text-[13px]">one-time</span>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handlePurchase}
              disabled={purchasing}
              className={`p-[14px] text-text-primary rounded-lg border-none text-[15px] font-semibold flex items-center justify-center gap-2 transition-colors ${
                purchasing
                  ? 'bg-[#994700] cursor-not-allowed opacity-70'
                  : 'bg-accent hover:bg-accent-hover cursor-pointer'
              }`}
            >
              {purchasing ? (
                <><Loader2 size={16} className="animate-spin" /> Processing...</>
              ) : template.price === 'free' ? (
                <><Download size={16} /> Download Free Template</>
              ) : (
                <><Download size={16} /> Purchase Template — ${template.price}</>
              )}
            </button>
            <Link
              href={`/editor?template=${template.id}`}
              className="p-[14px] bg-transparent text-text-primary rounded-lg border border-border-default hover:border-text-secondary text-[15px] font-medium no-underline flex items-center justify-center gap-2 transition-colors"
            >
              <Eye size={16} /> Preview in Editor
            </Link>
          </div>

          <div className="flex flex-col gap-2.5 pt-2 border-t border-border-default">
            {[
              'ATS-Optimized formatting',
              'PDF + DOCX download',
              'Fully editable in browser',
              '30-day support included',
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-2.5">
                <Check size={14} color="#10B981" strokeWidth={2.5} />
                <span className="text-text-secondary text-[13px]">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-b border-border-default bg-bg-elevated">
        <div className="max-w-[1280px] mx-auto px-20 flex">
          {(['features', 'reviews', 'related'] as const).map((tab) => {
            const isActive = activeTab === tab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 bg-transparent border-none border-b-2 text-sm cursor-pointer capitalize transition-colors ${
                  isActive
                    ? 'border-accent text-text-primary font-semibold'
                    : 'border-transparent text-text-secondary font-normal'
                }`}
              >
                {tab}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-[1280px] mx-auto px-20 pt-12 pb-20">
        {activeTab === 'features' && (
          <div className="grid grid-cols-3 gap-6">
            {features.map(({ title, desc }) => (
              <div key={title} className={FEATURE_CARD_CLASS}>
                <div className="w-8 h-8 rounded-lg bg-[#FF5C0020] flex items-center justify-center">
                  <Check size={16} color="#FF5C00" />
                </div>
                <div className="text-text-primary text-base font-semibold">{title}</div>
                <div className="text-text-secondary text-sm leading-[1.6]">{desc}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="flex flex-col gap-4 max-w-[720px]">
            {reviews.map((review) => (
              <div key={review.author} className={REVIEW_CARD_CLASS}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-border-default flex items-center justify-center text-text-secondary text-sm">
                      {review.author[0]}
                    </div>
                    <div>
                      <div className="text-text-primary text-sm font-semibold">
                        {review.author}
                      </div>
                      <div className="text-accent text-xs">{'★'.repeat(review.rating)}</div>
                    </div>
                  </div>
                  <span className="text-text-muted text-xs">{review.date}</span>
                </div>
                <p className="text-text-secondary text-sm leading-[1.7] m-0">
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'related' && (
          <div className="grid grid-cols-3 gap-4">
            {relatedTemplates.map((t) => (
              <TemplateCard key={t.id} {...t} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
