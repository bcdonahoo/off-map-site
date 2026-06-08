'use client'

import { useState, useRef, useEffect, FormEvent } from 'react'
import { ChatBubble } from './chat-bubble'
import { ToolCallPill } from './tool-call-pill'
import type { MessageParam } from '@anthropic-ai/sdk/resources/messages'

type ToolCall = { name: string; label: string }

type DisplayMessage =
  | { kind: 'user'; content: string }
  | { kind: 'assistant'; content: string; toolCalls: ToolCall[] }
  | { kind: 'tool'; label: string; done: boolean }
  | { kind: 'loading' }

type HandoffFit = 'none' | 'standard' | 'possible' | 'outside'

type HandoffData = {
  fit: HandoffFit
  keyFacts: string[]
  nextStep: string | null
}

const initialHandoff: HandoffData = { fit: 'none', keyFacts: [], nextStep: null }

type SSEEvent =
  | { type: 'tool_start'; label: string }
  | { type: 'tool_done'; label: string }
  | { type: 'checkout_redirect'; url: string }
  | { type: 'booking_data'; reference: string }
  | { type: 'handoff_update'; fit: HandoffFit; keyFacts: string[]; nextStep: string | null }
  | { type: 'done'; text: string; toolCalls: ToolCall[]; messages: MessageParam[] }
  | { type: 'error'; error: string }

const GREETING =
  "Hi! I'm here to help you think through estate planning for your family. What brings you here today?"

