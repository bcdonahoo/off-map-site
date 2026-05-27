'use client'

import { useEffect, useRef, useState } from 'react'

const SESSION_KEY = 'trailhead_disclosure_v1'

export function TrailheadIntroModal() {
  const [isOpen, setIsOpen] = useState(false)
  const ctaRef = useRef<HTMLButtonElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') return
    setIsOpen(true)
  }, [])

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

  useEffect(() => {
    if (isOpen) ctaRef.current?.focus()
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') { close(); return }
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
        if (document.activeElement === first) { e.preventDefault(); last.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  function close() {
    sessionStorage.setItem(SESSION_KEY, 'true')
    setIsOpen(false)
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
            <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <p
          className="mb-3 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          Trailhead Demo · Off-Map
        </p>

        <h2
          id="intro-modal-heading"
          className="mb-4 text-2xl font-bold tracking-tight"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          Before we begin
        </h2>

        <p className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-primary)' }}>
          Hill Country Estate Law is a fictional firm. This is a working demo of the Trailhead GTM
          engine — an attorney-controlled intake and sales system for flat-fee legal services.
        </p>

        <div
          className="mb-5 rounded-xl p-4"
          style={{ background: 'var(--color-bg-light)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>
            Disclosure
          </p>
          <p className="text-xs leading-relaxed mb-2" style={{ color: 'var(--color-text-muted)' }}>
            This guided intake is for information gathering only. It does not provide legal advice,
            does not create an attorney-client relationship, and does not guarantee that the flat-fee
            package is appropriate for your situation.
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            A licensed attorney must review your information before confirming representation, scope,
            fees, or legal recommendations.
          </p>
        </div>

        <button
          ref={ctaRef}
          onClick={close}
          className="w-full py-3 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: 'var(--color-accent)' }}
        >
          I understand — start intake
        </button>

        <p className="mt-4 text-xs text-center" style={{ color: 'var(--color-text-muted)' }}>
          Built by Off-Map. Not legal advice.
        </p>
      </div>
    </div>
  )
}
