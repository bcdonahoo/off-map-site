import type { Metadata } from 'next'
import Link from 'next/link'
import { TrailheadForm } from '@/components/demos/trailhead-form'

export const metadata: Metadata = {
  title: 'Estate Planning Form | Cedar & Vale Estate Law',
  robots: { index: false, follow: false },
}

export default function TrailheadFormPage() {
  return (
    <main
      className="min-h-screen pt-28 pb-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-2xl">

        {/* Back link */}
        <Link
          href="/trailhead"
          className="inline-flex items-center gap-1.5 text-xs mb-8 transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back to main page
        </Link>

        {/* Eyebrow */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          Cedar &amp; Vale Estate Law · Demo Firm
        </p>

        {/* Hero */}
        <h1
          className="mb-2 text-4xl font-bold tracking-tight leading-tight"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          Prefer to fill out a form?
        </h1>
        <p className="mb-10 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Answer a few simple questions and we&rsquo;ll tell you exactly what to do next — no chat required.
        </p>

        {/* Form wizard */}
        <TrailheadForm />

        {/* Footer note */}
        <div
          className="mt-8 rounded-xl p-4 text-center"
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Cedar &amp; Vale Estate Law is a fictional firm created for demonstration purposes by{' '}
            <span style={{ color: 'var(--color-text-primary)' }}>Off-Map</span>. This is a working demo of
            Trailhead, an AI-powered intake and client acquisition system for flat-fee legal services.
          </p>
        </div>

      </div>
    </main>
  )
}
