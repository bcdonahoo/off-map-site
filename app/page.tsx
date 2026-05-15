import { Hero } from '@/components/hero'
import { Problem } from '@/components/problem'
import { Services } from '@/components/services'
import { ApproachPreview } from '@/components/stack-preview'
import { Proof } from '@/components/proof'
import { CTASection } from '@/components/cta-section'

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Services />
      <ApproachPreview />
      <Proof />
      <CTASection />
    </>
  )
}
