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
      <div className="bg-bg-base min-h-screen flex items-center justify-center">
        <Loader2 size={48} className="text-accent animate-spin" />
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
    <div className="bg-bg-base min-h-screen flex items-center justify-center px-5 py-10">
      <div className="bg-bg-card border border-border-default rounded-2xl p-12 max-w-[480px] w-full text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <Loader2 size={48} className="text-accent animate-spin" />
            <p className="text-text-secondary text-[15px]">
              Verifying your purchase...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-[#EF4444] text-[15px]">
              {error}
            </div>
            <Link
              href="/browse"
              className="text-accent no-underline text-sm"
            >
              Back to Browse
            </Link>
          </div>
        ) : session ? (
          <div className="flex flex-col items-center gap-6">
            <CheckCircle size={56} className="text-[#22C55E]" />

            <div>
              <h1 className="font-serif text-[28px] text-text-primary font-normal m-0 mb-2">
                {session.status === 'free' ? 'Template Ready' : 'Payment Successful'}
              </h1>
              <p className="text-text-secondary text-sm m-0">
                {session.status === 'free'
                  ? 'Your free template is ready to download.'
                  : 'Your purchase has been confirmed.'}
              </p>
            </div>

            <div className="bg-bg-base rounded-xl p-5 w-full flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="text-text-muted text-[13px]">Template</span>
                <span className="text-text-primary text-sm font-medium">{session.templateName}</span>
              </div>
              {session.amount !== null && session.amount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-text-muted text-[13px]">Amount</span>
                  <span className="text-text-primary text-sm font-medium">${(session.amount / 100).toFixed(2)}</span>
                </div>
              )}
              {session.customerEmail && (
                <div className="flex justify-between items-center">
                  <span className="text-text-muted text-[13px]">Receipt sent to</span>
                  <span className="text-text-primary text-sm font-medium">{session.customerEmail}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <button
                className="px-0 py-[14px] bg-accent hover:bg-accent-hover text-text-primary rounded-lg border-none text-[15px] font-semibold cursor-pointer flex items-center justify-center gap-2 transition-colors"
              >
                <Download size={16} /> Download Template
              </button>
              <Link
                href="/browse"
                className="px-0 py-[14px] bg-transparent text-text-primary rounded-lg border border-border-default text-[15px] font-medium no-underline flex items-center justify-center gap-2 transition-colors"
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
