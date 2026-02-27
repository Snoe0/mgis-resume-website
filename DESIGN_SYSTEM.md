# TemplateMint Design System

## Color Palette

### Primary Colors (Blue)
```
primary-50:  #eff6ff  - Light backgrounds
primary-100: #dbeafe  - Hover states
primary-200: #bfdbfe  - Borders
primary-300: #93c5fd  - Focus rings
primary-400: #60a5fa
primary-500: #3b82f6  - Focus rings
primary-600: #2563eb  - Main CTA buttons
primary-700: #1d4ed8  - Button hover
primary-800: #1e40af
primary-900: #1e3a8a
```

### Neutral Grays
```
white:    #ffffff  - Backgrounds, cards
gray-50:  #f9fafb  - Alternate backgrounds
gray-100: #f3f4f6  - Subtle backgrounds
gray-200: #e5e7eb  - Borders
gray-300: #d1d5db  - Dividers
gray-500: #6b7280  - Secondary text
gray-600: #4b5563  - Body text
gray-700: #374151  - Medium emphasis text
gray-900: #111827  - Headings, high emphasis
```

### Semantic Colors
```
Green (Success):
  green-50:  #f0fdf4
  green-100: #dcfce7
  green-500: #22c55e
  green-600: #16a34a

Yellow (Warning):
  yellow-500: #eab308
  orange-500: #f97316

Red (Error):
  red-50:  #fef2f2
  red-200: #fecaca
  red-600: #dc2626
```

## Typography

### Font Family
**Primary:** Inter (sans-serif)
- Light (300): Rarely used
- Regular (400): Body text
- Medium (500): Emphasis
- Semibold (600): Subheadings, buttons
- Bold (700): Headings

### Font Sizes
```
text-xs:    0.75rem (12px)   - Labels, captions
text-sm:    0.875rem (14px)  - Small text, metadata
text-base:  1rem (16px)      - Body text
text-lg:    1.125rem (18px)  - Large body, intro text
text-xl:    1.25rem (20px)   - Section subheadings
text-2xl:   1.5rem (24px)    - Card headings
text-3xl:   1.875rem (30px)  - Page subheadings
text-4xl:   2.25rem (36px)   - Page headings
text-5xl:   3rem (48px)      - Hero headings
text-6xl:   3.75rem (60px)   - Hero large
```

### Line Heights
- Tight: 1.25 (headings)
- Normal: 1.5 (body)
- Relaxed: 1.625 (long-form)

## Spacing Scale

```
0.5: 0.125rem (2px)
1:   0.25rem (4px)
1.5: 0.375rem (6px)
2:   0.5rem (8px)
3:   0.75rem (12px)
4:   1rem (16px)
6:   1.5rem (24px)
8:   2rem (32px)
12:  3rem (48px)
16:  4rem (64px)
20:  5rem (80px)
24:  6rem (96px)
32:  8rem (128px)
```

## Shadows

### Soft Shadow (Cards)
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04),
            0 1px 2px rgba(0, 0, 0, 0.06);
```

### Soft Large (Elevated Cards)
```css
box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06),
            0 2px 6px rgba(0, 0, 0, 0.04);
```

## Border Radius

```
rounded-lg:   0.5rem (8px)   - Buttons, inputs
rounded-xl:   0.75rem (12px) - Cards
rounded-2xl:  1rem (16px)    - Large cards
rounded-full: 9999px         - Pills, avatars
```

## Components

### Buttons

#### Primary Button
```tsx
className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium
           hover:bg-primary-700 transition-colors duration-200
           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
```

#### Secondary Button
```tsx
className="px-6 py-3 bg-white text-gray-900 border border-gray-300 rounded-lg font-medium
           hover:bg-gray-50 transition-colors duration-200
           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
```

### Cards
```tsx
className="bg-white border border-gray-200 rounded-xl shadow-soft
           hover:shadow-soft-lg transition-shadow duration-200"
```

### Input Fields
```tsx
className="w-full px-4 py-2.5 border border-gray-300 rounded-lg
           focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
           transition-all duration-200"
```

### Container
```tsx
className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
```

## Iconography

**Library:** Lucide React
**Size:**
- Small: w-4 h-4 (16px)
- Medium: w-5 h-5 (20px)
- Large: w-6 h-6 (24px)
- XL: w-8 h-8 (32px)

**Color:** Matches parent text color or specific semantic color

## Layout Grid

### Breakpoints
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

### Grid Patterns
```tsx
// 1 -> 2 -> 3 columns
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6

// 1 -> 2 -> 4 columns
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6

// Sidebar + Content
grid grid-cols-1 lg:grid-cols-3 gap-8
// Sidebar: lg:col-span-1
// Content: lg:col-span-2
```

## Motion & Transitions

### Default Transition
```
transition-{property} duration-200
```

### Common Properties
- colors: Background, text, border colors
- shadow: Box shadows
- opacity: Fade in/out
- transform: Scale, translate

### Timing
- Fast: 100ms (micro-interactions)
- Normal: 200ms (most UI)
- Slow: 300ms (page transitions)

## Accessibility

### Focus States
All interactive elements have visible focus rings:
```
focus:outline-none focus:ring-2 focus:ring-primary-500
```

### Color Contrast
- Text on white: Gray-900 (21:1), Gray-700 (8:1), Gray-600 (5.4:1)
- White on primary-600: 4.5:1 (WCAG AA)

### Semantic HTML
- Proper heading hierarchy (h1 -> h2 -> h3)
- Button elements for actions
- Links for navigation
- Form labels for inputs

## Responsive Design Philosophy

### Mobile First
All styles start at mobile and scale up:
```tsx
<div className="p-4 md:p-6 lg:p-8">
```

### Touch Targets
Minimum 44x44px for all interactive elements on mobile

### Breakpoint Strategy
- Mobile: Single column, stacked
- Tablet: 2 columns, collapsible sidebar
- Desktop: 3 columns, persistent sidebar

## Usage Guidelines

### Do's
- Use primary color sparingly for important CTAs
- Maintain generous whitespace (16-24px minimum)
- Keep borders subtle (gray-200 or lighter)
- Use soft shadows, not hard edges
- Ensure 16px minimum font size for body text
- Use semibold (600) for emphasis, not bold (700)

### Don'ts
- Avoid overly saturated colors
- Don't use multiple bright colors
- Avoid heavy shadows or 3D effects
- Don't use decorative fonts
- Avoid small text below 14px
- Don't over-animate

## Example Compositions

### Hero Section
```
- Gradient background (primary-50 to white)
- 5xl/6xl heading (bold, gray-900)
- xl intro text (gray-600)
- Primary + Secondary button combo
- Badge with icon above heading
```

### Card Grid
```
- White cards on gray-50 background
- Soft shadow on cards
- Hover: Lift with larger shadow
- Consistent padding (6)
- Border: gray-200
```

### Form Layout
```
- Labels: semibold, gray-700
- Inputs: border-gray-300, focus:ring-primary-500
- Helper text: text-sm, gray-500
- Errors: text-sm, red-600
```

This design system ensures consistency across all pages and components while maintaining a professional, modern aesthetic.
