import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Fractional GTM | Off-Map',
  description:
    'An embedded operator working alongside you on whatever the rate-limiting GTM lever is that month. Weekly working sessions, async access, the leverage of a senior hire without the headcount.',
}

const included = [
  {
    label: 'One weekly working session',
    body: '90 minutes, live, on whatever is most important that week. ICP refinement, pipeline review, hiring the first AE, repricing the offer. The agenda follows the business.',
  },
  {
    label: 'Async Slack and email access',
    body: 'During business hours. The kind of "can you look at this draft" and "what would you do here" access a senior hire gives you, without the senior-hire price.',
  },
  {
    label: 'Monthly pipeline and motion review',
    body: 'Written recommendations on the state of the motion. What is working. What is broken. What to change next month.',
  },
  {
    label: 'Hands-on work on the rate-limiting lever',
    body: 'Not just advice. If the bottleneck is outbound, we build it together. If it is hiring, we run the hiring process. If it is pricing, we redesign the conversation.',
  },
  {
    label: 'Quarterly strategic offsite',
    body: 'A half-day deep dive on direction, hiring, market shifts. The work most founders never carve out time for.',
  },
]

const faqs = [
  {
    q: 'Is this a fractional CRO or a fractional VP Sales?',
    a: 'Neither. Fractional CROs and VP Sales are full-time-equivalent operators on a part-time schedule. Fractional GTM is a senior operator working alongside you on the highest-leverage move each week. We do not manage your team. We help you build a team that runs without us.',
  },
  {
    q: 'Can I get more time if I need it?',
    a: 'Yes. Extra working sessions are $400 each. Or upgrade to a custom retainer with multiple weekly sessions and we will quote it.',
  },
  {
    q: 'How is this different from the Sprint?',
    a: 'The Sprint builds one specific motion in six weeks. The Fractional keeps building, iterating, and adjusting as the business changes. Most clients graduate from a Sprint into a Fractional once they see the output.',
  },
  {
    q: 'When should I end the retainer?',
    a: "When the business is running without you needing it. Off-Map's job is to make itself unnecessary. Most engagements run 6 to 12 months.",
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
              background: 'rgba(107,114,128,0.15)',
              color: 'var(--color-text-muted)',
            }}
          >
            Ongoing Retainer · From $4,500/mo
          </span>
          <h1
            className="mb-6 text-4xl font-bold md:text-6xl"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Fractional GTM
          </h1>
          <p
            className="mb-10 max-w-xl text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            An embedded operator working alongside you on whatever the
            rate-limiting GTM lever is that month. Weekly working sessions,
            async access, the leverage of a senior hire without the headcount.
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
            An operator on retainer.
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

          {/* Pricing */}
          <div
            className="mt-8 rounded-2xl p-6"
            style={{
              background: 'var(--color-bg)',
              border: '1px solid var(--color-border-light)',
            }}
          >
            <p
              className="mb-2 font-semibold"
              style={{ color: 'var(--color-text-dark)' }}
            >
              Pricing
            </p>
            <p
              className="mb-3 text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              $4,500 per month. Three-month minimum, month-to-month after.
              Sprint graduates get month one at $2,500.
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <strong style={{ color: 'var(--color-accent)' }}>
                Founding-client pricing:
              </strong>{' '}
              $2,250 per month for the first 3 months for the first 3 Fractional
              clients, in exchange for case study rights.
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
            Ready for an operator on retainer?
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
