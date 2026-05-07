import Link from 'next/link'

const tools = [
  'Clay',
  'n8n',
  'Instantly',
  'Claude API',
  'Apify',
  'PostHog',
  'Attio',
  'Vercel',
]

export function StackPreview() {
  return (
    <section
      className="py-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          {/* Left */}
          <div>
            <p
              className="mb-4 text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
            >
              The Stack
            </p>
            <h2
              className="mb-6 text-4xl font-bold md:text-5xl"
              style={{
                color: 'var(--color-text-primary)',
                fontFamily: 'var(--font-display)',
              }}
            >
              Built on the right tools. Not the popular ones.
            </h2>
            <p
              className="mb-8 text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Every layer is chosen for composability, API access, and real-world
              performance. We publish our full stack with rationale — because
              opacity is a red flag in GTM Engineering.
            </p>
            <Link
              href="/stack"
              className="text-sm font-semibold transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-accent)' }}
            >
              See the full stack →
            </Link>
          </div>

          {/* Right — tool chips */}
          <div className="flex flex-wrap gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full px-4 py-2 text-sm font-medium"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-muted)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
