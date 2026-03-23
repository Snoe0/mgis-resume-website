# Sell Page Seller Onboarding — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the `/sell` marketing page with a 5-step seller onboarding flow, add Supabase Auth for all users, and remove the creators/creator pages.

**Architecture:** Single `'use client'` sell page orchestrates 5 step components stored in `app/(main)/sell/steps/`. Auth is provided via a React context (`AuthProvider`) wrapping the app in the `(main)` layout. A browser-side Supabase client handles auth operations.

**Tech Stack:** Next.js 16 App Router, TypeScript, Supabase Auth (`@supabase/supabase-js`), Tailwind CSS v4, lucide-react

**Spec:** `docs/superpowers/specs/2026-03-23-sell-page-onboarding-design.md`

---

## File Structure

### New files
| File | Responsibility |
|------|---------------|
| `lib/supabase-browser.ts` | Browser-side Supabase client (public anon key) |
| `components/AuthProvider.tsx` | `'use client'` context — exposes `useAuth()` with `user`, `signIn`, `signUp`, `signOut`, `loading` |
| `app/(main)/sell/types.ts` | Shared `SellerFormData` interface |
| `app/(main)/sell/steps/StepAccount.tsx` | Step 1: Sign up / sign in form |
| `app/(main)/sell/steps/StepProfile.tsx` | Step 2: Display name, bio, specialty, avatar |
| `app/(main)/sell/steps/StepLinks.tsx` | Step 3: Portfolio & social links |
| `app/(main)/sell/steps/StepUpload.tsx` | Step 4: Template file upload + metadata |
| `app/(main)/sell/steps/StepReview.tsx` | Step 5: Review all data + submit |
| `app/(main)/sell/steps/ProgressBar.tsx` | Shared progress bar component |

### Modified files
| File | Change |
|------|--------|
| `app/(main)/sell/page.tsx` | Complete rewrite — step orchestrator |
| `app/(main)/layout.tsx` | Wrap children with `AuthProvider` |
| `components/Header.tsx` | Remove "Creators" nav link, show user state |
| `app/(main)/template/[id]/page.tsx` | Remove creator profile link (line 272-279) |
| `.env.local.example` | Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `CLAUDE.md` | Update routing table, libraries, constraints |

### Deleted files
| File | Reason |
|------|--------|
| `app/(main)/creators/page.tsx` | Creators page removed |
| `app/(main)/creator/[id]/page.tsx` | Creator profile removed (entire `creator/` directory) |

---

## Task 1: Delete creators pages and clean up references

**Files:**
- Delete: `app/(main)/creators/page.tsx`
- Delete: `app/(main)/creator/` (entire directory)
- Modify: `components/Header.tsx:7-12`
- Modify: `app/(main)/template/[id]/page.tsx:272-279`

- [ ] **Step 1: Delete the creators page**

```bash
rm app/\(main\)/creators/page.tsx
rmdir app/\(main\)/creators
```

- [ ] **Step 2: Delete the creator profile directory**

```bash
rm -rf app/\(main\)/creator
```

- [ ] **Step 3: Remove "Creators" from Header nav links**

In `components/Header.tsx`, change the `navLinks` array from:
```typescript
const navLinks = [
  { label: 'Browse', href: '/browse' },
  { label: 'Creators', href: '/creators' },
  { label: 'Editor', href: '/editor' },
  { label: 'Optimizer', href: '/optimizer' },
]
```
To:
```typescript
const navLinks = [
  { label: 'Browse', href: '/browse' },
  { label: 'Editor', href: '/editor' },
  { label: 'Optimizer', href: '/optimizer' },
]
```

- [ ] **Step 4: Remove creator profile link from template detail page**

