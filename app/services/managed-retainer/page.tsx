import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Managed GTM Retainer | Off-Map',
  description:
    'Off-Map runs your outbound pipeline end-to-end. Enriched lists, personalized sequences, agentic research, weekly reporting.',
}

const included = [
  {
    label: 'Weekly enriched prospect lists',
    body: 'Every Monday: a fresh set of in-market accounts sourced from intent signals, job changes, and trigger events — enriched and ready to sequence.',
  },
  {
    label: 'AI-personalized sequence copy',
    body: 'Claude-generated research context for each account, translated into a multi-step email sequence. Written to your ICP, your voice, your offer.',
  },
  {
    label: 'Human review gate before every send',
    body: 'Nothing goes out without a human seeing it. Slack-based approval workflow — you or your team reviews, edits, and approves before launch.',
  },
  {
    label: 'Dedicated sending infrastructure',
    body: 'Warmed domains, inbox rotation, deliverability monitoring. We manage it so your main domain never takes the risk.',
  },
  {
    label: 'Friday performance reports',
    body: 'Weekly attribution report: sequences sent, open rate, reply rate, meetings booked, cost-per-meeting. No vanity metrics.',
  },
]

const faqs = [
  {
    q: 'What is the minimum commitment?',
    a: 'Three months. Long enough to tune the system and generate signal worth optimizing on.',
  },
  {
    q: 'What do you need from us each week?',
    a: 'Thirty minutes to review sequences in Slack. That is it. We handle the rest.',
  },
  {
    q: 'Do we need an existing outbound system?',
    a: 'No. The retainer includes a full stack build in month one. If you already have infrastructure, we audit and upgrade it.',
  },
  {
    q: 'What happens if we want to bring it in-house later?',
    a: 'Everything is documented and lives in your accounts. We will do a full handoff — same as the GTM Stack Build engagement.',
  },
]

export default function ManagedRetainerPage() {
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
              background: 'rgba(107,114,128,0.15)',
              color: 'var(--color-text-muted)',
            }}
          >
            Ongoing Retainer
          </span>
          <h1
            className="mb-6 text-4xl font-bold md:text-6xl"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Managed GTM Retainer
          </h1>
          <p
            className="mb-10 max-w-xl text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Off-Map runs your outbound pipeline end-to-end. Enriched lists,
            personalized sequences, agentic research, weekly reporting. You
            show up for the calls. From $2,500/mo.
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

      {/* Included */}
      <section
        className="py-24 px-6"
        style={{ background: 'var(--color-bg-light)' }}
      >
        <div className="mx-auto max-w-4xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'monospace' }}
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
            Everything it takes to generate meetings.
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
            Ready to hand off your pipeline?
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
              href="/services/gtm-stack"
              className="underline transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-text-muted)' }}
            >
              one-time GTM Stack Build
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
