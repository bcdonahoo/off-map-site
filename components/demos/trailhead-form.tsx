'use client'

import { useState, FormEvent } from 'react'
import { TrailheadChecklist } from './trailhead-checklist'
import { CHECKLIST_CONFIG } from '@/lib/trailhead/checklist'

const CLIENT_CHECKLIST = CHECKLIST_CONFIG['texas-estate-plan-package'].client

type Step = 1 | 2 | 'outcome'

type FormData = {
  name: string
  email: string
  phone: string
  texasResident: '' | 'yes' | 'no'
  familySituation: '' | 'married_adult' | 'married_minor' | 'single' | 'widowed' | 'other'
  activeDispute: '' | 'yes' | 'no'
  urgency: '' | 'urgent' | 'standard'
}

type OutcomeState = {
  leadId: string
  fitLevel: 'high' | 'medium' | 'out_of_scope'
  outOfScopeReason?: string
  action?: 'purchased' | 'booked' | 'referred'
  reference?: string
  amount?: number
}

const INITIAL_FORM: FormData = {
  name: '',
  email: '',
  phone: '',
  texasResident: '',
  familySituation: '',
  activeDispute: '',
  urgency: '',
}

const FAMILY_OPTIONS: { value: FormData['familySituation']; label: string }[] = [
  { value: 'married_adult', label: 'Married — grown children' },
  { value: 'married_minor', label: 'Married — minor children' },
  { value: 'single', label: 'Single or divorced' },
  { value: 'widowed', label: 'Widowed' },
  { value: 'other', label: 'Other / not sure' },
]

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold mb-1.5" style={{ color: 'var(--color-text-primary)' }}>
      {children}
      {required && <span className="ml-1" style={{ color: 'var(--color-accent)' }}>*</span>}
    </label>
  )
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text-primary)',
      }}
    />
  )
}

