import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Book a Discovery Call | Off-Map',
  description:
    'Schedule a 30-minute call to scope your GTM system build and understand what results you can expect.',
}

export default function BookPage() {
  return (
    <main
      className="min-h-screen pt-32 pb-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-2xl">
        {/* Eyebrow */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          Discovery Call
        </p>

        {/* Headline */}
        <h1
          className="mb-6 text-4xl font-bold md:text-5xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Let&apos;s scope your GTM system.
        </h1>

        <p
          className="mb-12 text-sm leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Thirty minutes. We align on your ICP, review your current outbound
          motion, and tell you exactly what the system will cost and what it
          will generate. No pitch deck, no fluff.
        </p>

        {/* Cal.com embed placeholder */}
        <div
          className="flex min-h-[480px] items-center justify-center rounded-2xl"
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <div className="text-center">
            <p
              className="mb-2 text-sm font-medium"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Booking calendar coming soon.
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}>
              In the meantime, email us at{' '}
              <a
                href="mailto:hello@off-map.com"
                className="underline transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-accent)' }}
              >
                hello@off-map.com
              </a>
            </p>
          </div>
        </div>

        <p className="mt-8 text-xs" style={{ color: 'var(--color-text-muted)', opacity: 0.5 }}>
          ←{' '}
          <Link
            href="/"
            className="underline transition-opacity hover:opacity-70"
          >
            Back to home
          </Link>
        </p>
      </div>
    </main>
  )
}
