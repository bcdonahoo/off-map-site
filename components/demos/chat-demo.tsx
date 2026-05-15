'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import script from '@/content/demos/klg-deed-dispute.json'
import { ChatBubble } from './chat-bubble'
import { ToolCallPill } from './tool-call-pill'

type ScriptMessage = (typeof script.scenarios)[number]['messages'][number]
type ScriptScenario = (typeof script.scenarios)[number]

type RenderedItem = {
  id: string
  role: 'user' | 'assistant' | 'tool_call'
  content: string
  label?: string
  isTyping: boolean
  isDone: boolean
}

type PlaybackStatus = 'idle' | 'playing' | 'complete'

function typingDuration(content: string): number {
  if (content.length < 80) return 1200
  if (content.length < 180) return 1800
  return 2400
}

function OutcomeCard({ scenario }: { scenario: ScriptScenario }) {
  const { outcome } = scenario

  if (outcome.type === 'paywall') {
    return (
      <div
        className="mx-4 mt-3 mb-1 rounded-2xl p-4"
        style={{
          background: 'var(--color-bg)',
          border: '2px solid var(--color-accent)',
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-base">📄</span>
          <span
            className="text-sm font-semibold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {outcome.title}
          </span>
        </div>
        <p
          className="text-xs mb-3 leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {outcome.description}
        </p>
        <div className="flex items-center justify-between">
          <span
            className="text-xl font-bold"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {'price' in outcome ? outcome.price : ''}
          </span>
          <button
            className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-accent)' }}
          >
            {outcome.cta}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="mx-4 mt-3 mb-1 rounded-2xl p-4"
      style={{
        background: 'var(--color-bg)',
        border: '2px solid var(--color-accent)',
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-base">📅</span>
        <span
          className="text-sm font-semibold"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {outcome.title}
        </span>
      </div>
      <p
        className="text-xs mb-3 leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {outcome.description}
      </p>
      {'slots' in outcome && (
        <div className="flex flex-col gap-1.5 mb-3">
          {(outcome as { slots: string[] }).slots.map((slot) => (
            <button
              key={slot}
              className="text-xs px-3 py-2 rounded-lg text-left transition-colors hover:opacity-80"
              style={{
                background: 'var(--color-bg-light)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
            >
              {slot}
            </button>
          ))}
        </div>
      )}
      <button
        className="w-full px-4 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: 'var(--color-accent)' }}
      >
        {outcome.cta}
      </button>
    </div>
  )
}

export function ChatDemo() {
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const [status, setStatus] = useState<PlaybackStatus>('idle')
  const [items, setItems] = useState<RenderedItem[]>([])
  const [showOutcome, setShowOutcome] = useState(false)

  const genRef = useRef(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const startPlayRef = useRef<() => void>(null!)
  const isFirstRender = useRef(true)

  const scenario = script.scenarios[scenarioIndex]

  const startPlay = useCallback(() => {
    genRef.current += 1
    const gen = genRef.current
    const msgs = script.scenarios[scenarioIndex].messages as ScriptMessage[]

    setItems([])
    setShowOutcome(false)
    setStatus('playing')

    function step(index: number) {
      if (genRef.current !== gen) return

      if (index >= msgs.length) {
        setTimeout(() => {
          if (genRef.current !== gen) return
          setShowOutcome(true)
          setStatus('complete')
        }, 800)
        return
      }

      const msg = msgs[index]

      setTimeout(() => {
        if (genRef.current !== gen) return

        if (msg.role === 'user') {
          setItems((prev) => [
            ...prev,
            { id: msg.id, role: 'user', content: msg.content ?? '', isTyping: false, isDone: false },
          ])
          step(index + 1)
        } else if (msg.role === 'tool_call') {
          setItems((prev) => [
            ...prev,
            {
              id: msg.id,
              role: 'tool_call',
              content: '',
              label: 'label' in msg ? msg.label : '',
              isTyping: false,
              isDone: false,
            },
          ])
          setTimeout(() => {
            if (genRef.current !== gen) return
            setItems((prev) =>
              prev.map((m) => (m.id === msg.id ? { ...m, isDone: true } : m))
            )
            step(index + 1)
          }, 1400)
        } else {
          setItems((prev) => [
            ...prev,
            { id: msg.id, role: 'assistant', content: msg.content ?? '', isTyping: true, isDone: false },
          ])
          setTimeout(() => {
            if (genRef.current !== gen) return
            setItems((prev) =>
              prev.map((m) => (m.id === msg.id ? { ...m, isTyping: false } : m))
            )
            step(index + 1)
          }, typingDuration(msg.content ?? ''))
        }
      }, msg.delayMs)
    }

    step(0)
  }, [scenarioIndex])

  // Keep ref in sync so intersection observer always calls latest version
  startPlayRef.current = startPlay

  // Auto-play once on first scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startPlayRef.current()
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    if (containerRef.current) observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Restart when scenario tab changes (skip first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    genRef.current += 1
    setItems([])
    setShowOutcome(false)
    setStatus('idle')
    const t = setTimeout(() => startPlayRef.current(), 250)
    return () => clearTimeout(t)
  }, [scenarioIndex])

  // Scroll to bottom as messages arrive
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [items, showOutcome])

  // Cancel timeouts on unmount
  useEffect(() => {
    return () => { genRef.current += 1 }
  }, [])

  return (
    <div ref={containerRef} className="w-full max-w-[520px] mx-auto">
      {/* Scenario tabs */}
      <div className="flex gap-2 mb-3">
        {script.scenarios.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setScenarioIndex(i)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: i === scenarioIndex ? 'var(--color-accent)' : 'var(--color-bg-light)',
              color: i === scenarioIndex ? '#fff' : 'var(--color-text-muted)',
              border: `1px solid ${i === scenarioIndex ? 'var(--color-accent)' : 'var(--color-border)'}`,
            }}
          >
            {s.label}
            <span
              className="text-xs opacity-70 hidden sm:inline"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {s.sublabel}
            </span>
          </button>
        ))}
      </div>

      {/* Chat window */}
      <div
        className="rounded-2xl overflow-hidden flex flex-col"
        style={{
          background: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
      >
        {/* KLG header */}
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
              {script.meta.firm}
            </div>
            <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
              {script.meta.firmTagline}
            </div>
          </div>
          <div className="ml-auto flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
            <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
              Online
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex flex-col gap-3 py-4 overflow-y-auto" style={{ minHeight: 340, maxHeight: 460 }}>
          {items.length === 0 && status === 'idle' && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Starting demo…
              </p>
            </div>
          )}

          {items.map((item) => {
            if (item.role === 'tool_call') {
              return (
                <ToolCallPill
                  key={item.id}
                  label={item.label ?? ''}
                  done={item.isDone}
                />
              )
            }
            return (
              <ChatBubble
                key={item.id}
                role={item.role as 'user' | 'assistant'}
                content={item.content}
                isTyping={item.isTyping}
              />
            )
          })}

          {showOutcome && <OutcomeCard scenario={scenario} />}

          <div ref={scrollRef} className="h-0" />
        </div>

        {/* Footer */}
        <div
          className="px-4 py-2.5 flex items-center justify-between shrink-0"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <span
            className="text-xs"
            style={{
              color: 'var(--color-text-muted)',
              opacity: 0.5,
              fontFamily: 'var(--font-mono)',
            }}
          >
            Powered by Claude + KLG MCP Server
          </span>

          {status === 'complete' && (
            <button
              onClick={startPlay}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors hover:opacity-80"
              style={{
                color: 'var(--color-accent)',
                background: 'var(--color-accent-dim)',
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M5 1C2.79 1 1 2.79 1 5s1.79 4 4 4 4-1.79 4-4"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path d="M7 3.5V1H9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Replay
            </button>
          )}

          {status === 'playing' && (
            <span className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse inline-block"
                style={{ background: 'var(--color-accent)' }}
              />
              Live
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
