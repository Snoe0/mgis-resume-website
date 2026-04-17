'use client'

import Link from 'next/link'
import { XCircle } from 'lucide-react'

export default function CheckoutCancelPage() {
  return (
    <div className="bg-bg-base min-h-screen flex items-center justify-center px-5 py-10">
      <div className="bg-bg-card border border-border-default rounded-2xl p-12 max-w-[480px] w-full text-center">
        <div className="flex flex-col items-center gap-6">
          <XCircle size={56} className="text-[#EF4444]" />

          <div>
            <h1 className="font-serif text-[28px] text-text-primary font-normal m-0 mb-2">
              Payment Cancelled
            </h1>
            <p className="text-text-secondary text-sm m-0">
              Your payment was not processed. No charges were made.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <Link
              href="/browse"
              className="px-0 py-[14px] bg-accent hover:bg-accent-hover text-text-primary rounded-lg text-[15px] font-semibold no-underline flex items-center justify-center gap-2 transition-colors"
            >
              Browse Templates
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
