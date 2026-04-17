export interface FAQItem {
  q: string
  a: string
}

interface HomeFAQProps {
  faqs: FAQItem[]
}

/**
 * Server-renderable FAQ using native <details>/<summary>.
 * - Fully crawlable without JS (SEO + accessibility win).
 * - CSS-only "+" → "×" rotation when <details> is open.
 * - No React state, no client boundary.
 */
export default function HomeFAQ({ faqs }: HomeFAQProps) {
  return (
    <div className="max-w-[720px] mx-auto">
      {/*
        Embedded style tag handles:
        - Removing the default disclosure marker across browsers
        - Rotating the "+" icon when <details> is open
      */}
      <style>{`
        .home-faq-summary::-webkit-details-marker { display: none; }
        .home-faq-summary::marker { content: ''; }
        details[open] .home-faq-summary .home-faq-icon {
          transform: rotate(45deg);
        }
      `}</style>

      {faqs.map((faq, i) => (
        <details key={i} className="border-b border-border-default">
          <summary className="home-faq-summary flex justify-between items-center py-5 cursor-pointer gap-4 list-none">
            <span className="text-text-primary text-[15px] font-medium">
              {faq.q}
            </span>
            <span className="home-faq-icon text-accent text-[20px] flex-shrink-0 transition-transform duration-200 inline-block leading-none">
              +
            </span>
          </summary>
          <p className="text-text-secondary text-sm leading-[1.7] pb-5 m-0">
            {faq.a}
          </p>
        </details>
      ))}
    </div>
  )
}
