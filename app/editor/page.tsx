'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Undo2, Redo2, Bold, Italic, Underline, FileDown, Monitor, Upload, Loader2, ChevronDown } from 'lucide-react'
import type { CSSProperties } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import { parseResumePdf } from '@/lib/parseResumePdf'

// ─── Types ──────────────────────────────────────────────────────────────────

type SectionId = 'contact' | 'experience' | 'education' | 'skills'

interface Section { id: SectionId; label: string; visible: boolean }

interface ContactData {
  name: string; title: string; email: string
  phone: string; location: string; linkedin: string
}

interface ExperienceItem {
  id: string; role: string; company: string; period: string; description: string
}

interface EducationItem {
  id: string; degree: string; school: string; period: string
}

interface ResumeData {
  contact: ContactData
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: string[]
}

// ─── Constants ───────────────────────────────────────────────────────────────

const ACCENT_COLORS = ['#FF5C00', '#8B5CF6', '#10B981', '#3B82F6', '#EC4899', '#F59E0B']
const FONT_OPTIONS = ['Inter', 'Instrument Serif', 'Georgia', 'Times New Roman']

const CONTACT_FIELDS: Array<{ field: keyof ContactData; placeholder: string }> = [
  { field: 'email',    placeholder: 'email@example.com' },
  { field: 'phone',    placeholder: '(555) 000-0000' },
  { field: 'location', placeholder: 'City, State' },
  { field: 'linkedin', placeholder: 'linkedin.com/in/you' },
]

const INITIAL_DATA: ResumeData = {
  contact: {
    name: 'Alexandra Johnson',
    title: 'Senior Product Manager',
    email: 'alex.johnson@email.com',
    phone: '(555) 012-3456',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexj',
  },
  experience: [
    {
      id: 'exp-1',
      role: 'Senior Product Manager',
      company: 'Stripe',
      period: '2022 – Present',
      description:
        'Led 0→1 launch of Stripe Tax in EMEA markets. Grew revenue 40% YoY. Managed cross-functional team of 12 engineers and designers.',
    },
    {
      id: 'exp-2',
      role: 'Product Manager',
      company: 'Figma',
      period: '2019 – 2022',
      description:
        'Shipped FigJam from 0 to 4M users in 18 months. Drove 3× revenue growth on Enterprise tier.',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'B.S. Computer Science',
      school: 'Stanford University',
      period: '2015 – 2019',
    },
  ],
  skills: ['Product Strategy', 'Roadmapping', 'SQL', 'User Research', 'A/B Testing', 'Go-to-Market'],
}

const INITIAL_SECTIONS: Section[] = [
  { id: 'contact',    label: 'Contact',    visible: true },
  { id: 'experience', label: 'Experience', visible: true },
  { id: 'education',  label: 'Education',  visible: true },
  { id: 'skills',     label: 'Skills',     visible: true },
]

const TOOLBAR_BTN_CLASS = 'px-1.5 py-1 bg-transparent border-none rounded text-text-secondary cursor-pointer flex items-center justify-center'
const SIDEBAR_HEADER_CLASS = 'px-5 py-4 border-b border-border-default text-text-primary text-[13px] font-semibold flex-shrink-0'
const CUSTOMIZE_LABEL_CLASS = 'text-text-secondary text-[11px] font-semibold tracking-[1px] uppercase'

// ─── Sortable row ─────────────────────────────────────────────────────────────

function SortableSectionRow({
  section,
  onToggle,
  accentColor,
}: {
  section: Section
  onToggle: () => void
  accentColor: string
}) {
  void accentColor
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id })

  // Runtime transform from dnd-kit must remain as inline style
  const rowStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={rowStyle}
      className={`flex items-center gap-2 px-3 py-2.5 rounded-md ${
        isDragging ? 'bg-border-default opacity-80' : 'bg-transparent opacity-100 hover:bg-bg-card'
      }`}
    >
      {/* Drag handle */}
      <span
        {...attributes}
        {...listeners}
        title="Drag to reorder"
        className="text-text-muted text-[10px] flex-shrink-0 cursor-grab leading-none select-none"
      >
        ⠿
      </span>

      <span className="flex-1 text-text-primary text-sm">
        {section.label}
      </span>

      {/* Visibility toggle */}
      <button
        onClick={onToggle}
        title={section.visible ? 'Hide section' : 'Show section'}
        className={`w-2 h-2 rounded-full border-none cursor-pointer flex-shrink-0 p-0 transition-colors ${
          section.visible ? 'bg-success' : 'bg-text-muted'
        }`}
      />
    </div>
  )
}

