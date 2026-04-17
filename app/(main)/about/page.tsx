import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Target, Palette, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About ResumeForge',
  description:
    'ResumeForge is building the resume marketplace for the AI era — ATS-obsessed, designer-first, and AI-augmented. Learn our mission and story.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About ResumeForge',
    description:
      'Building the resume marketplace for the AI era — ATS-obsessed, designer-first, AI-augmented.',
    url: '/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ResumeForge',
    description:
      'Building the resume marketplace for the AI era — ATS-obsessed, designer-first, AI-augmented.',
  },
}

const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://mgis-resume-website-sigma.vercel.app'

export default function AboutPage() {
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'About ResumeForge',
    url: `${siteUrl}/about`,
    description:
      'ResumeForge is a resume template marketplace with a browser-based editor and AI-powered resume optimizer.',
    mainEntity: {
      '@type': 'Organization',
      name: 'ResumeForge',
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      description:
        'A resume template marketplace with a browser-based editor and AI-powered resume optimizer.',
      sameAs: ['https://github.com/Snoe0/mgis-resume-website'],
    },
  }

  const values = [
    {
      icon: <Target size={28} color="#FF5C00" />,
      title: 'ATS-Obsessed',
      desc: 'Every template is tested against real ATS platforms. No fancy columns that break parsers. No hidden tables that confuse Workday. Just resumes that get read.',
    },
    {
      icon: <Palette size={28} color="#FF5C00" />,
      title: 'Designer-First',
      desc: 'Independent designers built these templates. We pay them 80% of every sale because great design is skilled work — not a commodity.',
    },
    {
      icon: <Sparkles size={28} color="#FF5C00" />,
      title: 'AI-Augmented',
      desc: 'Our optimizer reviews your resume against real job descriptions, flags keyword gaps, and rewrites weak impact statements — instantly.',
    },
  ]

  const stats = [
    { num: '10K+', label: 'Active Users' },
    { num: '500+', label: 'Templates' },
    { num: '$2M+', label: 'Paid to Creators' },
  ]

  return (
    <div className="bg-bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Hero */}
      <section className="container-page pt-[120px] pb-[80px] text-center">
        <span className="inline-flex items-center gap-[8px] px-[16px] py-[6px] bg-[#FF5C0015] border border-[#FF5C0040] rounded-[100px] text-accent text-[13px] font-medium mb-[24px]">
          ✦ Our Story
        </span>
        <h1 className="font-serif text-[clamp(40px,6vw,64px)] text-text-primary font-normal leading-[1.1] max-w-[860px] mx-auto mt-0 mb-[24px]">
          Building the resume marketplace for the AI era
        </h1>
        <p className="text-text-secondary text-[18px] leading-[1.6] max-w-[640px] mx-auto m-0">
          We help job seekers stand out with professionally designed,
          ATS-optimized resumes — and we pay the designers behind them fairly.
        </p>
      </section>

      {/* Story */}
      <section className="px-[80px] pb-[80px] max-w-[860px] mx-auto">
        <div className="flex flex-col gap-[24px]">
          <p className="text-text-secondary text-[17px] leading-[1.75] m-0">
            The ATS landscape is broken. Job seekers spend hours crafting
            resumes that never reach a human recruiter because applicant
            tracking systems silently discard them for using the wrong font, a
            stray icon, or a two-column layout. Meanwhile, off-the-shelf resume
            builders churn out the same generic PDFs everyone else submits.
          </p>
          <p className="text-text-secondary text-[17px] leading-[1.75] m-0">
            We started ResumeForge because designers who understand both
            typography and Workday deserve to get paid for their work — and
            candidates deserve resumes that are beautiful, readable by humans,
            and parseable by machines. Every template in our marketplace is
            reviewed for ATS compatibility before it ships. Creators keep 80%
            of every sale.
          </p>
          <p className="text-text-secondary text-[17px] leading-[1.75] m-0">
            AI changes the game. Tools that used to require a professional
            resume coach — keyword gap analysis, impact rewriting, tailored
            cover letters — now take seconds. We believe the bar for resume
            quality just went up, and everyone should have the tools to clear
            it.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="p-[80px] bg-bg-elevated border-t border-b border-border-default">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-center mb-[56px]">
            <h2 className="font-serif text-[36px] text-text-primary font-normal mt-0 mb-[12px]">
              What we believe
            </h2>
            <p className="text-text-secondary text-[16px] m-0">
              Three principles that guide every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-[24px]">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-bg-card border border-border-default rounded-[12px] p-[32px] flex flex-col gap-[16px]"
              >
                {v.icon}
                <h3 className="text-text-primary text-[17px] font-semibold m-0">
                  {v.title}
                </h3>
                <p className="text-text-secondary text-[14px] leading-[1.6] m-0">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By the numbers */}
      <section className="container-page p-[80px]">
        <div className="text-center mb-[56px]">
          <h2 className="font-serif text-[36px] text-text-primary font-normal mt-0 mb-[12px]">
            By the numbers
          </h2>
          <p className="text-text-secondary text-[16px] m-0">
            The impact we&apos;ve had so far.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-0 max-w-[720px] mx-auto">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`text-center px-[24px] ${i < stats.length - 1 ? 'border-r border-border-default' : ''}`}
            >
              <div className="font-serif text-[48px] text-text-primary leading-none mb-[8px]">
                {s.num}
              </div>
              <div className="text-text-secondary text-[13px]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="p-[80px] border-t border-border-default"
        style={{ background: 'linear-gradient(135deg, #111113 0%, #1a1012 100%)' }}
      >
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="font-serif text-[40px] text-text-primary font-normal mt-0 mb-[16px]">
            Ready to get started?
          </h2>
          <p className="text-text-secondary text-[17px] leading-[1.6] max-w-[520px] mx-auto mt-0 mb-[32px]">
            Find a template, or start earning by selling your own designs.
          </p>
          <div className="flex gap-[12px] justify-center flex-wrap">
            <Link
              href="/browse"
              className="inline-flex items-center gap-[8px] px-[28px] py-[12px] bg-accent hover:bg-accent-hover transition-colors text-text-primary rounded-[8px] text-[15px] font-semibold no-underline"
            >
              Browse Templates <ArrowRight size={16} />
            </Link>
            <Link
              href="/sell"
              className="px-[28px] py-[12px] bg-transparent text-text-primary border border-border-default hover:border-text-secondary transition-colors rounded-[8px] text-[15px] font-medium no-underline"
            >
              Become a Creator
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
