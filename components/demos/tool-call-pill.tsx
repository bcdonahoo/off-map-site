type ToolCallPillProps = {
  label: string
  done?: boolean
  variant?: 'inline' | 'panel' // 'panel' reserved for future side-panel upgrade
}

export function ToolCallPill({ label, done = false }: ToolCallPillProps) {
  return (
    <div
      className="flex items-center gap-2 my-1 ml-11 px-3 py-1.5 rounded-full w-fit transition-opacity duration-500"
      style={{
        background: 'var(--color-bg-light)',
        border: '1px solid var(--color-border)',
        opacity: done ? 0.45 : 1,
      }}
    >
      {done ? (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
          <path
            d="M2 5L4 7L8 3"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <span className="relative flex h-2 w-2 shrink-0">
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60"
            style={{ background: 'var(--color-accent)' }}
          />
          <span
            className="relative inline-flex h-2 w-2 rounded-full"
            style={{ background: 'var(--color-accent)' }}
          />
        </span>
      )}
      <span
        className="text-xs leading-none"
        style={{
          color: 'var(--color-text-muted)',
          fontFamily: 'var(--font-mono)',
        }}
      >
        {label}
      </span>
    </div>
  )
}
