import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Fractional Practice Operator | Off-Map',
  description:
    'Brent Donahoo embedded in your practice on a monthly basis. Weekly working sessions, async access, documented outputs. Outside expertise without adding to payroll.',
}

const included = [
  {
    label: 'Weekly working session',
    body: '60 to 90 minutes, live. The agenda follows what is rate-limiting growth this week. Intake review, referral source analysis, offer design, marketing channel, business development. No fixed curriculum.',
  },
  {
    label: 'Async access between sessions',
    body: 'Slack or email access during business hours. For quick questions, draft reviews, and decisions that should not wait until next week.',
  },
  {
    label: 'Monthly written review',
    body: 'A short written summary of what we built that month, what is working, what is not, and what the priority is for the next month.',
  },
  {
    label: 'Documented outputs throughout',
    body: 'Every system, process, or template built during the engagement is documented so it can run without us when the engagement ends.',
  },
]

const faqs = [
  {
    q: 'Is this a fractional CMO or a fractional VP of Business Development?',
    a: 'Neither. A fractional CMO manages marketing. A fractional VP of BD manages business development. The Fractional Practice Operator works alongside you on whatever is rate-limiting growth, which often crosses traditional role lines. We build systems. We do not manage your staff.',
  },
  {
    q: 'How long do engagements typically run?',
    a: 'Most run 3 to 6 months. Some partners extend month to month after the initial period. The engagement ends when the systems are built and running without us.',
  },
  {
    q: 'Can I start with something smaller to test the fit?',
    a: 'Yes. A Practice Diagnostic is the right starting point if you want a feel for how we work before committing to a monthly engagement.',
  },
  {
    q: "What happens when the engagement ends?",
    a: "You own everything we built. The processes are documented, the systems are in your tools, and your team can run them. Off-Map's job is to make itself unnecessary.",
  },
]

export default function FractionalPage() {
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
            Embedded
          </span>
          <h1
            className="mb-6 text-4xl font-bold md:text-6xl"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Fractional Practice Operator
          </h1>
          <p
            className="mb-6 max-w-xl text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Embedded in your practice on a monthly basis. Not an advisor. Not a
            consultant with a deck. The person working alongside you on whatever
            is most rate-limiting this month.
          </p>
          <p
            className="mb-10 max-w-xl text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            This engagement is for managing partners who are past the diagnostic
            phase and have a specific growth lever they are working. Maybe intake
            is inconsistent and you need someone building a system while you run
            the practice. Maybe you are adding a practice area and need someone
            who has done it. Maybe you need a sharp outside voice in the room
            each week. This gives you senior-operator leverage without adding a
            senior-level employee.
          </p>
          <Link
            href="/book?source=services-fractional"
            className={
              buttonVariants({ size: 'lg' }) +
              ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
            }
            style={{ background: 'var(--color-accent)' }}
          >
            Book a conversation →
          </Link>
        </div>
      </section>

      {/* What's Included */}
      <section
        className="py-24 px-6"
        style={{ background: 'var(--color-bg-light)' }}
      >
        <div className="mx-auto max-w-4xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            What&apos;s Included
          </p>
          <h2
            className="mb-12 text-3xl font-bold"
            style={{
              color: 'var(--color-text-dark)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Off-Map on your side of the table.
          </h2>
          <div className="flex flex-col gap-4">
            {included.map(({ label, body }) => (
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
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 px-6" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-2xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            Who It&apos;s For
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Managing partners who know what they are working on and need a senior
            operator alongside them while they work it. You have a clear
            bottleneck. You are not looking for a six-month strategy project. You
            want someone in the room each week who has actually built what you
            are trying to build.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="py-24 px-6"
        style={{ background: 'var(--color-bg-light)' }}
      >
        <div className="mx-auto max-w-2xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            FAQ
          </p>
          <h2
            className="mb-12 text-3xl font-bold"
            style={{
              color: 'var(--color-text-dark)',
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
        style={{ background: 'var(--color-bg)' }}
      >
        <div className="mx-auto max-w-xl">
          <h2
            className="mb-6 text-3xl font-bold"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Start with a conversation.
          </h2>
          <Link
            href="/book?source=services-fractional"
            className={
              buttonVariants({ size: 'lg' }) +
              ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
            }
            style={{ background: 'var(--color-accent)' }}
          >
            Book a call →
          </Link>
          <p className="mt-6 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Not sure where to start? Begin with a{' '}
            <Link
              href="/services/audit"
              className="underline transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Practice Diagnostic
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
