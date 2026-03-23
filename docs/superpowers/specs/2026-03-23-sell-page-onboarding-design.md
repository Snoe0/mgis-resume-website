# Sell Page → Seller Onboarding Flow

**Date:** 2026-03-23
**Status:** Approved

## Overview

Transform the `/sell` marketing page into a 5-step seller onboarding flow. Remove the `/creators` and `/creator/[id]` pages. Add Supabase Auth for user sign-in (applicable to all users — buyers and sellers).

## Scope

### Remove
- `app/(main)/creators/page.tsx` — creators grid page
- `app/(main)/creator/[id]/page.tsx` — individual creator profile page (entire `creator/` directory)
- "Creators" nav link from `components/Header.tsx`
- Remove `/creators` and `/creator/[id]` from CLAUDE.md routing table

### Add — Supabase Auth (browser-side)
- `lib/supabase-browser.ts` — browser Supabase client using `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Auth context/provider or hook for session state across the app
- Sign-in/sign-up modal or inline form (email + password via Supabase Auth)
- All users authenticate the same way; the sell flow is gated behind auth

### Add — Seller Onboarding (`app/(main)/sell/page.tsx`)
Single `'use client'` file replacing the current marketing page. Contains a 5-step form flow:

**Step 1 — Account Info (Sign Up / Sign In)**
- If not authenticated: email + password sign-up/sign-in form using Supabase Auth
- If already authenticated: skip to Step 2
- Fields: email, password, confirm password (sign-up mode), toggle between sign-up/sign-in
- Validation: required fields, password match, minimum 8 chars

**Step 2 — Profile Setup**
- Display name (text input)
- Bio (textarea, max 500 chars with counter)
- Specialty (dropdown): Executive & Finance, Tech & Startups, Design & Creative, Healthcare & Science, Academic & Research, Product & Engineering, Other
- Avatar upload (file input, accepts image/*, preview as circular thumbnail)

**Step 3 — Portfolio & Links**
- Portfolio URL (optional)
- Personal website (optional)
- LinkedIn URL (optional)
- Dribbble or Behance URL (optional)
- Helper text: "Sharing your portfolio helps buyers trust your work"

**Step 4 — Upload First Template**
- Drag-and-drop file zone (accepts .docx, .pdf)
- Shows file name + size after selection
- Template title (text input, required)
- Description (textarea, required, max 1000 chars)
- Price (number input, min $0, step $1 — $0 = free)
- Category dropdown: same list as specialty

**Step 5 — Review & Submit**
- Read-only summary of all data from steps 2-4
- "Edit" buttons per section that jump back to the relevant step
- "Submit Application" button
- On submit: shows success confirmation message (no backend submission yet)

### UI Specifications

**Progress bar:**
- Horizontal bar at top with 5 numbered circles + step labels
- Completed steps: orange fill
- Current step: orange border, white fill
- Future steps: gray border
- Connecting line between steps: orange for completed, gray for upcoming

**Form cards:**
- Each step renders inside a `bg-[#141417]` card with `border border-[#1F1F23] rounded-xl p-8`
- Max width ~640px, centered

**Buttons:**
- "Continue" (primary): `bg-[#FF5C00] text-white` — right-aligned
- "Back": ghost style, `text-[#8B8B90]` — left-aligned
- Both in a flex row with `justify-between`

**File upload zone:**
- Dashed border (`border-dashed border-2 border-[#1F1F23]`), rounded-xl
- Center text: "Drag & drop your template file here" + "or click to browse"
- On file selected: show file name, size, and a remove button
- Hover: border changes to orange

**No Framer Motion** — per CLAUDE.md, animations are landing page only.

### Environment Variables (new)
- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL (public)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous/public key

### Header Change
Remove "Creators" from the `navLinks` array in `components/Header.tsx`. "Sell Templates" CTA button remains, still points to `/sell`.

### CLAUDE.md Updates
- Remove `/creators` and `/creator/[id]` from routing table
- Note Supabase Auth integration in Key Constraints or Libraries section
- Add `lib/supabase-browser.ts` to Libraries section

## Data Flow

```
User visits /sell
  → Not authenticated? Show Step 1 (sign-up/sign-in via Supabase Auth)
  → Authenticated? Skip to Step 2
  → Steps 2-4: collect form data into local useState object
  → Step 5: display summary, submit shows success message
```

Form state shape:
```typescript
interface SellerFormData {
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

## Out of Scope
- Backend storage of seller applications
- Supabase database tables for sellers/templates
- Email verification flow
- Real file upload to storage
- Auth middleware/route protection beyond the sell page
- Modifying the checkout/purchase flow to require auth (future work)