function RadioGroup({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="flex gap-3">
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            style={{
              background: active ? 'var(--color-accent)' : 'var(--color-bg-surface)',
              color: active ? '#fff' : 'var(--color-text-primary)',
              border: `1px solid ${active ? 'var(--color-accent)' : 'var(--color-border)'}`,
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function SelectInput({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl px-4 py-2.5 text-sm outline-none transition-colors appearance-none"
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
        color: value ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
      }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} style={{ color: 'var(--color-text-primary)' }}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}

function StepIndicator({ step }: { step: Step }) {
  const current = step === 'outcome' ? 3 : step
  return (
    <div className="flex items-center gap-2 mb-6">
      {[1, 2, 3].map((n) => {
        const done = current > n
        const active = current === n
        return (
          <div key={n} className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors"
              style={{
                background: done || active ? 'var(--color-accent)' : 'var(--color-bg-surface)',
                color: done || active ? '#fff' : 'var(--color-text-muted)',
                border: `1px solid ${done || active ? 'var(--color-accent)' : 'var(--color-border)'}`,
              }}
            >
              {done ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5L4 7L8 3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : n}
            </div>
            {n < 3 && (
              <div
                className="w-8 h-px"
                style={{ background: current > n ? 'var(--color-accent)' : 'var(--color-border)' }}
              />
            )}
          </div>
        )
      })}
      <span className="ml-2 text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
        {step === 'outcome' ? 'Your options' : `Step ${step} of 2`}
      </span>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
      <path d="M2 7L5.5 10.5L12 4" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const INCLUDED = [
  'Last Will and Testament',
  'Durable Power of Attorney',
  'Medical Power of Attorney & HIPAA Release',
  'Directive to Physicians (Living Will)',
  'Transfer-on-Death Deed for Primary Residence',
  '60-Minute Attorney Consultation',
  'Two Rounds of Revisions within 90 Days',
]

export function TrailheadForm() {
  const [step, setStep] = useState<Step>(1)
  const [form, setForm] = useState<FormData>(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [outcome, setOutcome] = useState<OutcomeState | null>(null)
  const [error, setError] = useState<string | null>(null)

  function update<K extends keyof FormData>(field: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const step1Valid = form.name.trim() !== '' && form.email.trim() !== ''
  const step2Valid =
    form.texasResident !== '' &&
    form.familySituation !== '' &&
    form.activeDispute !== '' &&
    form.urgency !== ''

  async function handleQualify(e: FormEvent) {
    e.preventDefault()
    if (!step2Valid) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/trailhead/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'qualify', ...form }),
      })
      const data = await res.json() as OutcomeState & { error?: string }
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`)
      setOutcome(data)
      setStep('outcome')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleAction(action: 'purchase' | 'book' | 'handoff') {
    if (!outcome) return
    setActionLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/trailhead/form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action, leadId: outcome.leadId }),
      })
      const data = await res.json() as { action?: OutcomeState['action']; reference?: string; amount?: number; error?: string }
      if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`)
      setOutcome((prev) => prev ? { ...prev, ...data } : prev)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setActionLoading(false)
    }
  }

  function handleReset() {
    setStep(1)
    setForm(INITIAL_FORM)
    setOutcome(null)
    setError(null)
  }

  return (
    <div
      className="w-full rounded-2xl p-6"
      style={{
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
          style={{ background: 'var(--color-accent)', color: '#fff' }}
        >
          HC
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Hill Country Estate Law
          </div>
          <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Estate Planning Intake Form
          </div>
        </div>
      </div>

      <StepIndicator step={step} />

      {/* ── Step 1: Contact Info ─────────────────────────────────────────── */}
      {step === 1 && (
        <div>
          <h2
            className="text-lg font-bold mb-1"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Let&rsquo;s start with your contact info
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            We&rsquo;ll use this to send your documents or follow up after your consultation.
          </p>

          <div className="space-y-4">
            <div>
              <FieldLabel required>Full name</FieldLabel>
              <TextInput
                value={form.name}
                onChange={(v) => update('name', v)}
                placeholder="Jane Smith"
                required
              />
            </div>
            <div>
              <FieldLabel required>Email address</FieldLabel>
              <TextInput
                value={form.email}
                onChange={(v) => update('email', v)}
                placeholder="jane@example.com"
                type="email"
                required
              />
            </div>
            <div>
              <FieldLabel>Phone number <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>(optional)</span></FieldLabel>
              <TextInput
                value={form.phone}
                onChange={(v) => update('phone', v)}
                placeholder="(512) 555-0100"
                type="tel"
              />
            </div>
          </div>

          <button
            onClick={() => setStep(2)}
            disabled={!step1Valid}
            className="mt-6 w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-40"
            style={{ background: 'var(--color-accent)' }}
          >
            Continue →
          </button>
        </div>
      )}

      {/* ── Step 2: Situation ────────────────────────────────────────────── */}
      {step === 2 && (
        <form onSubmit={handleQualify}>
          <h2
            className="text-lg font-bold mb-1"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Tell us about your situation
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
            These answers help us match you with the right service.
          </p>

          <div className="space-y-5">
            <div>
              <FieldLabel required>Are you a Texas resident?</FieldLabel>
              <RadioGroup
                value={form.texasResident}
                onChange={(v) => update('texasResident', v as FormData['texasResident'])}
                options={[{ value: 'yes', label: 'Yes' }, { value: 'no', label: 'No' }]}
              />
            </div>

            <div>
              <FieldLabel required>What best describes your family?</FieldLabel>
              <SelectInput
                value={form.familySituation}
                onChange={(v) => update('familySituation', v as FormData['familySituation'])}
                options={FAMILY_OPTIONS.filter((o) => o.value !== '') as { value: string; label: string }[]}
                placeholder="Select one…"
              />
            </div>

            <div>
              <FieldLabel required>Are you currently involved in an estate-related legal dispute?</FieldLabel>
              <RadioGroup
                value={form.activeDispute}
                onChange={(v) => update('activeDispute', v as FormData['activeDispute'])}
                options={[{ value: 'no', label: 'No' }, { value: 'yes', label: 'Yes' }]}
              />
            </div>

            <div>
              <FieldLabel required>How soon do you need your documents?</FieldLabel>
              <RadioGroup
                value={form.urgency}
                onChange={(v) => update('urgency', v as FormData['urgency'])}
                options={[
                  { value: 'standard', label: 'Within a few months' },
                  { value: 'urgent', label: 'As soon as possible' },
                ]}
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm" style={{ color: '#e55' }}>
              {error}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-3 rounded-xl text-sm font-semibold transition-opacity hover:opacity-70"
              style={{
                color: 'var(--color-text-muted)',
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              ← Back
            </button>
            <button
              type="submit"
              disabled={!step2Valid || loading}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-40"
              style={{ background: 'var(--color-accent)' }}
            >
              {loading ? 'Checking your options…' : 'See my options →'}
            </button>
          </div>
        </form>
      )}

      {/* ── Outcome ──────────────────────────────────────────────────────── */}
      {step === 'outcome' && outcome && (
        <div>
          {/* Completed action: purchase */}
          {outcome.action === 'purchased' && (
            <div>
              <div className="text-center py-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto"
                  style={{ background: 'var(--color-accent)', opacity: 0.9 }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M6 14L11 19L22 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
                >
                  Purchase Confirmed
                </p>
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                  Texas Estate Plan Package
                </h3>
                <p className="text-3xl font-bold mb-3" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                  ${outcome.amount?.toLocaleString()}
                </p>
                <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  Confirmation #{outcome.reference}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Your documents will be ready within 10 business days.
                </p>
              </div>
              <div className="mt-4">
                <TrailheadChecklist items={CLIENT_CHECKLIST} />
              </div>
              <button
                onClick={handleReset}
                className="mt-4 text-xs px-4 py-2 rounded-lg transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text-muted)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', fontFamily: 'var(--font-mono)' }}
              >
                Start over
              </button>
            </div>
          )}

          {/* Completed action: booked */}
          {outcome.action === 'booked' && (
            <div>
              <div className="text-center py-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto"
                  style={{ background: 'var(--color-accent)', opacity: 0.9 }}
                >
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M6 14L11 19L22 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-2"
                  style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
                >
                  Consultation Requested
                </p>
                <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                  We&rsquo;ll be in touch within one business day.
                </h3>
                <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
                  Reference #{outcome.reference}
                </p>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  An attorney will reach out to schedule your consultation.
                </p>
              </div>
              <div className="mt-4">
                <TrailheadChecklist items={CLIENT_CHECKLIST} />
              </div>
              <button
                onClick={handleReset}
                className="mt-4 text-xs px-4 py-2 rounded-lg transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text-muted)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', fontFamily: 'var(--font-mono)' }}
              >
                Start over
              </button>
            </div>
          )}

          {/* Completed action: referred */}
          {outcome.action === 'referred' && (
            <div className="text-center py-4">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto"
                style={{ background: 'var(--color-accent)', opacity: 0.9 }}
              >
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path d="M6 14L11 19L22 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
              >
                Message Received
              </p>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                An attorney will follow up with you.
              </h3>
              <p className="text-sm mb-1" style={{ color: 'var(--color-text-muted)' }}>
                Reference #{outcome.reference}
              </p>
              <p className="text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                We&rsquo;ll reach out within one business day to point you in the right direction.
              </p>
              <button
                onClick={handleReset}
                className="text-xs px-4 py-2 rounded-lg transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text-muted)', background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', fontFamily: 'var(--font-mono)' }}
              >
                Start over
              </button>
            </div>
          )}

          {/* Outcome: high fit — not yet acted */}
          {!outcome.action && outcome.fitLevel === 'high' && (
            <div>
              <div
                className="rounded-xl px-4 py-3 mb-5 flex items-start gap-3"
                style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
              >
                <CheckIcon />
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    You look like a great fit.
                  </p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    Based on your answers, the Texas Estate Plan Package covers everything your family needs.
                  </p>
                </div>
              </div>

              <div
                className="rounded-xl p-4 mb-5"
                style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <p className="text-sm font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>
                      Texas Estate Plan Package
                    </p>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Everything included. Nothing extra.</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}>$2,000</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>flat fee · all-in</div>
                  </div>
                </div>
                <ul className="space-y-1.5">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckIcon />
                      <span className="text-xs" style={{ color: 'var(--color-text-primary)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Documents ready within 10 business days.
                </p>
              </div>

              {error && <p className="mb-4 text-sm" style={{ color: '#e55' }}>{error}</p>}

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => handleAction('purchase')}
                  disabled={actionLoading}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-40"
                  style={{ background: 'var(--color-accent)' }}
                >
                  {actionLoading ? 'Processing…' : 'Get started — $2,000'}
                </button>
                <button
                  onClick={() => handleAction('book')}
                  disabled={actionLoading}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-opacity disabled:opacity-40"
                  style={{
                    color: 'var(--color-text-primary)',
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  Book a consultation first
                </button>
              </div>
            </div>
          )}

          {/* Outcome: medium fit */}
          {!outcome.action && outcome.fitLevel === 'medium' && (
            <div>
              <div
                className="rounded-xl px-4 py-3 mb-5 flex items-start gap-3"
                style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                  <circle cx="7" cy="7" r="6" stroke="var(--color-accent)" strokeWidth="1.5" />
                  <path d="M7 4.5V7.5" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="7" cy="9.5" r="0.75" fill="var(--color-accent)" />
                </svg>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    Let&rsquo;s have a quick conversation first.
                  </p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    Your situation has some complexity. A short call with one of our attorneys will help us
                    understand exactly what you need before you commit to anything.
                  </p>
                </div>
              </div>

              <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                We offer a <strong style={{ color: 'var(--color-text-primary)' }}>free 30-minute consultation</strong> — no
                obligation. Most people find it helpful even if they&rsquo;re unsure what they need.
              </p>

              {error && <p className="mb-4 text-sm" style={{ color: '#e55' }}>{error}</p>}

              <button
                onClick={() => handleAction('book')}
                disabled={actionLoading}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-40"
                style={{ background: 'var(--color-accent)' }}
              >
                {actionLoading ? 'Booking…' : 'Request a free consultation'}
              </button>
            </div>
          )}

          {/* Outcome: out of scope */}
          {!outcome.action && outcome.fitLevel === 'out_of_scope' && (
            <div>
              <div
                className="rounded-xl px-4 py-3 mb-5 flex items-start gap-3"
                style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                  <circle cx="7" cy="7" r="6" stroke="var(--color-text-muted)" strokeWidth="1.5" />
                  <path d="M7 4.5V7.5" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="7" cy="9.5" r="0.75" fill="var(--color-text-muted)" />
                </svg>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    This may need a different kind of attorney.
                  </p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {outcome.outOfScopeReason ?? 'Your situation falls outside our flat-fee estate planning service.'}
                  </p>
                </div>
              </div>

              <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                We&rsquo;d be happy to have one of our attorneys give you a call and point you in the right
                direction — no charge, no obligation.
              </p>

              {error && <p className="mb-4 text-sm" style={{ color: '#e55' }}>{error}</p>}

              <button
                onClick={() => handleAction('handoff')}
                disabled={actionLoading}
                className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-40"
                style={{ background: 'var(--color-accent)' }}
              >
                {actionLoading ? 'Sending…' : 'Request an attorney callback'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--color-border)' }}>
        <span
          className="text-[10px]"
          style={{ color: 'var(--color-text-muted)', opacity: 0.4, fontFamily: 'var(--font-mono)' }}
        >
          Hill Country Estate Law · Not a substitute for legal advice
        </span>
      </div>
    </div>
  )
}
