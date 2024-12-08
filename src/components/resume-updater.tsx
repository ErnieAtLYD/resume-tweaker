'use client'

import { useState } from 'react'
import { updateResume } from '@/resume-utils'
import { ResumeForm } from '@/components/ResumeForm'
import { ResumePreview } from '@/components/ResumePreview'  

export default function ResumeUpdater() {
  const [updatedResume, setUpdatedResume] = useState('')

  const handleUpdate = (resume: string, jobDesc: string) => {
    setUpdatedResume(updateResume(resume, jobDesc))
  }

  const handleDownload = () => {
    const blob = new Blob([updatedResume], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'updated_resume.md'
    a.click()
  }

  return (
    <div className="container mx-auto p-4">
      <ResumeForm onUpdate={handleUpdate} />
      <ResumePreview content={updatedResume} onDownload={handleDownload} />
    </div>
  )
}

