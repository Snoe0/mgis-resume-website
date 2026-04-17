'use client'

import { useState, useRef } from 'react'
import { Camera } from 'lucide-react'

const specialties = [
  'Executive & Finance',
  'Tech & Startups',
  'Design & Creative',
  'Healthcare & Science',
  'Academic & Research',
  'Product & Engineering',
  'Other',
]

const INPUT_CLASS = 'w-full px-4 py-3 bg-bg-base border border-border-default rounded-lg text-text-primary text-sm outline-none'

interface StepProfileProps {
  data: {
    displayName: string
    bio: string
    specialty: string
    avatar: File | null
  }
  onChange: (updates: Partial<StepProfileProps['data']>) => void
  onNext: () => void
  onBack: () => void
}

export default function StepProfile({ data, onChange, onNext, onBack }: StepProfileProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onChange({ avatar: file })
      const reader = new FileReader()
      reader.onloadend = () => setAvatarPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!data.displayName.trim()) errs.displayName = 'Display name is required.'
    if (!data.bio.trim()) errs.bio = 'Bio is required.'
    if (!data.specialty) errs.specialty = 'Please select a specialty.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validate()) onNext()
  }

  return (
    <div>
      <h2 className="font-serif text-[28px] text-text-primary font-normal m-0 mb-2">
        Set up your profile
      </h2>
      <p className="text-text-secondary text-sm m-0 mb-8">
        This is how buyers will see you on ResumeForge.
      </p>

      <div className="flex flex-col gap-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => fileRef.current?.click()}
            className="w-[72px] h-[72px] rounded-full bg-border-default flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-border-default flex-shrink-0"
          >
            {avatarPreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <Camera size={24} color="#6B6B70" />
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="text-accent bg-transparent border-none cursor-pointer text-sm"
            >
              Upload photo
            </button>
            <p className="text-text-muted text-xs mt-1 mb-0">Optional. JPG, PNG, or WebP.</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
        </div>

        {/* Display Name */}
        <div>
          <label className="text-text-secondary text-[13px] block mb-2">
            Display name *
          </label>
          <input
            type="text"
            value={data.displayName}
            onChange={(e) => onChange({ displayName: e.target.value })}
            placeholder="How buyers will see your name"
            className={INPUT_CLASS}
          />
          {errors.displayName && <p className="text-[#EF4444] text-xs mt-1.5">{errors.displayName}</p>}
        </div>

        {/* Bio */}
        <div>
          <label className="text-text-secondary text-[13px] block mb-2">
            Bio *
          </label>
          <textarea
            value={data.bio}
            onChange={(e) => onChange({ bio: e.target.value.slice(0, 500) })}
            placeholder="Tell buyers about your design experience and style..."
            rows={4}
            className={`${INPUT_CLASS} resize-y`}
          />
          <div className="flex justify-between mt-1.5">
            {errors.bio ? <p className="text-[#EF4444] text-xs m-0">{errors.bio}</p> : <span />}
            <span className="text-text-muted text-xs">{data.bio.length}/500</span>
          </div>
        </div>

        {/* Specialty */}
        <div>
          <label className="text-text-secondary text-[13px] block mb-2">
            Specialty *
          </label>
          <select
            value={data.specialty}
            onChange={(e) => onChange({ specialty: e.target.value })}
            className={`${INPUT_CLASS} cursor-pointer appearance-none`}
          >
            <option value="">Select a specialty</option>
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.specialty && <p className="text-[#EF4444] text-xs mt-1.5">{errors.specialty}</p>}
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
          onClick={handleNext}
          className="px-8 py-3 bg-accent text-text-primary rounded-lg border-none text-sm font-semibold cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
