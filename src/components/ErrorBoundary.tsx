'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

const sanitizeError = (error: Error) => {
  // Remove sensitive information like tokens, passwords, etc
  const sanitizedError = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    digest: (error as Error & { digest?: string }).digest
  }

  // Remove any potential sensitive patterns
  return JSON.parse(
    JSON.stringify(sanitizedError, (key, value) => {
      if (typeof value === 'string') {
        // Remove potential tokens, passwords, etc
        return value.replace(/Bearer\s+[A-Za-z0-9-._~+/]+=*/g, '[REDACTED_TOKEN]')
                   .replace(/password=([^&]*)/g, 'password=[REDACTED]')
      }
      return value
    })
  )
}

export const ErrorBoundary = ({ error, reset }: ErrorBoundaryProps) => {
  useEffect(() => {
    const sanitizedError = sanitizeError(error)

    if (process.env.NODE_ENV === 'production') {
      // Send to Sentry in production
      Sentry.captureException(error, {
        extra: {
          digest: sanitizedError.digest,
          sanitizedError
        }
      })
    } else {
      // In development, still log to console but with sanitized data
      console.error('Development Error:', sanitizedError)
    }
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <h2 className="text-xl font-semibold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-6">We apologize for the inconvenience.</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}