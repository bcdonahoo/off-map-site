import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

// TODO: Wire PostHog A/B test for hero tagline variants (flag: hero-tagline-variant).
// Variant A (current, locked): "AI redrew GTM. / We help you build for what's next."
// Variants B-D documented in SITE_COPY.md. Track CTA clicks to /services/audit and /book.

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
            'radial-gradient(circle, rgba(15,23,42,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 pt-24 pb-20 text-center">
        {/* Eyebrow */}
        <p
          className="mb-6 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          GTM Consulting
        </p>

        {/* Headline */}
        <h1
          className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          AI redrew GTM.
          <br />
          We help you build for what&apos;s next.
        </h1>

        {/* Subhead */}
        <p
          className="mx-auto mb-10 max-w-[560px] text-lg leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          The old GTM playbooks were written for a world that&apos;s gone, and
          nobody&apos;s written the new ones yet. Off-Map works with services firms
          and early-stage founders to build the pipelines, offers, and sales motions
          that fit the business you actually run, in the world we are actually in.
        </p>

        {/* Primary CTA */}
        <div className="mb-4">
          <Link
            href="/services/audit"
            className={
              buttonVariants({ size: 'lg' }) +
              ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
            }
            style={{ background: 'var(--color-accent)' }}
          >
            Start with a $350 Audit →
          </Link>
        </div>

        {/* Secondary CTA */}
        <div className="mb-12">
          <Link
            href="/book"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Or book a discovery call
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {['Senior operator', 'No copy-paste playbooks', 'Solo by design'].map(
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
