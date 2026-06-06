const deliverables = [
  {
    label: '60-minute working session',
    body: 'Live, recorded, yours to keep. We walk your GTM end to end. ICP, offer, pipeline, sales process.',
  },
  {
    label: 'The Off-Map Brief (72 hours)',
    body: 'One thing working. One thing broken. One move to make next. Written like an operator, not a consultant.',
  },
  {
    label: '15-minute follow-up at week 2',
    body: 'Did the move work? What did you learn? What is the next call to make? Built into the price.',
  },
]

export function AuditDeliverablePanel() {
  return (
    <div className="flex flex-col justify-center h-full p-8 md:p-12">
      <p
        className="mb-2 text-xs font-semibold uppercase tracking-widest"
        style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
      >
        The Off-Map Audit
      </p>
      <div className="mb-8 flex items-baseline gap-3">
        <span
          className="text-3xl font-extrabold"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          $350
        </span>
        <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
          5 days
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {deliverables.map(({ label, body }) => (
          <div
            key={label}
            className="rounded-xl p-4"
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
            }}
          >
            <p
              className="mb-1 text-sm font-semibold"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {label}
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
