// Best-effort PDF resume parser.
// Extracts text from a PDF (via pdfjs-dist) and maps it into the editor's
// ResumeData shape using heuristic rules. Anything unrecognized is dropped
// into the description of the most recent experience or skipped.

export interface ParsedContact {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
}

export interface ParsedExperience {
  id: string
  role: string
  company: string
  period: string
  description: string
}

export interface ParsedEducation {
  id: string
  degree: string
  school: string
  period: string
}

export interface ParsedResume {
  contact: ParsedContact
  experience: ParsedExperience[]
  education: ParsedEducation[]
  skills: string[]
}

const EMAIL_RE = /[\w.+-]+@[\w-]+\.[\w.-]+/i
const PHONE_RE = /(\+?\d[\d\s().-]{7,}\d)/
const LINKEDIN_RE = /(linkedin\.com\/[\w/-]+)/i
// Period like "2019 – 2022", "Jan 2019 - Present", "2020 -"
const PERIOD_RE = /((?:[A-Z][a-z]+\.?\s)?\d{4}\s*[–\-—to]+\s*(?:Present|Current|(?:[A-Z][a-z]+\.?\s)?\d{4})?)/i

const SECTION_KEYS: Record<string, 'experience' | 'education' | 'skills' | 'summary'> = {
  experience: 'experience',
  'work experience': 'experience',
  'professional experience': 'experience',
  'employment history': 'experience',
  employment: 'experience',
  education: 'education',
  academics: 'education',
  skills: 'skills',
  'technical skills': 'skills',
  'core competencies': 'skills',
  competencies: 'skills',
  summary: 'summary',
  'professional summary': 'summary',
  about: 'summary',
}

function isSectionHeader(line: string): keyof typeof SECTION_KEYS | null {
  const key = line.trim().toLowerCase().replace(/[:.]+$/, '')
  if (key.length > 30) return null
  if (SECTION_KEYS[key]) return key
  return null
}