In `app/(main)/template/[id]/page.tsx`, change the creator link (lines 272-279) from a `<Link>` to a plain `<span>`:
```typescript
// Replace:
<Link
  href={`/creator/${template.creatorId}`}
  style={{ color: '#8B8B90', fontSize: '14px', textDecoration: 'none', fontFamily: 'var(--font-inter), Inter, sans-serif' }}
  onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
  onMouseLeave={(e) => (e.currentTarget.style.color = '#8B8B90')}
>
  by {template.creator}
</Link>

// With:
<span style={{ color: '#8B8B90', fontSize: '14px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
  by {template.creator}
</span>
```

Also remove the `Link` import if it's no longer used elsewhere in the file (it is still used — keep it).

- [ ] **Step 5: Verify the build compiles**

```bash
npm run build
```
Expected: Build succeeds with no references to deleted pages.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: remove creators/creator pages, clean up references"
```

---

## Task 2: Add Supabase browser client and env vars

**Files:**
- Create: `lib/supabase-browser.ts`
- Modify: `.env.local.example`

- [ ] **Step 1: Create the browser Supabase client**

Create `lib/supabase-browser.ts`:
```typescript
import { createClient } from '@supabase/supabase-js'

export const supabaseBrowser = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

- [ ] **Step 2: Update `.env.local.example`**

Add to the end of `.env.local.example`:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

- [ ] **Step 3: Commit**

```bash
git add lib/supabase-browser.ts .env.local.example
git commit -m "feat: add browser-side Supabase client and env vars"
```

---

## Task 3: Create AuthProvider context

**Files:**
- Create: `components/AuthProvider.tsx`
- Modify: `app/(main)/layout.tsx`

- [ ] **Step 1: Create `components/AuthProvider.tsx`**

```typescript
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabaseBrowser } from '@/lib/supabase-browser'
import type { User } from '@supabase/supabase-js'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabaseBrowser.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const { data: { subscription } } = supabaseBrowser.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string) => {
    const { error } = await supabaseBrowser.auth.signUp({ email, password })
    return { error: error?.message ?? null }
  }

  const signIn = async (email: string, password: string) => {
    const { error } = await supabaseBrowser.auth.signInWithPassword({ email, password })
    return { error: error?.message ?? null }
  }

  const signOut = async () => {
    await supabaseBrowser.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
```

- [ ] **Step 2: Wrap `(main)` layout with AuthProvider**

Modify `app/(main)/layout.tsx`:
```typescript
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { AuthProvider } from '@/components/AuthProvider'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </AuthProvider>
  )
}
```

- [ ] **Step 3: Add auth state to Header**

In `components/Header.tsx`, add auth display. Import `useAuth` and show user email + Sign Out when authenticated. Add this between the desktop nav and the CTA div:

Add the `useAuth` import at the top and `const { user, signOut } = useAuth()` inside the component. Then replace the entire CTA `<div>` (lines 81-110) with:

```typescript
{/* CTA */}
<div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
  {user && (
    <>
      <span
        style={{
          color: '#8B8B90',
          fontSize: '13px',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
        }}
        className="hidden sm:inline"
      >
        {user.email}
      </span>
      <button
        onClick={() => signOut()}
        style={{
          color: '#8B8B90',
          fontSize: '13px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'var(--font-inter), Inter, sans-serif',
          transition: 'color 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
        onMouseLeave={(e) => (e.currentTarget.style.color = '#8B8B90')}
        className="hidden sm:inline"
      >
        Sign Out
      </button>
    </>
  )}
  <Link
    href="/sell"
    style={{
      padding: '8px 16px',
      backgroundColor: '#FF5C00',
      color: '#FFFFFF',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '600',
      textDecoration: 'none',
      fontFamily: 'var(--font-inter), Inter, sans-serif',
      transition: 'background-color 0.15s',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e05200')}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5C00')}
    className="hidden sm:inline-flex"
  >
    Sell Templates
  </Link>

  {/* Mobile hamburger */}
  <button
    onClick={() => setMobileOpen(!mobileOpen)}
    style={{ color: '#8B8B90', background: 'none', border: 'none', cursor: 'pointer' }}
    className="md:hidden"
  >
    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
  </button>
</div>
```

