import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface DocumentSectionProps {
  title: string
  content: string
  onDownload: () => void
  disabled: boolean
}

export const DocumentSection = ({
  title,
  content,
  onDownload,
  disabled
}: DocumentSectionProps) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Button
        onClick={onDownload}
        disabled={disabled} // This should be set to true during PDF generation
        variant="outline"
        size="sm"
      >
        Download {title}
      </Button>
    </div>
    <Textarea value={content} readOnly className="h-64" aria-label={title} />
  </div>
) 
