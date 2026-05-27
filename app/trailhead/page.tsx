import type { Metadata } from 'next'
import Link from 'next/link'
import { TrailheadChat } from '@/components/demos/trailhead-chat'
import { TrailheadIntroModal } from '@/components/demos/trailhead-intro-modal'
import { TrailheadScriptedDemo } from '@/components/demos/trailhead-scripted-demo'

export const metadata: Metadata = {
  title: 'Trailhead Demo | Attorney-Controlled Intake for Flat-Fee Legal Services | Off-Map',
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

const TESTIMONIALS = [
  {
    quote: "We'd been putting this off for ten years. The process was completely painless and we had our documents in less than two weeks.",
    name: 'Michael & Sarah T.',
    location: 'Austin, TX',
  },
  {
    quote: "I was worried it would cost thousands and take months. The flat fee made it easy to say yes. Documents were exactly what we needed.",
    name: 'Jennifer R.',
    location: 'Round Rock, TX',
  },
  {
    quote: "Straightforward, affordable, and the attorney answered every question. I wish we'd done this five years ago.",
    name: 'David K.',
    location: 'Georgetown, TX',
  },
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

const WHAT_TRAILHEAD_INCLUDES = [
  'Flat-fee offer packaging',
  'Consumer landing page',
  'Guided intake workflow',
  'Complexity flagging',
  'Attorney handoff summary',
  'Lead capture',
  'Follow-up automation',
  'Analytics and conversion tracking',
  'Firm-configurable disclaimers and rules',
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

      {/* ── Demo frame header ── */}
      <div className="px-6">
        <div className="mx-auto max-w-2xl pt-28 pb-10">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            Trailhead Demo · Off-Map
          </p>
          <h1
            className="mb-4 text-4xl font-bold tracking-tight leading-tight"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Attorney-controlled intake for flat-fee legal services.
          </h1>
          <p className="mb-8 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Hill Country Estate Law is a fictional firm. This is a working demo of the Trailhead GTM
            engine. Watch the guided intake qualify a prospect, flag complexity, and hand off to
            attorney review.
          </p>

          {/* Law-firm CTA chip */}
          <Link
            href="/book?source=trailhead"
            className="flex items-center justify-between gap-4 rounded-xl px-5 py-4 transition-opacity hover:opacity-80"
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

      {/* ── Scripted demo — side by side, wider ── */}
      <section className="py-12 px-6" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-5xl">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            See it in action
          </p>
          <h2
            className="mb-3 text-2xl font-bold"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Guided intake, complexity detection, attorney handoff.
          </h2>
          <p className="mb-8 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Watch the system work through a real scenario. A married couple with a special needs
            beneficiary and a business interest. Two of the most common complexity flags.
          </p>
          <TrailheadScriptedDemo />
        </div>
      </section>

      {/* ── Live chat ── */}
      <div id="live-intake" className="px-6 pb-12" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Now try your own situation.
          </p>
          <p className="mb-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            The intake works the same way — guided, no legal advice, attorney review required before
            any scope is confirmed.
          </p>
          <TrailheadChat />
          <Link
            href="/trailhead/form"
            className="mt-4 flex items-center justify-between gap-4 rounded-xl px-5 py-4 transition-opacity hover:opacity-80"
            style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
          >
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                Not a fan of chat? Use the traditional form instead.
              </p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                Answer a few simple questions — no conversation required.
              </p>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" style={{ color: 'var(--color-text-muted)' }}>
              <path d="M4 8H12M9 5L12 8L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

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

          {/* Testimonials */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <h2
                className="text-lg font-bold"
                style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
              >
                Texas families who got it done
              </h2>
              <span
                className="rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: 'var(--color-bg-light)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}
              >
                Sample · Demo only
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.name}
                  className="rounded-xl p-4"
                  style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
                >
                  <div className="flex gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="var(--color-accent)">
                        <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    — {t.name}, {t.location}
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

      {/* ── What Trailhead includes ── */}
      <section className="py-24 px-6" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-6xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            What you get
          </p>
          <h2
            className="mb-16 text-4xl font-bold md:text-5xl"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            What Trailhead includes.
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {WHAT_TRAILHEAD_INCLUDES.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-xl p-5"
                style={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)' }}
              >
                <CheckIcon />
                <span className="text-sm font-medium" style={{ color: 'var(--color-text-primary)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why firms use this ── */}
      <section className="py-24 px-6" style={{ background: 'var(--color-bg-light)' }}>
        <div className="mx-auto max-w-6xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            Business case
          </p>
          <h2
            className="mb-16 text-4xl font-bold md:text-5xl"
            style={{ color: 'var(--color-text-dark)', fontFamily: 'var(--font-display)' }}
          >
            Why firms use Trailhead.
          </h2>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {WHY_FIRMS_USE_THIS.map((item) => (
              <div key={item}>
                <span className="mb-2 block" style={{ color: 'var(--color-accent)' }}>✓</span>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Not just a chatbot ── */}
      <section className="py-24 px-6" style={{ background: 'var(--color-bg)' }}>
        <div className="mx-auto max-w-4xl">
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            The system
          </p>
          <h2
            className="mb-6 text-4xl font-bold md:text-5xl"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Not just a chatbot.
          </h2>
          <p className="mb-4 max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Trailhead combines offer packaging, a consumer landing page, guided intake, complexity
            flagging, qualification routing, and attorney handoff in one system. The guided intake
            is one component, not the whole product.
          </p>
          <p className="max-w-2xl text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            A law firm deploying Trailhead gets an end-to-end system for turning a repeatable legal
            service into a packaged, conversion-ready offer with structured intake and attorney-reviewed
            handoff at every step.
          </p>
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
              demo of the Trailhead GTM engine — an AI-powered sales and intake system for productized
              legal services.
            </p>
          </div>
        </div>
      </div>

    </main>
  )
}
