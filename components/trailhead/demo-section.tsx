'use client'

import { useEffect, useState } from 'react'
import { posthog } from '@/lib/posthog'
import { TrailheadScriptedDemo } from '@/components/demos/trailhead-scripted-demo'
import { TrailheadLiveIntake } from '@/components/demos/trailhead-live-intake'

export function TrailheadDemoSection() {
  const [compact, setCompact] = useState(false)

  useEffect(() => {
    const check = () => {
      if (posthog.isFeatureEnabled('trailhead_demo_compact')) setCompact(true)
    }
    posthog.onFeatureFlags(check)
    check()
  }, [])

  return (
    <>
      {/* Scripted demo */}
      <section className={compact ? 'py-8 px-6' : 'py-12 px-6'} style={{ background: 'var(--color-bg)' }}>
        <div className={`mx-auto ${compact ? 'max-w-3xl' : 'max-w-5xl'}`}>
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            Component preview
          </p>
          <h2
            className={`mb-3 font-bold ${compact ? 'text-xl' : 'text-2xl'}`}
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Guided intake and attorney handoff in action.
          </h2>
          {!compact && (
            <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Three scenarios showing standard fit, possible fit with complexity flags, and a case
              outside flat-fee scope. Watch how the handoff summary builds as the intake progresses.
            </p>
          )}
          {compact && (
            <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Watch the intake qualify a prospect and build the attorney handoff in real time.
            </p>
          )}
          <TrailheadScriptedDemo compact={compact} />
        </div>
      </section>

      {/* Live intake */}
      <TrailheadLiveIntake compact={compact} />
    </>
  )
}
