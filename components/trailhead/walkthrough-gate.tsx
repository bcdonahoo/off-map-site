'use client'

import { useState } from 'react'

type GateState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; videoUrl: string }
  | { kind: 'error' }

export function WalkthroughGate() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<GateState>({ kind: 'idle' })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setState({ kind: 'submitting' })
    try {
      const res = await fetch('/api/trailhead/walkthrough', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setState({ kind: 'success', videoUrl: data.videoUrl ?? '' })
    } catch {
      setState({ kind: 'error' })
    }
  }

  if (state.kind === 'success') {
    return (
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid var(--color-border)' }}
      >
        {state.videoUrl ? (
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={state.videoUrl}
              title="Trailhead walkthrough"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 'none' }}
            />
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center py-20 px-6 text-center"
            style={{ background: 'var(--color-bg-surface)' }}
          >
            <div
              className="mb-4 w-12 h-12 rounded-full flex items-center justify-center"
              style={{ background: 'var(--color-accent-dim)' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 17A7 7 0 1010 3a7 7 0 000 14z" stroke="var(--color-accent)" strokeWidth="1.5" />
                <path d="M10 7v3l2 2" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
              Recording coming soon.
            </p>
            <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              We sent the link to your email. You will have access as soon as it is ready.
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className="rounded-2xl p-8"
      style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
    >
      <div className="mx-auto max-w-md">
        <p
          className="mb-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          5-minute walkthrough
        </p>
        <h3
          className="mb-3 text-xl font-bold"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          Watch how the full system works.
        </h3>
        <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          See all three scenarios: standard fit, possible fit with complexity flags, and outside
          scope. Watch the attorney handoff summary build in real time.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex gap-3 flex-wrap">
            <input
              type="email"
              required
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={state.kind === 'submitting'}
              className="flex-1 min-w-0 rounded-xl px-4 py-2.5 text-sm outline-none"
              style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border-strong)',
                color: 'var(--color-text-primary)',
              }}
            />
            <button
              type="submit"
              disabled={state.kind === 'submitting' || !email.includes('@')}
              className="shrink-0 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: 'var(--color-accent)' }}
            >
              {state.kind === 'submitting' ? 'Sending...' : 'Watch the walkthrough'}
            </button>
          </div>
          {state.kind === 'error' && (
            <p className="text-xs" style={{ color: '#b91c1c' }}>
              Something went wrong. Please try again.
            </p>
          )}
          <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            We will email you the walkthrough. No spam.
          </p>
        </form>
      </div>
    </div>
  )
}
