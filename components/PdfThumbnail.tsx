'use client'

import { useEffect, useRef, useState } from 'react'

interface PdfThumbnailProps {
  url: string
  /** Height of the rendered canvas in px. Width scales proportionally. */
  height?: number
  className?: string
}

export default function PdfThumbnail({ url, height = 220, className = '' }: PdfThumbnailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!url) return
    let cancelled = false

    async function render() {
      try {
        const pdfjsLib = await import('pdfjs-dist')
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

        const pdf = await pdfjsLib.getDocument({ url, withCredentials: false }).promise
        if (cancelled) return

        const page = await pdf.getPage(1)
        if (cancelled) return

        const canvas = canvasRef.current
        if (!canvas) return

        // Scale to fit the requested height
        const unscaled = page.getViewport({ scale: 1 })
        const scale = height / unscaled.height
        const viewport = page.getViewport({ scale })

        canvas.height = viewport.height
        canvas.width = viewport.width

        await page.render({
          canvasContext: canvas.getContext('2d')!,
          viewport,
          canvas,
        }).promise

        if (!cancelled) setLoading(false)
      } catch {
        if (!cancelled) { setLoading(false); setError(true) }
      }
    }

    render()
    return () => { cancelled = true }
  }, [url, height])

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ height }}>
      {/* Skeleton shown while loading */}
      {loading && (
        <div className="absolute inset-0 bg-[#1A1A1E] animate-pulse flex flex-col gap-3 p-6">
          <div className="h-3 bg-[#2A2A2E] rounded w-2/5" />
          <div className="h-2 bg-[#2A2A2E] rounded w-1/3 mt-1" />
          <div className="h-px bg-[#2A2A2E] mt-2 mb-3" />
          <div className="h-2 bg-[#2A2A2E] rounded w-full" />
          <div className="h-2 bg-[#2A2A2E] rounded w-4/5" />
          <div className="h-2 bg-[#2A2A2E] rounded w-full" />
          <div className="h-2 bg-[#2A2A2E] rounded w-3/4" />
          <div className="h-px bg-[#2A2A2E] my-3" />
          <div className="h-2 bg-[#2A2A2E] rounded w-2/5" />
          <div className="h-2 bg-[#2A2A2E] rounded w-full" />
          <div className="h-2 bg-[#2A2A2E] rounded w-4/5" />
          <div className="h-2 bg-[#2A2A2E] rounded w-full" />
        </div>
      )}

      {/* Error fallback */}
      {error && !loading && (
        <div className="absolute inset-0 bg-[#141417] flex items-center justify-center">
          <span className="text-text-muted text-xs">Preview unavailable</span>
        </div>
      )}

      {/* The actual rendered canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover object-top"
        style={{ display: loading || error ? 'none' : 'block' }}
      />
    </div>
  )
}
