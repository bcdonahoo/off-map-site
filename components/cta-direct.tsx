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
        Get Started
      </p>
      <h2
        className="mb-6 text-4xl font-bold md:text-5xl"
        style={{
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-display)',
        }}
      >
        Find out what is actually broken.
      </h2>
      <p
        className="mx-auto mb-10 max-w-[480px] text-sm leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Start with a $350 Off-Map Audit. Sixty minutes, a one-page brief in 72
        hours, and one move to make next. If it is worth more, we will talk
        about what comes after.
      </p>
      <Link
        href="/services/audit"
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
        Get an Audit →
      </Link>
    </div>
  )
}
