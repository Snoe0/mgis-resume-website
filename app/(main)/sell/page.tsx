import Link from 'next/link'
import { DollarSign, BarChart2, Shield, Upload, Settings, TrendingUp } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Create your template',
    description: 'Design an ATS-optimized resume template using your favourite tool. Export as a DOCX or PDF.',
  },
  {
    number: '02',
    title: 'Submit for review',
    description: 'Upload your file and fill out a short listing form. Our team reviews every submission within 48 hours.',
  },
  {
    number: '03',
    title: 'Publish & earn',
    description: 'Once approved, your template goes live. You earn 70% of every sale — paid out monthly.',
  },
]

const benefits = [
  {
    icon: DollarSign,
    title: '70% revenue share',
    description: 'One of the highest payouts in the industry. You set the price, we handle billing and payouts.',
  },
  {
    icon: BarChart2,
    title: 'Real-time analytics',
    description: 'Track views, conversions, and earnings from your creator dashboard.',
  },
  {
    icon: Shield,
    title: 'IP protection',
    description: 'Your designs are protected. Buyers get a license to use, not redistribute.',
  },
  {
    icon: Upload,
    title: 'Easy upload',
    description: 'Submit a DOCX or PDF. We handle hosting, previews, and delivery to buyers.',
  },
  {
    icon: Settings,
    title: 'Full control',
    description: 'Update pricing, pause listings, and edit descriptions any time from your dashboard.',
  },
  {
    icon: TrendingUp,
    title: 'Growing marketplace',
    description: 'Over 40,000 active job seekers browse ResumeForge every month.',
  },
]

const stats = [
  { value: '40K+', label: 'Monthly buyers' },
  { value: '$180', label: 'Avg. creator monthly earnings' },
  { value: '70%', label: 'Revenue share' },
  { value: '48h', label: 'Review turnaround' },
]

export default function SellPage() {
  return (
    <div style={{ backgroundColor: '#0A0A0B', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{ padding: '100px 80px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <p
            style={{
              color: '#FF5C00',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '20px',
            }}
          >
            Creator Program
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              color: '#FFFFFF',
              fontWeight: 400,
              lineHeight: 1.15,
              margin: '0 0 20px',
            }}
          >
            Turn your design skills
            <br />
            into{' '}
            <span style={{ color: '#FF5C00' }}>passive income</span>
          </h1>
          <p
            style={{
              color: '#8B8B90',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              margin: '0 0 40px',
            }}
          >
            Sell your resume templates to thousands of job seekers on ResumeForge.
            Keep 70% of every sale. No monthly fees, no exclusivity.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/creator/new"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                backgroundColor: '#FF5C00',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
              }}
            >
              Apply to Sell
            </Link>
            <Link
              href="/creators"
              style={{
                display: 'inline-block',
                padding: '14px 32px',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid #1F1F23',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '1rem',
                textDecoration: 'none',
              }}
            >
              Browse Creators
            </Link>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section
        style={{
          backgroundColor: '#111113',
          borderTop: '1px solid #1F1F23',
          borderBottom: '1px solid #1F1F23',
          padding: '40px 80px',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
            textAlign: 'center',
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p
                style={{
                  fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                  fontSize: '2.25rem',
                  color: '#FF5C00',
                  margin: '0 0 6px',
                  fontWeight: 400,
                }}
              >
                {stat.value}
              </p>
              <p style={{ color: '#8B8B90', fontSize: '0.875rem', margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: '80px 80px', maxWidth: '1280px', margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: '2rem',
            color: '#FFFFFF',
            fontWeight: 400,
            marginBottom: '48px',
            textAlign: 'center',
          }}
        >
          How it works
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                backgroundColor: '#141417',
                border: '1px solid #1F1F23',
                borderRadius: '12px',
                padding: '32px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                  fontSize: '3rem',
                  color: '#FF5C0030',
                  margin: '0 0 16px',
                  lineHeight: 1,
                }}
              >
                {step.number}
              </p>
              <h3 style={{ color: '#FFFFFF', fontSize: '1.1rem', fontWeight: 600, margin: '0 0 12px' }}>
                {step.title}
              </h3>
              <p style={{ color: '#8B8B90', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section
        style={{
          backgroundColor: '#111113',
          borderTop: '1px solid #1F1F23',
          borderBottom: '1px solid #1F1F23',
          padding: '80px',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: '2rem',
              color: '#FFFFFF',
              fontWeight: 400,
              marginBottom: '48px',
              textAlign: 'center',
            }}
          >
            Everything you need to succeed
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <div
                  key={benefit.title}
                  style={{
                    backgroundColor: '#141417',
                    border: '1px solid #1F1F23',
                    borderRadius: '12px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#FF5C0015',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon size={20} color="#FF5C00" />
                  </div>
                  <h3 style={{ color: '#FFFFFF', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
                    {benefit.title}
                  </h3>
                  <p style={{ color: '#8B8B90', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ padding: '100px 80px', textAlign: 'center' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: '2.25rem',
              color: '#FFFFFF',
              fontWeight: 400,
              margin: '0 0 16px',
            }}
          >
            Ready to start earning?
          </h2>
          <p style={{ color: '#8B8B90', fontSize: '1rem', lineHeight: 1.6, margin: '0 0 32px' }}>
            Join hundreds of designers already earning on ResumeForge. Applications take less than 5 minutes.
          </p>
          <Link
            href="/creator/new"
            style={{
              display: 'inline-block',
              padding: '14px 40px',
              backgroundColor: '#FF5C00',
              color: '#FFFFFF',
              borderRadius: '8px',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
            }}
          >
            Apply to Sell
          </Link>
        </div>
      </section>

    </div>
  )
}
