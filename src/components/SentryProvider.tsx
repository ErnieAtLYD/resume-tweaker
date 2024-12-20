'use client'

import * as Sentry from '@sentry/react'
import { useEffect } from 'react'

interface SentryProviderProps {
  children: React.ReactNode
}

export const SentryProvider = ({ children }: SentryProviderProps) => {
  useEffect(() => {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      integrations: [],
      // Performance Monitoring
      tracesSampleRate: 1.0,
      // Session Replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    })
  }, [])

  return <>{children}</>
} 