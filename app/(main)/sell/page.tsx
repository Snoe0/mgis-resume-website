'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/AuthProvider'
import ProgressBar from './steps/ProgressBar'
import StepAccount from './steps/StepAccount'
import StepProfile from './steps/StepProfile'
import StepLinks from './steps/StepLinks'
import StepUpload from './steps/StepUpload'
import StepReview from './steps/StepReview'
import type { SellerFormData } from './types'

const initialFormData: SellerFormData = {
  displayName: '',
  bio: '',
  specialty: '',
  avatar: null,
  portfolioUrl: '',
  websiteUrl: '',
  linkedinUrl: '',
  dribbbleUrl: '',
  templateFile: null,
  templateTitle: '',
  templateDescription: '',
  templatePrice: 0,
  templateCategory: '',
}

export default function SellPage() {
  const { user, loading } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<SellerFormData>(initialFormData)

  // Skip step 1 if already authenticated
  useEffect(() => {
    if (!loading && user && step === 1) {
      setStep(2)
    }
  }, [user, loading, step])

  const updateFormData = (updates: Partial<SellerFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }))
  }

  if (loading) {
    return (
      <div className="bg-bg-base min-h-screen flex items-center justify-center">
        <p className="text-text-secondary text-sm">Loading...</p>
      </div>
    )
  }

  return (
    <div className="bg-bg-base min-h-screen px-6 pt-[60px] pb-20">
      <div className="max-w-[640px] mx-auto">
        <h1 className="font-serif text-4xl text-text-primary font-normal m-0 mb-6 text-center">
          Become a ResumeForge Creator
        </h1>
        <ProgressBar currentStep={step} />

        <div className="bg-bg-card border border-border-default rounded-xl p-10">
          {step === 1 && (
            <StepAccount onNext={() => setStep(2)} />
          )}

          {step === 2 && (
            <StepProfile
              data={{
                displayName: formData.displayName,
                bio: formData.bio,
                specialty: formData.specialty,
                avatar: formData.avatar,
              }}
              onChange={updateFormData}
              onNext={() => setStep(3)}
              onBack={() => setStep(1)}
            />
          )}

          {step === 3 && (
            <StepLinks
              data={{
                portfolioUrl: formData.portfolioUrl,
                websiteUrl: formData.websiteUrl,
                linkedinUrl: formData.linkedinUrl,
                dribbbleUrl: formData.dribbbleUrl,
              }}
              onChange={updateFormData}
              onNext={() => setStep(4)}
              onBack={() => setStep(2)}
            />
          )}

          {step === 4 && (
            <StepUpload
              data={{
                templateFile: formData.templateFile,
                templateTitle: formData.templateTitle,
                templateDescription: formData.templateDescription,
                templatePrice: formData.templatePrice,
                templateCategory: formData.templateCategory,
              }}
              onChange={updateFormData}
              onNext={() => setStep(5)}
              onBack={() => setStep(3)}
            />
          )}

          {step === 5 && (
            <StepReview
              data={formData}
              onBack={() => setStep(4)}
              onGoToStep={setStep}
            />
          )}
        </div>
      </div>
    </div>
  )
}
