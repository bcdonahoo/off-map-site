import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Practice Diagnostic | Off-Map',
  description:
    'A focused look at your practice in one session. A written brief in 5 business days. One thing working, one thing broken, one move to make next.',
}

const deliverables = [
  {
    label: '60-minute working session',
    body: 'We cover your intake process, referral sources, current marketing, and where new client volume is actually coming from. Live conversation, recorded and yours to keep.',
  },
  {
    label: 'Written brief in 5 business days',
    body: 'One thing working that you should protect. One thing broken that is costing you matter volume. One move to make next. Two pages maximum. Written for a managing partner, not a consulting firm.',
  },
  {
    label: 'Follow-up call at two weeks',
    body: 'A 30-minute check-in to see whether the move is underway, what you learned, and whether the finding holds up. Built into the engagement.',
  },
]

const faqs = [
  {
    q: 'What do I send ahead of time?',
    a: 'A short intake form, your website, and a rough picture of where new clients come from today. Fifteen minutes of prep.',
  },
  {
    q: 'Is this a sales pitch for a bigger engagement?',
    a: 'No. The Diagnostic is a standalone engagement. The brief is the deliverable. If you want to explore more after, we will talk about it in the follow-up. Most partners use the Diagnostic as a complete, standalone read.',
  },
  {
    q: 'What does the written brief look like?',
    a: 'Two pages maximum. Plain language. No frameworks, no jargon. One specific finding, one specific move. Written for a managing partner, not a consulting firm.',
  },
]

export default function AuditPage() {
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
            Diagnostic
          </span>
          <h1
            className="mb-6 text-4xl font-bold md:text-6xl"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Practice Diagnostic
          </h1>
          <p
            className="mb-6 max-w-xl text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            A focused look at your practice in one session. A written brief in 5
            business days. One thing working, one thing broken, one move to make
            next.
          </p>
          <p
            className="mb-10 max-w-xl text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Most managing partners know something is off. Client intake is
            inconsistent. A referral source went dry. A marketing effort never
            produced results. The Diagnostic finds the highest-leverage issue and
            gives you a concrete next step. Not a list of everything that could be
            improved. One thing.
          </p>
          <Link
            href="/book?source=services-audit"
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
            One sharp read. Three concrete outputs.
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
            Managing partners of 3 to 15 attorney Texas law firms who know client
            acquisition is not where it should be but cannot pinpoint why. You
            have been running the practice on referrals and relationships. You
            want a fast, honest read from someone who has actually built client
            acquisition systems, not a generic marketing agency that does not
            understand how law firms operate.
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
                  style={{ color: 'var(--color-text-dark)' }}
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
            href="/book?source=services-audit"
            className={
              buttonVariants({ size: 'lg' }) +
              ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
            }
            style={{ background: 'var(--color-accent)' }}
          >
            Book a call →
          </Link>
          <p className="mt-6 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Or learn about the{' '}
            <Link
              href="/services/sprint"
              className="underline transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Practice Growth Engagement
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
