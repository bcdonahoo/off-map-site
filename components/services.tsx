import Link from 'next/link'

const gtmStackIncludes = [
  'ICP definition and signal strategy',
  'Clay table build with waterfall enrichment',
  'AI research agent (Claude API)',
  'Slack-based review and approval workflow',
  'Instantly sequencing setup with dedicated domains',
  'Attribution dashboard and 60-day support window',
]

const retainerIncludes = [
  'Weekly enriched prospect lists',
  'AI-personalized sequence copy',
  'Human review gate before every send',
  'Dedicated sending infrastructure',
  'Friday performance reports',
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
          Two ways to work with Off-Map.
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1 — GTM Stack Build */}
          <div
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
              One-Time
            </span>
            <h3
              className="mb-3 text-2xl font-bold"
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-display)',
              }}
            >
              GTM Stack Build
            </h3>
            <p
              className="mb-6 text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              We design, build, and validate your entire outbound infrastructure
              in 30 days. You own it, your team runs it.
            </p>
            <ul className="mb-8 flex flex-col gap-2">
              {gtmStackIncludes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <span
                    className="mt-0.5 shrink-0 text-xs"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <p
                className="font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Starting at $3,500
              </p>
              <Link
                href="/services/gtm-stack"
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: 'var(--color-accent)' }}
              >
                Learn More →
              </Link>
            </div>
          </div>

          {/* Card 2 — Managed Retainer */}
          <div
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
                background: 'rgba(107,114,128,0.15)',
                color: 'var(--color-text-muted)',
              }}
            >
              Ongoing
            </span>
            <h3
              className="mb-3 text-2xl font-bold"
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-display)',
              }}
            >
              Managed GTM Retainer
            </h3>
            <p
              className="mb-6 text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Off-Map runs your outbound pipeline end-to-end. Enriched lists,
              personalized sequences, agentic research, weekly reporting. You
              show up for the calls.
            </p>
            <ul className="mb-8 flex flex-col gap-2">
              {retainerIncludes.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  <span
                    className="mt-0.5 shrink-0 text-xs"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between">
              <p
                className="font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                From $2,500/mo
              </p>
              <Link
                href="/services/managed-retainer"
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: 'var(--color-accent)' }}
              >
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
