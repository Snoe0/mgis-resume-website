# ResumeForge Rebuild — Design Document

## Overview

Full wipe and rebuild of the ResumeForge codebase to match the `design.pen` dark theme. Implements Landing and Browse pages for this pass. Brand name changes from ResumeForge → ResumeForge.

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Brand name | ResumeForge | Matches design.pen |
| Pages this pass | Landing + Browse | Most visible; others follow |
| Animation | Framer Motion | Richer stagger/viewport API than CSS-only |
| Approach | Full wipe + rewrite | Old light-blue system too different to patch |

## Design Tokens

| Token | Value | Usage |
|-------|-------|-------|
| bg-base | `#0A0A0B` | Page background |
| bg-elevated | `#111113` | Header, footer, score bars |
| bg-card | `#141417` | Cards, panels, buttons |
| border | `#1F1F23` | All borders and dividers |
| accent | `#FF5C00` | CTAs, active states, highlights |
| accent-purple | `#8B5CF6` | Secondary accent |
| text-primary | `#FFFFFF` | Headings, prices |
| text-secondary | `#8B8B90` | Body copy, nav links |
| text-muted | `#6B6B70` | Labels, captions |
| font-serif | Instrument Serif | Headings and hero |
| font-sans | Inter | All UI / body |

## Architecture

Next.js 16 App Router, TypeScript, Tailwind CSS v4. Design tokens live in `globals.css` `@theme` block. Framer Motion for scroll animations on the landing page only. All data is static mock data inline in each page file — no state management or API calls.

## Components

### Header
Sticky, `bg-elevated` (#111113), bottom border `#1F1F23`. Left: "ResumeForge" in Instrument Serif 20px white. Center: nav links (Browse, Creators, Editor, Reviewer) in Inter 14px `text-secondary`. Right: "Sell Templates" orange pill button.

### Footer
`bg-elevated`, top border. Left column: ResumeForge logo + tagline. Right: two link columns (Product, Company) in `text-secondary`.

### TemplateCard
`bg-card`, border, `rounded-xl`. Top: image placeholder rect (200px tall, rounded top corners). Bottom: padding 16px — title (white 600), creator (secondary), row with stars (orange) and price (white bold).

## Landing Page Sections

1. **Hero** — Full-width, centered. Badge pill, Instrument Serif h1 (56px), subtext, two CTA buttons (orange primary + ghost secondary), three trust badges row.
2. **Featured Templates** — "Featured Templates" h2, 3-col TemplateCard grid, "View All" link.
3. **How It Works** — 3 dark cards with step number badges, icon, title, description.
4. **Creator CTA** — Dark band with orange accents. Heading, subtext, two buttons, 3-stat row.
5. **FAQ** — Accordion with `+`/`−` toggle, border separators.

**Framer Motion pattern** — Each section wrapped in `<motion.div>` with:
```
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: 'easeOut' }}
viewport={{ once: true, margin: '-100px' }}
```
Card grids use `staggerChildren: 0.08` via `variants`.

## Browse Page Sections

Static layout, no animations.

- **Two-column body**: left sidebar 280px fixed, right main fills remaining width.
- **Sidebar**: "Filter Templates" heading, Industry group (4 checkboxes), Experience Level group (3 checkboxes). `bg-elevated`, right border.
- **Main**: top bar with "Browse Templates" h1 + result count on left, sort dropdown on right. Active filter pills row. 3-col card grid (6 cards). Pagination row (← 1 2 3 →).
