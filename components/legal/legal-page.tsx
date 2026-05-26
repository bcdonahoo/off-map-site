'use client'

import { useEffect } from 'react'
import { posthog } from '@/lib/posthog'
import { LegalHero } from './legal-hero'
import { LegalProblem } from './legal-problem'
import { LegalServices } from './legal-services'
import { LegalProof } from './legal-proof'
import { LegalCta } from './legal-cta'
import type { LegalCopy } from './copy'
import type { CtaLayout } from './legal-hero'

type Props = {
  copy: LegalCopy
  variant: 'conservative' | 'bold'
  ctaLayout: CtaLayout
}

export function LegalPage({ copy, variant, ctaLayout }: Props) {
  useEffect(() => {
    try {
      posthog.capture('legal_page_view', { variant, ctaLayout })
    } catch {}
  }, [variant, ctaLayout])

  function fireHeroCta(ctaType: 'book' | 'demo') {
    try {
      posthog.capture('legal_cta_click', { variant, cta: ctaType })
    } catch {}
  }

  return (
    <main>
      <LegalHero
        copy={copy.hero}
        ctaLayout={ctaLayout}
        onBookClick={() => fireHeroCta('book')}
        onDemoClick={() => fireHeroCta('demo')}
      />
      <LegalProblem copy={copy.problem} />
      <LegalServices copy={copy.services} />
      <LegalProof copy={copy.proof} />
      <LegalCta copy={copy.cta} variant={variant} />
    </main>
  )
}
