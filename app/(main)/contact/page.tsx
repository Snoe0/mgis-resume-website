import type { Metadata } from 'next'
import Link from 'next/link'
import { Mail, Github, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with the ResumeForge team. Email us, open a GitHub issue, or read about our typical response times and support hours.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact — ResumeForge',
    description:
      'Reach the ResumeForge team by email or GitHub. We typically reply within one business day.',
    url: '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — ResumeForge',
    description:
      'Reach the ResumeForge team by email or GitHub. We typically reply within one business day.',
  },
}

const siteUrl =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://mgis-resume-website-sigma.vercel.app'

export default function ContactPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact ResumeForge',
    url: `${siteUrl}/contact`,
    description:
      'Contact information for the ResumeForge team — email and GitHub support.',
    mainEntity: {
      '@type': 'Organization',
      name: 'ResumeForge',
      url: siteUrl,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: 'hello@resumeforge.app',
          availableLanguage: ['English'],
        },
      ],
    },
  }

  const contactMethods = [
    {
      icon: <Mail size={24} color="#FF5C00" />,
      title: 'Email us',
      desc: 'For general questions, partnership inquiries, press, or anything else.',
      cta: 'hello@resumeforge.app',
      href: 'mailto:hello@resumeforge.app',
    },
    {
      icon: <Github size={24} color="#FF5C00" />,
      title: 'Report a bug',
      desc: 'Found a bug or have a feature request? Open an issue on GitHub — we triage weekly.',
      cta: 'Open an issue',
      href: 'https://github.com/Snoe0/mgis-resume-website/issues',
    },
  ]

  return (
    <div className="bg-bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* Hero */}
      <section className="container-page pt-[72px] pb-[40px] md:pt-[120px] md:pb-[64px] text-center">
        <span className="inline-flex items-center gap-[8px] px-[16px] py-[6px] bg-[#FF5C0015] border border-[#FF5C0040] rounded-[100px] text-accent text-[13px] font-medium mb-[24px]">
          ✦ We reply fast
        </span>
        <h1 className="font-serif text-[clamp(40px,6vw,64px)] text-text-primary font-normal leading-[1.1] max-w-[720px] mx-auto mt-0 mb-[24px]">
          Get in touch
        </h1>
        <p className="text-text-secondary text-[18px] leading-[1.6] max-w-[600px] mx-auto m-0">
          Questions about a template, your order, or selling on ResumeForge?
          We&apos;re here to help.
        </p>
      </section>

      {/* Contact methods */}
      <section className="px-6 pb-[56px] md:px-[80px] md:pb-[80px] max-w-[1000px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px] md:gap-[24px]">
          {contactMethods.map((m) => (
            <div
              key={m.title}
              className="bg-bg-card border border-border-default rounded-[12px] p-[24px] md:p-[32px] flex flex-col gap-[16px]"
            >
              {m.icon}
              <h2 className="text-text-primary text-[18px] font-semibold m-0">
                {m.title}
              </h2>
              <p className="text-text-secondary text-[14px] leading-[1.6] m-0">
                {m.desc}
              </p>
              {m.href.startsWith('http') ? (
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent text-[14px] font-semibold no-underline"
                >
                  {m.cta} →
                </a>
              ) : (
                <a
                  href={m.href}
                  className="text-accent text-[14px] font-semibold no-underline"
                >
                  {m.cta} →
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Hours / response time */}
      <section className="px-6 py-[48px] md:px-[80px] md:py-[64px] bg-bg-elevated border-t border-b border-border-default">
        <div className="max-w-[720px] mx-auto text-center">
          <Clock
            size={28}
            color="#FF5C00"
            className="inline-block mb-[16px]"
          />
          <h2 className="font-serif text-[28px] text-text-primary font-normal mt-0 mb-[12px]">
            Response time
          </h2>
          <p className="text-text-secondary text-[15px] leading-[1.7] m-0">
            Support is available Monday through Friday, 9am–6pm Eastern Time.
            We aim to respond to every email within one business day. Bugs
            filed on GitHub are triaged weekly.
          </p>
        </div>
      </section>

      {/* Back to home */}
      <section className="container-page py-[48px] md:py-[64px] text-center">
        <Link
          href="/browse"
          className="inline-flex items-center px-[24px] py-[10px] border border-border-default hover:border-text-secondary transition-colors rounded-[8px] text-text-primary text-[14px] no-underline"
        >
          Browse Templates
        </Link>
      </section>
    </div>
  )
}
