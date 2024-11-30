import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState, useEffect } from 'react'

interface ResumeInputProps {
  resume: string
  setResume: (resume: string) => void
  onNext: () => void
}

export function ResumeInput({ resume, setResume, onNext }: ResumeInputProps) {
  const [isDev, setIsDev] = useState(false)

  useEffect(() => {
    // Check if we're in development mode
    setIsDev(process.env.NODE_ENV === 'development')
  }, [])

  const loadSampleData = async () => {
    try {
      const response = await fetch('/api/sample-resume')
      if (!response.ok) throw new Error('Failed to load sample data')
      const text = await response.text()
      setResume(text)
    } catch (error) {
      console.error('Error loading sample data:', error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Step 1: Input Your Resume</h2>
        {isDev && (
          <Button 
            onClick={loadSampleData}
            variant="outline"
            size="sm"
            className="text-xs bg-yellow-100 hover:bg-yellow-200 border-yellow-300"
          >
            Load Sample Data (Dev)
          </Button>
        )}
      </div>
      <Textarea
        value={resume}
        onChange={(e) => setResume(e.target.value)}
        placeholder="Paste your resume in markdown format here..."
        className="h-64"
      />
      <Button onClick={onNext} disabled={!resume.trim()}>
        Next
      </Button>
    </div>
  )
}

