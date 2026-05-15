import Link from 'next/link'

const pillars = [
  {
    number: '01',
    label: 'Operator-led.',
    body: 'Every engagement is run by a senior GTM operator who has done the work, not a junior consultant with a deck.',
  },
  {
    number: '02',
    label: 'Strategy and execution.',
    body: 'We do not separate thinking from doing. We design the motion and help you run it.',
  },
  {
    number: '03',
    label: 'The map is yours to draw.',
    body: 'We do not sell playbooks. We help you build the one that fits.',
  },
]

export function ApproachPreview() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
          {/* Left */}
          <div>
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
            >
              The Approach
            </p>
            <h2
              className="mb-6 text-4xl font-bold md:text-5xl"
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-display)',
              }}
            >
              Built for the business in front of us.
            </h2>
            <p
              className="mb-8 text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Every Off-Map engagement starts with one question: what does the
              company actually need next? Not what the playbook says. Not what
              the last successful exit did. What works for the business operating
              here, in the market we are actually in. The deliverable is always
              the same: a motion you can run.
            </p>
            <Link
              href="/approach"
              className="text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-accent)' }}
            >
              Read more about the approach →
            </Link>
          </div>

          {/* Right: pillars */}
          <div className="flex flex-col gap-6">
            {pillars.map(({ number, label, body }) => (
              <div key={number} className="flex gap-4">
                <span
                  className="shrink-0 text-xs font-semibold"
                  style={{
                    color: 'var(--color-accent)',
                    fontFamily: 'var(--font-mono)',
                    paddingTop: '2px',
                  }}
                >
                  {number}
                </span>
                <div>
                  <p
                    className="mb-1 text-sm font-semibold"
                    style={{ color: 'var(--color-text-primary)' }}
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
