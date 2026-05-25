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

type SSEEvent =
  | { type: 'tool_start'; label: string }
  | { type: 'tool_done'; label: string }
  | { type: 'checkout_redirect'; url: string }
  | { type: 'booking_data'; reference: string }
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
                // Brief delay so the agent's closing message renders before navigating
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
    inputRef.current?.focus()
  }

  return (
    <div className="relative w-full">
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
              Hill Country Estate Law
            </div>
            <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
              Austin, Texas · Estate Planning
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
            AI assistant · Hill Country Estate Law · Not a substitute for legal advice
          </span>
        </div>
      </div>
    </div>
  )
}
