import type { Metadata } from 'next'
import Link from 'next/link'
import { TrailheadChat } from '@/components/demos/trailhead-chat'
import { TrailheadIntroModal } from '@/components/demos/trailhead-intro-modal'

export const metadata: Metadata = {
  title: 'Texas Estate Planning | Hill Country Estate Law',
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
    quote:
      "We'd been putting this off for ten years. The process was completely painless and we had our documents in less than two weeks.",
    name: 'Michael & Sarah T.',
    location: 'Austin, TX',
  },
  {
    quote:
      "I was worried it would cost thousands and take months. The flat fee made it easy to say yes. Documents were exactly what we needed.",
    name: 'Jennifer R.',
    location: 'Round Rock, TX',
  },
  {
    quote:
      "Straightforward, affordable, and the attorney answered every question. I wish we'd done this five years ago.",
    name: 'David K.',
    location: 'Georgetown, TX',
  },
]

export default function TrailheadPage() {
  return (
    <main
      className="min-h-screen pt-28 pb-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <TrailheadIntroModal />
      <div className="mx-auto max-w-2xl">

        {/* Eyebrow */}
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          Hill Country Estate Law · Austin, Texas
        </p>

        {/* Hero */}
        <h1
          className="mb-4 text-4xl font-bold tracking-tight leading-tight"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          Your family deserves a plan.
          <br />
          Let&rsquo;s get it done.
        </h1>
        <p className="mb-2 text-lg leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Plain-English estate planning for Texas families — one flat fee, no hourly billing, no surprises.
        </p>
        <p className="mb-10 text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
          Over 60% of Americans have no will or estate plan. If something happens without one, your family
          faces court costs, delays, and conflict that could have been avoided. We make it simple to get
          your affairs in order — everything included for $2,000 flat.
        </p>

        {/* Chat */}
        <div className="mb-12">
          <p className="mb-3 text-sm font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Chat with our assistant to get started
          </p>
          <p className="mb-4 text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Describe your situation. Our AI assistant will help you understand whether the flat-fee package
            is right for you — or what the right next step is.
          </p>
          <TrailheadChat />
          <Link
            href="/trailhead/form"
            className="mt-4 flex items-center justify-between gap-4 rounded-xl px-5 py-4 transition-opacity hover:opacity-80"
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border)',
            }}
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

        {/* What's included */}
        <div
          className="mb-10 rounded-2xl p-6"
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
          }}
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
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="shrink-0 mt-0.5"
                >
                  <path
                    d="M2 7L5.5 10.5L12 4"
                    stroke="var(--color-accent)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <div
            className="rounded-xl px-4 py-3 mt-4"
            style={{ background: 'var(--color-bg-light)', border: '1px solid var(--color-border)' }}
          >
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>Timeline:</strong> Documents ready within 10
              business days.
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
              { step: '01', label: 'Chat with our assistant', desc: 'Answer a few questions about your family and assets. Takes about 5 minutes.' },
              { step: '02', label: 'Attorney review', desc: 'A licensed Texas attorney reviews your situation and prepares your documents.' },
              { step: '03', label: 'Sign and done', desc: 'Review, sign, and you\'re covered. Documents in hand within 10 business days.' },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-xl p-4"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <p
                  className="text-xs font-bold mb-2"
                  style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
                >
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

        {/* Social proof */}
        <div className="mb-10">
          <h2
            className="text-lg font-bold mb-4"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
          >
            Texas families who got it done
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="rounded-xl p-4"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                }}
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

        {/* Footer note */}
        <div
          className="rounded-xl p-4 text-center"
          style={{
            background: 'var(--color-bg-surface)',
            border: '1px solid var(--color-border)',
          }}
        >
          <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Hill Country Estate Law is a fictional firm created for demonstration purposes by{' '}
            <span style={{ color: 'var(--color-text-primary)' }}>Off-Map</span>. This is a working demo of
            the Trailhead GTM Engine — an AI-powered sales and intake system for productized legal
            services.
          </p>
        </div>

      </div>
    </main>
  )
}
