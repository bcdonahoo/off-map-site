const metrics = [
  {
    value: '3×',
    label: 'Reply rate vs. generic sequences',
  },
  {
    value: '30 days',
    label: 'From zero to live outbound pipeline',
  },
  {
    value: '75+',
    label: 'Data sources in waterfall enrichment',
  },
]

export function Proof() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: 'var(--color-bg-light)' }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          By the Numbers
        </p>

        {/* Metrics */}
        <div className="mb-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          {metrics.map(({ value, label }) => (
            <div key={label}>
              <p
                className="mb-2 text-5xl font-extrabold md:text-6xl"
                style={{
                  color: 'var(--color-accent)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {value}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Body */}
        <p
          className="max-w-2xl text-sm leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          These numbers come from running the same system we build for clients —
          combining intent signals, Clay waterfall enrichment, and AI-generated
          research context, with a human review gate before anything goes out.
          The infrastructure is the product.
        </p>
      </div>
    </section>
  )
}
