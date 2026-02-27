# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**ResumeForge** — a resume template marketplace with a built-in PDF editor and AI-powered resume reviewer. Currently a fully designed UI with mock data; no backend is implemented yet.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint via Next.js
npm run start    # Start production server
```

No test suite is configured.

## Architecture

This is a **Next.js 16 App Router** project with TypeScript and Tailwind CSS v4.

### Routing (App Router)

All routes live under `app/` and use the Next.js App Router convention:

| Route | File |
|-------|------|
| `/` | `app/page.tsx` |
| `/browse` | `app/browse/page.tsx` |
| `/template/[id]` | `app/template/[id]/page.tsx` |
| `/editor` | `app/editor/page.tsx` |
| `/reviewer` | `app/reviewer/page.tsx` |
| `/creator/[id]` | `app/creator/[id]/page.tsx` |
| `/creators` | `app/(main)/creators/page.tsx` |
| `/sell` | `app/(main)/sell/page.tsx` |
| `(404)` | `app/not-found.tsx` |

`app/layout.tsx` wraps every page with `<Header>` and `<Footer>` from `components/`. Global CSS and Inter font are loaded here.

### Shared Components

Located in `components/`:
- `Header.tsx` — sticky nav with mobile hamburger menu
- `Footer.tsx` — site footer with four link columns
- `TemplateCard.tsx` — reusable card for template listings (used in browse, homepage, creator profile, template detail)
- `FAQSection.tsx` — accordion FAQ used on the homepage

### Data

All data is **hardcoded mock data** inside each page file. There is no API, database, or state management layer. Filters, pagination, and interactive buttons are UI-only.

### Path Alias

`@/` maps to the project root (configured in `tsconfig.json`). Use `@/components/...` for imports.

## Design System

Defined in `app/globals.css` (`@theme` block). Key conventions:

- **Background**: `#0A0A0B` (base), `#111113` (elevated: header/footer/sidebar), `#141417` (cards)
- **Borders**: `#1F1F23`
- **Accent**: `#FF5C00` (orange, CTAs and active states), `#8B5CF6` (purple, secondary)
- **Text**: `#FFFFFF` (primary), `#8B8B90` (secondary/body), `#6B6B70` (muted/labels)
- **Fonts**: Instrument Serif (headings via `--font-instrument-serif`), Inter (UI/body via `--font-inter`)
- **Icons**: `lucide-react` exclusively
- **Cards**: `bg-card` (`#141417`) with `#1F1F23` border, `rounded-xl`, orange border + `translateY(-2px)` on hover
- **Primary button**: `#FF5C00` background, white text, hover to `#e05200`
- **Container**: `max-width: 1280px`, `margin: 0 auto`, `padding: 0 80px`
- **Animations**: Framer Motion on landing page only — `fadeUp` variant (`opacity 0→1, y 24→0`), `staggerChildren: 0.08`

## Workflow

- **Commit after every meaningful change** — each new file or logical edit gets its own `git commit` before moving to the next task. Push to `origin main` when a feature is complete.

## Key Constraints

- All pages are purely presentational; no form submissions, filter logic, or network calls work
- The project is structured for future backend integration (REST or GraphQL + NextAuth + Stripe)
- `next.config.js` allows remote images from any HTTPS hostname (`hostname: '**'`)
