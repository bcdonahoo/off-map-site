import { Hero } from '@/components/hero'
import { Guardrail } from '@/components/guardrail'
import { Problem } from '@/components/problem'
import { Services } from '@/components/services'
import { ApproachPreview } from '@/components/stack-preview'
import { CTASection } from '@/components/cta-section'

export default function Home() {
  return (
    <>
      <Hero />
      <Guardrail />
      <Problem />
      <Services />
      <ApproachPreview />
      <CTASection />
    </>
  )
}