async function extractLines(file: File): Promise<string[]> {
  const pdfjsLib = await import('pdfjs-dist')
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`

  const buf = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: buf }).promise

  const lines: string[] = []
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()

    // Group text items into lines by Y coordinate (transform[5]).
    const rows = new Map<number, { x: number; str: string }[]>()
    for (const item of content.items) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const it = item as any
      if (!it.str) continue
      const y = Math.round(it.transform[5])
      const x = it.transform[4]
      if (!rows.has(y)) rows.set(y, [])
      rows.get(y)!.push({ x, str: it.str })
    }

    const sortedYs = [...rows.keys()].sort((a, b) => b - a)
    for (const y of sortedYs) {
      const row = rows.get(y)!.sort((a, b) => a.x - b.x)
      const text = row.map((r) => r.str).join(' ').replace(/\s+/g, ' ').trim()
      if (text) lines.push(text)
    }
  }
  return lines
}

function parseContact(headerLines: string[]): ParsedContact {
  const contact: ParsedContact = {
    name: '', title: '', email: '', phone: '', location: '', linkedin: '',
  }

  // Pull email/phone/linkedin out of any header line.
  for (const line of headerLines) {
    if (!contact.email) {
      const m = line.match(EMAIL_RE)
      if (m) contact.email = m[0]
    }
    if (!contact.phone) {
      const m = line.match(PHONE_RE)
      if (m) contact.phone = m[1].trim()
    }
    if (!contact.linkedin) {
      const m = line.match(LINKEDIN_RE)
      if (m) contact.linkedin = m[1]
    }
  }

  // First non-empty line that isn't a contact-detail line → name.
  // Second such line → title.
  const cleanLines = headerLines.filter((l) => {
    if (EMAIL_RE.test(l)) return false
    if (PHONE_RE.test(l) && l.replace(PHONE_RE, '').replace(/[·•|,\s]/g, '').length < 3) return false
    if (LINKEDIN_RE.test(l) && l.length < 60) return false
    return true
  })

  if (cleanLines[0]) contact.name = cleanLines[0]
  if (cleanLines[1]) contact.title = cleanLines[1]

  // Look for "City, ST" style location anywhere in header.
  for (const line of headerLines) {
    const loc = line.match(/([A-Z][a-zA-Z]+(?:\s[A-Z][a-zA-Z]+)*),\s*([A-Z]{2}|[A-Z][a-z]+)/)
    if (loc && !EMAIL_RE.test(loc[0])) {
      contact.location = loc[0]
      break
    }
  }

  return contact
}

function parseExperience(lines: string[]): ParsedExperience[] {
  const items: ParsedExperience[] = []
  let current: ParsedExperience | null = null

  const flush = () => {
    if (current) {
      current.description = current.description.trim()
      items.push(current)
      current = null
    }
  }

  for (const line of lines) {
    const periodMatch = line.match(PERIOD_RE)
    // A line containing a period and other text is treated as a new role header.
    if (periodMatch && line.replace(PERIOD_RE, '').trim().length > 2) {
      flush()
      const period = periodMatch[1].trim()
      const rest = line.replace(PERIOD_RE, '').trim()
      // Try to split "Role — Company" or "Role at Company" or "Role, Company"
      const split = rest.split(/\s+(?:[—–-]|at|@|,)\s+/)
      const role = split[0]?.trim() ?? ''
      const company = split.slice(1).join(' ').trim()
      current = { id: `exp-${items.length + 1}`, role, company, period, description: '' }
    } else if (current) {
      // Continuation: bullet/description line
      const cleaned = line.replace(/^[•·●▪◦\-*]\s*/, '').trim()
      current.description += (current.description ? '\n' : '') + cleaned
    } else {
      // Pre-period line — likely a role title without a date yet.
      current = { id: `exp-${items.length + 1}`, role: line.trim(), company: '', period: '', description: '' }
    }
  }
  flush()
  return items.filter((e) => e.role || e.company || e.description)
}

function parseEducation(lines: string[]): ParsedEducation[] {
  const items: ParsedEducation[] = []
  let current: ParsedEducation | null = null

  const flush = () => { if (current) { items.push(current); current = null } }

  for (const line of lines) {
    const periodMatch = line.match(PERIOD_RE)
    if (periodMatch) {
      flush()
      const period = periodMatch[1].trim()
      const rest = line.replace(PERIOD_RE, '').trim()
      const split = rest.split(/\s+(?:[—–-]|,|@)\s+/)
      const degree = split[0]?.trim() ?? ''
      const school = split.slice(1).join(' ').trim()
      current = { id: `edu-${items.length + 1}`, degree, school, period }
    } else if (current && !current.school) {
      current.school = line.trim()
    } else {
      flush()
      current = { id: `edu-${items.length + 1}`, degree: line.trim(), school: '', period: '' }
    }
  }
  flush()
  return items.filter((e) => e.degree || e.school)
}

function parseSkills(lines: string[]): string[] {
  const joined = lines.join(', ')
  return joined
    .split(/[,•·●▪◦|;\n]+/)
    .map((s) => s.replace(/^[-*\s]+/, '').trim())
    .filter((s) => s.length > 1 && s.length < 60)
}

export async function parseResumePdf(file: File): Promise<ParsedResume> {
  const lines = await extractLines(file)

  // Bucket lines by section.
  const buckets: Record<'header' | 'experience' | 'education' | 'skills' | 'summary', string[]> = {
    header: [], experience: [], education: [], skills: [], summary: [],
  }
  let active: keyof typeof buckets = 'header'

  for (const line of lines) {
    const header = isSectionHeader(line)
    if (header) {
      const target = SECTION_KEYS[header]
      active = target
      continue
    }
    buckets[active].push(line)
  }

  return {
    contact: parseContact(buckets.header),
    experience: parseExperience(buckets.experience),
    education: parseEducation(buckets.education),
    skills: parseSkills(buckets.skills),
  }
}
