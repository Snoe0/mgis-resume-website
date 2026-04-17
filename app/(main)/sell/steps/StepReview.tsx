'use client'

import { useState } from 'react'
import { CheckCircle, Edit2, FileText } from 'lucide-react'
import type { SellerFormData } from '../types'

interface StepReviewProps {
  data: SellerFormData
  onBack: () => void
  onGoToStep: (step: number) => void
}

const SECTION_CLASS = 'bg-bg-base border border-border-default rounded-xl p-6'
const HEADER_CLASS = 'flex justify-between items-center mb-4'
const LABEL_CLASS = 'text-text-muted text-xs mb-1'
const VALUE_CLASS = 'text-text-primary text-sm'
const EDIT_BTN_CLASS = 'text-accent bg-transparent border-none cursor-pointer text-[13px] flex items-center gap-1'

export default function StepReview({ data, onBack, onGoToStep }: StepReviewProps) {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div className="text-center py-12">
        <CheckCircle size={56} color="#10B981" className="mb-6 mx-auto" />
        <h2 className="font-serif text-[28px] text-text-primary font-normal m-0 mb-3">
          Application submitted!
        </h2>
        <p className="text-text-secondary text-sm leading-[1.7] max-w-[400px] mx-auto">
          We&apos;ll review your application within 48 hours. You&apos;ll receive an email when your seller account is approved.
        </p>
      </div>
    )
  }

  const links = [
    { label: 'Portfolio', value: data.portfolioUrl },
    { label: 'Website', value: data.websiteUrl },
    { label: 'LinkedIn', value: data.linkedinUrl },
    { label: 'Dribbble/Behance', value: data.dribbbleUrl },
  ].filter(l => l.value)

  return (
    <div>
      <h2 className="font-serif text-[28px] text-text-primary font-normal m-0 mb-2">
        Review your application
      </h2>
      <p className="text-text-secondary text-sm m-0 mb-8">
        Make sure everything looks good before submitting.
      </p>

      <div className="flex flex-col gap-4">
        {/* Profile section */}
        <div className={SECTION_CLASS}>
          <div className={HEADER_CLASS}>
            <h3 className="text-text-primary text-base font-semibold m-0">Profile</h3>
            <button onClick={() => onGoToStep(2)} className={EDIT_BTN_CLASS}>
              <Edit2 size={14} /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className={LABEL_CLASS}>Display name</p>
              <p className={VALUE_CLASS}>{data.displayName}</p>
            </div>
            <div>
              <p className={LABEL_CLASS}>Specialty</p>
              <p className={VALUE_CLASS}>{data.specialty}</p>
            </div>
            <div className="col-span-full">
              <p className={LABEL_CLASS}>Bio</p>
              <p className={`${VALUE_CLASS} leading-[1.6]`}>{data.bio}</p>
            </div>
          </div>
        </div>

        {/* Links section */}
        <div className={SECTION_CLASS}>
          <div className={HEADER_CLASS}>
            <h3 className="text-text-primary text-base font-semibold m-0">Links</h3>
            <button onClick={() => onGoToStep(3)} className={EDIT_BTN_CLASS}>
              <Edit2 size={14} /> Edit
            </button>
          </div>
          {links.length > 0 ? (
            <div className="flex flex-col gap-2">
              {links.map(({ label, value }) => (
                <div key={label}>
                  <p className={LABEL_CLASS}>{label}</p>
                  <p className={VALUE_CLASS}>{value}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-text-muted text-[13px] m-0">No links provided</p>
          )}
        </div>

        {/* Template section */}
        <div className={SECTION_CLASS}>
          <div className={HEADER_CLASS}>
            <h3 className="text-text-primary text-base font-semibold m-0">Template</h3>
            <button onClick={() => onGoToStep(4)} className={EDIT_BTN_CLASS}>
              <Edit2 size={14} /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className={LABEL_CLASS}>Title</p>
              <p className={VALUE_CLASS}>{data.templateTitle}</p>
            </div>
            <div>
              <p className={LABEL_CLASS}>Price</p>
              <p className={VALUE_CLASS}>{data.templatePrice === 0 ? 'Free' : `$${data.templatePrice}`}</p>
            </div>
            <div>
              <p className={LABEL_CLASS}>Category</p>
              <p className={VALUE_CLASS}>{data.templateCategory}</p>
            </div>
            <div>
              <p className={LABEL_CLASS}>File</p>
              <div className="flex items-center gap-1.5">
                <FileText size={14} color="#FF5C00" />
                <p className={VALUE_CLASS}>{data.templateFile?.name ?? 'No file'}</p>
              </div>
            </div>
            <div className="col-span-full">
              <p className={LABEL_CLASS}>Description</p>
              <p className={`${VALUE_CLASS} leading-[1.6]`}>{data.templateDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button
          onClick={onBack}
          className="text-text-secondary bg-transparent border-none cursor-pointer text-sm"
        >
          Back
        </button>
        <button
          onClick={() => setSubmitted(true)}
          className="px-10 py-[14px] bg-accent text-text-primary rounded-lg border-none text-[15px] font-semibold cursor-pointer"
        >
          Submit Application
        </button>
      </div>
    </div>
  )
}
