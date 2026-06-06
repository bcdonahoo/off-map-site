import type { Metadata } from 'next'
import Link from 'next/link'
import { TrailheadIntroModal } from '@/components/demos/trailhead-intro-modal'
import { TrailheadSystemOverview } from '@/components/trailhead/system-overview'
import { TrailheadDemoSection } from '@/components/trailhead/demo-section'

export const metadata: Metadata = {
  title: 'Trailhead | Fixed-Fee Client Intake for Law Firms | Off-Map',
  robots: { index: false, follow: false },
}

const INCLUDED = [
  'Last Will and Testament',
  'Durable Power of Attorney',
  'Medical Power of Attorney & HIPAA Release',
  'Directive to Physicians (Living Will)',
  'Transfer-on-Death Deed for Primary Residence',
  '60-Minute Attorney Consultation',
  'Two Rounds of Revisions within 90 Days',
]


const SAFEGUARDS = [
  'Intake-first workflow, not advice-first workflow',
  'Attorney review before scope confirmation',
  'Complexity flags for non-standard situations',
  'Clear client disclosures',
  'Configurable firm-approved language',
  'Audit trail of intake answers and handoff notes',
  'Human review for all legal recommendations',
]

const WHY_FIRMS_USE_THIS = [
  'Sell repeatable services more clearly',
  'Reduce low-quality intake calls',
  'Improve conversion on flat-fee offers',
  'Standardize intake quality',
  'Give attorneys better pre-consult summaries',
  'Launch productized legal offers faster',
]

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
      <path d="M2 7L5.5 10.5L12 4" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function TrailheadPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
      <TrailheadIntroModal />

      {/* ── Hero ── */}
      <div className="px-6">
        <div className="mx-auto max-w-3xl pt-28 pb-10">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            Trailhead · Off-Map
          </p>
          <h1
            className="mb-5 text-4xl font-bold tracking-tight leading-tight md:text-5xl"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            The complete go-to-market system for law firms that offer flat-fee legal services.
          </h1>
          <p className="mb-8 text-lg leading-relaxed max-w-2xl" style={{ color: 'var(--color-text-muted)' }}>
            Trailhead packages the offer, runs the intake, flags complexity, and delivers a clean
            attorney handoff. Automatically, for every prospect. Hill Country Estate Law is a
            fictional firm built to demo the full system.
          </p>

          {/* Law-firm CTA chip */}
          <Link
            href="/book?source=trailhead"
            className="flex items-center justify-between gap-4 rounded-xl px-5 py-4 transition-opacity hover:opacity-80 max-w-xl"
            style={{ background: 'var(--color-accent-dim)', border: '1px solid var(--color-accent)' }}
          >
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-accent)' }}>
                Want this for your firm?
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                Book a Trailhead walkthrough — 30 minutes, no pitch deck.
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" style={{ color: 'var(--color-accent)' }}>
              <path d="M4 8H12M9 5L12 8L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── System overview ── */}
      <section className="pb-16 px-6" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-6xl">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            What is in the system
          </p>
          <h2
            className="mb-8 text-2xl font-bold"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Two layers. One system.
          </h2>
          <TrailheadSystemOverview />
        </div>
      </section>

      {/* ── Demo section (scripted + live intake) ── */}
      <TrailheadDemoSection />

      {/* ── Package + How it works + Testimonials ── */}
      <div className="px-6 pb-16">
        <div className="mx-auto max-w-2xl">

          {/* Package card */}
          <div
            className="mb-10 rounded-2xl p-6"
            style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
          >
            <div className="flex items-start justify-between mb-4 gap-4 flex-wrap">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-1"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                >
                  Demo firm · sample package
                </p>
                <h2
                  className="text-lg font-bold mb-1"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
                >
                  Texas Estate Plan Package
                </h2>
                <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                  Everything your family needs. Nothing you don&rsquo;t.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <div
                  className="text-3xl font-bold"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
                >
                  $2,000
                </div>
                <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>flat fee · all-in</div>
              </div>
            </div>
            <ul className="space-y-2 mb-4">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckIcon />
                  <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{item}</span>
                </li>
              ))}
            </ul>
            <div
              className="rounded-xl px-4 py-3 mt-4"
              style={{ background: 'var(--color-bg-light)', border: '1px solid var(--color-border)' }}
            >
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                <strong style={{ color: 'var(--color-text-primary)' }}>Timeline:</strong> Documents ready within 10 business days.
              </p>
            </div>
          </div>

          {/* How it works */}
          <div className="mb-10">
            <h2
              className="text-lg font-bold mb-4"
              style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
            >
              How it works
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { step: '01', label: 'Guided intake', desc: 'Answer a few questions about your family and assets. Takes about 5 minutes.' },
                { step: '02', label: 'Attorney review', desc: 'A licensed Texas attorney reviews your situation and prepares your documents.' },
                { step: '03', label: 'Sign and done', desc: "Review, sign, and you're covered. Documents in hand within 10 business days." },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl p-4"
                  style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
                >
                  <p className="text-xs font-bold mb-2" style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                    {item.step}
                  </p>
                  <p className="text-sm font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                    {item.label}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Attorney-controlled workflow ── */}
      <section className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
        <div className="mx-auto max-w-6xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            How it is designed
          </p>
          <h2
            className="mb-6 max-w-3xl text-4xl font-bold md:text-5xl"
            style={{ color: 'var(--color-text-dark)', fontFamily: 'var(--font-display)' }}
          >
            Attorney-controlled from first click to final engagement.
          </h2>
          <p className="mb-6 max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Trailhead is built for law firms that want to offer flat-fee legal services without losing
            control of scope, ethics, or client experience. The system guides prospective clients
            through structured intake, explains the service in plain English, identifies possible
            complexity flags, and prepares a clean summary for attorney review.
          </p>
          <p className="mb-10 max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            It does not provide legal advice, create an attorney-client relationship, or make final
            legal recommendations. Every firm can configure its own package rules, disclaimers,
            escalation triggers, eligibility criteria, and handoff process. The attorney remains
            responsible for confirming scope, giving legal advice, preparing documents, and accepting
            representation.
          </p>
          <p className="mb-8 text-sm font-semibold" style={{ color: 'var(--color-text-dark)' }}>
            Designed safeguards include:
          </p>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-3xl">
            {SAFEGUARDS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                <span className="mt-0.5 shrink-0" style={{ color: 'var(--color-accent)' }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
          <div
            className="mt-12 rounded-2xl px-6 py-5 max-w-2xl"
            style={{ background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}
          >
            <p className="text-sm font-semibold italic" style={{ color: 'var(--color-text-primary)' }}>
              AI collects, organizes, flags, and routes. Attorneys decide, advise, approve, and represent.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why firms use this ── */}
      <section className="py-24 px-6" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-6xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            Business case
          </p>
          <h2
            className="mb-16 text-4xl font-bold md:text-5xl"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Why firms use Trailhead.
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {WHY_FIRMS_USE_THIS.map((item) => (
              <div key={item} className="flex items-start gap-2">
                <span className="shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }}>✓</span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Law-firm CTA ── */}
      <section className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
        <div className="mx-auto max-w-4xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Get started
          </p>
          <h2
            className="mb-6 text-4xl font-bold md:text-5xl"
            style={{ color: 'var(--color-text-dark)', fontFamily: 'var(--font-display)' }}
          >
            Want this for your firm?
          </h2>
          <p className="mb-10 max-w-xl text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Book a 30-minute Trailhead walkthrough. We will show you the full system, discuss your
            practice area and offer structure, and scope what a deployment would look like for your firm.
          </p>
          <Link
            href="/book?source=trailhead"
            className="inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: 'var(--color-accent)' }}
          >
            Book a Trailhead walkthrough
          </Link>
          <div className="mt-6">
            <Link
              href="/legal"
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Or read about how Off-Map works with law firms
            </Link>
          </div>
        </div>
      </section>

      {/* Footer disclaimer */}
      <div className="px-6 pb-16 pt-8">
        <div className="mx-auto max-w-2xl">
          <div
            className="rounded-xl p-4 text-center"
            style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
          >
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Hill Country Estate Law is a fictional firm created for demonstration purposes by{' '}
              <span style={{ color: 'var(--color-text-primary)' }}>Off-Map</span>. This is a working
              demo of Trailhead, an AI-powered intake and client acquisition system for law firms
              offering flat-fee legal services.
            </p>
          </div>
        </div>
      </div>

    </main>
  )
}
