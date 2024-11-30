import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
  // Only allow in development mode
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('Not available in production', { status: 403 })
  }

  try {
    const filePath = path.join(process.cwd(), 'sample-job-description.txt')
    const content = await readFile(filePath, 'utf-8')
    return new NextResponse(content)
  } catch (error) {
    console.error('Error reading sample job description:', error)
    return new NextResponse('Error loading sample data', { status: 500 })
  }
} 