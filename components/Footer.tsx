import Link from 'next/link'

const productLinks = [
  { label: 'Browse Templates', href: '/browse' },
  { label: 'Editor', href: '/editor' },
  { label: 'AI Optimizer', href: '/optimizer' },
  { label: 'Sell Templates', href: '/sell' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
]

const legalLinks = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
]

export default function Footer() {
  return (
    <footer className="bg-bg-elevated border-t border-border-default py-10 md:py-12 px-6 md:px-[80px]">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-12 md:flex-wrap">
        {/* Brand */}
        <div className="flex flex-col gap-3">
          <span className="font-serif text-[20px] text-text-primary">
            ResumeForge
          </span>
          <span className="text-text-secondary text-[13px] max-w-[240px]">
            Professional templates for every career.
          </span>
        </div>

        {/* Link columns */}
        <nav aria-label="Footer" className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:flex md:gap-16 md:flex-wrap">
          <div className="flex flex-col gap-3">
            <span className="text-text-primary text-[13px] font-semibold">
              Product
            </span>
            {productLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary text-[13px] no-underline transition-colors duration-150 hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-text-primary text-[13px] font-semibold">
              Company
            </span>
            {companyLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary text-[13px] no-underline transition-colors duration-150 hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-text-primary text-[13px] font-semibold">
              Legal
            </span>
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text-secondary text-[13px] no-underline transition-colors duration-150 hover:text-text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      <div className="max-w-[1280px] mx-auto mt-8 pt-6 border-t border-border-default text-text-muted text-xs">
        © 2026 ResumeForge. All rights reserved.
      </div>
    </footer>
  )
}
