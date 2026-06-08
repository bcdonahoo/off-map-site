import type { Metadata } from 'next'
import { TrailheadChecklist } from '@/components/demos/trailhead-checklist'
import { TrailheadAttorneyChecklist } from '@/components/demos/trailhead-attorney-checklist'
import { CHECKLIST_CONFIG } from '@/lib/trailhead/checklist'

export const metadata: Metadata = {
  title: 'Checklist Demo | Cedar & Vale Estate Law',
  robots: { index: false, follow: false },
}

const { client, attorney } = CHECKLIST_CONFIG['texas-estate-plan-package']

export default function ChecklistDemoPage() {
  return (
    <main
      className="min-h-screen pt-28 pb-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-5xl">

        {/* Eyebrow */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          Off-Map Demo · Cedar &amp; Vale Estate Law
        </p>

        {/* Hero */}
        <h1
          className="mb-2 text-4xl font-bold tracking-tight"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          Checklist System
        </h1>
        <p className="mb-10 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Two audiences, one shared model. The client sees what to gather. The attorney sees the full matter workflow. Neither sees the other&rsquo;s list.
        </p>

        {/* Side-by-side panels */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

          {/* Client panel */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                style={{ background: 'var(--color-accent)', color: '#fff', fontFamily: 'var(--font-mono)' }}
              >
                Client view
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Shown after booking or purchase
              </span>
            </div>
            <TrailheadChecklist items={client} offeringName="Texas Estate Plan Package" />
          </div>

          {/* Attorney panel */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest"
                style={{ background: 'var(--color-bg-surface)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', fontFamily: 'var(--font-mono)' }}
              >
                Attorney view
              </span>
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Private · Never shown to clients
              </span>
            </div>
            <TrailheadAttorneyChecklist items={attorney} />
          </div>

        </div>

        {/* Footer note */}
        <div
          className="mt-10 rounded-xl p-4 text-center"
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Cedar &amp; Vale Estate Law is a fictional firm created for demonstration purposes by{' '}
            <span style={{ color: 'var(--color-text-primary)' }}>Off-Map</span>. Both checklists are interactive — tap any item to mark it complete. State resets on refresh; persistence via Supabase is planned for V2.
          </p>
        </div>

      </div>
    </main>
  )
}
