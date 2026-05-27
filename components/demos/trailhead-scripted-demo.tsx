'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type ChatMsg = { role: 'user' | 'assistant'; text: string }

type HandoffFit = 'none' | 'standard' | 'possible' | 'outside'

type HandoffData = {
  service: string | null
  fit: HandoffFit
  keyFacts: string[]
  flags: string[]
  nextStep: string | null
}

const initialHandoff: HandoffData = {
  service: null,
  fit: 'none',
  keyFacts: [],
  flags: [],
  nextStep: null,
}

type Action =
  | { kind: 'user-msg'; text: string }
  | { kind: 'show-typing' }
  | { kind: 'hide-typing'; text: string }
  | { kind: 'handoff'; patch: Partial<HandoffData> }
  | { kind: 'done' }

type SeqItem = { delay: number; action: Action }

// ── Easy: standard fit, no flags ──────────────────────────────────────────
const EASY_SEQUENCE: SeqItem[] = [
  { delay: 600, action: { kind: 'user-msg', text: "Hi, my husband and I have been meaning to put together a will. We have two adult kids and own our home in Cedar Park. Is this something you can help with?" } },
  { delay: 700, action: { kind: 'show-typing' } },
  { delay: 1800, action: { kind: 'hide-typing', text: "Hello. I can help figure out whether our flat-fee estate planning package is a fit for your family. Are both of you Texas residents?" } },
  { delay: 300, action: { kind: 'handoff', patch: { service: 'Texas flat-fee estate planning package', keyFacts: ['Two adult children', 'Primary residence in Cedar Park'] } } },
  { delay: 1600, action: { kind: 'user-msg', text: "Yes, we have been in Texas our whole lives. Both in Williamson County." } },
  { delay: 400, action: { kind: 'show-typing' } },
  { delay: 1500, action: { kind: 'hide-typing', text: "Good. Do either of you have children from a prior relationship, or any family member who receives government benefits?" } },
  { delay: 1800, action: { kind: 'user-msg', text: "No, this is our only marriage. Both kids are grown and doing well on their own." } },
  { delay: 500, action: { kind: 'show-typing' } },
  { delay: 1500, action: { kind: 'hide-typing', text: "Do either of you own any business interests or property outside of Texas?" } },
  { delay: 1800, action: { kind: 'user-msg', text: "No, just the house. My husband has a 401k through his employer but nothing else." } },
  { delay: 500, action: { kind: 'show-typing' } },
  { delay: 2000, action: { kind: 'hide-typing', text: "Based on what you have shared, this looks like a standard fit for our flat-fee package. No complexity flags came up. Would you like to schedule a consultation to confirm scope and get started?" } },
  { delay: 200, action: { kind: 'handoff', patch: { fit: 'standard', keyFacts: ['Married couple, both Texas residents (Williamson County)', 'Two adult children', 'Primary residence in Cedar Park', 'No business interests or out-of-state property'] } } },
  { delay: 1600, action: { kind: 'user-msg', text: "Yes, let's do that." } },
  { delay: 400, action: { kind: 'show-typing' } },
  { delay: 1400, action: { kind: 'hide-typing', text: "I will help you get that scheduled. The attorney will confirm scope, answer your questions, and get your documents underway." } },
  { delay: 300, action: { kind: 'handoff', patch: { nextStep: 'Schedule flat-fee scope confirmation call.' } } },
  { delay: 700, action: { kind: 'done' } },
]

