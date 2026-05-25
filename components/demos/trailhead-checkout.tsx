'use client'

import { useState } from 'react'
import { TrailheadChecklist } from './trailhead-checklist'
import { CHECKLIST_CONFIG } from '@/lib/trailhead/checklist'

const CLIENT_CHECKLIST = CHECKLIST_CONFIG['texas-estate-plan-package'].client
const PRICE = 2000

type Phase = 'form' | 'processing' | 'confirmed'

function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4 5V3.5a2 2 0 0 1 4 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

type Props = { leadId: string }

export function TrailheadCheckout({ leadId }: Props) {
  const [phase, setPhase] = useState<Phase>('form')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [nameOnCard, setNameOnCard] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [reference, setReference] = useState<string | null>(null)

  function formatCardNumber(v: string) {
    const digits = v.replace(/\D/g, '').slice(0, 16)
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }

  function formatExpiry(v: string) {
    const digits = v.replace(/\D/g, '').slice(0, 4)
    if (digits.length >= 3) return digits.slice(0, 2) + ' / ' + digits.slice(2)
    return digits
  }

  async function handlePay() {
    setPhase('processing')
    setError(null)
    try {
      const res = await fetch('/api/trailhead/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'purchase', leadId }),
      })
      const data = await res.json() as { reference?: string; error?: string }
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`)
      setReference(data.reference ?? null)
      setPhase('confirmed')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setPhase('form')
    }
  }

  const fieldStyle = {
    background: 'var(--color-bg-surface)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text-primary)',
  }

  const inputClass = 'w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors'

  if (phase === 'confirmed') {
    return (
      <div>
        {/* Confirmation header */}
        <div className="text-center py-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-5 mx-auto"
            style={{ background: 'var(--color-accent)', opacity: 0.9 }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M7 16L13 22L25 10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-2"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            Payment Confirmed
          </p>
          <h2
            className="text-2xl font-bold mb-1"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            You&rsquo;re all set.
          </h2>
          <p className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
            ${PRICE.toLocaleString()}
          </p>
          {reference && (
            <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
              Confirmation #{reference}
            </p>
          )}
          <p className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>
            Texas Estate Plan Package · Documents ready within 10 business days.
          </p>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            A licensed Texas attorney will reach out within 1 business day to begin drafting.
          </p>
        </div>

        {/* Checklist */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
            Start gathering these now
          </p>
          <TrailheadChecklist items={CLIENT_CHECKLIST} />
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Demo banner */}
      <div
        className="rounded-xl px-4 py-2.5 mb-6 flex items-center gap-2"
        style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
          <circle cx="7" cy="7" r="6" stroke="var(--color-accent)" strokeWidth="1.2" />
          <path d="M7 4.5V7.5" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="7" cy="9.5" r="0.6" fill="var(--color-accent)" />
        </svg>
        <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>Demo mode</span> — no real payment will be processed
        </p>
      </div>

      {/* Order summary */}
      <div
        className="rounded-xl p-4 mb-6"
        style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Texas Estate Plan Package
            </p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
              Hill Country Estate Law · Austin, TX
            </p>
          </div>
          <p
            className="text-xl font-bold shrink-0"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            $2,000
          </p>
        </div>
      </div>

      {/* Card form */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
            Card number
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
            placeholder="1234 5678 9012 3456"
            className={inputClass}
            style={fieldStyle}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
              Expiry
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="MM / YY"
              className={inputClass}
              style={fieldStyle}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
              CVC
            </label>
            <input
              type="text"
              inputMode="numeric"
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="123"
              className={inputClass}
              style={fieldStyle}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5" style={{ color: 'var(--color-text-muted)' }}>
            Name on card
          </label>
          <input
            type="text"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            placeholder="Jane Smith"
            className={inputClass}
            style={fieldStyle}
          />
        </div>
      </div>

      {error && (
        <p className="mb-4 text-sm" style={{ color: '#e55' }}>{error}</p>
      )}

      <button
        onClick={handlePay}
        disabled={phase === 'processing'}
        className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-60"
        style={{ background: 'var(--color-accent)' }}
      >
        {phase === 'processing' ? 'Processing…' : 'Pay $2,000'}
      </button>

      {/* Stripe badge */}
      <div className="mt-4 flex items-center justify-center gap-1.5">
        <LockIcon />
        <span className="text-[10px]" style={{ color: 'var(--color-text-muted)', opacity: 0.5, fontFamily: 'var(--font-mono)' }}>
          Secured by Stripe (demo)
        </span>
      </div>
    </div>
  )
}
