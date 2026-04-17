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

const INPUT_CLASS = 'w-full px-4 py-3 bg-bg-base border border-border-default rounded-lg text-text-primary text-sm outline-none'

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

  return (
    <div>
      <h2 className="font-serif text-[28px] text-text-primary font-normal m-0 mb-2">
        Upload your first template
      </h2>
      <p className="text-text-secondary text-sm m-0 mb-8">
        Share your best resume design. You can add more templates later.
      </p>

      <div className="flex flex-col gap-6">
        {/* Drop zone */}
        {!data.templateFile ? (
          <div
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl px-6 py-12 text-center cursor-pointer transition-colors ${
              dragOver ? 'border-accent' : 'border-border-default'
            }`}
          >
            <Upload size={32} color={dragOver ? '#FF5C00' : '#6B6B70'} className="mb-3 mx-auto" />
            <p className="text-text-primary text-sm m-0 mb-1 font-medium">
              Drag & drop your template file here
            </p>
            <p className="text-text-muted text-[13px] m-0">
              or click to browse. Accepts .docx and .pdf
            </p>
          </div>
        ) : (
          <div className="bg-bg-base border border-border-default rounded-xl px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText size={20} color="#FF5C00" />
              <div>
                <p className="text-text-primary text-sm m-0">{data.templateFile.name}</p>
                <p className="text-text-muted text-xs mt-0.5 mb-0">{formatFileSize(data.templateFile.size)}</p>
              </div>
            </div>
            <button
              onClick={() => onChange({ templateFile: null })}
              className="bg-transparent border-none cursor-pointer text-text-muted"
            >
              <X size={18} />
            </button>
          </div>
        )}
        {errors.file && <p className="text-[#EF4444] text-xs -mt-4 mb-0">{errors.file}</p>}
        <input ref={fileRef} type="file" accept=".pdf,.docx" onChange={handleFileInput} className="hidden" />

        {/* Title */}
        <div>
          <label className="text-text-secondary text-[13px] block mb-2">
            Template title *
          </label>
          <input
            type="text"
            value={data.templateTitle}
            onChange={(e) => onChange({ templateTitle: e.target.value })}
            placeholder="e.g. Executive Pro"
            className={INPUT_CLASS}
          />
          {errors.title && <p className="text-[#EF4444] text-xs mt-1.5">{errors.title}</p>}
        </div>

        {/* Description */}
        <div>
          <label className="text-text-secondary text-[13px] block mb-2">
            Description *
          </label>
          <textarea
            value={data.templateDescription}
            onChange={(e) => onChange({ templateDescription: e.target.value.slice(0, 1000) })}
            placeholder="Describe what makes this template unique..."
            rows={4}
            className={`${INPUT_CLASS} resize-y`}
          />
          <div className="flex justify-between mt-1.5">
            {errors.description ? <p className="text-[#EF4444] text-xs m-0">{errors.description}</p> : <span />}
            <span className="text-text-muted text-xs">{data.templateDescription.length}/1000</span>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="text-text-secondary text-[13px] block mb-2">
            Price (USD)
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-sm">$</span>
            <input
              type="number"
              min={0}
              step={1}
              value={data.templatePrice}
              onChange={(e) => onChange({ templatePrice: Math.max(0, parseInt(e.target.value) || 0) })}
              className={`${INPUT_CLASS} pl-8`}
            />
          </div>
          <p className="text-text-muted text-xs mt-1.5">Set to $0 for a free template.</p>
        </div>

        {/* Category */}
        <div>
          <label className="text-text-secondary text-[13px] block mb-2">
            Category *
          </label>
          <select
            value={data.templateCategory}
            onChange={(e) => onChange({ templateCategory: e.target.value })}
            className={`${INPUT_CLASS} cursor-pointer appearance-none`}
          >
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.category && <p className="text-[#EF4444] text-xs mt-1.5">{errors.category}</p>}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button
          onClick={onBack}
          className="text-text-secondary bg-transparent border-none cursor-pointer text-sm"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-accent text-text-primary rounded-lg border-none text-sm font-semibold cursor-pointer"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
