import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/legal-page'
import { conservativeCopy, boldCopy } from '@/components/legal/copy'

export const metadata: Metadata = {
  title: 'Modern Client Acquisition for Texas Law Firms | Off-Map',
  description:
    'Off-Map helps small Texas law firms grow matter volume without adding partners. AI-powered intake, productized offers, and business development systems built for how lawyers actually work.',
  openGraph: {
    title: 'Modern Client Acquisition for Texas Law Firms | Off-Map',
    description:
      'Off-Map helps small Texas law firms grow matter volume without adding partners. AI-powered intake, productized offers, and business development systems built for how lawyers actually work.',
  },
}

type Props = {
  searchParams: Promise<{ v?: string }>
}

export default async function LegalSegmentPage({ searchParams }: Props) {
  const { v } = await searchParams
  const variant = v === 'bold' ? 'bold' : 'conservative'
  const copy = variant === 'bold' ? boldCopy : conservativeCopy

  return <LegalPage copy={copy} variant={variant} />
}
