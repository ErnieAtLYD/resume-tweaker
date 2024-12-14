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

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resume Optimizer and Cover Letter Generator</h1>
      {step === 1 && (
        <ResumeInput resume={resume} setResume={setResume} onNext={handleNext} />
      )}
      {step === 2 && (
        <JobDescriptionInput
          jobDescription={jobDescription}
          setJobDescription={setJobDescription}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <Results
          resume={resume}
          jobDescription={jobDescription}
          optimizedResume={optimizedResume}
          setOptimizedResume={setOptimizedResume}
          coverLetter={coverLetter}
          setCoverLetter={setCoverLetter}
          onBack={handleBack}
        />
      )}
    </main>
  )
}

