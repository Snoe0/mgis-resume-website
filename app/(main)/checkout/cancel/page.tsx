'use client'

import Link from 'next/link'
import { XCircle } from 'lucide-react'

export default function CheckoutCancelPage() {
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <XCircle size={56} style={{ color: '#EF4444' }} />

          <div>
            <h1 style={{
              fontFamily: 'var(--font-instrument-serif), Georgia, serif',
              fontSize: '28px',
              color: '#FFFFFF',
              fontWeight: '400',
              margin: '0 0 8px',
            }}>
              Payment Cancelled
            </h1>
            <p style={{ color: '#8B8B90', fontSize: '14px', fontFamily: 'var(--font-inter), Inter, sans-serif', margin: 0 }}>
              Your payment was not processed. No charges were made.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
            <Link
              href="/browse"
              style={{
                padding: '14px',
                backgroundColor: '#FF5C00',
                color: '#FFFFFF',
                borderRadius: '8px',
                border: 'none',
                fontSize: '15px',
                fontWeight: '600',
                textDecoration: 'none',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'background-color 0.15s',
              }}
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
