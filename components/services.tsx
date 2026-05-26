import Link from 'next/link'

const services = [
  {
    badge: 'Diagnostic',
    title: 'Practice Diagnostic',
    body: '60 minutes on the practice. Written brief in 5 business days. One follow-up call two weeks later. One thing working, one thing broken, one move to make next.',
    href: '/services/audit',
  },
  {
    badge: 'Engagement',
    title: 'Practice Growth Engagement',
    body: 'A defined project that rebuilds one part of your client acquisition. AI intake, productized offer build, marketing engine, or business development process. Scoped before we start. Documented systems your firm owns at the end.',
    href: '/services/sprint',
  },
  {
    badge: 'Embedded',
    title: 'Fractional Practice Operator',
    body: 'Embedded alongside you on whatever is rate-limiting practice growth this month. Weekly working sessions, async access. Senior-operator leverage without adding to payroll.',
    href: '/services/fractional',
  },
]

export function Services() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Eyebrow */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          How we work
        </p>

        {/* Headline */}
        <h2
          className="mb-16 text-4xl font-bold md:text-5xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Three ways to engage.
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map(({ badge, title, body, href }) => (
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
                className="mb-8 text-sm leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {body}
              </p>
              <div className="flex items-center justify-end">
                <Link
                  href={href}
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Learn more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
