'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { updateResume } from '@/resume-utils'

export default function ResumeUpdater() {
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [updatedResume, setUpdatedResume] = useState('')
  const [outputMode, setOutputMode] = useState<'markdown' | 'pdf'>('markdown')
  const [isDev, setIsDev] = useState(false)

  useEffect(() => {
    // Check if we're in development mode
    setIsDev(process.env.NODE_ENV === 'development')
  }, [])

  const handleUpdateResume = () => {
    const updated = updateResume(resume, jobDescription)
    setUpdatedResume(updated)
  }

  const handleDownload = () => {
    if (outputMode === 'markdown') {
      const blob = new Blob([updatedResume], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'updated_resume.md'
      a.click()
    } else {
      // For PDF, we'd typically use a library like jsPDF or call a backend service
      // This is a placeholder for PDF generation
      alert('PDF generation would happen here')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Resume Updater</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
              Your Resume (Markdown format)
            </label>
            <Textarea
              id="resume"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              className="mt-1 block w-full"
              rows={10}
              placeholder="Paste your resume here..."
            />
          </div>
          <div>
            <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Job Description
            </label>
            <Textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="mt-1 block w-full"
              rows={10}
              placeholder="Paste the job description here..."
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <Button onClick={handleUpdateResume}>Update Resume</Button>
          <div className="flex items-center space-x-2">
            <Label htmlFor="output-mode">PDF</Label>
            <Switch
              id="output-mode"
              checked={outputMode === 'pdf'}
              onCheckedChange={(checked) => setOutputMode(checked ? 'pdf' : 'markdown')}
            />
            <Label htmlFor="output-mode">Markdown</Label>
          </div>
        </CardFooter>
      </Card>
      {updatedResume && (
        <Card>
          <CardHeader>
            <CardTitle>Updated Resume</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap">{updatedResume}</pre>
          </CardContent>
          <CardFooter>
            <Button onClick={handleDownload}>
              Download {outputMode.toUpperCase()}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

