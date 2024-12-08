// ResumeForm.tsx

import { useState } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Textarea } from "./ui/textarea"

export function ResumeForm({ onUpdate }: { onUpdate: (resume: string, jobDesc: string) => void }) {
    const [resume, setResume] = useState('')
    const [jobDescription, setJobDescription] = useState('')
  
    return (
      <Card>
        <CardHeader><CardTitle>Resume Updater</CardTitle></CardHeader>
        <CardContent>
          <Textarea value={resume} onChange={(e) => setResume(e.target.value)} />
          <Textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
        </CardContent>
        <CardFooter>
          <Button onClick={() => onUpdate(resume, jobDescription)}>Update Resume</Button>
        </CardFooter>
      </Card>
    )
  }