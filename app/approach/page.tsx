import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'The Approach | Off-Map',
  description:
    'Most GTM advice is recycled. Off-Map starts from the business in front of us. Every time.',
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
          What &ldquo;off the map&rdquo; actually means.
        </h1>

        {/* Body */}
        <div
          className="flex flex-col gap-6 text-sm leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <p>
            Most GTM advice is recycled. Same frameworks, same playbooks, same
            hire-a-VP-Sales answer, applied to companies that do not fit the mold.
          </p>
          <p>
            The mold does not exist anymore. AI compressed the timeline on every
            GTM motion that worked five years ago. The companies that figured out
            outbound in 2018 are watching reply rates collapse. The advice
            industry is still selling 2018.
          </p>
          <p>Off-Map exists to do something different.</p>
          <p>
            Every engagement starts from the business in front of us. What does
            this company sell, to whom, and why? What is working that we should
            protect? What is broken that is costing real money this quarter? What
            is the smallest, sharpest move that gets us measurably closer to
            repeatable revenue?
          </p>
          <p>
            That is the work. No frameworks borrowed from someone else&apos;s
            exit. No tools-first thinking that ignores what your customers
            actually want. No playbooks that fit a deck better than they fit a
            business.
          </p>
          <p>We draw the map together. You end up with a motion that fits.</p>
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
            Want a sharp outside read?
          </h2>
          <Link
            href="/services/audit"
            className={
              buttonVariants({ size: 'lg' }) +
              ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
            }
            style={{ background: 'var(--color-accent)' }}
          >
            Get a $350 Audit →
          </Link>
          <Link
            href="/book"
            className="text-sm transition-opacity hover:opacity-70"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Or book a discovery call
          </Link>
        </div>
      </div>
    </main>
  )
}
