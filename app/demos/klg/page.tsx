import type { Metadata } from 'next'
import Link from 'next/link'
import { ChatDemo } from '@/components/demos/chat-demo'

export const metadata: Metadata = {
  title: 'KLG Demo — MCP-Powered Intake | Off-Map',
  description:
    "See how the Kelly Legal Group MCP server gives Claude direct access to KLG's service catalog, attorney availability, and property data — turning a chat window into a fully capable intake system.",
}

export default function KLGDemoPage() {
  return (
    <main
      className="min-h-screen pt-28 pb-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-3xl">

        {/* Breadcrumb */}
        <p
          className="mb-8 text-xs"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          <Link href="/" className="hover:opacity-70 transition-opacity">
            Off-Map
          </Link>
          {' / '}
          <span>Demo · Kelly Legal Group</span>
        </p>

        {/* Eyebrow */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          Client Demo · MCP Server
        </p>

        {/* Headline */}
        <h1
          className="mb-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          What it looks like when
          <br />
          Claude knows your business.
        </h1>

        {/* Description */}
        <p
          className="mb-4 max-w-xl text-base leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          The Kelly Legal Group MCP server gives Claude direct access to KLG's
          service catalog, attorney schedules, and Travis County parcel data.
          The result: an intake experience that closes simple matters
          automatically and routes complex cases directly to an attorney —
          without a single intake form or phone call.
        </p>

        {/* Toggle hint */}
        <p
          className="mb-10 text-sm"
          style={{ color: 'var(--color-text-muted)', opacity: 0.7 }}
        >
          Toggle between a simple case and a complex case to see both paths.
        </p>

        {/* Demo */}
        <ChatDemo />

        {/* What the MCP server does */}
        <div className="mt-16 max-w-xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            What the MCP server provides
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { icon: '⚖️', label: 'Texas property law context', desc: 'Adverse possession thresholds, Property Code citations, relevant case patterns' },
              { icon: '📋', label: 'KLG service catalog', desc: 'Pricing, deliverables, and turnaround times for every KLG offering' },
              { icon: '🗺️', label: 'Travis County parcel data', desc: 'Real-time parcel lookup by address for intake confirmation' },
              { icon: '📆', label: 'Attorney availability', desc: 'Live calendar access so Claude can book consultations directly in the chat' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-4"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-base">{item.icon}</span>
                  <span
                    className="text-xs font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {item.label}
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="mt-14 rounded-2xl p-8"
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            Build this for your firm
          </p>
          <h2
            className="mb-3 text-2xl font-bold"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Want an intake system like this?
          </h2>
          <p
            className="mb-6 text-sm leading-relaxed max-w-md"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Off-Map designs and builds MCP servers that connect Claude to your
            existing systems — CRM, calendars, knowledge bases, billing. Most
            initial builds ship in 2–3 weeks.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-accent)' }}
          >
            Book a Discovery Call →
          </Link>
        </div>

        <p className="mt-10 text-xs" style={{ color: 'var(--color-text-muted)', opacity: 0.4 }}>
          ← <Link href="/" className="underline hover:opacity-70 transition-opacity">Back to Off-Map</Link>
        </p>
      </div>
    </main>
  )
}
