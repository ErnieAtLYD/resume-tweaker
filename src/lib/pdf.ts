import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { marked } from 'marked'

const renderer = new marked.Renderer()

/**
 * Parses markdown content into HTML.
 * @param content - The markdown content to parse.
 * @returns The parsed HTML string.
 */
export const parseMarkdown = (content: string) =>
  marked.parse(content, { renderer }) as string

interface GeneratePDFOptions {
  content: string
  filename: string
}

interface GenerateCombinedPDFOptions {
  optimizedResume: string;
  coverLetter: string;
}

/**
 * Generates a PDF from a single content string.
 * @param content - The content to include in the PDF.
 * @param filename - The name of the file to save the PDF as.
 */
export const generateSinglePDF = async ({
  content,
  filename,
}: GeneratePDFOptions): Promise<void> => {
  if (!content) {
    throw new Error('No content provided')
  }

  const tempDiv = document.createElement('div')
  tempDiv.className = 'prose max-w-none p-8'
  tempDiv.innerHTML = parseMarkdown(content)
  document.body.appendChild(tempDiv)

  try {
    const canvas = await html2canvas(tempDiv, {
      scale: 2,
      logging: false,
      useCORS: true
    })
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4'
    })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    
    const imgData = canvas.toDataURL('image/png')
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * ratio, imgHeight * ratio)
    pdf.save(filename)
  } catch (error) {
    console.error('Error generating single PDF:', error)
    throw new Error('Failed to generate single PDF')
  } finally {
    document.body.removeChild(tempDiv)
  }
}

/**
 * Generates a combined PDF from resume and cover letter content.
 * @param optimizedResume - The optimized resume content.
 * @param coverLetter - The cover letter content.
 */
export const generateCombinedPDF = async (
  {optimizedResume,
  coverLetter
}: GenerateCombinedPDFOptions): Promise<void> => {
  const element = document.getElementById('markdown-content')
  if (!element) return

  if (!optimizedResume || !coverLetter) {
    throw new Error('No content provided')
  }

  const resumeDiv = element.querySelector('.resume-content')
  const letterDiv = element.querySelector('.letter-content')
  
  if (resumeDiv && letterDiv) {
    resumeDiv.innerHTML = parseMarkdown(optimizedResume)
    letterDiv.innerHTML = parseMarkdown(coverLetter)
  }

  try {
    const canvas = await html2canvas(element, {
    scale: 2,
    logging: false,
      useCORS: true
    })
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: 'a4'
  })

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    
    const imgData = canvas.toDataURL('image/png')
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth * ratio, imgHeight * ratio)
    pdf.save('resume-and-cover-letter.pdf')
  } catch (error) {
    console.error('Error generating combined PDF:', error)
    throw new Error('Failed to generate combined PDF')
  } finally {
    if (element && element.parentNode) {
    document.body.removeChild(element)}
  }
} 
