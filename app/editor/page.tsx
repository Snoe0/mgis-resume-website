'use client'

import { useState } from 'react'
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
import { Undo2, Redo2, Bold, Italic, Underline, Eye, FileDown } from 'lucide-react'
import type { CSSProperties } from 'react'
import Header from '@/components/Header'

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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 12px',
        borderRadius: '6px',
        backgroundColor: isDragging ? '#1F1F23' : 'transparent',
        opacity: isDragging ? 0.8 : 1,
      }}
      onMouseEnter={(e) => {
        if (!isDragging) e.currentTarget.style.backgroundColor = '#141417'
      }}
      onMouseLeave={(e) => {
        if (!isDragging) e.currentTarget.style.backgroundColor = 'transparent'
      }}
    >
      {/* Drag handle */}
      <span
        {...attributes}
        {...listeners}
        title="Drag to reorder"
        style={{ color: '#6B6B70', fontSize: '10px', flexShrink: 0, cursor: 'grab', lineHeight: 1, userSelect: 'none' }}
      >
        ⠿
      </span>

      <span style={{ flex: 1, color: '#FFFFFF', fontSize: '14px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
        {section.label}
      </span>

      {/* Visibility toggle */}
      <button
        onClick={onToggle}
        title={section.visible ? 'Hide section' : 'Show section'}
        style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: section.visible ? '#10B981' : '#6B6B70',
          border: 'none',
          cursor: 'pointer',
          flexShrink: 0,
          padding: 0,
          transition: 'background-color 0.15s',
        }}
      />
    </div>
  )
}

// ─── Shared style helpers ─────────────────────────────────────────────────────

