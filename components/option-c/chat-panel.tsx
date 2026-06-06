'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Message, SuggestedPrompt, PanelId } from './mock-responses'

interface ChatPanelProps {
  messages: Message[]
  suggestedPrompts: SuggestedPrompt[]
  onSendMessage: (text: string, panelId?: PanelId) => void
}

export function ChatPanel({ messages, suggestedPrompts, onSendMessage }: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('')
  const messagesScrollRef = useRef<HTMLDivElement>(null)
  const hasUserMessage = messages.some((m) => m.role === 'visitor')

  // Scroll within the chat container only — avoids leaking to page scroll on initial mount
  useEffect(() => {
    if (!messagesScrollRef.current) return
    messagesScrollRef.current.scrollTop = messagesScrollRef.current.scrollHeight
  }, [messages])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const text = inputValue.trim()
    if (!text) return
    setInputValue('')
    onSendMessage(text)
  }

  function handlePromptClick(prompt: SuggestedPrompt) {
    onSendMessage(prompt.text, prompt.panelId)
  }

  return (
    <div
      className="flex h-full flex-col overflow-hidden"
      style={{
        background: 'var(--color-bg)',
        borderRight: '1px solid var(--color-border)',
      }}
    >
      {/* Header */}
      <div
        className="shrink-0 px-6 py-4"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        <p
          className="text-base font-bold"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          Off-Map
        </p>
        <p
          className="mt-0.5 text-xs leading-snug"
          style={{ color: 'var(--color-text-muted)' }}
        >
          AI redrew GTM. We help you build for what&apos;s next.
        </p>
      </div>

      {/* Message history */}
      <div ref={messagesScrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'visitor' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className="max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed"
                style={
                  message.role === 'visitor'
                    ? {
                        background: 'var(--color-accent)',
                        color: '#ffffff',
                        borderBottomRightRadius: '4px',
                      }
                    : {
                        background: 'var(--color-bg-surface)',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-border)',
                        borderBottomLeftRadius: '4px',
                      }
                }
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested prompts — always in DOM for crawlability; hidden after first message */}
      <div
        className="shrink-0 px-4 pb-3"
        style={{ display: hasUserMessage ? 'none' : 'block' }}
      >
        <p
          className="mb-2 text-xs font-medium"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Suggested
        </p>
        <div className="flex flex-col gap-2">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt.text}
              onClick={() => handlePromptClick(prompt)}
              className="rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors hover:opacity-80"
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-primary)',
              }}
            >
              {prompt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div
        className="shrink-0 px-4 pb-4 pt-2"
        style={{ borderTop: '1px solid var(--color-border)' }}
      >
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about GTM..."
            className="flex-1 rounded-xl px-4 py-2.5 text-sm outline-none transition-all"
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-primary)',
            }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="rounded-xl px-4 py-2.5 text-sm font-semibold transition-opacity disabled:opacity-40"
            style={{
              background: 'var(--color-accent)',
              color: '#ffffff',
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  )
}