// ─── Shared style helpers ─────────────────────────────────────────────────────

function fieldInput(extra: CSSProperties = {}): CSSProperties {
  return {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
    ...extra,
  }
}

// ─── Editor page ──────────────────────────────────────────────────────────────

export default function EditorPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_DATA)
  const [prevData, setPrevData] = useState<ResumeData | null>(null)
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS)
  const [docName, setDocName] = useState('Untitled Resume')
  const [accentColor, setAccentColor] = useState('#FF5C00')
  const [fontFamily, setFontFamily] = useState('Inter')
  const [fontSize, setFontSize] = useState(13)
  const [layout, setLayout] = useState<'single' | 'two'>('single')

  // ── Upload / parse state ─────────────────────────────────────────────────
  type Phase = 'upload' | 'parsing' | 'editing'
  const [phase, setPhase] = useState<Phase>('upload')
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // ── Export dropdown ──────────────────────────────────────────────────────
  const [exportOpen, setExportOpen] = useState(false)
  const exportRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!exportOpen) return
    const close = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) setExportOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [exportOpen])

  // ── DnD ──────────────────────────────────────────────────────────────────

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setSections((prev) =>
      arrayMove(
        prev,
        prev.findIndex((s) => s.id === active.id),
        prev.findIndex((s) => s.id === over.id)
      )
    )
  }

  // ── Update helpers ────────────────────────────────────────────────────────

  function snapshot() { setPrevData(resumeData) }

  const updateContact = (field: keyof ContactData, val: string) => {
    snapshot()
    setResumeData((p) => ({ ...p, contact: { ...p.contact, [field]: val } }))
  }

  const updateExperience = (id: string, field: keyof ExperienceItem, val: string) => {
    snapshot()
    setResumeData((p) => ({
      ...p,
      experience: p.experience.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
    }))
  }

  const updateEducation = (id: string, field: keyof EducationItem, val: string) => {
    snapshot()
    setResumeData((p) => ({
      ...p,
      education: p.education.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
    }))
  }

  const updateSkills = (val: string) => {
    snapshot()
    setResumeData((p) => ({
      ...p,
      skills: val.split(',').map((s) => s.trim()).filter(Boolean),
    }))
  }

  const handleUndo = () => {
    if (prevData) { setResumeData(prevData); setPrevData(null) }
  }

  const toggleSection = (id: SectionId) =>
    setSections((p) => p.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s)))

  // ── PDF upload + parse ───────────────────────────────────────────────────

  async function handleUpload(file: File) {
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (ext !== 'pdf') {
      setUploadError('Please upload a PDF file.')
      return
    }
    setUploadError(null)
    setPhase('parsing')
    try {
      const parsed = await parseResumePdf(file)

      // Merge — fall back to placeholder data only when a field came back empty.
      setResumeData({
        contact: {
          name: parsed.contact.name || INITIAL_DATA.contact.name,
          title: parsed.contact.title || INITIAL_DATA.contact.title,
          email: parsed.contact.email,
          phone: parsed.contact.phone,
          location: parsed.contact.location,
          linkedin: parsed.contact.linkedin,
        },
        experience: parsed.experience.length ? parsed.experience : INITIAL_DATA.experience,
        education: parsed.education.length ? parsed.education : INITIAL_DATA.education,
        skills: parsed.skills.length ? parsed.skills : INITIAL_DATA.skills,
      })
      setDocName(file.name.replace(/\.pdf$/i, ''))
      setPhase('editing')
    } catch (err) {
      console.error('PDF parse failed:', err)
      setUploadError('Could not read this PDF. Try a different file or start blank.')
      setPhase('upload')
    }
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleUpload(file)
    e.target.value = '' // allow re-selecting the same file
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }

  // ── PDF export ────────────────────────────────────────────────────────────

  async function handleExportPdf() {
    setExportOpen(false)
    try {
      const { jsPDF } = await import('jspdf')
      const doc = new jsPDF({ unit: 'pt', format: 'letter' }) // 612 × 792pt

      const ff = fontFamily === 'Times New Roman' || fontFamily === 'Instrument Serif' || fontFamily === 'Georgia'
        ? 'times'
        : 'helvetica'

      const pageW = doc.internal.pageSize.getWidth()
      const pageH = doc.internal.pageSize.getHeight()
      const margin = 52
      const maxW = pageW - margin * 2
      let y = margin

      const ensureSpace = (needed: number) => {
        if (y + needed > pageH - margin) { doc.addPage(); y = margin }
      }

      const writeWrapped = (text: string, size: number, style: 'normal' | 'bold' = 'normal', color = '#222') => {
        if (!text) return
        doc.setFont(ff, style)
        doc.setFontSize(size)
        doc.setTextColor(color)
        const lines = doc.splitTextToSize(text, maxW) as string[]
        for (const line of lines) {
          ensureSpace(size * 1.3)
          doc.text(line, margin, y)
          y += size * 1.3
        }
      }

      const accentRgb = (() => {
        const h = accentColor.replace('#', '')
        return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)] as const
      })()

      // Contact
      writeWrapped(resumeData.contact.name, fontSize + 14, 'bold', '#0A0A0B')
      doc.setTextColor(accentRgb[0], accentRgb[1], accentRgb[2])
      writeWrapped(resumeData.contact.title, fontSize + 1, 'bold', accentColor)
      const detailRow = [
        resumeData.contact.email,
        resumeData.contact.phone,
        resumeData.contact.location,
        resumeData.contact.linkedin,
      ].filter(Boolean).join('  ·  ')
      writeWrapped(detailRow, fontSize - 1, 'normal', '#666')
      y += 6

      for (const sec of sections) {
        if (!sec.visible || sec.id === 'contact') continue
        ensureSpace(28)
        // Accent divider
        doc.setDrawColor(accentRgb[0], accentRgb[1], accentRgb[2])
        doc.setLineWidth(1.2)
        doc.line(margin, y, pageW - margin, y)
        y += 14

        if (sec.id === 'experience') {
          writeWrapped('EXPERIENCE', fontSize - 2, 'bold', '#444')
          y += 4
          for (const e of resumeData.experience) {
            const head = [e.role, e.company].filter(Boolean).join(' — ')
            writeWrapped(head, fontSize, 'bold', '#111')
            if (e.period) writeWrapped(e.period, fontSize - 1, 'normal', '#777')
            if (e.description) writeWrapped(e.description, fontSize - 1, 'normal', '#555')
            y += 6
          }
        }

        if (sec.id === 'education') {
          writeWrapped('EDUCATION', fontSize - 2, 'bold', '#444')
          y += 4
          for (const e of resumeData.education) {
            writeWrapped(e.degree, fontSize, 'bold', '#111')
            if (e.school) writeWrapped(e.school, fontSize - 1, 'normal', '#555')
            if (e.period) writeWrapped(e.period, fontSize - 1, 'normal', '#777')
            y += 6
          }
        }

        if (sec.id === 'skills') {
          writeWrapped('SKILLS', fontSize - 2, 'bold', '#444')
          y += 4
          writeWrapped(resumeData.skills.join(', '), fontSize - 1, 'normal', '#555')
        }
      }

      doc.save(`${resumeData.contact.name || 'resume'}.pdf`)
    } catch (err) {
      console.error('PDF export failed:', err)
    }
  }

  // ── DOCX export ───────────────────────────────────────────────────────────

  async function handleExportDocx() {
    setExportOpen(false)
    try {
      const { Document, Packer, Paragraph, TextRun } = await import('docx')
      const { saveAs } = await import('file-saver')

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const children: any[] = []
      const ff = fontFamily === 'Instrument Serif' ? 'Georgia' : fontFamily
      const bodySize = fontSize * 2        // docx sizes are in half-points
      const headSize = (fontSize + 2) * 2

      // Contact block (always first)
      children.push(
        new Paragraph({ children: [new TextRun({ text: resumeData.contact.name, bold: true, size: (fontSize + 14) * 2, font: ff })] }),
        new Paragraph({ children: [new TextRun({ text: resumeData.contact.title, size: headSize, font: ff })] }),
        new Paragraph({
          children: [new TextRun({
            text: [resumeData.contact.email, resumeData.contact.phone, resumeData.contact.location, resumeData.contact.linkedin]
              .filter(Boolean).join('  ·  '),
            size: bodySize,
            font: ff,
          })],
        }),
        new Paragraph({ text: '' }),
      )

      // Remaining sections in current order
      for (const sec of sections) {
        if (!sec.visible || sec.id === 'contact') continue

        if (sec.id === 'experience') {
          children.push(new Paragraph({ children: [new TextRun({ text: 'EXPERIENCE', bold: true, size: headSize, font: ff })] }))
          for (const e of resumeData.experience) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({ text: `${e.role} — ${e.company}`, bold: true, size: headSize, font: ff }),
                  new TextRun({ text: `    ${e.period}`, size: bodySize, font: ff }),
                ],
              }),
              new Paragraph({ children: [new TextRun({ text: e.description, size: bodySize, font: ff })] }),
              new Paragraph({ text: '' }),
            )
          }
        }

        if (sec.id === 'education') {
          children.push(new Paragraph({ children: [new TextRun({ text: 'EDUCATION', bold: true, size: headSize, font: ff })] }))
          for (const e of resumeData.education) {
            children.push(
              new Paragraph({
                children: [
                  new TextRun({ text: e.degree, bold: true, size: headSize, font: ff }),
                  new TextRun({ text: `    ${e.period}`, size: bodySize, font: ff }),
                ],
              }),
              new Paragraph({ children: [new TextRun({ text: e.school, size: bodySize, font: ff })] }),
              new Paragraph({ text: '' }),
            )
          }
        }

        if (sec.id === 'skills') {
          children.push(
            new Paragraph({ children: [new TextRun({ text: 'SKILLS', bold: true, size: headSize, font: ff })] }),
            new Paragraph({ children: [new TextRun({ text: resumeData.skills.join(', '), size: bodySize, font: ff })] }),
            new Paragraph({ text: '' }),
          )
        }
      }

      const doc = new Document({ sections: [{ children }] })
      const blob = await Packer.toBlob(doc)
      saveAs(blob, `${resumeData.contact.name || 'resume'}.docx`)
    } catch (err) {
      console.error('DOCX export failed:', err)
    }
  }

  // ── Font CSS ──────────────────────────────────────────────────────────────

  const fontCss =
    fontFamily === 'Inter' ? 'var(--font-inter), Inter, sans-serif' :
    fontFamily === 'Instrument Serif' ? 'var(--font-instrument-serif), Georgia, serif' :
    `${fontFamily}, serif`

  // ── Auto-resize textarea helper ──────────────────────────────────────────

  const autoResize = useCallback((el: HTMLTextAreaElement | null) => {
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${el.scrollHeight}px`
  }, [])

  // ── Section renderers ─────────────────────────────────────────────────────

  function renderSection(sec: Section) {
    const { id, visible } = sec
    if (!visible) return null

    const labelStyle: CSSProperties = {
      fontSize: `${fontSize - 2}px`,
      fontWeight: '700',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      color: '#444',
      fontFamily: fontCss,
      marginBottom: '12px',
    }

    if (id === 'contact') {
      return (
        <div>
          {/* Name */}
          <input
            value={resumeData.contact.name}
            onChange={(e) => updateContact('name', e.target.value)}
            placeholder="Your Name"
            onFocus={(e) => (e.target.style.outline = `1px dashed ${accentColor}70`)}
            onBlur={(e) => (e.target.style.outline = 'none')}
            style={fieldInput({
              fontFamily: fontCss,
              fontSize: `${fontSize + 13}px`,
              fontWeight: '700',
              color: '#0A0A0B',
              width: '100%',
              lineHeight: '1.2',
            })}
          />
          {/* Job title */}
          <input
            value={resumeData.contact.title}
            onChange={(e) => updateContact('title', e.target.value)}
            placeholder="Job Title"
            onFocus={(e) => (e.target.style.outline = `1px dashed ${accentColor}70`)}
            onBlur={(e) => (e.target.style.outline = 'none')}
            style={fieldInput({
              fontFamily: fontCss,
              fontSize: `${fontSize + 1}px`,
              fontWeight: '600',
              color: accentColor,
              width: '100%',
              marginTop: '4px',
            })}
          />
          {/* Contact details row */}
          <div className="flex flex-wrap gap-y-1 gap-x-4 mt-2">
            {CONTACT_FIELDS.map(({ field, placeholder }) => (
              <input
                key={field}
                value={resumeData.contact[field]}
                onChange={(e) => updateContact(field, e.target.value)}
                placeholder={placeholder}
                onFocus={(e) => (e.target.style.outline = `1px dashed ${accentColor}70`)}
                onBlur={(e) => (e.target.style.outline = 'none')}
                style={fieldInput({
                  fontFamily: fontCss,
                  fontSize: `${fontSize - 1}px`,
                  color: '#666',
                  width: 'auto',
                  minWidth: '80px',
                  flex: '1 1 auto',
                })}
              />
            ))}
          </div>
        </div>
      )
    }

    if (id === 'experience') {
      return (
        <div>
          <div style={labelStyle}>Experience</div>
          {resumeData.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              {/* Role / Company / Period row */}
              <div className="flex gap-1.5 items-baseline flex-wrap">
                <input
                  value={exp.role}
                  onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                  placeholder="Job Title"
                  onFocus={(e) => (e.target.style.outline = `1px dashed ${accentColor}70`)}
                  onBlur={(e) => (e.target.style.outline = 'none')}
                  style={fieldInput({
                    fontFamily: fontCss, fontSize: `${fontSize}px`, fontWeight: '700',
                    color: '#111', flex: '1', minWidth: '80px',
                  })}
                />
                <span className="flex-shrink-0" style={{ color: '#888', fontSize: `${fontSize}px` }}>—</span>
                <input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Company"
                  onFocus={(e) => (e.target.style.outline = `1px dashed ${accentColor}70`)}
                  onBlur={(e) => (e.target.style.outline = 'none')}
                  style={fieldInput({
                    fontFamily: fontCss, fontSize: `${fontSize}px`, fontWeight: '700',
                    color: '#111', flex: '1', minWidth: '60px',
                  })}
                />
                <input
                  value={exp.period}
                  onChange={(e) => updateExperience(exp.id, 'period', e.target.value)}
                  placeholder="2022 – Present"
                  onFocus={(e) => (e.target.style.outline = `1px dashed ${accentColor}70`)}
                  onBlur={(e) => (e.target.style.outline = 'none')}
                  style={fieldInput({
                    fontFamily: fontCss, fontSize: `${fontSize - 1}px`, color: '#777',
                    width: 'auto', minWidth: '120px', flexShrink: 0,
                  })}
                />
              </div>
              {/* Description */}
              <textarea
                ref={autoResize}
                value={exp.description}
                onChange={(e) => { updateExperience(exp.id, 'description', e.target.value); autoResize(e.target) }}
                placeholder="Describe your achievements and impact..."
                rows={1}
                onFocus={(e) => (e.target.style.outline = `1px dashed ${accentColor}70`)}
                onBlur={(e) => (e.target.style.outline = 'none')}
                className="resize-none block w-full mt-1 overflow-hidden"
                style={fieldInput({ fontFamily: fontCss, fontSize: `${fontSize - 1}px`, color: '#555', lineHeight: '1.6' })}
              />
            </div>
          ))}
        </div>
      )
    }

    if (id === 'education') {
      return (
        <div>
          <div style={labelStyle}>Education</div>
          {resumeData.education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex gap-1.5 items-baseline flex-wrap">
                <input
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  placeholder="Degree, Major"
                  onFocus={(e) => (e.target.style.outline = `1px dashed ${accentColor}70`)}
                  onBlur={(e) => (e.target.style.outline = 'none')}
                  style={fieldInput({
                    fontFamily: fontCss, fontSize: `${fontSize}px`, fontWeight: '700',
                    color: '#111', flex: '1', minWidth: '120px',
                  })}
                />
                <input
                  value={edu.period}
                  onChange={(e) => updateEducation(edu.id, 'period', e.target.value)}
                  placeholder="2015 – 2019"
                  onFocus={(e) => (e.target.style.outline = `1px dashed ${accentColor}70`)}
                  onBlur={(e) => (e.target.style.outline = 'none')}
                  style={fieldInput({
                    fontFamily: fontCss, fontSize: `${fontSize - 1}px`, color: '#777',
                    width: 'auto', minWidth: '120px', flexShrink: 0,
                  })}
                />
              </div>
              <input
                value={edu.school}
                onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                placeholder="University Name"
                onFocus={(e) => (e.target.style.outline = `1px dashed ${accentColor}70`)}
                onBlur={(e) => (e.target.style.outline = 'none')}
                style={fieldInput({
                  fontFamily: fontCss, fontSize: `${fontSize - 1}px`, color: '#555', width: '100%', marginTop: '2px',
                })}
              />
            </div>
          ))}
        </div>
      )
    }

    if (id === 'skills') {
      return (
        <div>
          <div style={labelStyle}>Skills</div>
          <textarea
            ref={autoResize}
            value={resumeData.skills.join(', ')}
            onChange={(e) => { updateSkills(e.target.value); autoResize(e.target) }}
            placeholder="Skill 1, Skill 2, Skill 3..."
            rows={1}
            onFocus={(e) => (e.target.style.outline = `1px dashed ${accentColor}70`)}
            onBlur={(e) => (e.target.style.outline = 'none')}
            className="resize-none block w-full mb-2.5 overflow-hidden"
            style={fieldInput({ fontFamily: fontCss, fontSize: `${fontSize - 1}px`, color: '#555', lineHeight: '1.6' })}
          />
          {/* Chip preview */}
          <div className="flex flex-wrap gap-1.5">
            {resumeData.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2.5 py-[3px] bg-[#F4F4F0] rounded-full text-[#555]"
                style={{ fontSize: `${fontSize - 2}px`, fontFamily: fontCss }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )
    }

    return null
  }

  // ─── Render ─────────────────────────────────────────────────────────────────

  const visibleSections = sections.filter((s) => s.visible)
  // Suppress unused warning for layout state (preserved from original)
  void layout

  return (
    <>
      {/* Mobile warning — editor requires desktop */}
      <div className="md:hidden min-h-screen flex flex-col bg-bg-base">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center gap-5">
          <div className="w-14 h-14 rounded-full bg-[#FF5C0015] border border-[#FF5C0040] flex items-center justify-center">
            <Monitor size={26} color="#FF5C00" />
          </div>
          <h1 className="font-serif text-[28px] text-text-primary font-normal m-0 max-w-[320px]">
            The editor works best on desktop
          </h1>
          <p className="text-text-secondary text-[15px] leading-[1.6] max-w-[340px] m-0">
            Our resume editor uses a full-page canvas, drag-and-drop sections,
            and a sidebar that doesn&apos;t fit on a small screen. Open this
            page on a laptop or desktop for the best experience.
          </p>
          <div className="flex flex-col gap-2.5 w-full max-w-[280px] mt-2">
            <Link
              href="/browse"
              className="inline-flex items-center justify-center px-5 py-3 bg-accent hover:bg-accent-hover transition-colors text-text-primary rounded-lg text-[14px] font-semibold no-underline"
            >
              Browse Templates
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-3 bg-transparent text-text-primary border border-border-default hover:border-text-secondary transition-colors rounded-lg text-[14px] font-medium no-underline"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>

      {/* Desktop editor */}
      <div className="hidden md:flex h-screen flex-col bg-bg-base overflow-hidden">

      {/* Visually hidden H1 for accessibility and SEO */}
      <h1 className="sr-only">
        Resume Editor
      </h1>

      {/* Site header — navigation */}
      <Header />

      {/* Upload gate */}
      {phase !== 'editing' && (
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="bg-bg-card border border-border-default rounded-2xl p-12 max-w-[520px] w-full flex flex-col items-center gap-5 text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#FF5C0020] flex items-center justify-center">
              {phase === 'parsing' ? <Loader2 size={26} className="text-accent animate-spin" /> : <Upload size={26} color="#FF5C00" />}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-serif text-[26px] text-text-primary font-normal m-0">
                {phase === 'parsing' ? 'Reading your resume…' : 'Upload your resume'}
              </h2>
              <p className="text-text-secondary text-[14px] leading-relaxed m-0">
                {phase === 'parsing'
                  ? 'Extracting text and matching it to editor fields.'
                  : 'Drop a PDF and we’ll parse it into editable fields. Anything we miss, you can fix in the editor.'}
              </p>
            </div>

            {phase === 'upload' && (
              <>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`w-full p-8 border-[1.5px] border-dashed rounded-xl flex flex-col items-center gap-3 cursor-pointer transition-colors ${
                    dragOver ? 'border-accent' : 'border-border-default hover:border-accent'
                  }`}
                >
                  <Upload size={22} color="#6B6B70" />
                  <div className="flex flex-col gap-1">
                    <span className="text-text-primary text-sm font-medium">Drop your resume here</span>
                    <span className="text-text-muted text-xs">PDF · up to 5MB</span>
                  </div>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
                {uploadError && (
                  <p className="text-[#EF4444] text-xs m-0">{uploadError}</p>
                )}
                <button
                  onClick={() => setPhase('editing')}
                  className="bg-transparent border-none text-text-secondary text-[13px] cursor-pointer underline"
                >
                  Or start with a blank resume
                </button>
              </>
            )}
          </div>
        </main>
      )}

      {phase === 'editing' && <>

      {/* Editor toolbar */}
      <div className="h-[52px] bg-bg-elevated border-b border-border-default flex items-center px-5 gap-3 flex-shrink-0">
        {/* Undo / Redo */}
        <div className="flex gap-0.5 flex-shrink-0">
          <button className={TOOLBAR_BTN_CLASS} onClick={handleUndo} title="Undo" disabled={!prevData}>
            <Undo2 size={15} />
          </button>
          <button className={TOOLBAR_BTN_CLASS} title="Redo">
            <Redo2 size={15} />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-border-default flex-shrink-0" />

        {/* Document name — centered */}
        <input
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
          className="bg-transparent border-none outline-none text-text-primary text-sm flex-1 text-center min-w-0"
        />

        {/* Divider */}
        <div className="w-px h-6 bg-border-default flex-shrink-0" />

        {/* Format buttons */}
        <div className="flex gap-0.5 bg-bg-card rounded-md p-0.5 flex-shrink-0">
          <button className={TOOLBAR_BTN_CLASS} title="Bold"><Bold size={14} /></button>
          <button className={TOOLBAR_BTN_CLASS} title="Italic"><Italic size={14} /></button>
          <button className={TOOLBAR_BTN_CLASS} title="Underline"><Underline size={14} /></button>
        </div>

        {/* Export dropdown */}
        <div className="relative flex-shrink-0" ref={exportRef}>
          <button
            onClick={() => setExportOpen((p) => !p)}
            className="px-3.5 py-1.5 bg-accent hover:bg-accent-hover border-none rounded-md text-text-primary text-[13px] font-semibold cursor-pointer flex items-center gap-1.5 transition-colors"
          >
            <FileDown size={13} /> Export <ChevronDown size={12} />
          </button>
          {exportOpen && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-bg-elevated border border-border-default rounded-md shadow-lg overflow-hidden z-20">
              <button
                onClick={handleExportPdf}
                className="w-full px-3 py-2 bg-transparent border-none text-left text-text-primary text-[13px] cursor-pointer hover:bg-bg-card"
              >
                PDF
              </button>
              <button
                onClick={handleExportDocx}
                className="w-full px-3 py-2 bg-transparent border-none text-left text-text-primary text-[13px] cursor-pointer hover:bg-bg-card"
              >
                DOCX
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Three-panel body */}
      <div className="flex-1 flex overflow-hidden">

        {/* ── Left: Sections panel ── */}
        <aside className="w-60 flex-shrink-0 bg-bg-elevated border-r border-border-default flex flex-col overflow-hidden">
          <div className={SIDEBAR_HEADER_CLASS}>
            Sections
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext items={sections.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                {sections.map((section) => (
                  <SortableSectionRow
                    key={section.id}
                    section={section}
                    onToggle={() => toggleSection(section.id)}
                    accentColor={accentColor}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>

          <div className="p-3 border-t border-border-default flex-shrink-0">
            <button className="w-full p-2 bg-transparent border border-dashed border-border-default rounded-md text-text-secondary text-[13px] cursor-pointer">
              + Add Section
            </button>
          </div>
        </aside>

        {/* ── Center: Editable resume canvas ── */}
        <main className="flex-1 bg-bg-base overflow-y-auto flex items-start justify-center px-8 pt-10 pb-20">
          {/* US Letter resume card: 8.5 × 11 inches at 96dpi */}
          <div
            className="w-[816px] h-[1056px] bg-white rounded flex flex-col p-[52px] overflow-hidden flex-shrink-0 shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
          >
            {visibleSections.map((sec, i) => (
              <div key={sec.id}>
                {renderSection(sec)}
                {/* Accent divider between sections */}
                {i < visibleSections.length - 1 && (
                  <div className="my-5" style={{ height: '1.5px', backgroundColor: accentColor }} />
                )}
              </div>
            ))}
          </div>
        </main>

        {/* ── Right: Customize panel ── */}
        <aside className="w-[280px] flex-shrink-0 bg-bg-elevated border-l border-border-default flex flex-col overflow-y-auto">
          <div className={SIDEBAR_HEADER_CLASS}>
            Customize
          </div>

          <div className="p-5 flex flex-col gap-6">

            {/* Accent color */}
            <div className="flex flex-col gap-2.5">
              <span className={CUSTOMIZE_LABEL_CLASS}>
                Accent Color
              </span>
              <div className="flex gap-2 flex-wrap">
                {ACCENT_COLORS.map((color) => {
                  const isSelected = accentColor === color
                  return (
                    <button
                      key={color}
                      onClick={() => setAccentColor(color)}
                      title={color}
                      className="w-7 h-7 rounded-full cursor-pointer transition-transform hover:scale-[1.15] p-0"
                      style={{
                        backgroundColor: color,
                        border: isSelected ? '2px solid #FFFFFF' : '2px solid transparent',
                        outline: isSelected ? `2px solid ${color}` : 'none',
                        outlineOffset: '2px',
                      }}
                    />
                  )
                })}
              </div>
            </div>

            {/* Font family */}
            <div className="flex flex-col gap-2.5">
              <span className={CUSTOMIZE_LABEL_CLASS}>
                Font
              </span>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="bg-bg-card border border-border-default rounded-md px-3 py-2 text-text-primary text-[13px] cursor-pointer"
              >
                {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            {/* Font size */}
            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between items-center">
                <span className={CUSTOMIZE_LABEL_CLASS}>
                  Font Size
                </span>
                <span className="text-text-primary text-[13px]">
                  {fontSize}px
                </span>
              </div>
              <input
                type="range"
                min={11}
                max={16}
                step={1}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full"
                style={{ accentColor: '#FF5C00' }}
              />
              <div className="flex justify-between">
                <span className="text-text-muted text-[11px]">Small</span>
                <span className="text-text-muted text-[11px]">Large</span>
              </div>
            </div>

            {/* Layout */}
            <div className="flex flex-col gap-2.5">
              <span className={CUSTOMIZE_LABEL_CLASS}>
                Layout
              </span>
              <div className="flex bg-bg-card border border-border-default rounded-md p-[3px]">
                {(['single', 'two'] as const).map((l) => {
                  const isActive = layout === l
                  return (
                    <button
                      key={l}
                      onClick={() => setLayout(l)}
                      className={`flex-1 py-1.5 rounded border-none text-xs cursor-pointer transition-all ${
                        isActive
                          ? 'bg-accent text-text-primary font-semibold'
                          : 'bg-transparent text-text-secondary font-normal'
                      }`}
                    >
                      {l === 'single' ? 'Single Col' : 'Two Col'}
                    </button>
                  )
                })}
              </div>
            </div>

          </div>
        </aside>
      </div>
      </>}
      </div>
    </>
  )
}
