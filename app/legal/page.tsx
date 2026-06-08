import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/legal-page'
import { conservativeCopy, boldCopy } from '@/components/legal/copy'
import type { CtaLayout } from '@/components/legal/legal-hero'

export const metadata: Metadata = {
  title: 'Modern Client Acquisition for Small Law Firms | Off-Map',
  description:
    'Off-Map helps small law firms grow matter volume without adding partners. AI-powered intake, productized offers, and business development systems built for how lawyers actually work.',
  openGraph: {
    title: 'Modern Client Acquisition for Small Law Firms | Off-Map',
    description:
      'Off-Map helps small law firms grow matter volume without adding partners. AI-powered intake, productized offers, and business development systems built for how lawyers actually work.',
  },
}

type Props = {
  searchParams: Promise<{ v?: string }>
}

export default async function LegalSegmentPage({ searchParams }: Props) {
  const { v } = await searchParams

  const isBold = v === 'bold'
  const variant = isBold ? 'bold' : 'conservative'
  const copy = isBold ? boldCopy : conservativeCopy

  const ctaLayout: CtaLayout =
    v === 'equal' ? 'equal' :
    v === 'demo-first' ? 'demo-first' :
    'book-first'

  return <LegalPage copy={copy} variant={variant} ctaLayout={ctaLayout} />
}
