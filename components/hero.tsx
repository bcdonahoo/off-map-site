import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(245,245,243,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-20 text-center">
        {/* Eyebrow */}
        <p
          className="mb-6 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'monospace' }}
        >
          GTM Engineering
        </p>

        {/* Headline */}
        <h1
          className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Pipeline built by machines.
          <br />
          Closed by you.
        </h1>

        {/* Subhead */}
        <p
          className="mx-auto mb-10 max-w-[560px] text-lg leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Off-Map designs and operates AI-powered outbound systems — Clay, n8n,
          Instantly, and the Anthropic API — that generate qualified meetings
          without your team doing manual research or outreach.
        </p>

        {/* CTA */}
        <div className="mb-12">
          <Link
            href="/book"
            className={
              buttonVariants({ size: 'lg' }) +
              ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
            }
            style={{ background: 'var(--color-accent)' }}
          >
            Book a Discovery Call →
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {['No paid ads', 'No manual research', 'Results in 30 days'].map(
            (signal) => (
              <div
                key={signal}
                className="flex items-center gap-2 text-sm"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M2 7L5.5 10.5L12 4"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {signal}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
