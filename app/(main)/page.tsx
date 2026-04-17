import Link from 'next/link'
import { ArrowRight, FileText, Zap, TrendingUp } from 'lucide-react'
import TemplateCard from '@/components/TemplateCard'
import { templates as featuredTemplates } from '@/lib/templates'
import HomeFAQ, { type FAQItem } from './_components/HomeFAQ'

const faqs: FAQItem[] = [
  {
    q: 'Are the templates ATS-compatible?',
    a: 'Yes. Every template is tested against major ATS platforms including Workday, Greenhouse, and Lever. Clean formatting and standard section headings ensure your resume is parsed correctly.',
  },
  {
    q: 'Can I edit the template after purchase?',
    a: 'Absolutely. All templates are fully editable in our browser-based editor. You can change fonts, colors, section order, and content without any design software.',
  },
  {
    q: 'What file formats do I get?',
    a: 'You receive PDF (for applications) and DOCX (for further editing in Word or Google Docs). Both are included in every purchase.',
  },
  {
    q: 'Is there a free option?',
    a: 'Yes. Several templates are permanently free. Filter by "Free" on the Browse page to see all available free templates.',
  },
  {
    q: 'How does the AI Reviewer work?',
    a: 'Upload your resume and our AI analyzes it for ATS compatibility, clarity, impact, and missing sections. You receive an overall score and specific suggestions with before/after examples.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to create a professional resume with ResumeForge',
  description: 'Three simple steps from template selection to download.',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: 'Choose Your Template',
      text: 'Browse our curated collection and pick a design that matches your style and industry.',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: 'Customize & Edit',
      text: 'Use our intuitive editor to personalize your resume with your information and experience.',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: 'Download & Apply',
      text: 'Export your polished resume and start applying to your dream jobs with confidence.',
    },
  ],
}

/**
 * Homepage is a pure server component:
 * - No 'use client', no useState, no framer-motion.
 * - All hover effects are pure Tailwind hover: utilities.
 * - FAQ uses native <details>/<summary> (see ./_components/HomeFAQ.tsx).
 * - JSON-LD (FAQPage + HowTo) preserved.
 */
