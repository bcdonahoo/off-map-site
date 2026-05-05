'use client'

import { useEffect } from 'react'
import { initPostHog } from '@/lib/posthog'

export function PostHogProviderWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog()
  }, [])

  return <>{children}</>
}
