import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { optimizeResumeAndGenerateCoverLetter } from '../actions'

interface ResultsProps {
  resume: string
  jobDescription: string
  optimizedResume: string
  setOptimizedResume: (resume: string) => void
  coverLetter: string
  setCoverLetter: (letter: string) => void
  onBack: () => void
}

export function Results({
  resume,
  jobDescription,
  optimizedResume,
  setOptimizedResume,
  coverLetter,
  setCoverLetter,
  onBack,
}: ResultsProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleOptimize = async () => {
    setIsLoading(true)
    try {
      const result = await optimizeResumeAndGenerateCoverLetter(resume, jobDescription)
      setOptimizedResume(result.optimizedResume)
      setCoverLetter(result.coverLetter)
    } catch (error) {
      console.error('Error optimizing resume:', error)
      // Handle error (e.g., show an error message to the user)
    }
    setIsLoading(false)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Step 3: Results</h2>
      <Button onClick={handleOptimize} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Optimize Resume and Generate Cover Letter'}
      </Button>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Optimized Resume</h3>
          <Textarea value={optimizedResume} readOnly className="h-64" />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Cover Letter</h3>
          <Textarea value={coverLetter} readOnly className="h-64" />
        </div>
      </div>
      <Button onClick={onBack} variant="outline">
        Back
      </Button>
    </div>
  )
}

