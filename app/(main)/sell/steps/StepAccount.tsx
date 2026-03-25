'use client'

import { useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'

interface StepAccountProps {
  onNext: () => void
}

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

  const inputStyle = {
    width: '100%',
    padding: '12px 16px 12px 44px',
    backgroundColor: '#0A0A0B',
    border: '1px solid #1F1F23',
    borderRadius: '8px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'var(--font-inter), Inter, sans-serif',
    outline: 'none',
  } as const

  const iconWrapStyle = {
    position: 'absolute' as const,
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6B6B70',
    pointerEvents: 'none' as const,
  }

  return (
    <div>
      <h2
        style={{
          fontFamily: 'var(--font-instrument-serif), Georgia, serif',
          fontSize: '28px',
          color: '#FFFFFF',
          fontWeight: 400,
          margin: '0 0 8px',
        }}
      >
        {mode === 'signup' ? 'Create your account' : 'Welcome back'}
      </h2>
      <p style={{ color: '#8B8B90', fontSize: '14px', margin: '0 0 32px' }}>
        {mode === 'signup'
          ? 'Sign up to start selling your resume templates.'
          : 'Sign in to continue your seller application.'}
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Email */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Email address
          </label>
          <div style={{ position: 'relative' }}>
            <div style={iconWrapStyle}><Mail size={16} /></div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={inputStyle}
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <div style={iconWrapStyle}><Lock size={16} /></div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'signup' ? 'Minimum 8 characters' : 'Enter your password'}
              style={inputStyle}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#6B6B70',
                cursor: 'pointer',
              }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password (sign-up only) */}
        {mode === 'signup' && (
          <div>
            <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              Confirm password
            </label>
            <div style={{ position: 'relative' }}>
              <div style={iconWrapStyle}><Lock size={16} /></div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                style={inputStyle}
              />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p style={{ color: '#EF4444', fontSize: '13px', margin: 0 }}>{error}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '14px',
            backgroundColor: submitting ? '#994700' : '#FF5C00',
            color: '#FFFFFF',
            borderRadius: '8px',
            border: 'none',
            fontSize: '15px',
            fontWeight: 600,
            cursor: submitting ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            opacity: submitting ? 0.7 : 1,
            transition: 'background-color 0.15s',
          }}
        >
          {submitting
            ? 'Please wait...'
            : mode === 'signup'
              ? 'Create Account & Continue'
              : 'Sign In & Continue'}
        </button>
      </form>

      {/* Toggle */}
      <p style={{ color: '#8B8B90', fontSize: '13px', marginTop: '24px', textAlign: 'center' }}>
        {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
        <button
          onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setError('') }}
          style={{
            color: '#FF5C00',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '13px',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          {mode === 'signup' ? 'Sign in' : 'Sign up'}
        </button>
      </p>
    </div>
  )
}
