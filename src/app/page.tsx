'use client'

import { useState } from 'react'
import { ResumeInput } from '@/components/ResumeInput'
import { JobDescriptionInput } from '@/components/JobDescriptionInput'
import { Results } from '@/components/Results'

export default function Home() {
  const [step, setStep] = useState(1)
  const [resume, setResume] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [optimizedResume, setOptimizedResume] = useState('')
  const [coverLetter, setCoverLetter] = useState('')

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const renderStep = () => {
    try {
      switch (step) {
        case 1:
          return <ResumeInput resume={resume} setResume={setResume} onNext={handleNext} />
        case 2:
          return (
            <JobDescriptionInput
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              onNext={handleNext}
              onBack={handleBack}
            />
          )
        case 3:
          return (
            <Results
              resume={resume}
              jobDescription={jobDescription}
              optimizedResume={optimizedResume}
              setOptimizedResume={setOptimizedResume}
              coverLetter={coverLetter}
              setCoverLetter={setCoverLetter}
              onBack={handleBack}
            />
          )
        default:
          throw new Error('Invalid step')
      }
    } catch (error) {
      throw new Error('Failed to render step')
    }
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resume Optimizer and Cover Letter Generator</h1>
      {renderStep()}
    </main>
  )
}