export function TrailheadChat() {
  const [display, setDisplay] = useState<DisplayMessage[]>([
    { kind: 'assistant', content: GREETING, toolCalls: [] },
  ])
  const [apiMessages, setApiMessages] = useState<MessageParam[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null)
  const [bookingData, setBookingData] = useState<{ reference: string } | null>(null)
  const [handoff, setHandoff] = useState<HandoffData>(initialHandoff)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const turnStartRef = useRef<number>(0)
  const hasInteracted = useRef(false)

  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [display])

  // Re-focus input after response lands, but only after first interaction
  // (not on mount — prevents the browser scrolling to the chat on page load)
  useEffect(() => {
    if (!loading && hasInteracted.current) inputRef.current?.focus()
  }, [loading])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const newApiMessages: MessageParam[] = [
      ...apiMessages,
      { role: 'user', content: text },
    ]

    hasInteracted.current = true
    setInput('')
    setLoading(true)

    setDisplay((prev) => {
      turnStartRef.current = prev.length + 1
      return [...prev, { kind: 'user', content: text }, { kind: 'loading' }]
    })

    try {
      const res = await fetch('/api/trailhead/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newApiMessages }),
      })

      if (!res.ok) {
        const data = await res.json() as { error?: string }
        throw new Error(data.error ?? `HTTP ${res.status}`)
      }

      const reader = res.body!.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() ?? ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          let event: SSEEvent
          try { event = JSON.parse(line.slice(6)) } catch { continue }

          if (event.type === 'checkout_redirect') {
            setCheckoutUrl(event.url)
            setTimeout(() => { window.location.href = event.url }, 1800)
          } else if (event.type === 'tool_start') {
            setDisplay((prev) => [
              ...prev.filter((m) => m.kind !== 'loading'),
              { kind: 'tool', label: event.label, done: false },
              { kind: 'loading' },
            ])
          } else if (event.type === 'tool_done') {
            setDisplay((prev) =>
              prev.map((m) =>
                m.kind === 'tool' && m.label === event.label && !m.done
                  ? { ...m, done: true }
                  : m
              )
            )
          } else if (event.type === 'booking_data') {
            setBookingData({ reference: event.reference })
          } else if (event.type === 'handoff_update') {
            setHandoff({ fit: event.fit, keyFacts: event.keyFacts, nextStep: event.nextStep })
          } else if (event.type === 'done') {
            setApiMessages(event.messages)
            setDisplay((prev) => [
              ...prev.slice(0, turnStartRef.current),
              { kind: 'assistant', content: event.text, toolCalls: event.toolCalls },
            ])
          } else if (event.type === 'error') {
            throw new Error(event.error)
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      setDisplay((prev) => [
        ...prev.slice(0, turnStartRef.current),
        { kind: 'assistant', content: `⚠ ${msg}`, toolCalls: [] },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as FormEvent)
    }
  }

  function handleReset() {
    setDisplay([{ kind: 'assistant', content: GREETING, toolCalls: [] }])
    setApiMessages([])
    setInput('')
    setCheckoutUrl(null)
    setBookingData(null)
    setHandoff(initialHandoff)
    inputRef.current?.focus()
  }

  const hasHandoffData = handoff.fit !== 'none' || handoff.keyFacts.length > 0

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

      {/* Left: chat */}
      <div className="relative">
        {/* Checkout redirect overlay */}
        {checkoutUrl && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl p-8 text-center"
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mb-5"
              style={{ background: 'var(--color-accent)', opacity: 0.9 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" fill="#fff" />
              </svg>
            </div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-2"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
            >
              Taking you to checkout
            </p>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Redirecting to secure payment page…
            </p>
          </div>
        )}

        <div
          className="w-full rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: 'var(--color-bg)',
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            maxHeight: 640,
            opacity: checkoutUrl ? 0 : 1,
            pointerEvents: checkoutUrl ? 'none' : undefined,
          }}
        >
          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3 shrink-0"
            style={{ borderBottom: '1px solid var(--color-border)' }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold tracking-tight shrink-0"
              style={{ background: 'var(--color-accent)', color: '#fff' }}
            >
              HC
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Cedar &amp; Vale Estate Law
              </div>
              <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
                Estate Planning · Demo Firm
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {bookingData ? 'Consultation booked' : 'Available now'}
              </span>
              <button
                onClick={handleReset}
                className="ml-2 text-xs px-2 py-1 rounded-lg transition-opacity hover:opacity-70"
                style={{
                  color: 'var(--color-text-muted)',
                  background: 'var(--color-bg-light)',
                  border: '1px solid var(--color-border)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* Booking confirmation banner */}
          {bookingData && (
            <div
              className="shrink-0 px-4 py-2.5 flex items-center gap-3"
              style={{
                background: 'var(--color-bg-surface)',
                borderBottom: '1px solid var(--color-border)',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                <path
                  d="M2 7L5.5 10.5L12 4"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="min-w-0">
                <span className="text-xs font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                  Consultation request received
                </span>
                <span className="text-xs ml-2" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
                  #{bookingData.reference}
                </span>
              </div>
            </div>
          )}

          {/* Messages */}
          <div ref={messagesRef} className="flex flex-col gap-3 py-4 overflow-y-auto" style={{ flex: '1 1 auto', minHeight: 0 }}>
            {display.map((msg, i) => {
              if (msg.kind === 'loading') {
                return <ChatBubble key={`loading-${i}`} role="assistant" content="" isTyping initials="HC" />
              }
              if (msg.kind === 'user') {
                return <ChatBubble key={i} role="user" content={msg.content} initials="HC" />
              }
              if (msg.kind === 'tool') {
                return <ToolCallPill key={i} label={msg.label} done={msg.done} />
              }
              return (
                <div key={i}>
                  {msg.toolCalls.map((tc, j) => (
                    <ToolCallPill key={j} label={tc.label} done />
                  ))}
                  <ChatBubble role="assistant" content={msg.content} initials="HC" />
                </div>
              )
            })}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="shrink-0 flex items-end gap-2 px-4 py-3"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe your situation or ask a question…"
              rows={1}
              className="flex-1 resize-none rounded-xl px-4 py-2.5 text-sm leading-relaxed outline-none transition-colors"
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
                maxHeight: 120,
                overflowY: 'auto',
                opacity: loading ? 0.5 : 1,
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity disabled:opacity-40"
              style={{ background: 'var(--color-accent)' }}
            >
              Send
            </button>
          </form>

          {/* Footer */}
          <div className="shrink-0 px-4 pb-2.5">
            <span
              className="text-[10px]"
              style={{ color: 'var(--color-text-muted)', opacity: 0.4, fontFamily: 'var(--font-mono)' }}
            >
              AI assistant · Cedar &amp; Vale Estate Law · Not a substitute for legal advice
            </span>
          </div>
        </div>
      </div>

      {/* Right: attorney handoff panel */}
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
          {loading && hasHandoffData && (
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse shrink-0"
              style={{ background: 'var(--color-accent)' }}
            />
          )}
        </div>

        {!hasHandoffData && (
          <p className="text-xs" style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
            Intake in progress...
          </p>
        )}

        <div className="space-y-4 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
          {hasHandoffData && (
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                Requested Service
              </p>
              <p style={{ color: 'var(--color-text-primary)' }}>Flat-fee estate planning package</p>
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
                {handoff.keyFacts.map((f, i) => (
                  <li key={i} style={{ color: 'var(--color-text-primary)' }}>- {f}</li>
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
  )
}
