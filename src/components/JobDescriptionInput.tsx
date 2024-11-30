import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

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
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Step 2: Input Job Description</h2>
      <Textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste the job description here..."
        className="h-64"
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

