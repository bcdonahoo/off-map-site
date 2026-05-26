'use client'

import { useEffect } from 'react'
import { posthog } from '@/lib/posthog'
import { LegalHero } from './legal-hero'
import { LegalProblem } from './legal-problem'
import { LegalServices } from './legal-services'
import { LegalProof } from './legal-proof'
import { LegalCta } from './legal-cta'
import type { LegalCopy } from './copy'

type Props = {
  copy: LegalCopy
  variant: 'conservative' | 'bold'
}

export function LegalPage({ copy, variant }: Props) {
  useEffect(() => {
    try {
      posthog.capture('legal_page_view', { variant })
    } catch {}
  }, [variant])

  function fireHeroCta(ctaType: 'book' | 'demo') {
    try {
      posthog.capture('legal_cta_click', { variant, cta: ctaType })
    } catch {}
  }

  return (
    <main>
      <LegalHero
        copy={copy.hero}
        onPrimaryClick={() => fireHeroCta(copy.hero.primaryCtaType)}
        onSecondaryClick={() => fireHeroCta(copy.hero.secondaryCtaType)}
      />
      <LegalProblem copy={copy.problem} />
      <LegalServices copy={copy.services} />
      <LegalProof copy={copy.proof} />
      <LegalCta copy={copy.cta} variant={variant} />
    </main>
  )
}
