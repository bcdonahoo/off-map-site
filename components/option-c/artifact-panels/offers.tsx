const comparison = [
  {
    trait: 'Owns a number',
    them: true,
    us: false,
    usLabel: 'Works on the highest-leverage move',
  },
  {
    trait: 'Manages headcount',
    them: true,
    us: false,
    usLabel: 'No headcount, no quota',
  },
  {
    trait: 'Hired like a VP Sales',
    them: true,
    us: false,
    usLabel: 'Engaged like a strategic operator',
  },
  {
    trait: 'Builds a motion that runs without you',
    them: false,
    us: true,
    usLabel: 'That is the whole goal',
  },
]

export function OffersPanel() {
  return (
    <div className="flex flex-col justify-center h-full p-8 md:p-12">
      <p
        className="mb-2 text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        Fractional GTM vs. Fractional CRO
      </p>
      <h2
        className="mb-6 text-xl font-bold leading-snug"
        style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
      >
        Not a part-time VP Sales.
      </h2>

      {/* Column headers */}
      <div className="mb-3 grid grid-cols-[1fr_80px_80px] items-center gap-2">
        <div />
        <p
          className="text-center text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'var(--color-text-muted)' }}
        >
          fCRO
        </p>
        <p
          className="text-center text-xs font-semibold uppercase tracking-wider"
          style={{ color: 'var(--color-accent)' }}
        >
          Off-Map
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {comparison.map(({ trait, them, us }) => (
          <div
            key={trait}
            className="grid grid-cols-[1fr_80px_80px] items-center gap-2 rounded-xl px-4 py-2.5"
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="text-xs leading-snug"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {trait}
            </p>
            <p className="text-center text-sm">
              {them ? (
                <span style={{ color: 'var(--color-text-muted)' }}>&#10003;</span>
              ) : (
                <span style={{ color: 'var(--color-border-strong)' }}>&#8212;</span>
              )}
            </p>
            <p className="text-center text-sm">
              {us ? (
                <span style={{ color: 'var(--color-accent)' }}>&#10003;</span>
              ) : (
                <span style={{ color: 'var(--color-border-strong)' }}>&#8212;</span>
              )}
            </p>
          </div>
        ))}
      </div>

      <p
        className="mt-4 text-xs leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      >
        Most engagements run 6 to 12 months. The goal is a motion that runs without us.
      </p>
    </div>
  )
}
