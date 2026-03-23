'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle, Download, ArrowRight, Loader2 } from 'lucide-react'
import { getTemplateById } from '@/lib/templates'

interface VerifiedSession {
  status: string
  templateName: string
  templateId: string
  customerEmail: string | null
  amount: number | null
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div style={{ backgroundColor: '#0A0A0B', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader2 size={48} style={{ color: '#FF5C00', animation: 'spin 1s linear infinite' }} />
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const isFree = searchParams.get('free') === 'true'
  const freeTemplateId = searchParams.get('templateId')

  const [session, setSession] = useState<VerifiedSession | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (isFree && freeTemplateId) {
      const template = getTemplateById(freeTemplateId)
      setSession({
        status: 'free',
        templateName: template?.title ?? 'Free Template',
        templateId: freeTemplateId,
        customerEmail: null,
        amount: 0,
      })
      setLoading(false)
      return
    }

    if (!sessionId) {
      setError('No session ID provided')
      setLoading(false)
      return
    }

    fetch(`/api/checkout/verify?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error)
        } else {
          setSession(data)
        }
      })
      .catch(() => setError('Failed to verify payment'))
      .finally(() => setLoading(false))
  }, [sessionId, isFree, freeTemplateId])

  return (
    <div style={{ backgroundColor: '#0A0A0B', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{
        backgroundColor: '#141417',
        border: '1px solid #1F1F23',
        borderRadius: '16px',
        padding: '48px',
        maxWidth: '480px',
        width: '100%',
        textAlign: 'center',
      }}>
        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Loader2 size={48} style={{ color: '#FF5C00', animation: 'spin 1s linear infinite' }} />
            <p style={{ color: '#8B8B90', fontSize: '15px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              Verifying your purchase...
            </p>
          </div>
        ) : error ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ color: '#EF4444', fontSize: '15px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              {error}
            </div>
            <Link
              href="/browse"
              style={{
                color: '#FF5C00',
                textDecoration: 'none',
                fontSize: '14px',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              Back to Browse
            </Link>
          </div>
        ) : session ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <CheckCircle size={56} style={{ color: '#22C55E' }} />

            <div>
              <h1 style={{
                fontFamily: 'var(--font-instrument-serif), Georgia, serif',
                fontSize: '28px',
                color: '#FFFFFF',
                fontWeight: '400',
                margin: '0 0 8px',
              }}>
                {session.status === 'free' ? 'Template Ready' : 'Payment Successful'}
              </h1>
              <p style={{ color: '#8B8B90', fontSize: '14px', fontFamily: 'var(--font-inter), Inter, sans-serif', margin: 0 }}>
                {session.status === 'free'
                  ? 'Your free template is ready to download.'
                  : 'Your purchase has been confirmed.'}
              </p>
            </div>

            <div style={{
              backgroundColor: '#0A0A0B',
              borderRadius: '12px',
              padding: '20px',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#6B6B70', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>Template</span>
                <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '500', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{session.templateName}</span>
              </div>
              {session.amount !== null && session.amount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6B6B70', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>Amount</span>
                  <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '500', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>${(session.amount / 100).toFixed(2)}</span>
                </div>
              )}
              {session.customerEmail && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#6B6B70', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>Receipt sent to</span>
                  <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '500', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>{session.customerEmail}</span>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
              <button
                style={{
                  padding: '14px',
                  backgroundColor: '#FF5C00',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  border: 'none',
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
                <Download size={16} /> Download Template
              </button>
              <Link
                href="/browse"
                style={{
                  padding: '14px',
                  backgroundColor: 'transparent',
                  color: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #1F1F23',
                  fontSize: '15px',
                  fontWeight: '500',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'border-color 0.15s',
                }}
              >
                Browse More Templates <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        ) : null}
      </div>

    </div>
  )
}
