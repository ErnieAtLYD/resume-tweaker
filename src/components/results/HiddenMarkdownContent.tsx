interface HiddenMarkdownContentProps {
  optimizedResume: string
  coverLetter: string
}

export const HiddenMarkdownContent = ({
  optimizedResume,
  coverLetter
}: HiddenMarkdownContentProps) => (
  <div id="markdown-content" className="prose max-w-none hidden">
    <div className="mb-8">
      <h2>Optimized Resume</h2>
      <div className="resume-content whitespace-pre-wrap"></div>
    </div>
    <div>
      <h2>Cover Letter</h2>
      <div className="letter-content whitespace-pre-wrap"></div>
    </div>
  </div>
) 