'use client'

const stepLabels = ['Account', 'Profile', 'Links', 'Template', 'Review']

interface ProgressBarProps {
  currentStep: number // 1-5
}

export default function ProgressBar({ currentStep }: ProgressBarProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginBottom: '48px' }}>
      {stepLabels.map((label, i) => {
        const step = i + 1
        const isCompleted = step < currentStep
        const isCurrent = step === currentStep
        const isFuture = step > currentStep

        return (
          <div key={label} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: 600,
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  backgroundColor: isCompleted ? '#FF5C00' : 'transparent',
                  border: isCompleted ? '2px solid #FF5C00' : isCurrent ? '2px solid #FF5C00' : '2px solid #1F1F23',
                  color: isCompleted ? '#FFFFFF' : isCurrent ? '#FF5C00' : '#6B6B70',
                }}
              >
                {isCompleted ? '\u2713' : step}
              </div>
              <span
                style={{
                  fontSize: '12px',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  color: isCurrent ? '#FFFFFF' : isFuture ? '#6B6B70' : '#8B8B90',
                  fontWeight: isCurrent ? 600 : 400,
                }}
              >
                {label}
              </span>
            </div>
            {step < 5 && (
              <div
                style={{
                  width: '60px',
                  height: '2px',
                  backgroundColor: isCompleted ? '#FF5C00' : '#1F1F23',
                  marginLeft: '8px',
                  marginRight: '8px',
                  marginBottom: '28px',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
