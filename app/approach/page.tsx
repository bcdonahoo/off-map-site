import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'The Approach | Off-Map',
  description:
    'Every engagement is scoped before it begins, delivered in working sessions, and handed off as documented systems your firm owns.',
}

export default function ApproachPage() {
  return (
    <main
      className="min-h-screen pt-32 pb-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div className="mx-auto max-w-2xl">
        {/* Eyebrow */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          The Approach
        </p>

        {/* Headline */}
        <h1
          className="mb-12 text-4xl font-bold md:text-5xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
          }}
        >
          How Off-Map works with a law firm.
        </h1>

        {/* Body */}
        <div
          className="flex flex-col gap-6 text-sm leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <p>
            Off-Map delivers senior-level engagement, directly. There is no
            junior team doing the work, no account manager in the middle. The
            senior judgment that scopes an engagement is the judgment that
            delivers it, with AI leverage built in to handle the volume.
          </p>
          <p>
            Every engagement is scoped before it begins. That means a specific
            problem, a specific deliverable, and a clear end point. The
            engagement has a defined shape before any work starts. You know what
            you are buying and what you will have when it is done.
          </p>
          <p>
            Delivery happens in working sessions and written outputs. Not decks.
            Not strategy documents that sit unread. Live sessions where we are
            building something together, and written documentation that records
            what we built and how your team can run it.
          </p>
          <p>
            The outcome is always firm-owned. Every process, intake system, and
            template that comes out of an engagement is documented so your firm
            can operate it after the engagement ends. Off-Map is not trying to
            make itself permanent. It is trying to make itself unnecessary.
          </p>
          <p>
            The work is specific to your practice. Managing partners operate
            differently from each other. Different practice areas, different
            referral networks, different client relationships. There is no
            standard Off-Map engagement. There is a scoped engagement for the
            practice in front of us.
          </p>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col items-start gap-4">
          <h2
            className="text-2xl font-bold"
            style={{
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-display)',
            }}
          >
            Start with a conversation.
          </h2>
          <Link
            href="/book?source=approach"
            className={
              buttonVariants({ size: 'lg' }) +
              ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
            }
            style={{ background: 'var(--color-accent)' }}
          >
            Book a call →
          </Link>
        </div>
      </div>
    </main>
  )
}
