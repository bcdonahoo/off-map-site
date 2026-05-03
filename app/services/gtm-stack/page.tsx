import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'GTM Stack Build | Off-Map',
  description:
    'We design, build, and validate your entire outbound infrastructure in 30 days. You own it, your team runs it.',
}

const deliverables = [
  {
    label: 'ICP definition and signal strategy',
    body: 'We map your ideal customer profile to real intent signals — job changes, tech stack installs, hiring patterns, and more.',
  },
  {
    label: 'Clay table build with waterfall enrichment',
    body: 'A fully configured Clay workspace with custom enrichment waterfalls across 75+ data sources, tuned for your ICP.',
  },
  {
    label: 'AI research agent (Claude API)',
    body: 'An n8n workflow that generates account-specific research context for every prospect before anything is written.',
  },
  {
    label: 'Slack-based review and approval workflow',
    body: 'Human review gate built into your Slack. Nothing automated goes out without a human seeing it first.',
  },
  {
    label: 'Instantly sequencing setup with dedicated domains',
    body: 'Fully warmed sending infrastructure, multi-step sequences, and deliverability monitoring in place on day one.',
  },
  {
    label: 'Attribution dashboard and 60-day support window',
    body: 'A Looker Studio or Retool dashboard tracking signal → sequence → meeting → close. Sixty days of async support post-launch.',
  },
]

const faqs = [
  {
    q: 'What do I need to provide?',
    a: 'Access to your CRM (or a spreadsheet of past customers), a list of your top 20 target accounts, and two 60-minute working sessions over the first two weeks.',
  },
  {
    q: 'Who owns the system after you build it?',
    a: 'You do. Every tool is set up in your accounts. We document everything and hand off with a recorded walkthrough.',
  },
  {
    q: 'What if my team can\'t run it after handoff?',
    a: "That's what the Managed GTM Retainer is for. Many clients start with the Stack Build and move to retainer once they see the output.",
  },
  {
    q: 'How are results measured?',
    a: 'We define success metrics upfront — typically reply rate, meeting booked rate, and cost-per-meeting — and the attribution dashboard tracks all three.',
  },
]

export default function GTMStackPage() {
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
            One-Time Engagement
          </span>
          <h1
            className="mb-6 text-4xl font-bold md:text-6xl"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            GTM Stack Build
          </h1>
          <p
            className="mb-10 max-w-xl text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            We design, build, and validate your entire outbound infrastructure
            in 30 days. You own it. Your team runs it. Starting at $3,500.
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

      {/* Deliverables */}
      <section
        className="py-24 px-6"
        style={{ background: 'var(--color-bg-light)' }}
      >
        <div className="mx-auto max-w-4xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace' }}
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
            Six deliverables. Thirty days.
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {deliverables.map(({ label, body }) => (
              <div
                key={label}
                className="rounded-2xl p-6"
                style={{
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border-light)',
                }}
              >
                <p
                  className="mb-2 font-semibold"
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
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-2xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'monospace' }}
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
            Ready to build?
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
            Or compare with the{' '}
            <Link
              href="/services/managed-retainer"
              className="underline transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Managed GTM Retainer
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
