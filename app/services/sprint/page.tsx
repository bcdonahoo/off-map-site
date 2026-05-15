import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'The Pipeline Sprint | Off-Map',
  description:
    'We rebuild your GTM motion end to end. ICP, messaging, channel, sales process. You leave with a documented playbook your team can actually run.',
}

const deliverables = [
  {
    label: 'Week 1 · ICP and offer pressure-test',
    body: 'We lock the one segment to attack first. Everything else gets parked until this is working.',
  },
  {
    label: 'Week 2 · Messaging and assets',
    body: 'Cold email, LinkedIn copy, one-pager, qualification script. Rewritten or built from scratch.',
  },
  {
    label: 'Weeks 3 to 4 · Channel build',
    body: 'Outbound infrastructure or partner outreach engine, whichever fits the business. We run it together so the motion is real, not theoretical.',
  },
  {
    label: 'Week 5 · Sales process',
    body: 'Discovery script, objection responses, pricing conversation, follow-up cadence. Recorded role-plays so you know it works.',
  },
  {
    label: 'Week 6 · Handoff',
    body: 'A 30-day execution plan you or your team can run. Two follow-up office-hours calls in the month after.',
  },
]

const faqs = [
  {
    q: 'How much of my time does this take?',
    a: '90 minutes of working session per week, plus async review of drafts and assets between sessions. Roughly 3 to 5 hours per week of your time.',
  },
  {
    q: 'What do I need to have in place to start?',
    a: 'A working offer that has produced revenue. The Sprint builds the engine that makes the offer repeatable. If you are pre-offer, an Audit is the right starting point.',
  },
  {
    q: 'What does success look like at the end of 6 weeks?',
    a: 'A documented motion, a working channel, and 2 to 4 qualified meetings sourced by the new system. We define specific success metrics in week 1.',
  },
  {
    q: 'What if I want to keep working together after the Sprint?',
    a: 'That is what the Fractional GTM retainer is for. Sprint graduates get month one at $2,500 instead of $4,500.',
  },
]

export default function SprintPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: 'var(--color-bg)' }}
    >
      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-4xl">
          <span
            className="mb-6 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{
              background: 'var(--color-accent-dim)',
              color: 'var(--color-accent)',
            }}
          >
            6 Weeks · $7,500
          </span>
          <h1
            className="mb-6 text-4xl font-bold md:text-6xl"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            The Pipeline Sprint
          </h1>
          <p
            className="mb-10 max-w-xl text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            We rebuild your GTM motion end to end. ICP, messaging, channel,
            sales process. You leave with a documented playbook your team can
            actually run.
          </p>
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
      </section>

      {/* What You Get */}
      <section
        className="py-24 px-6"
        style={{ background: 'var(--color-bg-light)' }}
      >
        <div className="mx-auto max-w-4xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            What You Get
          </p>
          <h2
            className="mb-12 text-3xl font-bold"
            style={{
              color: 'var(--color-text-dark)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Six weeks. One repeatable motion.
          </h2>
          <div className="flex flex-col gap-4">
            {deliverables.map(({ label, body }) => (
              <div
                key={label}
                className="flex gap-4 rounded-2xl p-6"
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border-light)',
                }}
              >
                <span
                  className="mt-0.5 shrink-0 text-sm"
                  style={{ color: 'var(--color-accent)' }}
                >
                  ✓
                </span>
                <div>
                  <p
                    className="mb-1 font-semibold"
                    style={{ color: 'var(--color-text-dark)' }}
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

          {/* Founding-client pricing */}
          <div
            className="mt-8 rounded-2xl p-6"
            style={{
              background: 'var(--color-accent-dim)',
              border: '1px solid var(--color-border-light)',
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              <strong style={{ color: 'var(--color-accent)' }}>Founding-client pricing:</strong>{' '}
              $3,750 for the first 3 signed Sprints, in exchange for case study
              rights and a public testimonial. After that, $7,500.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-2xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            FAQ
          </p>
          <h2
            className="mb-12 text-3xl font-bold"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Common questions.
          </h2>
          <div className="flex flex-col gap-8">
            {faqs.map(({ q, a }) => (
              <div key={q}>
                <p
                  className="mb-2 font-semibold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {q}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 px-6 text-center"
        style={{ background: 'var(--color-bg-light)' }}
      >
        <div className="mx-auto max-w-xl">
          <h2
            className="mb-6 text-3xl font-bold"
            style={{
              color: 'var(--color-text-dark)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Ready to build the motion?
          </h2>
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
          <p className="mt-6 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Or start with a{' '}
            <Link
              href="/services/audit"
              className="underline transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-text-muted)' }}
            >
              $350 Audit
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
