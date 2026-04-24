'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cookie } from 'lucide-react'

const STORAGE_KEY = 'rf_cookie_consent'

type Consent = 'accepted' | 'rejected'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

function applyConsent(consent: Consent) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  const update = {
    ad_storage: consent === 'accepted' ? 'granted' : 'denied',
    ad_user_data: consent === 'accepted' ? 'granted' : 'denied',
    ad_personalization: consent === 'accepted' ? 'granted' : 'denied',
    analytics_storage: consent === 'accepted' ? 'granted' : 'denied',
  }
  window.dataLayer.push(['consent', 'update', update])
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved !== 'accepted' && saved !== 'rejected') {
        setVisible(true)
      }
    } catch {
      setVisible(true)
    }
  }, [])

  const handleChoice = (consent: Consent) => {
    try {
      localStorage.setItem(STORAGE_KEY, consent)
    } catch {
      // ignore storage failures
    }
    applyConsent(consent)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:px-6 md:pb-6 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-[1100px] bg-card border border-border-default rounded-xl shadow-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
        <div className="flex items-start gap-3 flex-1">
          <div className="shrink-0 w-9 h-9 rounded-lg bg-bg-elevated border border-border-default flex items-center justify-center">
            <Cookie className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-text-primary text-[14px] font-semibold mb-1">
              We use cookies
            </p>
            <p className="text-text-secondary text-[13px] leading-relaxed">
              We use cookies to analyze traffic and improve your experience. You can accept all cookies or reject non-essential ones. Read our{' '}
              <Link href="/privacy" className="text-accent hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 shrink-0 md:ml-auto">
          <button
            type="button"
            onClick={() => handleChoice('rejected')}
            className="px-5 py-2.5 rounded-lg text-[13px] font-medium text-text-primary bg-bg-elevated border border-border-default hover:border-white/20 transition-colors"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => handleChoice('accepted')}
            className="px-5 py-2.5 rounded-lg text-[13px] font-medium text-white bg-[#FF5C00] hover:bg-[#e05200] transition-colors"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  )
}
