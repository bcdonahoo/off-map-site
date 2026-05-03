import { Hero } from '@/components/hero'
import { Problem } from '@/components/problem'
import { Services } from '@/components/services'
import { HowItWorks } from '@/components/how-it-works'
import { StackPreview } from '@/components/stack-preview'
import { Proof } from '@/components/proof'
import { CTASection } from '@/components/cta-section'

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Services />
      <HowItWorks />
      <StackPreview />
      <Proof />
      <CTASection />
    </>
  )
}