// ── Medium: possible fit, 2 complexity flags ──────────────────────────────
const MEDIUM_SEQUENCE: SeqItem[] = [
  { delay: 600, action: { kind: 'user-msg', text: "Hi, my wife and I have been putting off getting an estate plan for years. We have two kids and own our home in Austin. Where do we start?" } },
  { delay: 700, action: { kind: 'show-typing' } },
  { delay: 1800, action: { kind: 'hide-typing', text: "Welcome. I can help figure out whether our flat-fee estate plan is a fit for your family. Are both of you Texas residents?" } },
  { delay: 300, action: { kind: 'handoff', patch: { service: 'Texas flat-fee estate planning package', keyFacts: ['Two children', 'Primary residence in Austin'] } } },
  { delay: 1600, action: { kind: 'user-msg', text: "Yes, both Texas residents. Been in Austin about 12 years." } },
  { delay: 400, action: { kind: 'show-typing' } },
  { delay: 1500, action: { kind: 'hide-typing', text: "Good. Do either of you have any family members with special needs, or children from a previous relationship?" } },
  { delay: 1800, action: { kind: 'user-msg', text: "Our younger daughter has Down syndrome. She receives some government benefits." } },
  { delay: 600, action: { kind: 'show-typing' } },
  { delay: 2000, action: { kind: 'hide-typing', text: "That is an important detail. When a beneficiary receives government benefits, a standard will can affect their eligibility. An attorney will need to evaluate whether a special needs trust should be included. Do you or your spouse own any business interests?" } },
  { delay: 200, action: { kind: 'handoff', patch: { flags: ['Special needs beneficiary receiving government benefits'] } } },
  { delay: 1800, action: { kind: 'user-msg', text: "I have a small LLC. Just a consulting business." } },
  { delay: 500, action: { kind: 'show-typing' } },
  { delay: 1800, action: { kind: 'hide-typing', text: "Noted. Business interests require attorney review as well. Based on what you have shared, this may be a fit for our flat-fee package, though your daughter's situation and the LLC will need attorney confirmation before scope is finalized. Would you like to schedule a consultation?" } },
  { delay: 300, action: { kind: 'handoff', patch: { fit: 'possible', flags: ['Special needs beneficiary receiving government benefits', 'Business ownership. LLC structure and assets require attorney review.'] } } },
  { delay: 1600, action: { kind: 'user-msg', text: "Yes, let's do that." } },
  { delay: 400, action: { kind: 'show-typing' } },
  { delay: 1400, action: { kind: 'hide-typing', text: "I will help you book a time. The attorney will review everything you have shared and confirm whether the flat-fee package covers your situation, or whether a different approach makes more sense." } },
  { delay: 300, action: { kind: 'handoff', patch: { keyFacts: ['Married couple, both Texas residents', 'Two children (one with special needs receiving government benefits)', 'Primary residence in Austin', 'Interested in wills, POAs, medical directive, TOD deed'], nextStep: 'Schedule paid consultation or scope confirmation call.' } } },
  { delay: 700, action: { kind: 'done' } },
]

// ── Difficult: likely outside flat-fee scope ──────────────────────────────
const DIFFICULT_SEQUENCE: SeqItem[] = [
  { delay: 600, action: { kind: 'user-msg', text: "I need to update my estate plan. I have kids from my first marriage and my current wife has kids from hers. We also have one together. My old will probably does not cover everything." } },
  { delay: 700, action: { kind: 'show-typing' } },
  { delay: 1800, action: { kind: 'hide-typing', text: "Welcome. I can help evaluate whether our flat-fee package is a fit. Are you and your current wife both Texas residents?" } },
  { delay: 300, action: { kind: 'handoff', patch: { service: 'Texas flat-fee estate planning package', keyFacts: ['Blended family with children from prior relationships'] } } },
  { delay: 1600, action: { kind: 'user-msg', text: "Yes, we live in San Antonio. But I do have a vacation cabin up in Colorado." } },
  { delay: 500, action: { kind: 'show-typing' } },
  { delay: 1800, action: { kind: 'hide-typing', text: "Noted. Out-of-state property typically requires separate ancillary documents and may fall outside our standard flat-fee scope. Do you have an existing trust, or any estate planning documents from a prior marriage?" } },
  { delay: 200, action: { kind: 'handoff', patch: { flags: ['Out-of-state property (Colorado) requires ancillary documents'] } } },
  { delay: 1800, action: { kind: 'user-msg', text: "I have a revocable living trust from 2009. Set it up in another state. I have never updated it." } },
  { delay: 600, action: { kind: 'show-typing' } },
  { delay: 2000, action: { kind: 'hide-typing', text: "An out-of-state trust that has not been reviewed recently will need attorney evaluation before we can determine scope. Do any of your beneficiaries have needs that would require special protections for their inheritance?" } },
  { delay: 200, action: { kind: 'handoff', patch: { flags: ['Out-of-state property (Colorado) requires ancillary documents', 'Existing out-of-state trust requires review and possible restatement'] } } },
  { delay: 1800, action: { kind: 'user-msg', text: "My son from my first marriage has struggled with addiction. I want to make sure he is protected but cannot spend through everything at once." } },
  { delay: 600, action: { kind: 'show-typing' } },
  { delay: 2200, action: { kind: 'hide-typing', text: "That is an important consideration. Protecting an inheritance from a beneficiary with substance use concerns typically requires a discretionary or spendthrift trust, which goes beyond standard document preparation. Based on what you have shared — blended family, out-of-state property, an existing trust to review, and a beneficiary requiring protective trust planning — this situation is likely outside our standard flat-fee scope. I would recommend a paid consultation so the attorney can assess your full situation before any scope is committed to." } },
  { delay: 300, action: { kind: 'handoff', patch: { fit: 'outside', flags: ['Out-of-state property (Colorado) requires ancillary documents', 'Existing out-of-state trust requires review and possible restatement', 'Beneficiary requiring protective or spendthrift trust planning'], keyFacts: ['Blended family with children from prior relationships', 'Primary residence in San Antonio', 'Vacation cabin in Colorado (out-of-state)'] } } },
  { delay: 1800, action: { kind: 'user-msg', text: "That makes sense. What would a consultation look like?" } },
  { delay: 400, action: { kind: 'show-typing' } },
  { delay: 1600, action: { kind: 'hide-typing', text: "The attorney will review everything you have shared, explain your options, and give you a clear picture of what planning you actually need before any fee is quoted. I will help you get that scheduled." } },
  { delay: 300, action: { kind: 'handoff', patch: { nextStep: 'Schedule paid attorney consultation. Flat-fee scope unlikely. Custom engagement probable.' } } },
  { delay: 700, action: { kind: 'done' } },
]