export default function HomePage() {
  return (
    <div className="bg-bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* Hero */}
      <section className="container-page pt-[120px] pb-[100px] text-center">
        <div className="flex flex-col items-center gap-[24px]">
          {/* Badge */}
          <div>
            <span className="inline-flex items-center gap-[8px] px-[16px] py-[6px] bg-[#FF5C0015] border border-[#FF5C0040] rounded-[100px] text-accent text-[13px] font-medium">
              ✦ Over 10,000 professionals hired
            </span>
          </div>

          {/* H1 */}
          <h1 className="font-serif text-[clamp(40px,6vw,64px)] text-text-primary font-normal leading-[1.1] max-w-[800px] m-0">
            Stand Out With a Resume That Gets You Hired
          </h1>

          {/* Subtext */}
          <p className="text-text-secondary text-[18px] leading-[1.6] max-w-[560px] m-0">
            Choose from hundreds of professionally designed templates.
            Customize in our editor, review with AI, and land your dream job.
          </p>

          {/* CTAs */}
          <div className="flex gap-[12px] flex-wrap justify-center">
            <Link
              href="/browse"
              className="inline-flex items-center gap-[8px] px-[24px] py-[12px] bg-accent hover:bg-accent-hover transition-colors text-text-primary rounded-[8px] text-[15px] font-semibold no-underline"
            >
              Browse Templates <ArrowRight size={16} />
            </Link>
            <Link
              href="/browse?filter=free"
              className="inline-flex items-center px-[24px] py-[12px] bg-transparent text-text-primary border border-border-default hover:border-text-secondary transition-colors rounded-[8px] text-[15px] font-medium no-underline"
            >
              Start Free
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex gap-[32px] flex-wrap justify-center mt-[8px]">
            {['ATS-Friendly', 'Easy Customization', 'Instant Download'].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-[8px] text-text-secondary text-[13px]"
              >
                <span className="w-[6px] h-[6px] rounded-full bg-success shrink-0" />
                {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Templates */}
      <section className="container-page py-[80px]">
        <div className="text-center mb-[48px]">
          <h2 className="font-serif text-[36px] text-text-primary font-normal mt-0 mb-[12px]">
            Featured Templates
          </h2>
          <p className="text-text-secondary text-[16px] m-0">
            Handpicked by our design team. Used by thousands to land great jobs.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-[16px]">
          {featuredTemplates.map((template) => (
            <TemplateCard key={template.id} {...template} />
          ))}
        </div>

        <div className="text-center mt-[40px]">
          <Link
            href="/browse"
            className="inline-flex items-center gap-[8px] px-[24px] py-[10px] border border-border-default hover:border-text-secondary transition-colors rounded-[8px] text-text-primary text-[14px] no-underline"
          >
            View All Templates <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="p-[80px] bg-bg-elevated border-t border-b border-border-default">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-[56px]">
            <h2 className="font-serif text-[36px] text-text-primary font-normal mt-0 mb-[12px]">
              How It Works
            </h2>
            <p className="text-text-secondary text-[16px] m-0">
              Three simple steps to your perfect resume
            </p>
          </div>

          <div className="grid grid-cols-3 gap-[24px]">
            {[
              {
                step: '01',
                icon: <FileText size={28} color="#FF5C00" />,
                title: 'Choose Your Template',
                desc: 'Browse our curated collection and pick a design that matches your style and industry.',
              },
              {
                step: '02',
                icon: <Zap size={28} color="#FF5C00" />,
                title: 'Customize & Edit',
                desc: 'Use our intuitive editor to personalize your resume with your information and experience.',
              },
              {
                step: '03',
                icon: <TrendingUp size={28} color="#FF5C00" />,
                title: 'Download & Apply',
                desc: 'Export your polished resume and start applying to your dream jobs with confidence.',
              },
            ].map(({ step, icon, title, desc }) => (
              <div
                key={step}
                className="bg-bg-card border border-border-default rounded-[12px] p-[32px] flex flex-col gap-[16px]"
              >
                <div className="flex justify-between items-start">
                  {icon}
                  <span className="text-accent text-[12px] font-bold tracking-[1px]">
                    {step}
                  </span>
                </div>
                <h3 className="text-text-primary text-[17px] font-semibold m-0">
                  {title}
                </h3>
                <p className="text-text-secondary text-[14px] leading-[1.6] m-0">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator CTA */}
      <section
        className="p-[80px] border-b border-border-default"
        style={{ background: 'linear-gradient(135deg, #111113 0%, #1a1012 100%)' }}
      >
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="font-serif text-[40px] text-text-primary font-normal mt-0 mb-[16px]">
            Are You a Designer?
          </h2>
          <p className="text-text-secondary text-[17px] leading-[1.6] max-w-[520px] mx-auto mt-0 mb-[32px]">
            Join our creator community and earn money by selling your resume
            templates to thousands of professionals.
          </p>

          <div className="flex gap-[12px] justify-center mb-[64px]">
            <Link
              href="/sell"
              className="px-[28px] py-[12px] bg-accent hover:bg-accent-hover transition-colors text-text-primary rounded-[8px] text-[15px] font-semibold no-underline"
            >
              Become a Creator
            </Link>
            <Link
              href="/browse"
              className="px-[28px] py-[12px] bg-transparent text-text-primary border border-border-default hover:border-text-secondary transition-colors rounded-[8px] text-[15px] font-medium no-underline"
            >
              Browse Templates
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-0 max-w-[600px] mx-auto">
            {[
              { num: '10K+', label: 'Active Users' },
              { num: '500+', label: 'Templates' },
              { num: '$2M+', label: 'Paid to Creators' },
            ].map(({ num, label }, i, arr) => (
              <div
                key={label}
                className={`text-center px-[24px] ${i < arr.length - 1 ? 'border-r border-border-default' : ''}`}
              >
                <div className="font-serif text-[40px] text-text-primary leading-none mb-[8px]">
                  {num}
                </div>
                <div className="text-text-secondary text-[13px]">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-page p-[80px]">
        <div className="text-center mb-[48px]">
          <h2 className="font-serif text-[36px] text-text-primary font-normal mt-0 mb-[12px]">
            Frequently Asked Questions
          </h2>
        </div>

        <HomeFAQ faqs={faqs} />
      </section>
    </div>
  )
}
