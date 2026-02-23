# Additional Pages Design — 2026-02-23

## Context

The design.pen file currently has one frame: the ResumeForge landing page (1440px wide, dark theme). The user requested four additional pages to be designed in the same file, at full app depth (real interactive states, sidebars, panels).

## Design System Reference

- Background layers: `#0A0A0B` (base), `#111113` (elevated), `#141417` (card)
- Borders: `#1F1F23`
- Accent orange: `#FF5C00`
- Accent purple: `#8B5CF6`
- Text primary: `#FFFFFF`
- Text secondary: `#8B8B90`
- Text muted: `#6B6B70`
- Font headings: Instrument Serif
- Font body/UI: Inter
- Card corner radius: 12px
- Frame width: 1440px

## Pages to Build

### 1. Shop Page (`/browse`)

**Layout:** Left sidebar + card grid

- **Header**: Same as landing page (dark, full-width)
- **Page layout**: Horizontal split
  - Left sidebar (280px): "Filter Templates" title, filter groups (Industry, Experience Level, Style, Price), each with checkboxes, active filter badge count
  - Right main area (flex): "Browse Templates" h1 + result count + sort dropdown, 3-column card grid (12 cards), pagination
- **Template cards**: Dark (#141417), template preview placeholder, title, creator name, star rating, download count, price badge, hover orange border glow
- **Footer**: Same as landing page

### 2. Product Detail Page (`/template/[id]`)

**Layout:** Two-column above-fold + tabbed content below

- **Header**: Same
- **Above fold** (horizontal):
  - Left (flex): Large template preview with dark surround, light/dark mode toggle buttons, fullscreen icon
  - Right (360px): Product info card — template title, creator link with avatar, star rating + review count, price display, "Get Template" primary CTA button, "Preview Free" secondary button, key features checklist (5 items), "What's Included" list
- **Tabs** below: Features | Reviews | Related Templates (tab switcher, content area)
- **Reviews section**: Average rating bar chart breakdown (5★→1★), 3 individual review cards
- **Related templates**: 3-card row

### 3. Resume Editor Page (`/editor`)

**Layout:** Compact toolbar + three-panel split (full height)

- **Top toolbar** (48px): Small logo, editable "Untitled Resume" title in center, right side: Undo/Redo, Bold/Italic/Underline, Font/Size pickers, Preview button, Export PDF primary button
- **Three panels** (fills remaining height):
  - Left panel (240px, #111113): "Sections" header, draggable section rows (Personal Info, Summary, Work Experience, Education, Skills, Certifications) each with drag handle, eye toggle, section name; "+ Add Section" button at bottom
  - Center panel (flex, #0A0A0B): Formatting toolbar floating at top (alignment, list, link), white resume canvas below with editable fields rendered in resume layout
  - Right panel (280px, #111113): "Customize" header, Accent Color swatches row, Font Family dropdown, Spacing slider, Base Font Size stepper, Margins dropdown, Template Switcher grid (4 mini templates)

### 4. AI Reviewer / Optimizer Page (`/reviewer`)

**Layout:** Score bar at top + two-column below

- **Header**: Same (compact, for app context)
- **Upload state** (shown as overlay/initial): Centered card with dashed border, sparkle icon, heading "Analyze My Resume", subtext, file drop area, supported formats note
- **Review state** (main shown view):
  - Score bar across top (full width, #111113): "AI Analysis" heading, overall score display (e.g. 8.2/10 with arc gauge), then 4 category scores in a row (ATS Score, Clarity, Impact, Keywords) each as a labeled progress bar
  - Two columns below:
    - Left (flex): Resume preview panel — gray-toned resume image with colored highlight overlays (yellow warning regions, green good regions), section labels floating
    - Right (380px): Suggestions panel — "AI Suggestions (5)" header with counts (Pending X / Applied X), scrollable list of suggestion cards; each card has: type badge (warning/improvement/success), section label, strikethrough current text → suggested text, brief explanation, Accept + Dismiss buttons
  - Bottom export bar (full width): "X suggestions applied" + "Export Improved Resume" button + "Start Over" link

## Approach

Option C — Mixed hybrid: each page uses the layout best suited to its function.

## Notes

- All frames at 1440px width, placed to the right of the existing landing page on canvas
- Pages share the same header and footer components (copy from landing page)
- Dark theme consistent throughout — no light backgrounds except the resume canvas in the editor
- All content is mock/static (no backend wiring needed at design stage)
