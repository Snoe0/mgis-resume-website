# ResumeForge — SEO Action Plan

Prioritized recommendations in order of ROI. Critical items block indexing; High items significantly impact rankings; Medium items are optimizations; Low items are polish.

---

## 🔴 Critical — Ship Today

### C1. Add `robots.ts` and `sitemap.ts`
**Effort:** 10 min
**Why:** Without these, Google can't discover or crawl the site. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) have no guidance.
**File:** `app/robots.ts`, `app/sitemap.ts`
**What it does:** Uses Next.js 13+ convention. Automatically served at `/robots.txt` and `/sitemap.xml`.

### C2. Add `metadataBase` + default OG/Twitter + per-route metadata
**Effort:** 20 min
**Why:** Every page currently uses the homepage title/description. Social shares have no image. Canonical URLs are missing.
**Files:** `app/layout.tsx` (defaults), route-level `layout.tsx` files for each client page.
**Note:** Because every page is `'use client'`, `metadata` cannot be exported from the page itself. Solution: add a server `layout.tsx` per route folder that exports metadata and passes children through.

### C3. Fix broken footer links
**Effort:** 5 min
**Why:** Links to `/pricing`, `/about`, `/blog`, `/careers`, `/contact` all 404. This hurts UX and bleeds crawl budget.
**Fix:** Remove the dead links from `Footer.tsx` until those pages exist. Home CTA → `/about` also needs to be removed or redirected.

### C4. Add `noindex` to checkout/editor/sell success pages
**Effort:** 3 min
**Why:** `/checkout/success`, `/checkout/cancel` must never be indexed — they're per-transaction URLs. `/editor` is an app surface, not content.
**Fix:** Add `robots: { index: false, follow: false }` to each route's metadata.

---

## 🟠 High — Ship This Week

### H1. Add FAQPage JSON-LD to homepage
**Effort:** 10 min
**Why:** 5 clean Q&A pairs are already on the homepage. `FAQPage` schema makes them eligible for Google rich results AND AI Overview citations.
**File:** `app/(main)/page.tsx` — inject `<script type="application/ld+json">` block.

### H2. Add Organization + WebSite JSON-LD to root layout
**Effort:** 10 min
**Why:** Unlocks the sitelinks search box in Google SERPs and establishes brand entity.
**File:** `app/layout.tsx`

### H3. Add Product + Offer + AggregateRating JSON-LD to template pages
**Effort:** 15 min
**Why:** Enables rich product results (price, rating stars) in SERPs for `/template/[id]`. Every template in `lib/templates.ts` has price, rating, and reviewCount — all the fields needed.
**File:** New `app/(main)/template/[id]/layout.tsx` with `generateMetadata`.

### H4. Move GTM from `beforeInteractive` to `afterInteractive`
**Effort:** 1 min
**Why:** `beforeInteractive` blocks first paint. Google's own docs recommend `afterInteractive` for tag managers. Estimated LCP improvement: 300–800ms.
**File:** `app/layout.tsx:33`

### H5. Fix template page fallback — use `notFound()` instead of silent default
**Effort:** 5 min
**Why:** Currently `/template/banana` renders "Executive Pro" content → duplicate content everywhere.
**File:** `app/(main)/template/[id]/page.tsx:74`

### H6. Add security headers in `next.config.js`
**Effort:** 10 min
**Why:** HSTS, X-Content-Type-Options, Referrer-Policy are expected by Lighthouse and lift trust score.

---

## 🟡 Medium — Ship This Month

### M1. Convert template IDs to slugs
**Effort:** 1 hour
**Why:** `/template/executive-pro` outranks `/template/1`. Keyword in URL.
**Path:** Add `slug` to `Template` type, update `getTemplateById`, update `TemplateCard` href.

### M2. Replace homepage FAQ accordion with `<details>`/`<summary>`
**Effort:** 30 min
**Why:** Semantic, accessible, crawlable without JS. Native CSS transitions. Reduces client JS.

### M3. Extract homepage shell from `'use client'` into server component
**Effort:** 45 min
**Why:** Hero, Features, How-It-Works, CTA sections don't need client state. Only the FAQ accordion does. Split and save ~20KB of JS on initial load.

### M4. Add `BreadcrumbList` JSON-LD to template + browse pages
**Effort:** 15 min

### M5. Replace inline `style={{}}` with Tailwind classes
**Effort:** 2–3 hours
**Why:** Caching, consistency, CLS reduction. CSS-in-JS via inline styles can't be extracted.

### M6. Add `llms.txt` at site root
**Effort:** 10 min
**Why:** Modern AI-crawler convention (like robots.txt for LLMs). Lists canonical content URLs for ingestion.

### M7. Move GTM inline script to `<Script>` with `afterInteractive`
**Effort:** 2 min (bundled with H4)

### M8. Add `generateMetadata` for dynamic template pages
**Effort:** 15 min
**Why:** Each `/template/[id]` should have a unique title like "Executive Pro Resume Template by Sarah Chen — $24".

### M9. Add missing "About", "Pricing", "Contact" pages OR remove links
**Effort:** 2 hours to write real pages; 2 min to remove links.

---

## 🟢 Low — Backlog

### L1. Real template preview images via `next/image`
### L2. Add `HowTo` JSON-LD to "How It Works" section
### L3. Add `Review` JSON-LD for template page reviews
### L4. Swap Framer Motion for CSS-only animations where possible
### L5. Add PWA manifest + apple-touch-icon
### L6. Add `hreflang` tags if international expansion planned

---

## Implementation Roadmap

| Phase | Items | Effort | Score Δ |
|---|---|---|---|
| Phase 1 (today) | C1-C4, H1-H5 | ~90 min | +35 points |
| Phase 2 (this week) | H6, M1-M4 | ~3 hours | +12 points |
| Phase 3 (this month) | M5-M9 | ~6 hours | +10 points |
| Phase 4 (backlog) | L1-L6 | Ongoing | +5 points |

**Expected Health Score after Phase 1:** ~70/100
**Expected after Phase 2:** ~82/100
**Expected after Phase 3:** ~92/100
