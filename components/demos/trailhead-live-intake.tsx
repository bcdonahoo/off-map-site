'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { posthog } from '@/lib/posthog'
import { TrailheadChat } from './trailhead-chat'

const FLAG = 'trailhead_live_intake_visible'

export function TrailheadLiveIntake() {
  const [show, setShow] = useState(false)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const check = () => {
      if (posthog.isFeatureEnabled(FLAG)) setShow(true)
    }
    // Fire immediately if flags are already loaded, otherwise wait
    posthog.onFeatureFlags(check)
    check()
  }, [])

  function reveal() {
    setRevealed(true)
    try { posthog.capture('trailhead_intake_revealed') } catch {}
  }

  if (!show && !revealed) {
    return (
      <div id="live-intake" className="px-6 pb-12" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-2xl">
          <div
            className="rounded-2xl p-10 text-center"
            style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
          >
            <p
              className="text-xl font-bold mb-2"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
            >
              Ready to try it yourself?
            </p>
            <p className="text-sm mb-8" style={{ color: 'var(--color-text-muted)' }}>
              Run the same guided intake with your own situation. No legal advice, attorney review required
              before any scope is confirmed.
            </p>
            <button
              onClick={reveal}
              className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: 'var(--color-accent)' }}
            >
              Start the intake
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="live-intake" className="px-6 pb-12" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-2xl">
        <p className="mb-3 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
          Now try your own situation.
        </p>
        <p className="mb-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Guided intake only. No legal advice. Attorney review required before any scope is confirmed.
        </p>
        <TrailheadChat />
        <Link
          href="/trailhead/form"
          className="mt-4 flex items-center justify-between gap-4 rounded-xl px-5 py-4 transition-opacity hover:opacity-80"
          style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Not a fan of chat? Use the traditional form instead.
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              Answer a few simple questions — no conversation required.
            </p>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" style={{ color: 'var(--color-text-muted)' }}>
            <path d="M4 8H12M9 5L12 8L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>
    </div>
  )
}
