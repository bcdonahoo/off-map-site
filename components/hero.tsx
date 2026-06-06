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
          For small law firms
        </p>

        {/* Headline */}
        <h1
          className="mb-6 text-5xl font-extrabold leading-tight tracking-tight md:text-7xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          Modern client acquisition for law practices.
        </h1>

        {/* Subhead */}
        <p
          className="mx-auto mb-10 max-w-[560px] text-lg leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Off-Map helps law firms grow matter volume without adding
          partners. We build the intake, marketing, and business development
          systems that fit how your practice actually operates.
        </p>

        {/* CTAs */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/book?source=homepage"
            className={
              buttonVariants({ size: 'lg' }) +
              ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
            }
            style={{ background: 'var(--color-accent)' }}
          >
            Book a conversation
          </Link>
          <Link
            href="/trailhead"
            className="inline-flex items-center justify-center rounded-lg border px-8 py-3 text-base font-semibold transition-opacity hover:opacity-80"
            style={{
              borderColor: 'var(--color-border-strong)',
              color: 'var(--color-text-primary)',
            }}
          >
            See the demo
          </Link>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {[
            'Built for managing partners of small firms',
            'Senior-led, built on AI leverage',
            'Focus areas: estate planning, probate, real estate, small business',
          ].map((signal) => (
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
          ))}
        </div>
      </div>
    </section>
  )
}
