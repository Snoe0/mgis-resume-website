'use client'

import { useState, useRef } from 'react'
import { Upload, X, FileText } from 'lucide-react'

const categories = [
  'Executive & Finance',
  'Tech & Startups',
  'Design & Creative',
  'Healthcare & Science',
  'Academic & Research',
  'Product & Engineering',
  'Other',
]

interface StepUploadProps {
  data: {
    templateFile: File | null
    templateTitle: string
    templateDescription: string
    templatePrice: number
    templateCategory: string
  }
  onChange: (updates: Partial<StepUploadProps['data']>) => void
  onNext: () => void
  onBack: () => void
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function StepUpload({ data, onChange, onNext, onBack }: StepUploadProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase()
    if (ext !== 'pdf' && ext !== 'docx') {
      setErrors(prev => ({ ...prev, file: 'Only .pdf and .docx files are accepted.' }))
      return
    }
    setErrors(prev => { const { file: _, ...rest } = prev; return rest })
    onChange({ templateFile: file })
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!data.templateFile) errs.file = 'Please upload a template file.'
    if (!data.templateTitle.trim()) errs.title = 'Template title is required.'
    if (!data.templateDescription.trim()) errs.description = 'Description is required.'
    if (!data.templateCategory) errs.category = 'Please select a category.'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validate()) onNext()
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#0A0A0B',
    border: '1px solid #1F1F23',
    borderRadius: '8px',
    color: '#FFFFFF',
    fontSize: '14px',
    fontFamily: 'var(--font-inter), Inter, sans-serif',
    outline: 'none',
  } as const

  return (
    <div>
      <h2
        style={{
          fontFamily: 'var(--font-instrument-serif), Georgia, serif',
          fontSize: '28px',
          color: '#FFFFFF',
          fontWeight: 400,
          margin: '0 0 8px',
        }}
      >
        Upload your first template
      </h2>
      <p style={{ color: '#8B8B90', fontSize: '14px', margin: '0 0 32px' }}>
        Share your best resume design. You can add more templates later.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Drop zone */}
        {!data.templateFile ? (
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            style={{
              border: `2px dashed ${dragOver ? '#FF5C00' : '#1F1F23'}`,
              borderRadius: '12px',
              padding: '48px 24px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.15s',
            }}
          >
            <Upload size={32} color={dragOver ? '#FF5C00' : '#6B6B70'} style={{ marginBottom: '12px' }} />
            <p style={{ color: '#FFFFFF', fontSize: '14px', margin: '0 0 4px', fontWeight: 500 }}>
              Drag & drop your template file here
            </p>
            <p style={{ color: '#6B6B70', fontSize: '13px', margin: 0 }}>
              or click to browse. Accepts .docx and .pdf
            </p>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: '#0A0A0B',
              border: '1px solid #1F1F23',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileText size={20} color="#FF5C00" />
              <div>
                <p style={{ color: '#FFFFFF', fontSize: '14px', margin: 0 }}>{data.templateFile.name}</p>
                <p style={{ color: '#6B6B70', fontSize: '12px', margin: '2px 0 0' }}>{formatFileSize(data.templateFile.size)}</p>
              </div>
            </div>
            <button
              onClick={() => onChange({ templateFile: null })}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B6B70' }}
            >
              <X size={18} />
            </button>
          </div>
        )}
        {errors.file && <p style={{ color: '#EF4444', fontSize: '12px', margin: '-16px 0 0' }}>{errors.file}</p>}
        <input ref={fileRef} type="file" accept=".pdf,.docx" onChange={handleFileInput} style={{ display: 'none' }} />

        {/* Title */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Template title *
          </label>
          <input
            type="text"
            value={data.templateTitle}
            onChange={(e) => onChange({ templateTitle: e.target.value })}
            placeholder="e.g. Executive Pro"
            style={inputStyle}
          />
          {errors.title && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '6px' }}>{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Description *
          </label>
          <textarea
            value={data.templateDescription}
            onChange={(e) => onChange({ templateDescription: e.target.value.slice(0, 1000) })}
            placeholder="Describe what makes this template unique..."
            rows={4}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            {errors.description ? <p style={{ color: '#EF4444', fontSize: '12px', margin: 0 }}>{errors.description}</p> : <span />}
            <span style={{ color: '#6B6B70', fontSize: '12px' }}>{data.templateDescription.length}/1000</span>
          </div>
        </div>

        {/* Price */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Price (USD)
          </label>
          <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#6B6B70', fontSize: '14px' }}>$</span>
            <input
              type="number"
              min={0}
              step={1}
              value={data.templatePrice}
              onChange={(e) => onChange({ templatePrice: Math.max(0, parseInt(e.target.value) || 0) })}
              style={{ ...inputStyle, paddingLeft: '32px' }}
            />
          </div>
          <p style={{ color: '#6B6B70', fontSize: '12px', marginTop: '6px' }}>Set to $0 for a free template.</p>
        </div>

        {/* Category */}
        <div>
          <label style={{ color: '#8B8B90', fontSize: '13px', display: 'block', marginBottom: '8px', fontFamily: 'var(--font-inter), Inter, sans-serif' }}>
            Category *
          </label>
          <select
            value={data.templateCategory}
            onChange={(e) => onChange({ templateCategory: e.target.value })}
            style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p style={{ color: '#EF4444', fontSize: '12px', marginTop: '6px' }}>{errors.category}</p>}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
        <button
          onClick={onBack}
          style={{
            color: '#8B8B90',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: '12px 32px',
            backgroundColor: '#FF5C00',
            color: '#FFFFFF',
            borderRadius: '8px',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            fontFamily: 'var(--font-inter), Inter, sans-serif',
          }}
        >
          Continue
        </button>
      </div>
    </div>
  )
}
