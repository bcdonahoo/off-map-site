'use client'

import { useState } from 'react'
import type { ChecklistItem } from '@/lib/trailhead/checklist'
import { ATTORNEY_CATEGORY_LABELS } from '@/lib/trailhead/checklist'

type Props = {
  items: ChecklistItem[]
}

export function TrailheadAttorneyChecklist({ items }: Props) {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  function toggle(key: string) {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const done = checked.size
  const total = items.length

  // Group by category, preserving order of first appearance
  const categoryOrder: ChecklistItem['category'][] = []
  const grouped: Record<string, ChecklistItem[]> = {}
  for (const item of items) {
    if (!grouped[item.category]) {
      grouped[item.category] = []
      categoryOrder.push(item.category)
    }
    grouped[item.category].push(item)
  }

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
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Attorney view · Private
          </p>
          <h3
            className="text-sm font-bold"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Matter Workflow
          </h3>
        </div>
        <div className="shrink-0 text-right">
          <div
            className="text-lg font-bold tabular-nums"
            style={{
              color: done === total ? 'var(--color-accent)' : 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            {done}/{total}
          </div>
          <div className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
            {done === total ? 'complete' : 'done'}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div
        className="w-full h-1 rounded-full mb-5 overflow-hidden"
        style={{ background: 'var(--color-border)' }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${(done / total) * 100}%`,
            background: 'var(--color-text-muted)',
          }}
        />
      </div>

      {/* Grouped items */}
      <div className="space-y-5">
        {categoryOrder.map((cat) => {
          const catItems = grouped[cat]
          const catDone = catItems.filter((i) => checked.has(i.key)).length
          return (
            <div key={cat}>
              <div className="flex items-center justify-between mb-2">
                <p
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  {ATTORNEY_CATEGORY_LABELS[cat]}
                </p>
                <p
                  className="text-[10px] tabular-nums"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  {catDone}/{catItems.length}
                </p>
              </div>
              <ul className="space-y-1">
                {catItems.map((item) => {
                  const isChecked = checked.has(item.key)
                  return (
                    <li key={item.key}>
                      <button
                        type="button"
                        onClick={() => toggle(item.key)}
                        className="w-full flex items-start gap-3 rounded-lg px-2 py-2 text-left transition-colors"
                        style={{
                          background: isChecked ? 'var(--color-bg-light)' : 'transparent',
                        }}
                      >
                        <div
                          className="shrink-0 mt-0.5 w-4 h-4 rounded flex items-center justify-center transition-colors"
                          style={{
                            background: isChecked ? 'var(--color-text-muted)' : 'transparent',
                            border: `1.5px solid ${isChecked ? 'var(--color-text-muted)' : 'var(--color-border)'}`,
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
                        <span
                          className="text-xs leading-snug transition-colors"
                          style={{
                            color: isChecked ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
                            textDecoration: isChecked ? 'line-through' : 'none',
                          }}
                        >
                          {item.label}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>

      <p className="mt-5 text-[10px]" style={{ color: 'var(--color-text-muted)', opacity: 0.5, fontFamily: 'var(--font-mono)' }}>
        Not visible to clients · Tap to mark complete
      </p>
    </div>
  )
}
