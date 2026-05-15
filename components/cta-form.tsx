'use client'

import { useState } from 'react'
import { posthog } from '@/lib/posthog'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function CTAForm() {
  const [state, setState] = useState<FormState>('idle')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('submitting')

    posthog.capture('cta_form_submitted', {
      variant: 'form-first',
      location: 'cta-section',
      has_company: Boolean(company),
    })

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company: company || undefined,
          cta_variant: 'form-first',
          source: 'homepage-cta',
        }),
      })

      if (!res.ok) throw new Error('submit failed')
      setState('success')
    } catch {
      setState('error')
    }
  }

  if (state === 'success') {
    return (
      <div className="mx-auto max-w-xl text-center">
        <p
          className="mb-3 text-2xl font-bold"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          You are in.
        </p>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          Check your inbox in the next few minutes for the Audit link and intake.
        </p>
      </div>
    )
  }

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
        Drop your info and we will send the Audit link plus an intake form. You
        will have everything you need within one business day.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-md flex-col gap-3"
      >
        <input
          required
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
          }}
        />
        <input
          required
          type="email"
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
          }}
        />
        <input
          type="text"
          placeholder="Company (optional)"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
          }}
        />
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="mt-1 w-full rounded-xl py-3 text-sm font-semibold transition-opacity disabled:opacity-60"
          style={{
            background: 'var(--color-accent)',
            color: 'var(--color-bg)',
          }}
        >
          {state === 'submitting' ? 'Sending...' : 'Send Me the Audit →'}
        </button>
        {state === 'error' && (
          <p className="text-xs" style={{ color: '#f87171' }}>
            Something went wrong. Email us at{' '}
            <a href="mailto:hello@off-map.com" className="underline">
              hello@off-map.com
            </a>
          </p>
        )}
      </form>
    </div>
  )
}
