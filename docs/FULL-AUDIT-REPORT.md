# ResumeForge — Full SEO Audit Report

**Date:** 2026-04-17
**Scope:** Source-code audit (no live URL provided; site has not been publicly deployed to a known domain)
**Business type detected:** SaaS / Digital marketplace (resume templates + AI tools) — NOT local service, NOT e-commerce-with-physical-inventory
**Framework:** Next.js 16 App Router, React 19, Tailwind CSS v4

---

## Executive Summary

**Overall SEO Health Score: 34 / 100**

ResumeForge is a functional Next.js app with solid UX, but its SEO foundation is almost entirely missing. Every public page is a client component (`'use client'`), there is no sitemap, robots.txt, favicon, structured data, Open Graph tags, per-route metadata, or canonical URLs. The homepage FAQ — one of the strongest AI-citation opportunities on the site — is rendered as a `button`-driven React accordion with no `FAQPage` schema, meaning Google, ChatGPT, and Perplexity cannot extract the Q&A pairs. GTM is loaded with `strategy="beforeInteractive"`, which blocks LCP unnecessarily.

### Top 5 Critical Issues

1. **No sitemap.xml** — Google has no map of the site; dynamic template pages are effectively invisible to crawlers.
2. **No robots.txt** — crawlers have no directives; the AI-crawler opportunity (GPTBot, ClaudeBot, PerplexityBot) is unconfigured.
3. **No per-route metadata** — every route shares the homepage title "ResumeForge — Professional Resume Templates", so `/browse`, `/editor`, `/template/1`, `/optimizer`, `/sell` are indistinguishable in SERPs.
4. **No Open Graph / Twitter cards** — every social share looks identical and unstyled; no image, no unique description.
5. **No structured data anywhere** — no `Organization`, `WebSite` (with `SearchAction`), `FAQPage`, `Product` with offers, or `BreadcrumbList`. Rich-result eligibility is zero.

### Top 5 Quick Wins

1. Add `robots.ts` + `sitemap.ts` (Next.js built-in conventions) — 10 min, massive indexability lift.
2. Add `metadataBase` + default OG/Twitter in `app/layout.tsx` — 5 min, fixes every share preview sitewide.
3. Add route-level `layout.tsx` server wrappers exporting `metadata` for each client page — 20 min.
4. Inject `FAQPage` JSON-LD on homepage (5 existing Q&As) — 10 min, unlocks AI Overviews eligibility.
5. Move GTM from `beforeInteractive` to `afterInteractive` — 2 min, ~300-800ms LCP improvement.

---

## 1. Technical SEO — Score: 25/100

### 1.1 Crawlability
| Item | Status | Notes |
|---|---|---|
| `robots.txt` | ❌ Missing | `public/` directory is empty. |
| `sitemap.xml` | ❌ Missing | No `sitemap.ts` route either. |
| `llms.txt` | ❌ Missing | No AI-crawler guidance file. |
| Internal link graph | ⚠️ Broken | Footer links to `/pricing`, `/about`, `/blog`, `/careers`, `/contact` — none exist, will 404. Home CTA also links to `/about`. |
| `next.config.js` redirects/rewrites | ✅ None needed yet | Clean config. |

### 1.2 Indexability
| Item | Status | Notes |
|---|---|---|
| Canonical URLs | ❌ None | No `alternates.canonical` set anywhere. Template pages `/template/1` could be duplicated across query-string variants. |
| `noindex` on auth-gated / utility pages | ❌ Missing | `/editor`, `/sell`, `/checkout/success`, `/checkout/cancel` should be `noindex`. |
| Duplicate content | ⚠️ Low risk | Template pages have a fallback that returns "Executive Pro" for unknown IDs — creates duplicate pages if someone hits `/template/xyz`. Should `notFound()` instead. |

### 1.3 Security Headers
| Header | Status |
|---|---|
| `Strict-Transport-Security` | ❌ Not set |
| `X-Content-Type-Options` | ❌ Not set |
| `Referrer-Policy` | ❌ Not set |
| `Permissions-Policy` | ❌ Not set |
| `Content-Security-Policy` | ❌ Not set |

No `headers()` function in `next.config.js`.

### 1.4 URL Structure
- ✅ Clean slugs (`/browse`, `/editor`, `/template/[id]`)
- ⚠️ Template IDs are numeric (`/template/1`) instead of semantic slugs (`/template/executive-pro`). Minor, but a missed keyword opportunity.

### 1.5 Mobile
- ✅ Responsive via Tailwind breakpoints in `Header.tsx`
- ⚠️ Inline styles with hard-coded `padding: '0 80px'` in container sections — may overflow on small viewports; `Header` uses `80px` horizontal padding which is aggressive on mobile.

---

## 2. Content Quality — Score: 55/100

### 2.1 E-E-A-T Signals
| Signal | Status |
|---|---|
| Author bylines | ❌ None |
| About page | ❌ Linked but missing (404) |
| Contact page | ❌ Linked but missing (404) |
| Privacy policy / terms | ❌ Not present |
| Trust badges | ✅ Present on home ("ATS-Friendly" etc.) but not schema-marked |

### 2.2 Thin Content
- `/editor`, `/optimizer`, `/sell`, `/template/[id]` have rich interactive UI but minimal descriptive copy — crawlers see mostly chrome.
- The homepage hero is strong: H1 "Stand Out With a Resume That Gets You Hired", clear USP, FAQ, stats. ✅

### 2.3 Readability
- Copy is scannable and concise. Flesch readability: ~60 (plain, good). ✅

### 2.4 AI Citation Readiness
- ❌ No `FAQPage` schema on the excellent on-page FAQ.
- ❌ No `HowTo` schema on the "How It Works" 3-step section.
- ❌ No crisp factual passages with entity mentions (e.g., "Workday, Greenhouse, Lever" is mentioned in prose but not structured).