const toolbarBtn: CSSProperties = {
  padding: '4px 6px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '4px',
  color: '#8B8B90',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

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

  // ── DOCX export ───────────────────────────────────────────────────────────

  async function handleExportDocx() {
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', marginTop: '8px' }}>
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
                  maxWidth: '200px',
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
            <div key={exp.id} style={{ marginBottom: '16px' }}>
              {/* Role / Company / Period row */}
              <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline', flexWrap: 'wrap' }}>
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
                <span style={{ color: '#888', fontSize: `${fontSize}px`, flexShrink: 0 }}>—</span>
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
                    width: '120px', flexShrink: 0,
                  })}
                />
              </div>
              {/* Description */}
              <textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                placeholder="Describe your achievements and impact..."
                rows={3}
                onFocus={(e) => (e.target.style.outline = `1px dashed ${accentColor}70`)}
                onBlur={(e) => (e.target.style.outline = 'none')}
                style={{
                  ...fieldInput({ fontFamily: fontCss, fontSize: `${fontSize - 1}px`, color: '#555', lineHeight: '1.6' }),
                  resize: 'none',
                  display: 'block',
                  width: '100%',
                  marginTop: '4px',
                }}
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
            <div key={edu.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline', flexWrap: 'wrap' }}>
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
                    width: '120px', flexShrink: 0,
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
            value={resumeData.skills.join(', ')}
            onChange={(e) => updateSkills(e.target.value)}
            placeholder="Skill 1, Skill 2, Skill 3..."
            rows={2}
            onFocus={(e) => (e.target.style.outline = `1px dashed ${accentColor}70`)}
            onBlur={(e) => (e.target.style.outline = 'none')}
            style={{
              ...fieldInput({ fontFamily: fontCss, fontSize: `${fontSize - 1}px`, color: '#555', lineHeight: '1.6' }),
              resize: 'none',
              display: 'block',
              width: '100%',
              marginBottom: '10px',
            }}
          />
          {/* Chip preview */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {resumeData.skills.map((skill, i) => (
              <span
                key={i}
                style={{
                  padding: '3px 10px',
                  backgroundColor: '#F4F4F0',
                  borderRadius: '100px',
                  fontSize: `${fontSize - 2}px`,
                  fontFamily: fontCss,
                  color: '#555',
                }}
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

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#0A0A0B', overflow: 'hidden' }}>

      {/* Site header — navigation */}
      <Header />

      {/* Editor toolbar */}
      <div
        style={{
          height: '52px',
          backgroundColor: '#111113',
          borderBottom: '1px solid #1F1F23',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: '12px',
          flexShrink: 0,
        }}
      >
        {/* Undo / Redo */}
        <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
          <button style={toolbarBtn} onClick={handleUndo} title="Undo" disabled={!prevData}>
            <Undo2 size={15} />
          </button>
          <button style={toolbarBtn} title="Redo">
            <Redo2 size={15} />
          </button>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', backgroundColor: '#1F1F23', flexShrink: 0 }} />

        {/* Document name — centered */}
        <input
          value={docName}
          onChange={(e) => setDocName(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#FFFFFF',
            fontSize: '14px',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            flex: 1,
            textAlign: 'center',
            minWidth: 0,
          }}
        />

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', backgroundColor: '#1F1F23', flexShrink: 0 }} />

        {/* Format buttons */}
        <div style={{ display: 'flex', gap: '2px', backgroundColor: '#141417', borderRadius: '6px', padding: '2px', flexShrink: 0 }}>
          <button style={toolbarBtn} title="Bold"><Bold size={14} /></button>
          <button style={toolbarBtn} title="Italic"><Italic size={14} /></button>
          <button style={toolbarBtn} title="Underline"><Underline size={14} /></button>
        </div>

        {/* Preview */}
        <button
          style={{
            padding: '6px 12px',
            backgroundColor: 'transparent',
            border: '1px solid #1F1F23',
            borderRadius: '6px',
            color: '#8B8B90',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            flexShrink: 0,
          }}
        >
          <Eye size={13} /> Preview
        </button>

        {/* Export DOCX */}
        <button
          onClick={handleExportDocx}
          style={{
            padding: '6px 14px',
            backgroundColor: '#FF5C00',
            border: 'none',
            borderRadius: '6px',
            color: '#FFFFFF',
            fontSize: '13px',
            fontWeight: '600',
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'background-color 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e05200')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5C00')}
        >
          <FileDown size={13} /> Export DOCX
        </button>
      </div>

      {/* Three-panel body */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* ── Left: Sections panel ── */}
        <aside
          style={{
            width: '240px',
            flexShrink: 0,
            backgroundColor: '#111113',
            borderRight: '1px solid #1F1F23',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #1F1F23',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              flexShrink: 0,
            }}
          >
            Sections
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
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

          <div style={{ padding: '12px', borderTop: '1px solid #1F1F23', flexShrink: 0 }}>
            <button
              style={{
                width: '100%',
                padding: '8px',
                backgroundColor: 'transparent',
                border: '1px dashed #1F1F23',
                borderRadius: '6px',
                color: '#8B8B90',
                fontSize: '13px',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter), Inter, sans-serif',
              }}
            >
              + Add Section
            </button>
          </div>
        </aside>

        {/* ── Center: Editable resume canvas ── */}
        <main
          style={{
            flex: 1,
            backgroundColor: '#0A0A0B',
            overflowY: 'auto',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '40px 32px 80px',
          }}
        >
          {/* A4 resume card */}
          <div
            style={{
              width: '680px',
              backgroundColor: '#FFFFFF',
              borderRadius: '4px',
              padding: '52px',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
              minHeight: '900px',
            }}
          >
            {visibleSections.map((sec, i) => (
              <div key={sec.id}>
                {renderSection(sec)}
                {/* Accent divider between sections */}
                {i < visibleSections.length - 1 && (
                  <div style={{ height: '1.5px', backgroundColor: accentColor, margin: '20px 0' }} />
                )}
              </div>
            ))}
          </div>
        </main>

        {/* ── Right: Customize panel ── */}
        <aside
          style={{
            width: '280px',
            flexShrink: 0,
            backgroundColor: '#111113',
            borderLeft: '1px solid #1F1F23',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid #1F1F23',
              color: '#FFFFFF',
              fontSize: '13px',
              fontWeight: '600',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
              flexShrink: 0,
            }}
          >
            Customize
          </div>

          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Accent color */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ color: '#8B8B90', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Accent Color
              </span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {ACCENT_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    title={color}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: color,
                      border: accentColor === color ? '2px solid #FFFFFF' : '2px solid transparent',
                      cursor: 'pointer',
                      outline: accentColor === color ? `2px solid ${color}` : 'none',
                      outlineOffset: '2px',
                      transition: 'transform 0.15s',
                      padding: 0,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                ))}
              </div>
            </div>

            {/* Font family */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ color: '#8B8B90', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Font
              </span>
              <select
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                style={{
                  backgroundColor: '#141417',
                  border: '1px solid #1F1F23',
                  borderRadius: '6px',
                  padding: '8px 12px',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  fontFamily: 'var(--font-inter), Inter, sans-serif',
                  cursor: 'pointer',
                }}
              >
                {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>

            {/* Font size */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#8B8B90', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                  Font Size
                </span>
                <span style={{ color: '#FFFFFF', fontSize: '13px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
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
                style={{ width: '100%', accentColor: '#FF5C00' } as CSSProperties}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#6B6B70', fontSize: '11px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>Small</span>
                <span style={{ color: '#6B6B70', fontSize: '11px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>Large</span>
              </div>
            </div>

            {/* Layout */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <span style={{ color: '#8B8B90', fontSize: '11px', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
                Layout
              </span>
              <div style={{ display: 'flex', backgroundColor: '#141417', border: '1px solid #1F1F23', borderRadius: '6px', padding: '3px' }}>
                {(['single', 'two'] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLayout(l)}
                    style={{
                      flex: 1,
                      padding: '6px 0',
                      borderRadius: '4px',
                      backgroundColor: layout === l ? '#FF5C00' : 'transparent',
                      border: 'none',
                      color: layout === l ? '#FFFFFF' : '#8B8B90',
                      fontSize: '12px',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-inter), Inter, sans-serif',
                      fontWeight: layout === l ? '600' : '400',
                      transition: 'all 0.15s',
                    }}
                  >
                    {l === 'single' ? 'Single Col' : 'Two Col'}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>
      </div>
    </div>
  )
}
