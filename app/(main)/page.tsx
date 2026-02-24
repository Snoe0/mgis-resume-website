'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, FileText, Zap, TrendingUp } from 'lucide-react'
import TemplateCard from '@/components/TemplateCard'

const featuredTemplates = [
  { id: '1', title: 'Executive Pro', creator: 'Sarah Chen', price: 24 as const, rating: 4.9 },
  { id: '2', title: 'Minimal Dark', creator: 'James Park', price: 18 as const, rating: 4.7 },
  { id: '3', title: 'Creative Portfolio', creator: 'Mia Torres', price: 29 as const, rating: 5.0 },
  { id: '4', title: 'Clean Modern', creator: 'Aria Lee', price: 22 as const, rating: 4.8 },
  { id: '5', title: 'Academic Scholar', creator: 'Tom Walsh', price: 'free' as const, rating: 4.6 },
  { id: '6', title: 'Tech Startup', creator: 'Nina Patel', price: 26 as const, rating: 4.9 },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export default function HomePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
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

  return (
    <div style={{ backgroundColor: '#0A0A0B', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section
        style={{
          padding: '120px 80px 100px',
          textAlign: 'center',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                backgroundColor: '#FF5C0015',
                border: '1px solid #FF5C0040',
                borderRadius: '100px',
                color: '#FF5C00',
                fontSize: '13px',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                fontWeight: '500',
              }}
            >
              ✦ Over 10,000 professionals hired
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: 'clamp(40px, 6vw, 64px)',
              color: '#FFFFFF',
              fontWeight: '400',
              lineHeight: '1.1',
              maxWidth: '800px',
              margin: '0',
            }}
          >
            Stand Out With a Resume That Gets You Hired
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              color: '#8B8B90',
              fontSize: '18px',
              lineHeight: '1.6',
              maxWidth: '560px',
              margin: '0',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            Choose from hundreds of professionally designed templates.
            Customize in our editor, review with AI, and land your dream job.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link
              href="/browse"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                backgroundColor: '#FF5C00',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                textDecoration: 'none',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e05200')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5C00')}
            >
              Browse Templates <ArrowRight size={16} />
            </Link>
            <Link
              href="/browse?filter=free"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid #1F1F23',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                textDecoration: 'none',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8B8B90')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1F1F23')}
            >
              Start Free
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              gap: '32px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              marginTop: '8px',
            }}
          >
            {['ATS-Friendly', 'Easy Customization', 'Instant Download'].map((badge) => (
              <span
                key={badge}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#8B8B90',
                  fontSize: '13px',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981', flexShrink: 0 }} />
                {badge}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Featured Templates ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        style={{
          padding: '80px 80px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: '36px',
              color: '#FFFFFF',
              fontWeight: '400',
              margin: '0 0 12px',
            }}
          >
            Featured Templates
          </h2>
          <p style={{ color: '#8B8B90', fontSize: '16px', margin: '0', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Handpicked by our design team. Used by thousands to land great jobs.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
          }}
        >
          {featuredTemplates.map((template) => (
            <motion.div key={template.id} variants={fadeUp}>
              <TemplateCard {...template} />
            </motion.div>
          ))}
        </motion.div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link
            href="/browse"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 24px',
              border: '1px solid #1F1F23',
              borderRadius: '8px',
              color: '#FFFFFF',
              fontSize: '14px',
              textDecoration: 'none',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8B8B90')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1F1F23')}
          >
            View All Templates <ArrowRight size={14} />
          </Link>
        </div>
      </motion.section>

      {/* ── How It Works ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        style={{
          padding: '80px',
          backgroundColor: '#111113',
          borderTop: '1px solid #1F1F23',
          borderBottom: '1px solid #1F1F23',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2
              style={{
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                fontSize: '36px',
                color: '#FFFFFF',
                fontWeight: '400',
                margin: '0 0 12px',
              }}
            >
              How It Works
            </h2>
            <p style={{ color: '#8B8B90', fontSize: '16px', margin: '0', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              Three simple steps to your perfect resume
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}
          >
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
              <motion.div
                key={step}
                variants={fadeUp}
                style={{
                  backgroundColor: '#141417',
                  border: '1px solid #1F1F23',
                  borderRadius: '12px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  {icon}
                  <span
                    style={{
                      color: '#FF5C00',
                      fontSize: '12px',
                      fontWeight: '700',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      letterSpacing: '1px',
                    }}
                  >
                    {step}
                  </span>
                </div>
                <h3
                  style={{
                    color: '#FFFFFF',
                    fontSize: '17px',
                    fontWeight: '600',
                    margin: '0',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    color: '#8B8B90',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    margin: '0',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  {desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── Creator CTA ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        style={{
          padding: '80px',
          background: 'linear-gradient(135deg, #111113 0%, #1a1012 100%)',
          borderBottom: '1px solid #1F1F23',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: '40px',
              color: '#FFFFFF',
              fontWeight: '400',
              margin: '0 0 16px',
            }}
          >
            Are You a Designer?
          </h2>
          <p
            style={{
              color: '#8B8B90',
              fontSize: '17px',
              lineHeight: '1.6',
              maxWidth: '520px',
              margin: '0 auto 32px',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            Join our creator community and earn money by selling your resume
            templates to thousands of professionals.
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '64px' }}>
            <Link
              href="/sell"
              style={{
                padding: '12px 28px',
                backgroundColor: '#FF5C00',
                color: '#FFFFFF',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '600',
                textDecoration: 'none',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                transition: 'background-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e05200')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5C00')}
            >
              Become a Creator
            </Link>
            <Link
              href="/about"
              style={{
                padding: '12px 28px',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid #1F1F23',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: '500',
                textDecoration: 'none',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                transition: 'border-color 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#8B8B90')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1F1F23')}
            >
              Learn More
            </Link>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', maxWidth: '600px', margin: '0 auto' }}
          >
            {[
              { num: '10K+', label: 'Active Users' },
              { num: '500+', label: 'Templates' },
              { num: '$2M+', label: 'Paid to Creators' },
            ].map(({ num, label }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                style={{ textAlign: 'center', padding: '0 24px', borderRight: '1px solid #1F1F23' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                    fontSize: '40px',
                    color: '#FFFFFF',
                    lineHeight: '1',
                    marginBottom: '8px',
                  }}
                >
                  {num}
                </div>
                <div style={{ color: '#8B8B90', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                  {label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ── FAQ ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={fadeUp}
        style={{ padding: '80px', maxWidth: '1280px', margin: '0 auto' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: '36px',
              color: '#FFFFFF',
              fontWeight: '400',
              margin: '0 0 12px',
            }}
          >
            Frequently Asked Questions
          </h2>
        </div>

        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{ borderBottom: '1px solid #1F1F23' }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '20px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: '16px',
                }}
              >
                <span
                  style={{
                    color: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: '500',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  {faq.q}
                </span>
                <span
                  style={{
                    color: '#FF5C00',
                    fontSize: '20px',
                    flexShrink: 0,
                    transition: 'transform 0.2s',
                    transform: openIndex === i ? 'rotate(45deg)' : 'rotate(0)',
                    display: 'inline-block',
                  }}
                >
                  +
                </span>
              </button>
              {openIndex === i && (
                <p
                  style={{
                    color: '#8B8B90',
                    fontSize: '14px',
                    lineHeight: '1.7',
                    paddingBottom: '20px',
                    margin: '0',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                  }}
                >
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </motion.section>

    </div>
  )
}
