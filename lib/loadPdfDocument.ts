// Loads a PDF as an editable, free-form document.
// Each page is rendered to a PNG (used as a faithful background) and its text
// items are extracted as positioned blocks. The editor overlays editable spans
// on top of the rendered page so users can edit text in place and reposition it.

export interface TextBlock {
  id: string
  x: number          // points from left
  y: number          // points from top (top-left origin)
  width: number
  fontSize: number   // points
  fontFamily: string
  bold: boolean
  italic: boolean
  color: string
  text: string
}

export interface PageDoc {
  width: number      // points (PDF native)
  height: number
  bgDataUrl: string  // rendered background (text + graphics)
  blocks: TextBlock[]
}

export interface ImportedDoc {
  pages: PageDoc[]
}

const MERGE_Y_TOLERANCE = 1.5
const MERGE_FONT_TOLERANCE = 0.4

function pickFontFamily(fontName: string, styleFamily: string): string {
  const hay = `${fontName} ${styleFamily}`.toLowerCase()
  if (/serif|times|georgia|cambria|caslon/.test(hay)) return 'Times New Roman, Times, serif'
  if (/mono|courier|consolas/.test(hay)) return 'Menlo, Consolas, monospace'
  return 'Helvetica, Arial, sans-serif'
}

function detectStyle(fontName: string): { bold: boolean; italic: boolean } {
  const hay = (fontName || '').toLowerCase()
  return {
    bold: /bold|black|heavy|semibold|demi/.test(hay),
    italic: /italic|oblique/.test(hay),
  }
}

// Merge adjacent text items on the same baseline (and same font) so users
// can edit a whole line at once instead of word-by-word.
function mergeAdjacent(blocks: TextBlock[]): TextBlock[] {
  const sorted = [...blocks].sort((a, b) => {
    if (Math.abs(a.y - b.y) > MERGE_Y_TOLERANCE) return a.y - b.y
    return a.x - b.x
  })

  const out: TextBlock[] = []
  for (const item of sorted) {
    const last = out[out.length - 1]
    const sameLine =
      last &&
      Math.abs(last.y - item.y) < MERGE_Y_TOLERANCE &&
      Math.abs(last.fontSize - item.fontSize) < MERGE_FONT_TOLERANCE &&
      last.bold === item.bold &&
      last.italic === item.italic &&
      last.fontFamily === item.fontFamily

    if (sameLine) {
      const gap = item.x - (last.x + last.width)
      if (gap < item.fontSize * 1.2) {
        const sep = gap > item.fontSize * 0.2 ? ' ' : ''
        last.text += sep + item.text
        last.width = item.x + item.width - last.x
        continue
      }
    }
    out.push({ ...item })
  }
  return out
}

export async function loadPdfDocument(file: File): Promise<ImportedDoc> {
  const pdfjsLib = await import('pdfjs-dist')
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

  const buf = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise

  const pages: PageDoc[] = []

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const viewport = page.getViewport({ scale: 1 })

    // Render page background at 2× for crispness.
    const renderViewport = page.getViewport({ scale: 2 })
    const canvas = document.createElement('canvas')
    canvas.width = renderViewport.width
    canvas.height = renderViewport.height
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Could not get 2D context for page render')
    await page.render({ canvasContext: ctx, viewport: renderViewport, canvas }).promise
    const bgDataUrl = canvas.toDataURL('image/png')

    // Extract text items.
    const content = await page.getTextContent()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const styles = (content as any).styles ?? {}
    const raw: TextBlock[] = []
    let idx = 0

    for (const item of content.items) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const it = item as any
      if (!it.str || !it.str.trim()) continue
      const t: number[] = it.transform
      const fontSize = Math.hypot(t[2], t[3]) || Math.abs(t[0]) || 10
      const x = t[4]
      const baselineY = t[5]
      // PDF origin is bottom-left; convert to top-left and back off the ascent
      // so the rendered span sits where the glyphs sit in the original.
      const yTop = viewport.height - baselineY - fontSize * 0.82

      const styleInfo = styles[it.fontName] || {}
      const styleFamily = (styleInfo.fontFamily as string) || ''
      const { bold, italic } = detectStyle(it.fontName || styleFamily)

      raw.push({
        id: `p${i}-b${idx++}`,
        x,
        y: yTop,
        width: it.width || fontSize * it.str.length * 0.5,
        fontSize,
        fontFamily: pickFontFamily(it.fontName || '', styleFamily),
        bold,
        italic,
        color: '#111111',
        text: it.str,
      })
    }

    pages.push({
      width: viewport.width,
      height: viewport.height,
      bgDataUrl,
      blocks: mergeAdjacent(raw),
    })
  }

  return { pages }
}
