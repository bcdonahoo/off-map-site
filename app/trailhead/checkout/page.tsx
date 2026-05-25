import type { Metadata } from 'next'
import Link from 'next/link'
import { TrailheadCheckout } from '@/components/demos/trailhead-checkout'

export const metadata: Metadata = {
  title: 'Checkout | Hill Country Estate Law',
  robots: { index: false, follow: false },
}

type Props = {
  searchParams: Promise<{ lead?: string }>
}

export default async function CheckoutPage({ searchParams }: Props) {
  const { lead } = await searchParams

  if (!lead) {
    return (
      <main className="min-h-screen pt-28 pb-24 px-6" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-md text-center">
          <p className="text-sm mb-4" style={{ color: 'var(--color-text-muted)' }}>
            No checkout session found.
          </p>
          <Link
            href="/trailhead"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-accent)' }}
          >
            ← Back to estate planning
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-28 pb-24 px-6" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-md">

        {/* Back link */}
        <Link
          href="/trailhead"
          className="inline-flex items-center gap-1.5 text-xs mb-8 transition-opacity hover:opacity-70"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Link>

        {/* Eyebrow */}
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          Hill Country Estate Law · Secure Checkout
        </p>

        {/* Header */}
        <h1
          className="mb-8 text-3xl font-bold tracking-tight"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          Complete your purchase
        </h1>

        {/* Checkout form */}
        <TrailheadCheckout leadId={lead} />

      </div>
    </main>
  )
}
