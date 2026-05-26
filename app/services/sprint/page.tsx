import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Practice Growth Engagement | Off-Map',
  description:
    'A defined project that rebuilds one part of your client acquisition. Scoped before we start. Documented systems your firm owns at the end.',
}

const deliverables = [
  {
    label: 'Scoping session before we start',
    body: 'We define the specific problem, the deliverable, and how we will know the work succeeded. You know exactly what you are buying before any work begins.',
  },
  {
    label: 'Working sessions across the engagement',
    body: 'Live sessions building and testing the work together. The number and frequency depend on scope. You see the work as it develops, not at a final handoff.',
  },
  {
    label: 'Documented systems your firm owns',
    body: 'Every process, template, or system we build is documented in a format your team can operate without us. The work lives in your tools, not ours.',
  },
  {
    label: 'Follow-up call one month after handoff',
    body: 'A check-in to see what is working, what needs adjustment, and whether any follow-on scope makes sense.',
  },
]

const faqs = [
  {
    q: 'How long does an engagement typically run?',
    a: 'Common engagements run 4 to 8 weeks depending on scope. We set the timeline in the scoping session before any work begins.',
  },
  {
    q: 'Do I need to have done the Diagnostic first?',
    a: 'Not required. If you already know what needs to be built, we can scope a Practice Growth Engagement directly. The Diagnostic is the right starting point if you are not sure where the bottleneck is.',
  },
  {
    q: 'What if the scope changes mid-engagement?',
    a: 'Minor adjustments happen and we handle them. Material changes to scope get agreed separately before we expand the work.',
  },
  {
    q: 'What kinds of projects do you typically scope?',
    a: 'AI-powered intake systems, productized flat-fee offer design, referral partner outreach processes, and business development cadences for managing partners. The scope follows the practice.',
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
            Engagement
          </span>
          <h1
            className="mb-6 text-4xl font-bold md:text-6xl"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Practice Growth Engagement
          </h1>
          <p
            className="mb-6 max-w-xl text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            A time-boxed project that rebuilds one part of your client
            acquisition. You define the problem. We scope the solution. You own
            what we build.
          </p>
          <p
            className="mb-10 max-w-xl text-sm leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            This is not a retainer and not ongoing advice. It is a defined
            project with a clear scope, a defined output, and a handoff date.
            We determine the scope in the first conversation and document it
            before any work begins. Common scopes include AI-powered intake,
            a productized flat-fee offer, a referral partner outreach process,
            or a business development cadence for the managing partner.
          </p>
          <Link
            href="/book?source=services-sprint"
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
            One system. Built and documented.
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
            Managing partners who have completed a Practice Diagnostic or who
            already know the specific part of their client acquisition that needs
            to be rebuilt. You have a real practice with real clients. You are
            not looking for general advice. You want a senior operator to build
            something specific alongside you that your firm can own and run.
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
            href="/book?source=services-sprint"
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
