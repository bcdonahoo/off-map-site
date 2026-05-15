const problems = [
  {
    label: 'You are the GTM.',
    body: 'Every closed deal, every renewal, every referral runs through you. The business cannot grow past your calendar.',
  },
  {
    label: 'The playbook everyone hands you is for someone else’s business.',
    body: 'Hire a VP Sales. Run a generic outbound machine. Pour money into ads. None of it fits where you actually are.',
  },
  {
    label: 'You do not have time to figure it out alone.',
    body: 'Every month spent winging it is a month of revenue you cannot get back. The cost of doing nothing is higher than the cost of getting help.',
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
          The Problem
        </p>

        {/* Headline */}
        <h2
          className="mb-16 max-w-2xl text-4xl font-bold leading-tight md:text-5xl"
          style={{
            color: 'var(--color-text-dark)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Founder-led selling got you here. It will not get you there.
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
