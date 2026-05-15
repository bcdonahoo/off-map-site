import type { Metadata } from 'next'
import { KlgDeedChat } from '@/components/demos/klg-deed-chat'

export const metadata: Metadata = {
  title: 'KLG Intake · Live Test | Off-Map',
  robots: { index: false, follow: false },
}

export default function KlgDeedPage() {
  return (
    <main
      className="min-h-screen pt-28 pb-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-2xl">

        {/* Header */}
        <div className="mb-8">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            Live Test · KLG Deed Intake MCP
          </p>
          <h1
            className="mb-3 text-3xl font-bold tracking-tight"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Deed Intake
          </h1>
          <p className="text-sm leading-relaxed max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
            Live conversation powered by Claude and the KLG MCP server. Handles disputes, transfers, spousal additions, trust transfers, name corrections, and more. Intake sessions are saved to Supabase; emails log to the console in dry-run mode.
          </p>
        </div>

        {/* Live chat */}
        <KlgDeedChat />

        {/* What gets tested */}
        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: 'Session persistence', desc: 'intake_sessions written to Supabase on each tool call' },
            { label: 'Matter routing', desc: 'Disputes, transfers, spousal additions, trust transfers, name corrections' },
            { label: 'Brief generation', desc: 'Structured attorney brief logged to console (dry-run)' },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl p-4"
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                {item.label}
              </p>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
