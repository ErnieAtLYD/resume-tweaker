'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { optimizeResumeAndGenerateCoverLetter } from '../actions'
import { generateSinglePDF, generateCombinedPDF } from '@/lib/pdf'
import { DocumentSection } from './results/DocumentSection'
import { HiddenMarkdownContent } from './results/HiddenMarkdownContent'

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
  const [error, setError] = useState<string | null>(null)

  const handleOptimize = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await optimizeResumeAndGenerateCoverLetter(resume, jobDescription)
      setOptimizedResume(result.optimizedResume)
      setCoverLetter(result.coverLetter)
    } catch (error) {
      setError('Failed to optimize resume. Please try again.')
      console.error('Error optimizing resume:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownloadResume = async () => {
    try {
      await generateSinglePDF({
        content: optimizedResume,
        filename: 'optimized-resume.pdf'
      })
    } catch (error) {
      console.error('Error generating resume PDF:', error)
    }
  }

  const handleDownloadCoverLetter = async () => {
    try {
      await generateSinglePDF({
        content: coverLetter,
        filename: 'cover-letter.pdf'
      })
    } catch (error) {
      console.error('Error generating cover letter PDF:', error)
    }
  }

  const handleDownloadCombined = async () => {
    try {
      await generateCombinedPDF(optimizedResume, coverLetter)
    } catch (error) {
      console.error('Error generating combined PDF:', error)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Step 3: Results</h2>
      
      <Button onClick={handleOptimize} disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Optimize Resume and Generate Cover Letter'}
      </Button>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <DocumentSection
          title="Optimized Resume"
          content={optimizedResume}
          onDownload={handleDownloadResume}
          disabled={!optimizedResume}
        />
        <DocumentSection
          title="Cover Letter"
          content={coverLetter}
          onDownload={handleDownloadCoverLetter}
          disabled={!coverLetter}
        />
      </div>

      <div className="flex justify-between items-center">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button
          onClick={handleDownloadCombined}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={!optimizedResume || !coverLetter}
        >
          Download Combined PDF
        </Button>
      </div>
      
      <HiddenMarkdownContent
        optimizedResume={optimizedResume}
        coverLetter={coverLetter}
      />
    </div>
  )
}
