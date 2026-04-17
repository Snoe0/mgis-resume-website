'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

interface StepAccountProps {
  onNext: () => void
}

const INPUT_CLASS = 'w-full py-3 pr-4 pl-11 bg-bg-base border border-border-default rounded-lg text-text-primary text-sm outline-none'
const ICON_WRAP_CLASS = 'absolute left-[14px] top-1/2 -translate-y-1/2 text-text-muted pointer-events-none'

export default function StepAccount({ onNext }: StepAccountProps) {
  const { signUp, signIn } = useAuth()
  const [mode, setMode] = useState<'signin' | 'signup'>('signup')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    if (mode === 'signup') {
      if (password.length < 8) {
        setError('Password must be at least 8 characters.')
        return
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.')
        return
      }
    }

    setSubmitting(true)
    const result = mode === 'signup'
      ? await signUp(email, password)
      : await signIn(email, password)

    if (result.error) {
      setError(result.error)
      setSubmitting(false)
    } else {
      onNext()
    }
  }

  return (
    <div>
      <h2 className="font-serif text-[28px] text-text-primary font-normal m-0 mb-2">
        {mode === 'signup' ? 'Create your account' : 'Welcome back'}
      </h2>
      <p className="text-text-secondary text-sm m-0 mb-8">
        {mode === 'signup'
          ? 'Sign up to start selling your resume templates.'
          : 'Sign in to continue your seller application.'}
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Email */}
        <div>
          <label className="text-text-secondary text-[13px] block mb-2">
            Email address
          </label>
          <div className="relative">
            <div className={ICON_WRAP_CLASS}><Mail size={16} /></div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={INPUT_CLASS}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-text-secondary text-[13px] block mb-2">
            Password
          </label>
          <div className="relative">
            <div className={ICON_WRAP_CLASS}><Lock size={16} /></div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'signup' ? 'Minimum 8 characters' : 'Enter your password'}
              className={INPUT_CLASS}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-[14px] top-1/2 -translate-y-1/2 bg-transparent border-none text-text-muted cursor-pointer"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password (sign-up only) */}
        {mode === 'signup' && (
          <div>
            <label className="text-text-secondary text-[13px] block mb-2">
              Confirm password
            </label>
            <div className="relative">
              <div className={ICON_WRAP_CLASS}><Lock size={16} /></div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className={INPUT_CLASS}
              />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-[#EF4444] text-[13px] m-0">{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className={`py-[14px] text-text-primary rounded-lg border-none text-[15px] font-semibold transition-colors ${
            submitting
              ? 'bg-[#994700] cursor-not-allowed opacity-70'
              : 'bg-accent hover:bg-accent-hover cursor-pointer'
          }`}
        >
          {submitting
            ? 'Please wait...'
            : mode === 'signup'
              ? 'Create Account & Continue'
              : 'Sign In & Continue'}
        </button>
      </form>

      {/* Toggle */}
      <p className="text-text-secondary text-[13px] mt-6 text-center">
        {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setError('') }}
          className="text-accent bg-transparent border-none cursor-pointer text-[13px]"
        >
          {mode === 'signup' ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </div>
  )
}
