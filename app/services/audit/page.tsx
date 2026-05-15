import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'The Off-Map Audit | Off-Map',
  description:
    'A sharp outside read on your GTM. 60 minutes live, a 1-page brief in 72 hours, a follow-up two weeks later to see what stuck.',
}

const deliverables = [
  {
    label: '60-minute working session',
    body: 'Live, recorded, yours to keep. We walk your GTM end to end. ICP, offer, pipeline, sales process. No filler.',
  },
  {
    label: 'The Off-Map Brief (1 to 2 pages, 72 hours)',
    body: 'The one thing working. The one thing broken. The one move to make next. Specific, concrete, written like an operator would write it.',
  },
  {
    label: '15-minute follow-up at week 2',
    body: 'Did the move work? What did you learn? What is the next call to make? Built into the price.',
  },
]

const faqs = [
  {
    q: 'What do I need to send ahead of time?',
    a: 'A short intake form, a link to your website, and any pipeline data you are comfortable sharing. Ten minutes of prep.',
  },
  {
    q: 'Is this a sales call?',
    a: 'No. The Audit is the deliverable. If you want more after, we will talk about what that looks like in the follow-up. Most clients use the Audit as a complete, standalone engagement.',
  },
  {
    q: 'What if I do not like the brief?',
    a: 'The Brief is the product. If you would genuinely have rather had your $350 back, ask, and you will have it.',
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
            5 Days · $350
          </span>
          <h1
            className="mb-6 text-4xl font-bold md:text-6xl"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            The Off-Map Audit
          </h1>
          <p
            className="mb-10 max-w-xl text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            A sharp outside read on your GTM. 60 minutes live, a 1-page brief
            in 72 hours, a follow-up two weeks later to see what stuck.
          </p>
          <Link
            href="/book"
            className={
              buttonVariants({ size: 'lg' }) +
              ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
            }
            style={{ background: 'var(--color-accent)' }}
          >
            Get the Audit →
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
            One sharp read. Three concrete answers.
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
            Founders and services-firm principals between $250k and $5M in
            revenue who know something is off in their GTM but cannot pinpoint
            what. You want a fast, sharp read from someone who has built GTM at
            your stage. You would rather pay $350 to figure out what is actually
            broken than spend the next three months guessing.
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
            Find out what is actually broken.
          </h2>
          <Link
            href="/book"
            className={
              buttonVariants({ size: 'lg' }) +
              ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
            }
            style={{ background: 'var(--color-accent)' }}
          >
            Get an Audit →
          </Link>
          <p className="mt-6 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Or compare with the{' '}
            <Link
              href="/services/sprint"
              className="underline transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Pipeline Sprint
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
