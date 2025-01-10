'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { optimizeResumeAndGenerateCoverLetter } from '../actions'
import { generateCombinedPDF, generateSinglePDF } from '@/lib/pdf'
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
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  /**
   * Handles the optimization of the resume and generation of the cover letter.
   */
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

/**
 * Downloads the optimized resume as a PDF.
 */
const handleDownloadResume = async () => {
  setIsGeneratingPDF(true)
  try {
    await generateSinglePDF({
      content: optimizedResume,
      filename: 'optimized-resume.pdf',
    });
  } catch (error) {
    console.error('Error generating resume PDF:', error);
  } finally {
    setIsGeneratingPDF(false)
  }
};

/**
 * Downloads the cover letter as a PDF.
 */
const handleDownloadCoverLetter = async () => {
  setIsGeneratingPDF(true)
  try {
    await generateSinglePDF({
      content: coverLetter,
      filename: 'cover-letter.pdf',
    });
  } catch (error) {
    console.error('Error generating cover letter PDF:', error);
  } finally {
    setIsGeneratingPDF(false)
  }
};


/**
 * Downloads a combined PDF of the optimized resume and cover letter.
 */
const handleDownloadCombined = async () => {
  setIsGeneratingPDF(true)
  setError(null)
  try {
    await generateCombinedPDF({optimizedResume, coverLetter});
  } catch (error) {
    setError('Failed to generate combined PDF. Please try again.')
    console.error('Error generating combined PDF:', error);
  } finally {
    setIsGeneratingPDF(false)
  }
};

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
          disabled={!optimizedResume || isGeneratingPDF}
        />
        <DocumentSection
          title="Cover Letter"
          content={coverLetter}
          onDownload={handleDownloadCoverLetter}
          disabled={!coverLetter || isGeneratingPDF}
        />
      </div>

      <div className="flex justify-between items-center">
        <Button onClick={onBack} variant="outline">
          Back
        </Button>
        <Button
          onClick={handleDownloadCombined}
          className="bg-blue-600 hover:bg-blue-700"
          disabled={!optimizedResume || !coverLetter || isGeneratingPDF}
        >
          {isGeneratingPDF ? 'Generating PDF...' : 'Download Combined PDF'}
        </Button>
      </div>
      
      <HiddenMarkdownContent
        optimizedResume={optimizedResume}
        coverLetter={coverLetter}
      />
    </div>
  )
}

