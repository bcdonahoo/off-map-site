'use client'

import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { posthog } from '@/lib/posthog'
import type { CtaCopy } from './copy'

type Props = {
  copy: CtaCopy
  variant: 'conservative' | 'bold'
}

function fireCtaClick(variant: 'conservative' | 'bold', cta: 'book' | 'demo') {
  try {
    posthog.capture('legal_cta_click', { variant, cta })
  } catch {}
}

export function LegalCta({ copy, variant }: Props) {
  return (
    <section id="cta" className="py-24 px-6" style={{ background: 'var(--color-bg)' }}>
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-4 text-xs font-semibold uppercase tracking-widest"
          style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
        >
          {copy.eyebrow}
        </p>

        <h2
          className="mb-6 text-4xl font-bold md:text-5xl"
          style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
        >
          {copy.headline}
        </h2>

        {copy.layout === 'simple' && (
          <>
            <p
              className="mb-10 max-w-[480px] text-sm leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {copy.body}
            </p>
            <div className="mb-4">
              <Link
                href={copy.primaryHref}
                onClick={() => fireCtaClick(variant, copy.primaryCtaType)}
                className={
                  buttonVariants({ size: 'lg' }) +
                  ' !text-[var(--color-bg)] font-semibold px-8 py-3 text-base'
                }
                style={{ background: 'var(--color-accent)' }}
              >
                {copy.primaryCta}
              </Link>
            </div>
            <Link
              href={copy.secondaryHref}
              onClick={() => fireCtaClick(variant, copy.secondaryCtaType)}
              className="text-sm transition-opacity hover:opacity-70"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {copy.secondaryCta}
            </Link>
          </>
        )}

        {copy.layout === 'cards' && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-2xl">
            {copy.cards.map(({ title, body, buttonText, href, ctaType }) => (
              <div
                key={title}
                className="rounded-2xl p-8"
                style={{
                  background: 'var(--color-bg-surface)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <h3
                  className="mb-3 text-xl font-bold"
                  style={{ color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)' }}
                >
                  {title}
                </h3>
                <p
                  className="mb-6 text-sm leading-relaxed"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {body}
                </p>
                <Link
                  href={href}
                  onClick={() => fireCtaClick(variant, ctaType)}
                  className={
                    buttonVariants({ size: 'default' }) +
                    ' !text-[var(--color-bg)] font-semibold w-full justify-center'
                  }
                  style={{ background: 'var(--color-accent)' }}
                >
                  {buttonText}
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
