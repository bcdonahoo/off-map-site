'use client'

import { useState } from 'react'

type TrailheadChecklistProps = {
  items: string[]
  offeringName?: string
}

export function TrailheadChecklist({ items, offeringName = 'Texas Estate Plan Package' }: TrailheadChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set())

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) {
        next.delete(i)
      } else {
        next.add(i)
      }
      return next
    })
  }

  const total = items.length
  const done = checked.size
  const allDone = done === total

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: 'var(--color-bg-surface)',
        border: '1px solid var(--color-border)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-0.5"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            What to gather
          </p>
          <h3
            className="text-sm font-bold"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            {offeringName}
          </h3>
        </div>
        <div className="shrink-0 text-right">
          <div
            className="text-lg font-bold tabular-nums"
            style={{
              color: allDone ? 'var(--color-accent)' : 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            {done}/{total}
          </div>
          <div className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
            {allDone ? 'ready!' : 'gathered'}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-1 rounded-full mb-4 overflow-hidden"
        style={{ background: 'var(--color-border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${(done / total) * 100}%`,
            background: 'var(--color-accent)',
          }}
        />
      </div>

      {/* Items */}
      <ul className="space-y-1">
        {items.map((item, i) => {
          const isChecked = checked.has(i)
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                className="w-full flex items-start gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-opacity-50"
                style={{
                  background: isChecked ? 'var(--color-bg-light)' : 'transparent',
                }}
              >
                {/* Checkbox icon */}
                <div
                  className="shrink-0 mt-0.5 w-4 h-4 rounded flex items-center justify-center transition-colors"
                  style={{
                    background: isChecked ? 'var(--color-accent)' : 'transparent',
                    border: `1.5px solid ${isChecked ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  }}
                >
                  {isChecked && (
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                      <path
                        d="M1.5 4.5L3.5 6.5L7.5 2.5"
                        stroke="#fff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {/* Label */}
                <span
                  className="text-sm leading-snug transition-colors"
                  style={{
                    color: isChecked ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                    textDecoration: isChecked ? 'line-through' : 'none',
                  }}
                >
                  {item}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      {allDone && (
        <div
          className="mt-4 rounded-xl px-4 py-3 text-center"
          style={{ background: 'var(--color-bg-light)', border: '1px solid var(--color-border)' }}
        >
          <p className="text-xs font-semibold" style={{ color: 'var(--color-accent)' }}>
            You&rsquo;re all set. Bring these to your consultation.
          </p>
        </div>
      )}

      <p className="mt-4 text-[10px]" style={{ color: 'var(--color-text-muted)', opacity: 0.5, fontFamily: 'var(--font-mono)' }}>
        Tap an item to mark it gathered. Progress resets on refresh.
      </p>
    </div>
  )
}
