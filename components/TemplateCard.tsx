'use client'

import Image from 'next/image'
import Link from 'next/link'

interface TemplateCardProps {
  id: string
  slug?: string
  title: string
  creator: string
  price: number | 'free'
  rating: number
  preview?: string
  previewUrl?: string
  tags?: string[]
}

function isPdf(url?: string): boolean {
  return !!url && url.toLowerCase().endsWith('.pdf')
}

export default function TemplateCard({
  id,
  slug,
  title,
  creator,
  price,
  rating,
  preview,
  previewUrl,
  tags,
}: TemplateCardProps) {
  const stars = Math.round(rating)
  const href = `/template/${slug ?? id}`
  const previewSrc = preview ?? previewUrl

  return (
    <Link href={href} className="no-underline group">
      <div className="bg-bg-card border border-border-default rounded-xl overflow-hidden transition-all duration-200 group-hover:border-accent group-hover:-translate-y-0.5 cursor-pointer">
        {/* Preview area */}
        <div className="relative h-[220px] bg-[#F8F8F5] flex items-center justify-center overflow-hidden">
          {previewSrc && isPdf(previewSrc) ? (
            <iframe
              src={`${previewSrc}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              title={`${title} preview`}
              className="w-full h-[220px] border-0 pointer-events-none"
            />
          ) : previewSrc ? (
            <Image
              src={previewSrc}
              alt={`${title} resume template preview`}
              width={400}
              height={500}
              className="w-full h-[220px] object-cover object-top"
            />
          ) : (
            <div className="flex flex-col gap-2 p-6 w-full opacity-15">
              <div className="h-2.5 bg-white rounded w-3/5" />
              <div className="h-[7px] bg-white rounded w-2/5" />
              <div className="h-px bg-accent my-2" />
              <div className="h-1.5 bg-white rounded w-4/5" />
              <div className="h-1.5 bg-white rounded w-[70%]" />
              <div className="h-1.5 bg-white rounded w-3/4" />
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="p-4 flex flex-col gap-2 font-sans">
          <span className="text-text-primary text-[15px] font-semibold">{title}</span>
          <span className="text-text-secondary text-[13px]">by {creator}</span>
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-0.5">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-border-default rounded-full text-text-secondary text-[11px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center mt-1">
            <span className="text-accent text-[13px]">
              {'★'.repeat(stars)}
              {'☆'.repeat(5 - stars)}
              &nbsp;&nbsp;{rating.toFixed(1)}
            </span>
            <span
              className={
                price === 'free'
                  ? 'text-success text-[15px] font-bold'
                  : 'text-text-primary text-[15px] font-bold'
              }
            >
              {price === 'free' ? 'Free' : `$${price}`}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
