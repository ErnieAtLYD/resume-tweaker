import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useState, useEffect } from 'react'

interface JobDescriptionInputProps {
  jobDescription: string
  setJobDescription: (jobDescription: string) => void
  onNext: () => void
  onBack: () => void
}

export function JobDescriptionInput({
  jobDescription,
  setJobDescription,
  onNext,
  onBack,
}: JobDescriptionInputProps) {
  const [isDev, setIsDev] = useState(false)

  useEffect(() => {
    // Check if we're in development mode
    setIsDev(process.env.NODE_ENV === 'development')
  }, [])

  const loadSampleData = async () => {
    try {
      const response = await fetch('/api/sample-job-description')
      if (!response.ok) throw new Error('Failed to load sample data')
      const text = await response.text()
      setJobDescription(text)
    } catch (error) {
      console.error('Error loading sample data:', error)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Step 2: Input Job Description</h2>
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
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here..."
        className="h-64"
        aria-label='Job Description'
      />
      <div className="space-x-4">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button onClick={onNext} disabled={!jobDescription.trim()}>
          Next
        </Button>
      </div>
    </div>
  )
}

