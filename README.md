# ResumeForge — Resume Template Marketplace

A modern marketplace for browsing, purchasing, and customizing resume templates, with a built-in PDF editor and AI-powered resume optimizer. Built with **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, **Stripe**, and **Supabase**.

## Features

### Pages

| Route | Purpose |
|-------|---------|
| `/` | SEO-optimized landing page — hero, featured templates, how it works, FAQ |
| `/browse` | Template marketplace with live data from Supabase and PDF previews |
| `/template/[id]` | Template detail page with real PDF preview from Supabase |
| `/editor` | Interactive resume editor (desktop-only) with section management, drag-and-drop, and DOCX/PDF export |
| `/optimizer` | AI-powered resume optimizer — upload a PDF, get suggestions |
| `/sell` | Seller onboarding for creators uploading templates |
| `/pricing` | Pay-for-what-you-need pricing tiers |
| `/about`, `/contact` | Marketing pages |
| `/privacy`, `/terms` | Legal pages |
| `/checkout/success`, `/checkout/cancel` | Stripe Checkout return pages |

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/checkout` | POST | Creates a Stripe Checkout Session for a template |
| `/api/checkout/verify` | GET | Verifies a Stripe session (used by success page) |
| `/api/webhooks/stripe` | POST | Stripe webhook — writes completed orders to Supabase |

### Highlights

- **Real Stripe Checkout** in sandbox/test mode — free templates bypass Stripe and go straight to success
- **Supabase**-backed orders, auth (seller onboarding), and template storage
- **PDF previews** rendered client-side via `pdfjs-dist` with canvas thumbnails at 3× resolution
- **Resume export** as PDF (`jspdf`) or DOCX (`docx` + `file-saver`)
- **Drag-and-drop** section reordering in the editor via `@dnd-kit`
- **Framer Motion** scroll-in animations on the landing page
- **Cookie banner** + Google Tag Manager (`GTM-THB6WFRX`) for analytics consent
- **Mobile responsive** marketing pages; editor is desktop-only by design
- **SEO**: sitemap, robots, manifest, structured data, OG metadata

## Tech Stack

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **Stripe** (`stripe`, `@stripe/stripe-js`)
- **Supabase** (`@supabase/supabase-js`)
- **pdfjs-dist** for PDF rendering
- **docx**, **jspdf**, **file-saver** for resume export
- **@dnd-kit** for drag-and-drop
- **Framer Motion** for animations
- **Lucide React** for icons

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # start production server
npm run lint     # ESLint via Next.js
```

### Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

Use Stripe test card `4242 4242 4242 4242` for purchases.

## Project Structure

```
app/
├── page.tsx                    # Homepage
├── layout.tsx                  # Root layout (Header, Footer, GTM, fonts)
├── globals.css                 # Tailwind v4 theme + design tokens
├── sitemap.ts, robots.ts, manifest.ts
├── not-found.tsx
├── editor/page.tsx             # PDF editor (desktop-only)
├── reviewer/page.tsx
├── (main)/                     # Auth-wrapped marketing routes
│   ├── layout.tsx              # AuthProvider wrapper
│   ├── page.tsx
│   ├── about/, contact/, pricing/
│   ├── privacy/, terms/
│   ├── browse/, template/[id]/
│   ├── optimizer/, sell/
│   └── checkout/{success,cancel}/
└── api/
    ├── checkout/route.ts
    ├── checkout/verify/route.ts
    └── webhooks/stripe/route.ts

components/
├── Header.tsx, Footer.tsx
├── TemplateCard.tsx
├── PdfThumbnail.tsx            # Canvas-rendered PDF previews
├── AuthProvider.tsx            # Supabase auth context
└── CookieBanner.tsx

lib/
├── templates.ts                # Template data + getTemplateById()
├── stripe.ts, stripe-client.ts
├── supabase.ts, supabase-browser.ts
└── parseResumePdf.ts           # PDF text extraction for the optimizer
```

`@/` is aliased to the project root.

## Design System

Defined in `app/globals.css` via Tailwind v4 `@theme`:

- **Backgrounds**: `#0A0A0B` (base), `#111113` (elevated), `#141417` (cards)
- **Borders**: `#1F1F23`
- **Accent**: `#FF5C00` (orange CTAs), `#8B5CF6` (purple secondary)
- **Text**: `#FFFFFF` / `#8B8B90` / `#6B6B70`
- **Fonts**: Instrument Serif (headings), Inter (UI/body)
- **Container**: `max-width: 1280px`, `padding: 0 80px`
- **Cards**: `rounded-xl`, orange border + `translateY(-2px)` on hover

## License

MIT — see repository for details.
