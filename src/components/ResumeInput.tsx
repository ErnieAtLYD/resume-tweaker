import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface ResumeInputProps {
  resume: string
  setResume: (resume: string) => void
  onNext: () => void
}

export function ResumeInput({ resume, setResume, onNext }: ResumeInputProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Step 1: Input Your Resume</h2>
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

