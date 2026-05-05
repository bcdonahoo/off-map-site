'use client'

import { useEffect, useState } from 'react'
import { posthog } from '@/lib/posthog'
import { CTADirect } from '@/components/cta-direct'
import { CTAForm } from '@/components/cta-form'
import type { CTAVariant } from '@/types'

export function CTASection() {
  const [variant, setVariant] = useState<CTAVariant>('direct')

  useEffect(() => {
    posthog.onFeatureFlags(() => {
      const flag = posthog.getFeatureFlag('cta-variant')
      if (flag === 'form-first') setVariant('form-first')
    })
  }, [])

  return (
    <section
      className="py-24 px-6"
      style={{ background: 'var(--color-bg)' }}
    >
      {variant === 'form-first' ? <CTAForm /> : <CTADirect />}
    </section>
  )
}
