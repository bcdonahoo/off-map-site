'use client'

import { useEffect } from 'react'
import { PositioningPanel } from './artifact-panels/positioning'
import { OffersPanel } from './artifact-panels/offers'
import { WhoWeWorkWithPanel } from './artifact-panels/who-we-work-with'
import { AuditDeliverablePanel } from './artifact-panels/audit-deliverable'
import { SUGGESTED_PROMPTS, type PanelId } from './mock-responses'

const PANELS = [
  { id: 0 as PanelId, Component: PositioningPanel },
  { id: 1 as PanelId, Component: OffersPanel },
  { id: 2 as PanelId, Component: WhoWeWorkWithPanel },
  { id: 3 as PanelId, Component: AuditDeliverablePanel },
]

// Cycle order matches SUGGESTED_PROMPTS order so idle loop answers questions in sequence
const CYCLE_ORDER = SUGGESTED_PROMPTS.map((p) => p.panelId)

const PANEL_QUESTION: Record<PanelId, string> = Object.fromEntries(
  SUGGESTED_PROMPTS.map((p) => [p.panelId, p.text])
) as Record<PanelId, string>

interface ArtifactPaneProps {
  activePanel: PanelId
  isPaused: boolean
  onPanelChange: (panel: PanelId) => void
}

export function ArtifactPane({ activePanel, isPaused, onPanelChange }: ArtifactPaneProps) {
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      const idx = CYCLE_ORDER.indexOf(activePanel)
      onPanelChange(CYCLE_ORDER[(idx + 1) % CYCLE_ORDER.length])
    }, 6000)
    return () => clearInterval(interval)
  }, [activePanel, isPaused, onPanelChange])

  const question = PANEL_QUESTION[activePanel]

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ background: 'var(--color-bg-light)' }}
    >
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(15,23,42,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Question header — shows which question this panel answers */}
      <div
        className="absolute left-0 right-0 top-0 z-20 flex items-center gap-2.5 px-5 py-2.5"
        style={{
          borderBottom: '1px solid var(--color-border)',
          background: 'var(--color-bg-light)',
        }}
      >
        <span
          className="shrink-0 rounded px-1.5 py-0.5 text-xs font-bold uppercase tracking-widest"
          style={{
            background: isPaused ? 'var(--color-bg-surface)' : 'var(--color-accent)',
            color: isPaused ? 'var(--color-text-muted)' : '#ffffff',
            border: isPaused ? '1px solid var(--color-border)' : 'none',
            fontFamily: 'var(--font-mono)',
            transition: 'background 0.3s, color 0.3s',
          }}
        >
          {isPaused ? 'A' : 'Q'}
        </span>
        <span
          className="truncate text-xs font-medium transition-opacity duration-300"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {question}
        </span>
      </div>

      {/* All panels rendered in DOM for crawlability; CSS controls visibility */}
      {PANELS.map(({ id, Component }) => (
        <div
          key={id}
          className="absolute inset-0 z-10 transition-opacity duration-500"
          style={{
            opacity: activePanel === id ? 1 : 0,
            pointerEvents: activePanel === id ? 'auto' : 'none',
            paddingTop: '41px',
          }}
          aria-hidden={activePanel !== id}
        >
          <Component />
        </div>
      ))}

      {/* Carousel dot indicators — only shown when idle (not paused) */}
      {!isPaused && (
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {CYCLE_ORDER.map((id) => (
            <button
              key={id}
              onClick={() => onPanelChange(id)}
              className="rounded-full transition-all duration-200"
              style={{
                width: activePanel === id ? '20px' : '6px',
                height: '6px',
                background:
                  activePanel === id
                    ? 'var(--color-accent)'
                    : 'var(--color-border-strong)',
              }}
              aria-label={PANEL_QUESTION[id]}
            />
          ))}
        </div>
      )}
    </div>
  )
}