- [ ] **Step 4: Verify the build compiles**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add components/AuthProvider.tsx app/\(main\)/layout.tsx components/Header.tsx
git commit -m "feat: add AuthProvider context with Supabase Auth, integrate in Header"
```

---

## Task 4: Create shared types file

**Files:**
- Create: `app/(main)/sell/types.ts`

- [ ] **Step 1: Create `types.ts`**

```typescript
export interface SellerFormData {
  // Step 2
  displayName: string
  bio: string
  specialty: string
  avatar: File | null

  // Step 3
  portfolioUrl: string
  websiteUrl: string
  linkedinUrl: string
  dribbbleUrl: string

  // Step 4
  templateFile: File | null
  templateTitle: string
  templateDescription: string
  templatePrice: number
  templateCategory: string
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(main\)/sell/types.ts
git commit -m "feat: add shared SellerFormData type for sell onboarding"
```

---

## Task 5: Create ProgressBar component

**Files:**
- Create: `app/(main)/sell/steps/ProgressBar.tsx`

- [ ] **Step 1: Create the steps directory**

```bash
mkdir -p app/\(main\)/sell/steps
```

- [ ] **Step 2: Create `ProgressBar.tsx`**

```typescript
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
                  backgroundColor: isCompleted ? '#FF5C00' : isCurrent ? 'transparent' : 'transparent',
                  border: isCompleted ? '2px solid #FF5C00' : isCurrent ? '2px solid #FF5C00' : '2px solid #1F1F23',
                  color: isCompleted ? '#FFFFFF' : isCurrent ? '#FF5C00' : '#6B6B70',
                }}
              >
                {isCompleted ? '✓' : step}
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
```

- [ ] **Step 3: Commit**

```bash
git add app/\(main\)/sell/steps/ProgressBar.tsx
git commit -m "feat: add ProgressBar component for sell onboarding flow"
```

---

## Task 6: Create StepAccount (Sign Up / Sign In)

**Note:** This assumes email confirmation is disabled in the Supabase project settings (Auth > Settings > "Enable email confirmations" = OFF). If enabled, sign-up will not create a session until the user confirms via email, and `onNext()` would advance to Step 2 without an active session.

**Files:**
- Create: `app/(main)/sell/steps/StepAccount.tsx`

- [ ] **Step 1: Create `StepAccount.tsx`**

This component uses `useAuth()` to handle sign-up and sign-in. It has a toggle between the two modes. On successful auth, it calls `onNext()`.

```typescript
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
```

- [ ] **Step 2: Commit**

```bash
git add app/\(main\)/sell/steps/StepAccount.tsx
git commit -m "feat: add StepAccount component (sign up / sign in)"
```

---

## Task 7: Create StepProfile

**Files:**
- Create: `app/(main)/sell/steps/StepProfile.tsx`

- [ ] **Step 1: Create `StepProfile.tsx`**

```typescript
'use client'

import { useState, useRef } from 'react'
import { User, Camera } from 'lucide-react'

