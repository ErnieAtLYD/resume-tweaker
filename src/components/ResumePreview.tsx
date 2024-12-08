// ResumePreview.tsx

import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card"

export function ResumePreview({ 
    content, 
    onDownload 
  }: { 
    content: string
    onDownload: () => void 
  }) {
    return content ? (
      <Card>
        <CardHeader><CardTitle>Updated Resume</CardTitle></CardHeader>
        <CardContent><pre>{content}</pre></CardContent>
        <CardFooter>
          <Button onClick={onDownload}>Download Markdown</Button>
        </CardFooter>
      </Card>
    ) : null
  } 