const problems = [
  {
    label: 'Your reps are researchers, not sellers.',
    body: 'Most outbound teams spend 60–70% of their time on list building and email writing. That is not what you hired salespeople to do.',
  },
  {
    label: 'Personalization at scale does not exist yet. For you.',
    body: 'Generic sequences get ignored. Real personalization takes time no one has — unless the infrastructure is built correctly.',
  },
  {
    label: 'You are flying blind on what works.',
    body: 'Without proper attribution from signal to sequence to meeting to close, you are optimizing on gut feel. That is a slow way to iterate.',
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
          Traditional outbound is broken. Yours is probably no different.
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
