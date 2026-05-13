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
  | { type: 'done'; text: string; toolCalls: ToolCall[]; messages: MessageParam[] }
  | { type: 'error'; error: string }

const GREETING = "Hi! I'm KLG's intake assistant. What deed or property issue can I help you with today?"

export function KlgDeedChat() {
  const [display, setDisplay] = useState<DisplayMessage[]>([
    { kind: 'assistant', content: GREETING, toolCalls: [] },
  ])
  const [apiMessages, setApiMessages] = useState<MessageParam[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  // Index into display where the current turn's items start (after user message)
  const turnStartRef = useRef<number>(0)

  useEffect(() => {
    const el = messagesRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [display])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const newApiMessages: MessageParam[] = [
      ...apiMessages,
      { role: 'user', content: text },
    ]

    setInput('')
    setLoading(true)

    // Snapshot how many items exist before this turn's user message
    setDisplay((prev) => {
      turnStartRef.current = prev.length + 1 // after the user message we're about to add
      return [...prev, { kind: 'user', content: text }, { kind: 'loading' }]
    })

    try {
      const res = await fetch('/api/klg_deed/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newApiMessages }),
      })

      // Non-2xx before streaming starts = JSON error body
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

          if (event.type === 'tool_start') {
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
      inputRef.current?.focus()
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
    inputRef.current?.focus()
  }

  return (
    <div
      className="w-full rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'var(--color-bg)',
        border: '1px solid var(--color-border)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        minHeight: 480,
        maxHeight: 640,
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
          KLG
        </div>
        <div className="min-w-0">
          <div className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Kelly Legal Group
          </div>
          <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
            Austin Property &amp; Real Estate Law
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Live</span>
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

      {/* Messages */}
      <div ref={messagesRef} className="flex-1 flex flex-col gap-3 py-4 overflow-y-auto">
        {display.map((msg, i) => {
          if (msg.kind === 'loading') {
            return <ChatBubble key={`loading-${i}`} role="assistant" content="" isTyping />
          }
          if (msg.kind === 'user') {
            return <ChatBubble key={i} role="user" content={msg.content} />
          }
          if (msg.kind === 'tool') {
            return <ToolCallPill key={i} label={msg.label} done={msg.done} />
          }
          return (
            <div key={i}>
              {msg.toolCalls.map((tc, j) => (
                <ToolCallPill key={j} label={tc.label} done />
              ))}
              <ChatBubble role="assistant" content={msg.content} />
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
          disabled={loading}
          placeholder="Describe your property issue…"
          rows={1}
          className="flex-1 resize-none rounded-xl px-4 py-2.5 text-sm leading-relaxed outline-none transition-colors"
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
            maxHeight: 120,
            overflowY: 'auto',
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
      <div className="shrink-0 px-4 pb-2.5 flex items-center justify-between">
        <span
          className="text-[10px]"
          style={{ color: 'var(--color-text-muted)', opacity: 0.4, fontFamily: 'var(--font-mono)' }}
        >
          Claude + KLG MCP · live test
        </span>
      </div>
    </div>
  )
}
