'use client'

import { useEffect, useRef, useState } from 'react'

export function TrailheadIntroModal() {
  const [isOpen, setIsOpen] = useState(false)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Open after hydration to avoid SSR mismatch
  useEffect(() => {
    setIsOpen(true)
  }, [])

  // Body scroll lock with scrollbar-width compensation to prevent layout shift
  useEffect(() => {
    if (!isOpen) return
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [isOpen])

  // Focus CTA when modal opens
  useEffect(() => {
    if (isOpen) ctaRef.current?.focus()
  }, [isOpen])

  // Escape key + focus trap
  useEffect(() => {
    if (!isOpen) return

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab') return
      const modal = modalRef.current
      if (!modal) return
      const focusable = Array.from(
        modal.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  function close() {
    setIsOpen(false)
    // Return focus to chat textarea after the modal unmounts
    requestAnimationFrame(() => {
      document.querySelector<HTMLTextAreaElement>('textarea')?.focus()
    })
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: 'rgba(0, 0, 0, 0.5)' }}
      onClick={close}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="intro-modal-heading"
        className="relative w-full max-w-lg rounded-2xl p-8"
        style={{
          background: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close (X) */}
        <button
          aria-label="Close intro"
          onClick={close}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg transition-opacity hover:opacity-70"
          style={{
            color: 'var(--color-text-muted)',
            background: 'var(--color-bg-light)',
            border: '1px solid var(--color-border)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path
              d="M1 1L11 11M11 1L1 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Eyebrow */}
        <p
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          A demo from Off-Map
        </p>

        {/* Headline */}
        <h2
          id="intro-modal-heading"
          className="mb-4 text-2xl font-bold tracking-tight"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          What you&rsquo;re about to see
        </h2>

        {/* Body */}
        <p className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
          Hill Country Estate Law is a fictional firm. We built it to show what AI-powered sales and intake
          could look like for a real estate planning practice — flat-fee pricing, conversational
          qualification, instant booking, no front-desk friction.
        </p>
        <p className="mb-6 text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
          Try the chat the way one of your clients might. Tell it about a family situation, ask about
          pricing, see how it qualifies and routes. The whole experience is real — only the firm is
          invented.
        </p>

        {/* CTA */}
        <button
          ref={ctaRef}
          onClick={close}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--color-accent)' }}
        >
          Try the demo
        </button>

        {/* Footer note */}
        <p className="mt-4 text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
          Built by Off-Map. Not legal advice.
        </p>
      </div>
    </div>
  )
}
