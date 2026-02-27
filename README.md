# ResumeForge - Resume Template Marketplace

A modern, professional web application for browsing, purchasing, and customizing resume templates. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### Pages

1. **Homepage** - SEO-optimized landing page with hero section, featured templates, how it works, benefits, creator CTA, and FAQ
2. **Browse/Marketplace** - Template discovery with advanced filtering (industry, experience level, style, price)
3. **Template Detail** - Detailed template preview with reviews, creator info, and purchase options
4. **PDF Editor** - Interactive resume editor mockup with section management and formatting tools
5. **Resume Reviewer** - AI-powered resume review tool with suggestions and improvements
6. **Creator Profile** - Designer portfolio pages with stats, templates, and reviews

### Design System

- **Light mode default** with clean white and soft-gray backgrounds
- **Inter font family** for modern, professional typography
- **Professional blue accent color** used sparingly for CTAs
- **Generous whitespace** throughout for breathing room
- **Minimal borders and soft shadows** for subtle depth
- **Smooth transitions** on all interactive elements
- **Fully responsive** for desktop, tablet, and mobile

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Homepage
│   ├── browse/
│   │   └── page.tsx          # Template marketplace
│   ├── template/
│   │   └── [id]/
│   │       └── page.tsx      # Template detail page
│   ├── editor/
│   │   └── page.tsx          # PDF editor mockup
│   ├── reviewer/
│   │   └── page.tsx          # Resume reviewer
│   ├── creator/
│   │   └── [id]/
│   │       └── page.tsx      # Creator profile
│   ├── layout.tsx            # Root layout with header/footer
│   └── globals.css           # Global styles
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Site footer
│   ├── TemplateCard.tsx      # Template preview card
│   └── FAQSection.tsx        # FAQ accordion
├── public/                   # Static assets
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── next.config.js            # Next.js configuration
```

## Key Features

### Component Highlights

- **Reusable TemplateCard** component with hover states and rating display
- **Responsive Header** with mobile menu
- **Filter System** on browse page with mobile-friendly modal
- **Interactive Editor UI** with section management and formatting toolbar
- **AI Review Interface** with accept/reject suggestion workflow
- **Professional Creator Profiles** with stats and social proof

### Design Principles

- Clean, minimal UI that feels premium and trustworthy
- Strong contrast and typography hierarchy for readability
- Subtle motion design with smooth transitions
- Mobile-first responsive design
- Accessible with proper ARIA labels and keyboard navigation
- Performance-optimized with lazy loading considerations

## Notes

This is a **UI-only implementation** with no backend functionality. All data is mocked with placeholder content. To make this production-ready, you would need to:

1. Connect to a backend API for template data
2. Implement authentication and user accounts
3. Add payment processing integration
4. Build the actual PDF editor functionality
5. Integrate AI services for resume review
6. Add image uploads and processing
7. Implement search functionality

## License

This project is for demonstration purposes.
