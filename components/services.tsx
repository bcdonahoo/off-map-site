import Link from 'next/link'

const services = [
  {
    badge: '5 Days',
    title: 'The Off-Map Audit',
    body: 'A 60-minute deep dive, a written brief in 72 hours, a 15-minute follow-up two weeks later. One thing working. One thing broken. One move to make next.',
    price: '$350',
    href: '/services/audit',
  },
  {
    badge: '6 Weeks',
    title: 'The Pipeline Sprint',
    body: 'We rebuild your GTM motion end to end. ICP, messaging, channel, sales process. You leave with a documented playbook your team can run.',
    price: '$7,500',
    href: '/services/sprint',
  },
  {
    badge: '3-Month Minimum',
    title: 'Fractional GTM',
    body: 'An embedded operator working alongside you on whatever the rate-limiting GTM lever is that month. Weekly working sessions, async access, the leverage of a senior hire without the headcount.',
    price: 'From $4,500/mo',
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
          Services
        </p>

        {/* Headline */}
        <h2
          className="mb-16 text-4xl font-bold md:text-5xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Three ways to work together.
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {services.map(({ badge, title, body, price, href }) => (
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
              <div className="flex items-center justify-between">
                <p
                  className="font-semibold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {price}
                </p>
                <Link
                  href={href}
                  className="text-sm font-medium transition-colors hover:opacity-80"
                  style={{ color: 'var(--color-accent)' }}
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