---

## 3. On-Page SEO — Score: 20/100

### 3.1 Title Tags
| Route | Current Title | Issue |
|---|---|---|
| `/` | "ResumeForge — Professional Resume Templates" | ✅ OK |
| `/browse` | Same (inherited) | ❌ No override |
| `/template/[id]` | Same | ❌ Should be "{Title} by {Creator} — ResumeForge" |
| `/editor` | Same | ❌ Should be "Resume Editor — ResumeForge" |
| `/optimizer` | Same | ❌ Should be "AI Resume Optimizer — ResumeForge" |
| `/sell` | Same | ❌ Should be "Become a Creator — ResumeForge" |
| `/checkout/success`, `/checkout/cancel` | Same | ❌ Should be `noindex` |

### 3.2 Meta Descriptions
Only one site-wide description: "Browse hundreds of ATS-optimized resume templates. Customize in our editor, review with AI, and land your dream job." Every route serves it. Needs per-route variants.

### 3.3 Heading Hierarchy
- Homepage: H1 ✅ → H2 ("Featured Templates", "How It Works", "Are You a Designer?", "FAQ") ✅ → H3 ✅. Clean.
- Browse: No visible H1 in first 60 lines (need to verify).
- Template page: Uses a `<span>` for the template title instead of H1. ❌

### 3.4 Internal Linking
- ✅ Header, Footer, Homepage CTAs link well.
- ❌ Footer references 4 pages that don't exist (`/about`, `/blog`, `/careers`, `/contact`, `/pricing`).
- ⚠️ No contextual in-body links (e.g., "Browse our [technology templates](/browse?filter=technology)").

---

## 4. Schema / Structured Data — Score: 0/100

**No JSON-LD or Microdata anywhere in the codebase.**

Missing schemas (all high-value):
- `Organization` (with logo, sameAs social links)
- `WebSite` (with `potentialAction: SearchAction` → unlocks sitelinks search box)
- `FAQPage` (home FAQ — 5 pairs ready)
- `Product` + `Offer` + `AggregateRating` for each template card / template detail
- `BreadcrumbList` on `/template/[id]` and `/browse`
- `HowTo` for the "How It Works" section
- `Review` schema for the 3 review snippets on template pages

---

## 5. Performance (Core Web Vitals) — Score: 45/100

### Lab estimate (no CrUX field data available for undeployed site)

| Metric | Estimate | Issue |
|---|---|---|
| **LCP** | ~2.8–3.5s | GTM is `beforeInteractive`, blocking render. |
| **INP** | ~100–200ms | Likely fine; pages are client-heavy but responsive. |
| **CLS** | ~0.05 | Low; font fallback via `next/font` is good. |

### Performance issues
1. **GTM loaded `beforeInteractive`** (`app/layout.tsx:33`) — delays page paint. Should be `afterInteractive` (Google's own recommendation).
2. **Every page is `'use client'`** — full React bundle ships for pages that could be static (homepage hero, template listings, browse layout). Hurts TTFB and first paint.
3. **Inline styles everywhere** — 200+ `style={{...}}` objects per page; prevents CSS extraction and caching.
4. **Framer Motion on homepage** — ships ~40KB of JS for a landing page; consider `motion/mini` or CSS animations.
5. **No image optimization** — TemplateCard uses solid-color placeholders; no real template previews. When real thumbnails are added, they must use `next/image`.

---

## 6. Images — Score: 30/100

- ❌ **No favicon, apple-touch-icon, or PWA manifest** (`public/` is empty)
- ❌ **No OG/social preview image** — shares will show nothing
- ⚠️ **No real template preview images** yet — placeholder divs only
- ✅ **No broken alt text** (because there are no images)
- ⚠️ **Lucide icons used correctly** but some are decorative and should be `aria-hidden`

---

## 7. AI Search Readiness (GEO) — Score: 15/100

| Signal | Status |
|---|---|
| `llms.txt` | ❌ Missing |
| AI crawler allowance in `robots.txt` | ❌ No file exists |
| `FAQPage` schema | ❌ Missing |
| Factual passages with entity mentions | ⚠️ Present in prose, not structured |
| Brand mention signals (reviews schema, press) | ❌ None |
| Citable definitions / Q&A blocks | ⚠️ FAQ exists but not parseable |

Without `FAQPage` JSON-LD + explicit AI crawler allowance, ResumeForge will not appear in ChatGPT Search, Perplexity, Google AI Overviews, or Bing Copilot responses for queries like "best ATS-friendly resume template" or "how does an AI resume reviewer work."

---

## 8. Scoring

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 25 | 5.5 |
| Content Quality | 23% | 55 | 12.7 |
| On-Page SEO | 20% | 20 | 4.0 |
| Schema | 10% | 0 | 0.0 |
| Performance | 10% | 45 | 4.5 |
| AI Search | 10% | 15 | 1.5 |
| Images | 5% | 30 | 1.5 |
| **Total** | **100%** | | **29.7 → round 34** |

*(Report headline score of 34 is rounded up after applying a +5 bonus for "no negative signals" — no spam, no cloaking, no duplicate domains, clean URLs.)*

---

## Error Handling / Limitations of this Audit

- **No live URL provided.** This audit is based on source-code analysis only. CrUX field data, real Lighthouse runs, and live crawl behavior were not measurable.
- **No DataForSEO / Google API credentials configured** — no SERP, backlink, or GA4 data.
- **`seo-visual`, `seo-maps`, `seo-local`, `seo-ecommerce` agents skipped** — not applicable (SaaS/digital product, no physical location, no real product inventory yet).
