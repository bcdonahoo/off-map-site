'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { posthog } from '@/lib/posthog'

export function CTADirect() {
  return (
    <div className="mx-auto max-w-6xl text-center">
      <p
        className="mb-4 text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        Start here
      </p>
      <h2
        className="mb-6 text-4xl font-bold md:text-5xl"
        style={{
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-display)',
        }}
      >
        Start with a conversation.
      </h2>
      <p
        className="mx-auto mb-10 max-w-[480px] text-sm leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      >
        30 minutes, on Zoom. We will discuss your practice, the growth
        bottleneck, and whether what Off-Map does fits. You will see Trailhead,
        our working AI sales demo, before or during the call.
      </p>
      <div className="mb-4">
        <Link
          href="/book?source=homepage"
          onClick={() =>
            posthog.capture('cta_clicked', {
              variant: 'direct',
              location: 'cta-section',
            })
          }
          className={
            buttonVariants({ size: 'lg' }) +
            ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
          }
          style={{ background: 'var(--color-accent)' }}
        >
          Book a call
        </Link>
      </div>
      <Link
        href="/trailhead"
        className="text-sm transition-opacity hover:opacity-70"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Or see the demo first
      </Link>
    </div>
  )
}
