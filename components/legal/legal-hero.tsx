import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import type { HeroCopy } from './copy'

export type CtaLayout = 'book-first' | 'equal' | 'demo-first'

type Props = {
  copy: HeroCopy
  ctaLayout: CtaLayout
  onBookClick: () => void
  onDemoClick: () => void
}

function withoutOr(text: string) {
  return text.replace(/^Or\s+/i, '')
}

function withOr(text: string) {
  const clean = withoutOr(text)
  return 'Or ' + clean.charAt(0).toLowerCase() + clean.slice(1)
}

const accentBtn =
  ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'

export function LegalHero({ copy, ctaLayout, onBookClick, onDemoClick }: Props) {
  return (
    <section
      className="relative flex items-center justify-center overflow-hidden py-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl pt-16 text-center">
        <p
          className="mb-6 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          {copy.eyebrow}
        </p>

        <h1
          className="mb-6 text-4xl font-bold leading-tight tracking-tight md:text-5xl"
          style={{
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-display)',
            whiteSpace: 'pre-line',
          }}
        >
          {copy.headline}
        </h1>

        <p
          className="mx-auto mb-10 max-w-[560px] text-lg leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {copy.subhead}
        </p>

        {/* book-first: accent Book button, demo as text link below */}
        {ctaLayout === 'book-first' && (
          <>
            <div className="mb-4">
              <Link
                href={copy.primaryHref}
                onClick={onBookClick}
                className={buttonVariants({ size: 'lg' }) + accentBtn}
                style={{ background: 'var(--color-accent)' }}
              >
                {copy.primaryCta}
              </Link>
            </div>
            <div className="mb-12">
              <Link
                href={copy.secondaryHref}
                onClick={onDemoClick}
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {copy.secondaryCta}
              </Link>
            </div>
          </>
        )}

        {/* equal: demo as accent, book as outline — side by side */}
        {ctaLayout === 'equal' && (
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={copy.secondaryHref}
              onClick={onDemoClick}
              className={buttonVariants({ size: 'lg' }) + accentBtn}
              style={{ background: 'var(--color-accent)' }}
            >
              {withoutOr(copy.secondaryCta)}
            </Link>
            <Link
              href={copy.primaryHref}
              onClick={onBookClick}
              className={buttonVariants({ size: 'lg', variant: 'outline' }) + ' font-semibold px-8 py-3 text-base'}
              style={{ borderColor: 'var(--color-accent)', color: 'var(--color-accent)' }}
            >
              {copy.primaryCta}
            </Link>
          </div>
        )}

        {/* demo-first: accent demo button, book as text link below */}
        {ctaLayout === 'demo-first' && (
          <>
            <div className="mb-4">
              <Link
                href={copy.secondaryHref}
                onClick={onDemoClick}
                className={buttonVariants({ size: 'lg' }) + accentBtn}
                style={{ background: 'var(--color-accent)' }}
              >
                {withoutOr(copy.secondaryCta)}
              </Link>
            </div>
            <div className="mb-12">
              <Link
                href={copy.primaryHref}
                onClick={onBookClick}
                className="text-sm transition-opacity hover:opacity-70"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {withOr(copy.primaryCta)}
              </Link>
            </div>
          </>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6">
          {copy.trustSignals.map((signal) => (
            <div
              key={signal}
              className="flex items-center gap-2 text-sm"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                <path
                  d="M2 7L5.5 10.5L12 4"
                  stroke="var(--color-accent)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {signal}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
