const problems = [
  {
    label: 'You are the rainmaker.',
    body: 'Every new client, every renewal, every referral flows through your relationships. You cannot delegate yourself.',
  },
  {
    label: 'The marketing the industry sells does not fit.',
    body: 'Generic SEO, bar association mixers, untrained associate outreach. The motion does not match how your clients actually find you.',
  },
  {
    label: 'Hiring is not the answer alone.',
    body: 'Associates take 18 months to ramp into business development. Paralegals can free your time, not your funnel. You need a system, not another headcount.',
  },
]

export function Problem() {
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
          What managing partners tell us
        </p>

        {/* Headline */}
        <h2
          className="mb-16 max-w-2xl text-4xl font-bold leading-tight md:text-5xl"
          style={{
            color: 'var(--color-text-dark)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Your firm grows when you work. That is the ceiling.
        </h2>

        {/* Three-column grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {problems.map(({ label, body }) => (
            <div key={label}>
              <p
                className="mb-3 font-semibold leading-snug"
                style={{ color: 'var(--color-text-dark)' }}
              >
                {label}
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
