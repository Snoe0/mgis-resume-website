'use client'

import { Globe, Linkedin, Palette, Link as LinkIcon } from 'lucide-react'

interface StepLinksProps {
  data: {
    portfolioUrl: string
    websiteUrl: string
    linkedinUrl: string
    dribbbleUrl: string
  }
  onChange: (updates: Partial<StepLinksProps['data']>) => void
  onNext: () => void
  onBack: () => void
}

const fields = [
  { key: 'portfolioUrl' as const, label: 'Portfolio URL', icon: LinkIcon, placeholder: 'https://portfolio.example.com' },
  { key: 'websiteUrl' as const, label: 'Personal website', icon: Globe, placeholder: 'https://yoursite.com' },
  { key: 'linkedinUrl' as const, label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/yourname' },
  { key: 'dribbbleUrl' as const, label: 'Dribbble or Behance', icon: Palette, placeholder: 'https://dribbble.com/yourname' },
]

const INPUT_CLASS = 'w-full py-3 pr-4 pl-11 bg-bg-base border border-border-default rounded-lg text-text-primary text-sm outline-none'

export default function StepLinks({ data, onChange, onNext, onBack }: StepLinksProps) {
  return (
    <div>
      <h2 className="font-serif text-[28px] text-text-primary font-normal m-0 mb-2">
        Portfolio & links
      </h2>
      <p className="text-text-secondary text-sm m-0 mb-8">
        Sharing your portfolio helps buyers trust your work. All fields are optional.
      </p>

      <div className="flex flex-col gap-5">
        {fields.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key}>
            <label className="text-text-secondary text-[13px] block mb-2">
              {label}
            </label>
            <div className="relative">
              <div className="absolute left-[14px] top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                <Icon size={16} />
              </div>
              <input
                type="url"
                value={data[key]}
                onChange={(e) => onChange({ [key]: e.target.value })}
                placeholder={placeholder}
                className={INPUT_CLASS}
              />
            </div>
          </div>
        ))}
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
          onClick={onNext}
          className="px-8 py-3 bg-accent text-text-primary rounded-lg border-none text-sm font-semibold cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
