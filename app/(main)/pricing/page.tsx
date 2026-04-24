import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Pay only for what you need on ResumeForge. Browse free templates, buy one-off templates at creator-set prices, and pay per credit for AI optimization. No subscriptions.',
  alternates: { canonical: '/pricing' },
  openGraph: {
    title: 'Pricing — ResumeForge',
    description:
      'Free templates, creator-priced one-time purchases, and pay-per-credit AI. No subscriptions.',
    url: '/pricing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pricing — ResumeForge',
    description:
      'Free templates, creator-priced one-time purchases, and pay-per-credit AI. No subscriptions.',
  },
}

export default function PricingPage() {
  const faqs = [
    {
      q: 'Why do template prices vary?',
      a: 'Creators set their own prices on ResumeForge, starting from $1. Free templates are always free. You pay the creator directly through Stripe — we keep 20% to run the platform.',
    },
    {
      q: 'How do AI credits work?',
      a: 'AI credits are metered by tokens — $10 per million tokens — so you only pay for the work the model actually does. A typical Optimizer run (tailored resume suggestions plus a personalized cover letter) uses a small fraction of that. Credits never expire, and there is no subscription or auto-renewal.',
    },
    {
      q: 'Can I get a refund?',
      a: 'Yes. If a template is not what you expected or has a defect, email us within 14 days of purchase and we will issue a full refund — no questions asked. Unused AI credits are also refundable on request.',
    },
    {
      q: 'Do I get both PDF and DOCX?',
      a: 'Yes. Every paid template ships with both an editable DOCX and a print-ready PDF. You can also edit directly in our browser editor and export new PDFs anytime.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) through Stripe. Apple Pay and Google Pay are also supported at checkout.',
    },
  ]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const tiers = [
    {
      name: 'Free Templates',
      price: '$0',
      priceSub: 'forever',
      desc: 'Browse a curated set of permanently free templates. No account, no credit card.',
      features: [
        'Full browser-based editor',
        'PDF export, no watermark',
        'Unlimited edits',
        'Always free',
      ],
      cta: { label: 'Browse Free Templates', href: '/browse?filter=free' },
      highlighted: false,
    },
    {
      name: 'Premium Templates',
      price: 'From $1',
      priceSub: 'one-time, price set by creator',
      desc: 'Pay only for the template you want. Creators set their own prices — starting from $1.',
      features: [
        'Lifetime access',
        'PDF + DOCX included',
        'ATS-tested layout',
        'Unlimited edits',
        'Free future updates',
      ],
      cta: { label: 'Browse Templates', href: '/browse' },
      highlighted: true,
    },
    {
      name: 'AI Credits',
      price: '$10',
      priceSub: 'per million tokens',
      desc: 'Pay only for the AI you actually use. Credits are metered by tokens, so short jobs cost cents and big jobs stay transparent.',
      features: [
        'No subscription',
        'Credits never expire',
        'Metered by tokens',
        'Powers the Optimizer + cover letters',
      ],
      cta: { label: 'Try the Optimizer', href: '/optimizer' },
      highlighted: false,
    },
    {
      name: 'Creator',
      price: '$0',
      priceSub: 'to join',
      desc: 'Sell your own templates and set your own prices. Keep 80% of every sale — no listing fees.',
      features: [
        'Free to join',
        'Set your own prices',
        'Keep 80% per sale',
        'Monthly payouts',
        'Analytics dashboard',
      ],
      cta: { label: 'Become a Creator', href: '/sell' },
      highlighted: false,
    },
  ]

  return (
    <div className="bg-bg-base min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="container-page pt-[72px] pb-[40px] md:pt-[120px] md:pb-[64px] text-center">
        <span className="inline-flex items-center gap-[8px] px-[16px] py-[6px] bg-[#FF5C0015] border border-[#FF5C0040] rounded-[100px] text-accent text-[13px] font-medium mb-[24px]">
          ✦ No subscriptions. Pay only for what you need.
        </span>
        <h1 className="font-serif text-[clamp(40px,6vw,64px)] text-text-primary font-normal leading-[1.1] max-w-[720px] mx-auto mt-0 mb-[24px]">
          Pay only for what you need
        </h1>
        <p className="text-text-secondary text-[18px] leading-[1.6] max-w-[640px] mx-auto m-0">
          Free templates are always free. Premium templates are one-time
          purchases at prices set by the creators. AI features run on credits
          you buy as you go. No monthly fees, no lock-in.
        </p>
      </section>

      {/* Tiers */}
      <section className="px-6 pb-[56px] md:px-[80px] md:pb-[80px] max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[16px] md:gap-[20px]">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`bg-bg-card rounded-[12px] p-[24px] md:p-[32px] flex flex-col gap-[20px] relative border ${tier.highlighted ? 'border-accent' : 'border-border-default'}`}
            >
              {tier.highlighted && (
                <span className="absolute top-[-12px] left-1/2 -translate-x-1/2 px-[12px] py-[4px] bg-accent text-text-primary text-[11px] font-semibold rounded-[100px] tracking-[0.5px]">
                  MOST POPULAR
                </span>
              )}

              <div>
                <h2 className="text-text-primary text-[18px] font-semibold mt-0 mb-[12px]">
                  {tier.name}
                </h2>
                <div className="mb-[12px]">
                  <div className="font-serif text-[40px] text-text-primary leading-none mb-[6px]">
                    {tier.price}
                  </div>
                  <div className="text-text-secondary text-[13px] leading-[1.4]">
                    {tier.priceSub}
                  </div>
                </div>
                <p className="text-text-secondary text-[14px] leading-[1.6] m-0">
                  {tier.desc}
                </p>
              </div>

              <ul className="list-none p-0 m-0 flex flex-col gap-[10px] grow">
                {tier.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-[10px] text-text-secondary text-[14px]"
                  >
                    <Check size={16} color="#FF5C00" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.cta.href}
                className={`inline-flex items-center justify-center gap-[8px] px-[20px] py-[12px] text-text-primary rounded-[8px] text-[14px] font-semibold no-underline border transition-colors ${
                  tier.highlighted
                    ? 'bg-accent hover:bg-accent-hover border-accent'
                    : 'bg-transparent border-border-default hover:border-text-secondary'
                }`}
              >
                {tier.cta.label} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-[56px] md:p-[80px] bg-bg-elevated border-t border-b border-border-default">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-[40px] md:mb-[48px]">
            <h2 className="font-serif text-[28px] md:text-[36px] text-text-primary font-normal mt-0 mb-[12px]">
              Pricing FAQ
            </h2>
            <p className="text-text-secondary text-[15px] md:text-[16px] m-0">
              Everything you need to know before you buy.
            </p>
          </div>

          <div className="flex flex-col">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="border-b border-border-default py-[20px]"
              >
                <h3 className="text-text-primary text-[15px] font-semibold mt-0 mb-[10px]">
                  {f.q}
                </h3>
                <p className="text-text-secondary text-[14px] leading-[1.7] m-0">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-page py-[56px] md:py-[80px] text-center">
        <h2 className="font-serif text-[28px] md:text-[36px] text-text-primary font-normal mt-0 mb-[24px]">
          Find your template
        </h2>
        <Link
          href="/browse"
          className="inline-flex items-center gap-[8px] px-[28px] py-[12px] bg-accent hover:bg-accent-hover transition-colors text-text-primary rounded-[8px] text-[15px] font-semibold no-underline"
        >
          Browse Templates <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}
