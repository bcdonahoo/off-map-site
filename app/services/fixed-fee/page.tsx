import type { Metadata } from 'next'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Guardrail } from '@/components/guardrail'

export const metadata: Metadata = {
  title: 'Fixed-Fee Service Lines | Off-Map',
  description:
    'Turn one repeatable legal service into a clear, fixed-fee offering. Off-Map builds the intake, screening, client education, and reporting so your firm can serve more clients consistently.',
}

const deliverables = [
  'A productized, fixed-fee offer your firm can sell and deliver consistently',
  'AI-powered intake flow that qualifies and educates prospective clients',
  'Eligibility screening to flag complexity before the attorney\'s time is spent',
  'Client communication and follow-up process',
  'Reporting on intake volume, completion rates, and conversion',
  'Documented systems your firm owns and operates independently',
]

export default function FixedFeePage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--color-bg)' }}>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <span
            className="mb-6 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"
            style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)' }}
          >
            Fixed-Fee
          </span>
          <h1
            className="mb-6 text-4xl font-bold leading-tight md:text-6xl"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Fixed-Fee Service Lines
          </h1>
          <p
            className="mb-10 max-w-xl text-lg leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Turn a repeatable service into a scalable offer.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/book?source=services-fixed-fee"
              className={
                buttonVariants({ size: 'lg' }) +
                ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
              }
              style={{ background: 'var(--color-accent)' }}
            >
              Book a call
            </Link>
            <Link
              href="/trailhead"
              className="inline-flex items-center justify-center rounded-lg border px-8 py-3 text-base font-semibold transition-opacity hover:opacity-80"
              style={{ borderColor: 'var(--color-border-strong)', color: 'var(--color-text-primary)' }}
            >
              See the demo
            </Link>
          </div>
        </div>
      </section>

      {/* What it is */}
      <section className="py-20 px-6" style={{ background: 'var(--color-bg-light)' }}>
        <div className="mx-auto max-w-2xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            What it is
          </p>
          <div className="flex flex-col gap-5 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            <p>
              Most law firm services are still quoted and scoped as custom matters, even when the
              underlying work is largely the same from client to client. A fixed-fee service line
              changes that. It defines scope clearly, sets a price clients understand before they
              engage, and creates a predictable intake path that does not depend on an attorney
              fielding every inquiry.
            </p>
            <p>
              Off-Map builds the entire system around a single repeatable service: the intake flow,
              eligibility screening, client education, follow-up process, and reporting. The method
              works for any service where the work is sufficiently predictable to scope in advance.
              Examples include deed transfers, simple wills, powers of attorney, and simple trusts.
              These are examples, not a fixed menu. The engagement is built around your repeatable
              work, whatever that is.
            </p>
            <p>
              This is a defined-scope, fixed-timeline engagement. One service line per engagement.
              Trailhead is the working demo of what the output looks like for an estate planning
              practice.{' '}
              <Link
                href="/trailhead"
                className="underline transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-accent)' }}
              >
                See the demo.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="py-20 px-6" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-2xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            What we build
          </p>
          <h2
            className="mb-8 text-2xl font-bold"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            One service line, built to run.
          </h2>
          <ul className="flex flex-col gap-3">
            {deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-relaxed"
                style={{ color: 'var(--color-text-muted)' }}
              >
                <span className="mt-0.5 shrink-0" style={{ color: 'var(--color-accent)' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Guardrail />

      {/* Closing CTA */}
      <section className="py-24 px-6 text-center" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-xl">
          <h2
            className="mb-6 text-3xl font-bold"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Start with a conversation.
          </h2>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            30 minutes on Zoom. We will discuss your practice, which service
            line is the right candidate, and what a scoped build engagement
            looks like.
          </p>
          <Link
            href="/book?source=services-fixed-fee-cta"
            className={
              buttonVariants({ size: 'lg' }) +
              ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
            }
            style={{ background: 'var(--color-accent)' }}
          >
            Book a call
          </Link>
        </div>
      </section>

    </main>
  )
}
