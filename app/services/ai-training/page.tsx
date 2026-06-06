import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Guardrail } from '@/components/guardrail'

export const metadata: Metadata = {
  title: 'AI Training for Your Firm | Off-Map',
  description:
    'Practical AI training for law firm staff focused on operational work, never legal substance. Build real skills your team can use immediately.',
}

const deliverables = [
  'Practical skills applied to your firm\'s actual daily tasks',
  'A clear picture of where AI helps and where it creates risk',
  'Staff who can evaluate AI tools without relying on vendor claims',
  'Firm-specific guidance on responsible use and confidentiality boundaries',
  'A documented use framework your firm can adopt and update over time',
]

export default function AITrainingPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--color-bg)' }}>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <span
            className="mb-6 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)' }}
          >
            Training
          </span>
          <h1
            className="mb-6 text-4xl font-bold leading-tight md:text-6xl"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            AI Training for Your Firm
          </h1>
          <p
            className="mb-10 max-w-xl text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Practical skills your team can use on Monday.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/book?source=services-ai-training"
              className={
                buttonVariants({ size: 'lg' }) +
                ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
              }
              style={{ background: 'var(--color-accent)' }}
            >
              Book a call
            </Link>
            <Link
              href="/trailhead"
              className="inline-flex items-center justify-center rounded-lg border px-8 py-3 text-base font-semibold transition-opacity hover:opacity-80"
              style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-primary)' }}
            >
              See the demo
            </Link>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="py-20 px-6" style={{ background: 'var(--color-bg-light)' }}>
        <div className="mx-auto max-w-2xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            What it is
          </p>
          <div className="flex flex-col gap-5 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            <p>
              AI training for law firms should be about operational work, not legal substance. Off-Map
              does not train staff on AI tools in the abstract. We build real skills around the specific
              tasks your firm does every day: email drafting, intake summaries, client communication,
              marketing content, internal SOPs, and vendor evaluation.
            </p>
            <p>
              Every session is built around your firm's actual workflows. We cover where AI produces
              useful output, where it creates risk, and how staff can use it responsibly without
              creating ethics or confidentiality exposure. The goal is confident, practical adoption,
              not enthusiasm for technology.
            </p>
            <p>
              This is the lowest-commitment way to start working with Off-Map. Formats include a
              half-day workshop, a multi-week program, or an embedded advisor engagement. We scope
              the right format based on your firm's size, practice areas, and current AI maturity
              before any work begins.
            </p>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 px-6" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-2xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            What you get
          </p>
          <h2
            className="mb-8 text-2xl font-bold"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            A firm that knows what AI is actually for.
          </h2>
          <ul className="flex flex-col gap-3">
            {deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <span className="mt-0.5 shrink-0" style={{ color: 'var(--color-accent)' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Guardrail />

      {/* Closing CTA */}
      <section className="py-24 px-6 text-center" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-xl">
          <h2
            className="mb-6 text-3xl font-bold"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Start with a conversation.
          </h2>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            30 minutes on Zoom. We will discuss your practice, your team, and
            what a well-scoped AI training engagement looks like for your firm.
          </p>
          <Link
            href="/book?source=services-ai-training-cta"
            className={
              buttonVariants({ size: 'lg' }) +
              ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
            }
            style={{ background: 'var(--color-accent)' }}
          >
            Book a call
          </Link>
        </div>
      </section>

    </main>
  )
}