type ScenarioId = 'easy' | 'medium' | 'difficult'

const SCENARIOS = [
  {
    id: 'easy' as ScenarioId,
    label: 'Standard fit',
    description: 'A married couple in Williamson County. Two adult children, single home, no business interests. Clean intake, no flags.',
    sequence: EASY_SEQUENCE,
  },
  {
    id: 'medium' as ScenarioId,
    label: 'Possible fit',
    description: 'A married couple in Austin with a special needs beneficiary on government benefits and a small LLC. Two complexity flags surface.',
    sequence: MEDIUM_SEQUENCE,
  },
  {
    id: 'difficult' as ScenarioId,
    label: 'Outside scope',
    description: 'A blended family in San Antonio with out-of-state property, an old out-of-state trust, and a beneficiary requiring protective planning.',
    sequence: DIFFICULT_SEQUENCE,
  },
] as const

export function TrailheadScriptedDemo({ compact = false }: { compact?: boolean }) {
  const [activeScenario, setActiveScenario] = useState<ScenarioId>(compact ? 'medium' : 'easy')
  const [runKey, setRunKey] = useState(0)
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [handoff, setHandoff] = useState<HandoffData>(initialHandoff)
  const [isDone, setIsDone] = useState(false)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  // Ref so the effect always reads the latest scenario without listing it as a dep
  const activeScenarioRef = useRef<ScenarioId>(compact ? 'medium' : 'easy')

  function selectScenario(id: ScenarioId) {
    activeScenarioRef.current = id
    setActiveScenario(id)
    setRunKey((k) => k + 1)
  }

  useEffect(() => {
    setMessages([])
    setIsTyping(false)
    setHandoff(initialHandoff)
    setIsDone(false)

    const seq = SCENARIOS.find((s) => s.id === activeScenarioRef.current)!.sequence
    const timeouts: ReturnType<typeof setTimeout>[] = []
    let cumulative = 0

    for (const item of seq) {
      cumulative += item.delay
      const d = cumulative
      const a = item.action
      timeouts.push(
        setTimeout(() => {
          if (a.kind === 'user-msg') {
            setMessages((prev) => [...prev, { role: 'user', text: a.text }])
          } else if (a.kind === 'show-typing') {
            setIsTyping(true)
          } else if (a.kind === 'hide-typing') {
            setIsTyping(false)
            setMessages((prev) => [...prev, { role: 'assistant', text: a.text }])
          } else if (a.kind === 'handoff') {
            setHandoff((prev) => ({ ...prev, ...a.patch }))
          } else if (a.kind === 'done') {
            setIsDone(true)
          }
        }, d)
      )
    }

    return () => timeouts.forEach(clearTimeout)
  }, [runKey])

  useEffect(() => {
    const el = messagesContainerRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, isTyping])

  const scenario = SCENARIOS.find((s) => s.id === activeScenario)!

  return (
    <div>
      {/* Scenario tabs — hidden in compact mode */}
      {!compact && (
      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div
          className="flex gap-1 p-1 rounded-xl"
          style={{ background: 'var(--color-bg-light)', border: '1px solid var(--color-border)' }}
        >
          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => selectScenario(s.id)}
              className="rounded-lg px-4 py-1.5 text-xs font-semibold transition-all"
              style={
                activeScenario === s.id
                  ? {
                      background: 'var(--color-bg)',
                      color: 'var(--color-text-primary)',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                    }
                  : {
                      color: 'var(--color-text-muted)',
                      background: 'transparent',
                    }
              }
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
      )}

      <p
        className="mb-6 text-xs leading-relaxed"
        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
      >
        {scenario.description}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* Left: animated chat */}
        <div
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            maxHeight: compact ? 360 : 500,
            background: 'var(--color-bg)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{ borderBottom: '1px solid var(--color-border)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
              style={{ background: 'var(--color-accent)', color: '#fff' }}
            >
              HC
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Hill Country Estate Law
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Estate Planning</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Available now</span>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={messagesContainerRef}
            className="flex flex-col gap-3 py-4 overflow-y-auto"
            style={{ flex: '1 1 auto', minHeight: 0 }}
          >
            {messages.map((msg, i) =>
              msg.role === 'user' ? (
                <div key={i} className="flex justify-end px-4">
                  <div
                    className="max-w-[78%] rounded-2xl rounded-br-sm px-4 py-2.5 text-sm leading-relaxed"
                    style={{ background: 'var(--color-accent)', color: '#fff' }}
                  >
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex items-start gap-2 px-4">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                    style={{ background: 'var(--color-accent)', color: '#fff' }}
                  >
                    HC
                  </div>
                  <div
                    className="max-w-[78%] rounded-2xl rounded-bl-sm px-4 py-2.5 text-sm leading-relaxed"
                    style={{
                      background: 'var(--color-bg-surface)',
                      color: 'var(--color-text-primary)',
                      border: '1px solid var(--color-border)',
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              )
            )}

            {isTyping && (
              <div className="flex items-start gap-2 px-4">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5"
                  style={{ background: 'var(--color-accent)', color: '#fff' }}
                >
                  HC
                </div>
                <div
                  className="rounded-2xl rounded-bl-sm px-4 py-3"
                  style={{
                    background: 'var(--color-bg-surface)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div className="flex gap-1 items-center h-4">
                    {[0, 150, 300].map((d) => (
                      <span
                        key={d}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{
                          background: 'var(--color-text-muted)',
                          animationDelay: `${d}ms`,
                          animationDuration: '1s',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Right: handoff summary */}
        <div
          className="rounded-2xl p-6 lg:sticky lg:top-24"
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            minHeight: 280,
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <p
              className="text-[10px] font-bold uppercase tracking-widest"
              style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              Attorney Handoff
            </p>
            {!isDone && handoff.service && (
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
                style={{ background: 'var(--color-accent)' }}
              />
            )}
          </div>

          {!handoff.service && (
            <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
              Intake in progress...
            </p>
          )}

          <div className="space-y-4 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
            {handoff.service && (
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  Requested Service
                </p>
                <p style={{ color: 'var(--color-text-primary)' }}>{handoff.service}</p>
              </div>
            )}

            {handoff.fit !== 'none' && (
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  Flat Fee Fit
                </p>
                {handoff.fit === 'standard' && (
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ background: 'rgba(34,197,94,0.12)', color: '#15803d' }}
                  >
                    Standard package fit.
                  </span>
                )}
                {handoff.fit === 'possible' && (
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ background: 'rgba(234,179,8,0.12)', color: '#b45309' }}
                  >
                    Possible fit. Attorney review required.
                  </span>
                )}
                {handoff.fit === 'outside' && (
                  <span
                    className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                    style={{ background: 'rgba(239,68,68,0.12)', color: '#b91c1c' }}
                  >
                    Likely outside flat-fee scope.
                  </span>
                )}
              </div>
            )}

            {handoff.keyFacts.length > 0 && (
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  Key Facts
                </p>
                <ul className="space-y-0.5">
                  {handoff.keyFacts.map((f) => (
                    <li key={f} style={{ color: 'var(--color-text-primary)' }}>- {f}</li>
                  ))}
                </ul>
              </div>
            )}

            {handoff.flags.length > 0 && (
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#b45309' }}>
                  Complexity Flags
                </p>
                <ul className="space-y-0.5">
                  {handoff.flags.map((f) => (
                    <li key={f} style={{ color: '#b45309' }}>- {f}</li>
                  ))}
                </ul>
              </div>
            )}

            {handoff.nextStep && (
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  Suggested Next Step
                </p>
                <p style={{ color: 'var(--color-text-primary)' }}>{handoff.nextStep}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA after sequence completes */}
      {isDone && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <Link
            href="#live-intake"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-accent)' }}
          >
            Run the intake yourself
          </Link>
          <button
            onClick={() => setRunKey((k) => k + 1)}
            className="text-xs transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Replay ↺
          </button>
        </div>
      )}
    </div>
  )
}