const specialties = [
  'Executive & Finance',
  'Tech & Startups',
  'Design & Creative',
  'Healthcare & Science',
  'Academic & Research',
  'Product & Engineering',
  'Other',
]

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

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#0A0A0B',
    border: '1px solid #1F1F23',
    borderRadius: '8px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'var(--font-inter), Inter, sans-serif',
    outline: 'none',
  } as const

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
        Set up your profile
      </h2>
      <p style={{ color: '#8B8B90', fontSize: '14px', margin: '0 0 32px' }}>
        This is how buyers will see you on ResumeForge.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            onClick={() => fileRef.current?.click()}
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#1F1F23',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              overflow: 'hidden',
              border: '2px dashed #1F1F23',
              flexShrink: 0,
            }}
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <Camera size={24} color="#6B6B70" />
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              style={{
                color: '#FF5C00',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              Upload photo
            </button>
            <p style={{ color: '#6B6B70', fontSize: '12px', margin: '4px 0 0' }}>Optional. JPG, PNG, or WebP.</p>
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} style={{ display: 'none' }} />
        </div>

        {/* Display Name */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Display name *
          </label>
          <input
            type="text"
            value={data.displayName}
            onChange={(e) => onChange({ displayName: e.target.value })}
            placeholder="How buyers will see your name"
            style={inputStyle}
          />
          {errors.displayName && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '6px' }}>{errors.displayName}</p>}
        </div>

        {/* Bio */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Bio *
          </label>
          <textarea
            value={data.bio}
            onChange={(e) => onChange({ bio: e.target.value.slice(0, 500) })}
            placeholder="Tell buyers about your design experience and style..."
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            {errors.bio ? <p style={{ color: '#EF4444', fontSize: '12px', margin: 0 }}>{errors.bio}</p> : <span />}
            <span style={{ color: '#6B6B70', fontSize: '12px' }}>{data.bio.length}/500</span>
          </div>
        </div>

        {/* Specialty */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Specialty *
          </label>
          <select
            value={data.specialty}
            onChange={(e) => onChange({ specialty: e.target.value })}
            style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
          >
            <option value="">Select a specialty</option>
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.specialty && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '6px' }}>{errors.specialty}</p>}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
        <button
          onClick={onBack}
          style={{
            color: '#8B8B90',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: '12px 32px',
            backgroundColor: '#FF5C00',
            color: '#FFFFFF',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(main\)/sell/steps/StepProfile.tsx
git commit -m "feat: add StepProfile component (display name, bio, specialty, avatar)"
```

---

## Task 8: Create StepLinks

**Files:**
- Create: `app/(main)/sell/steps/StepLinks.tsx`

- [ ] **Step 1: Create `StepLinks.tsx`**

```typescript
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

export default function StepLinks({ data, onChange, onNext, onBack }: StepLinksProps) {
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
        Portfolio & links
      </h2>
      <p style={{ color: '#8B8B90', fontSize: '14px', margin: '0 0 32px' }}>
        Sharing your portfolio helps buyers trust your work. All fields are optional.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {fields.map(({ key, label, icon: Icon, placeholder }) => (
          <div key={key}>
            <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
              {label}
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#6B6B70', pointerEvents: 'none' }}>
                <Icon size={16} />
              </div>
              <input
                type="url"
                value={data[key]}
                onChange={(e) => onChange({ [key]: e.target.value })}
                placeholder={placeholder}
                style={inputStyle}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
        <button
          onClick={onBack}
          style={{
            color: '#8B8B90',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          Back
        </button>
        <button
          onClick={onNext}
          style={{
            padding: '12px 32px',
            backgroundColor: '#FF5C00',
            color: '#FFFFFF',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(main\)/sell/steps/StepLinks.tsx
git commit -m "feat: add StepLinks component (portfolio & social URLs)"
```

---

## Task 9: Create StepUpload

**Files:**
- Create: `app/(main)/sell/steps/StepUpload.tsx`

- [ ] **Step 1: Create `StepUpload.tsx`**

```typescript
'use client'

import { useState, useRef } from 'react'
import { Upload, X, FileText } from 'lucide-react'

const categories = [
  'Executive & Finance',
  'Tech & Startups',
  'Design & Creative',
  'Healthcare & Science',
  'Academic & Research',
  'Product & Engineering',
  'Other',
]

interface StepUploadProps {
  data: {
    templateFile: File | null
    templateTitle: string
    templateDescription: string
    templatePrice: number
    templateCategory: string
  }
  onChange: (updates: Partial<StepUploadProps['data']>) => void
  onNext: () => void
  onBack: () => void
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function StepUpload({ data, onChange, onNext, onBack }: StepUploadProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (ext !== 'pdf' && ext !== 'docx') {
      setErrors(prev => ({ ...prev, file: 'Only .pdf and .docx files are accepted.' }))
      return
    }
    setErrors(prev => { const { file: _, ...rest } = prev; return rest })
    onChange({ templateFile: file })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!data.templateFile) errs.file = 'Please upload a template file.'
    if (!data.templateTitle.trim()) errs.title = 'Template title is required.'
    if (!data.templateDescription.trim()) errs.description = 'Description is required.'
    if (!data.templateCategory) errs.category = 'Please select a category.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validate()) onNext()
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#0A0A0B',
    border: '1px solid #1F1F23',
    borderRadius: '8px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'var(--font-inter), Inter, sans-serif',
    outline: 'none',
  } as const

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
        Upload your first template
      </h2>
      <p style={{ color: '#8B8B90', fontSize: '14px', margin: '0 0 32px' }}>
        Share your best resume design. You can add more templates later.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Drop zone */}
        {!data.templateFile ? (
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragOver ? '#FF5C00' : '#1F1F23'}`,
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
          >
            <Upload size={32} color={dragOver ? '#FF5C00' : '#6B6B70'} style={{ marginBottom: '12px' }} />
            <p style={{ color: '#FFFFFF', fontSize: '14px', margin: '0 0 4px', fontWeight: 500 }}>
              Drag & drop your template file here
            </p>
            <p style={{ color: '#6B6B70', fontSize: '13px', margin: 0 }}>
              or click to browse. Accepts .docx and .pdf
            </p>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: '#0A0A0B',
              border: '1px solid #1F1F23',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={20} color="#FF5C00" />
              <div>
                <p style={{ color: '#FFFFFF', fontSize: '14px', margin: 0 }}>{data.templateFile.name}</p>
                <p style={{ color: '#6B6B70', fontSize: '12px', margin: '2px 0 0' }}>{formatFileSize(data.templateFile.size)}</p>
              </div>
            </div>
            <button
              onClick={() => onChange({ templateFile: null })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B6B70' }}
            >
              <X size={18} />
            </button>
          </div>
        )}
        {errors.file && <p style={{ color: '#EF4444', fontSize: '12px', margin: '-16px 0 0' }}>{errors.file}</p>}
        <input ref={fileRef} type="file" accept=".pdf,.docx" onChange={handleFileInput} style={{ display: 'none' }} />

        {/* Title */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Template title *
          </label>
          <input
            type="text"
            value={data.templateTitle}
            onChange={(e) => onChange({ templateTitle: e.target.value })}
            placeholder="e.g. Executive Pro"
            style={inputStyle}
          />
          {errors.title && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '6px' }}>{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Description *
          </label>
          <textarea
            value={data.templateDescription}
            onChange={(e) => onChange({ templateDescription: e.target.value.slice(0, 1000) })}
            placeholder="Describe what makes this template unique..."
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            {errors.description ? <p style={{ color: '#EF4444', fontSize: '12px', margin: 0 }}>{errors.description}</p> : <span />}
            <span style={{ color: '#6B6B70', fontSize: '12px' }}>{data.templateDescription.length}/1000</span>
          </div>
        </div>

        {/* Price */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Price (USD)
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6B6B70', fontSize: '14px' }}>$</span>
            <input
              type="number"
              min={0}
              step={1}
              value={data.templatePrice}
              onChange={(e) => onChange({ templatePrice: Math.max(0, parseInt(e.target.value) || 0) })}
              style={{ ...inputStyle, paddingLeft: '32px' }}
            />
          </div>
          <p style={{ color: '#6B6B70', fontSize: '12px', marginTop: '6px' }}>Set to $0 for a free template.</p>
        </div>

        {/* Category */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Category *
          </label>
          <select
            value={data.templateCategory}
            onChange={(e) => onChange({ templateCategory: e.target.value })}
            style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '6px' }}>{errors.category}</p>}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
        <button
          onClick={onBack}
          style={{
            color: '#8B8B90',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: '12px 32px',
            backgroundColor: '#FF5C00',
            color: '#FFFFFF',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(main\)/sell/steps/StepUpload.tsx
git commit -m "feat: add StepUpload component (drag-and-drop file upload + template metadata)"
```

---

## Task 10: Create StepReview

**Files:**
- Create: `app/(main)/sell/steps/StepReview.tsx`

- [ ] **Step 1: Create `StepReview.tsx`**

```typescript
'use client'

import { useState } from 'react'
import { CheckCircle, Edit2, FileText } from 'lucide-react'
import type { SellerFormData } from '../types'

interface StepReviewProps {
  data: SellerFormData
  onBack: () => void
  onGoToStep: (step: number) => void
}

export default function StepReview({ data, onBack, onGoToStep }: StepReviewProps) {
  const [submitted, setSubmitted] = useState(false)

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '48px 0' }}>
        <CheckCircle size={56} color="#10B981" style={{ marginBottom: '24px' }} />
        <h2
          style={{
            fontFamily: 'var(--font-instrument-serif), Georgia, serif',
            fontSize: '28px',
            color: '#FFFFFF',
            fontWeight: 400,
            margin: '0 0 12px',
          }}
        >
          Application submitted!
        </h2>
        <p style={{ color: '#8B8B90', fontSize: '14px', lineHeight: 1.7, maxWidth: '400px', margin: '0 auto' }}>
          We'll review your application within 48 hours. You'll receive an email when your seller account is approved.
        </p>
      </div>
    )
  }

  const sectionStyle = {
    backgroundColor: '#0A0A0B',
    border: '1px solid #1F1F23',
    borderRadius: '12px',
    padding: '24px',
  }

  const headerStyle = {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    marginBottom: '16px',
  }

  const labelStyle = { color: '#6B6B70', fontSize: '12px', marginBottom: '4px', fontFamily: 'var(--font-inter), Inter, sans-serif' }
  const valueStyle = { color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-inter), Inter, sans-serif' }

  const editBtnStyle = {
    color: '#FF5C00',
    background: 'none' as const,
    border: 'none' as const,
    cursor: 'pointer' as const,
    fontSize: '13px',
    fontFamily: 'var(--font-inter), Inter, sans-serif',
    display: 'flex' as const,
    alignItems: 'center' as const,
    gap: '4px',
  }

  const links = [
    { label: 'Portfolio', value: data.portfolioUrl },
    { label: 'Website', value: data.websiteUrl },
    { label: 'LinkedIn', value: data.linkedinUrl },
    { label: 'Dribbble/Behance', value: data.dribbbleUrl },
  ].filter(l => l.value)

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
        Review your application
      </h2>
      <p style={{ color: '#8B8B90', fontSize: '14px', margin: '0 0 32px' }}>
        Make sure everything looks good before submitting.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Profile section */}
        <div style={sectionStyle}>
          <div style={headerStyle}>
            <h3 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 600, margin: 0 }}>Profile</h3>
            <button onClick={() => onGoToStep(2)} style={editBtnStyle}>
              <Edit2 size={14} /> Edit
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={labelStyle}>Display name</p>
              <p style={valueStyle}>{data.displayName}</p>
            </div>
            <div>
              <p style={labelStyle}>Specialty</p>
              <p style={valueStyle}>{data.specialty}</p>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <p style={labelStyle}>Bio</p>
              <p style={{ ...valueStyle, lineHeight: 1.6 }}>{data.bio}</p>
            </div>
          </div>
        </div>

        {/* Links section */}
        <div style={sectionStyle}>
          <div style={headerStyle}>
            <h3 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 600, margin: 0 }}>Links</h3>
            <button onClick={() => onGoToStep(3)} style={editBtnStyle}>
              <Edit2 size={14} /> Edit
            </button>
          </div>
          {links.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {links.map(({ label, value }) => (
                <div key={label}>
                  <p style={labelStyle}>{label}</p>
                  <p style={valueStyle}>{value}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: '#6B6B70', fontSize: '13px', margin: 0 }}>No links provided</p>
          )}
        </div>

        {/* Template section */}
        <div style={sectionStyle}>
          <div style={headerStyle}>
            <h3 style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 600, margin: 0 }}>Template</h3>
            <button onClick={() => onGoToStep(4)} style={editBtnStyle}>
              <Edit2 size={14} /> Edit
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={labelStyle}>Title</p>
              <p style={valueStyle}>{data.templateTitle}</p>
            </div>
            <div>
              <p style={labelStyle}>Price</p>
              <p style={valueStyle}>{data.templatePrice === 0 ? 'Free' : `$${data.templatePrice}`}</p>
            </div>
            <div>
              <p style={labelStyle}>Category</p>
              <p style={valueStyle}>{data.templateCategory}</p>
            </div>
            <div>
              <p style={labelStyle}>File</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={14} color="#FF5C00" />
                <p style={valueStyle}>{data.templateFile?.name ?? 'No file'}</p>
              </div>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <p style={labelStyle}>Description</p>
              <p style={{ ...valueStyle, lineHeight: 1.6 }}>{data.templateDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
        <button
          onClick={onBack}
          style={{
            color: '#8B8B90',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          Back
        </button>
        <button
          onClick={() => setSubmitted(true)}
          style={{
            padding: '14px 40px',
            backgroundColor: '#FF5C00',
            color: '#FFFFFF',
            borderRadius: '8px',
            border: 'none',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          Submit Application
        </button>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/\(main\)/sell/steps/StepReview.tsx
git commit -m "feat: add StepReview component (summary + submit)"
```

---

## Task 11: Rewrite the Sell page as step orchestrator

**Files:**
- Rewrite: `app/(main)/sell/page.tsx`

- [ ] **Step 1: Rewrite `app/(main)/sell/page.tsx`**

```typescript
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
      <div style={{ backgroundColor: '#0A0A0B', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#8B8B90', fontSize: '14px' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#0A0A0B', minHeight: '100vh', padding: '60px 24px 80px' }}>
      <div style={{ maxWidth: '640px', margin: '0 auto' }}>
        <ProgressBar currentStep={step} />

        <div
          style={{
            backgroundColor: '#141417',
            border: '1px solid #1F1F23',
            borderRadius: '12px',
            padding: '40px',
          }}
        >
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
```

- [ ] **Step 2: Verify the build compiles**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add app/\(main\)/sell/page.tsx
git commit -m "feat: rewrite sell page as 5-step seller onboarding flow"
```

---

## Task 12: Update CLAUDE.md and final verification

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Update CLAUDE.md routing table**

Remove the `/creators` and `/creator/[id]` rows. The updated routing table should be:

```markdown
| Route | File |
|-------|------|
| `/` | `app/page.tsx` |
| `/browse` | `app/browse/page.tsx` |
| `/template/[id]` | `app/template/[id]/page.tsx` |
| `/editor` | `app/editor/page.tsx` |
| `/optimizer` | `app/(main)/optimizer/page.tsx` |
| `/sell` | `app/(main)/sell/page.tsx` |
| `/checkout/success` | `app/(main)/checkout/success/page.tsx` |
| `/checkout/cancel` | `app/(main)/checkout/cancel/page.tsx` |
| `(404)` | `app/not-found.tsx` |
```

- [ ] **Step 2: Update Libraries section**

Add to the Libraries (`lib/`) section:
```markdown
- `lib/supabase-browser.ts` — browser-side Supabase client (auth & public operations)
```

Add to Shared Components:
```markdown
- `AuthProvider.tsx` — `'use client'` auth context wrapping `(main)` layout; exposes `useAuth()` hook
```

- [ ] **Step 3: Update Key Constraints**

Replace "Guest checkout only (no auth required)" with:
```markdown
- Supabase Auth is integrated for user sign-in/sign-up (used by seller onboarding; checkout remains guest-only for now)
```

Add to Environment Variables:
```markdown
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL (public)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
```

- [ ] **Step 4: Run full build to verify everything**

```bash
npm run build
```
Expected: Clean build, no errors.

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: update CLAUDE.md — remove creator routes, add auth and sell onboarding"
```

- [ ] **Step 6: Push to origin**

```bash
git push origin main
```
