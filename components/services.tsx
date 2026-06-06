const services = [
  {
    badge: 'Training',
    title: 'AI Training for Your Firm',
    body: 'Practical AI training focused on operational work, never legal substance. Email drafting, intake summaries, client communication, marketing content, internal SOPs, vendor evaluation. The result is a firm that knows where AI helps, where it does not, and how staff can use it responsibly.',
  },
  {
    badge: 'Fixed-Fee',
    title: 'Fixed-Fee Service Lines',
    body: 'Turn one repeatable service into a clear, fixed-fee offering. Off-Map builds the intake flow, eligibility screening, client education, follow-up process, and reporting so the firm can serve more clients without turning every matter into a custom one-off.',
  },
  {
    badge: 'Embedded',
    title: 'Fractional Practice Operations',
    body: 'Embedded fractional partner on intake, marketing operations, reporting, workflow automation, vendor selection, and AI adoption. Off-Map helps the firm decide what to automate, what to buy, what to ignore, and how to turn AI into measurable business results.',
  },
]

export function Services() {
  return (
    <section
      id="services"
      className="py-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          How we work
        </p>

        <h2
          className="mb-16 text-4xl font-bold md:text-5xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Three ways we work with you.
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map(({ badge, title, body }) => (
            <div
              key={title}
              className="group relative rounded-2xl p-8 transition-all duration-200"
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px rounded-t-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                style={{ background: 'var(--color-accent)' }}
              />
              <span
                className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
                style={{
                  background: 'var(--color-accent-dim)',
                  color: 'var(--color-accent)',
                }}
              >
                {badge}
              </span>
              <h3
                className="mb-3 text-2xl font-bold"
                style={{
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {title}
              </h3>
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
