'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type ChatMsg = { role: 'user' | 'assistant'; text: string }

type HandoffData = {
  service: string | null
  fit: 'none' | 'possible'
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

const SEQUENCE: SeqItem[] = [
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

export function TrailheadScriptedDemo() {
  const [runKey, setRunKey] = useState(0)
  const [messages, setMessages] = useState<ChatMsg[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [handoff, setHandoff] = useState<HandoffData>(initialHandoff)
  const [isDone, setIsDone] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages([])
    setIsTyping(false)
    setHandoff(initialHandoff)
    setIsDone(false)

    const timeouts: ReturnType<typeof setTimeout>[] = []
    let cumulative = 0

    for (const item of SEQUENCE) {
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
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* Left: animated chat */}
        <div
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            maxHeight: 500,
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

            <div ref={messagesEndRef} />
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

            {handoff.fit === 'possible' && (
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                  Likely Fit
                </p>
                <span
                  className="inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                  style={{ background: 'rgba(234,179,8,0.12)', color: '#b45309' }}
                >
                  Possible fit. Attorney review required.
                </span>
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
            Run the intake yourself →
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
