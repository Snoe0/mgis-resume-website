'use client'

const stepLabels = ['Account', 'Profile', 'Links', 'Template', 'Review']

interface ProgressBarProps {
  currentStep: number // 1-5
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {stepLabels.map((label, i) => {
        const step = i + 1
        const isCompleted = step < currentStep
        const isCurrent = step === currentStep
        const isFuture = step > currentStep

        const circleClasses = isCompleted
          ? 'bg-accent border-2 border-accent text-text-primary'
          : isCurrent
            ? 'bg-transparent border-2 border-accent text-accent'
            : 'bg-transparent border-2 border-border-default text-text-muted'

        const labelClasses = isCurrent
          ? 'text-text-primary font-semibold'
          : isFuture
            ? 'text-text-muted font-normal'
            : 'text-text-secondary font-normal'

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${circleClasses}`}
              >
                {isCompleted ? '\u2713' : step}
              </div>
              <span className={`text-xs ${labelClasses}`}>
                {label}
              </span>
            </div>
            {step < 5 && (
              <div
                className={`w-[60px] h-[2px] mx-2 mb-7 ${isCompleted ? 'bg-accent' : 'bg-border-default'}`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
