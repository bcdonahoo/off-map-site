import type { Metadata } from 'next'
import { StructuredData } from '@/components/option-c/structured-data'

export const metadata: Metadata = {
  title: 'Off-Map | GTM Consulting — AI redrew GTM. We help you build for what\'s next.',
  description:
    'Off-Map is a GTM consulting practice for services firms and early-stage founders. Three ways to work together: the $350 Audit, the $7,500 Pipeline Sprint, and Fractional GTM from $4,500/mo.',
  alternates: {
    canonical: 'https://www.off-map.com/c',
  },
  openGraph: {
    title: 'Off-Map | GTM Consulting',
    description:
      'AI redrew GTM. We help you build for what\'s next. The $350 Audit, Pipeline Sprint, and Fractional GTM.',
    url: 'https://www.off-map.com/c',
    siteName: 'Off-Map',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Off-Map | GTM Consulting',
    description:
      'AI redrew GTM. We help you build for what\'s next. The $350 Audit, Pipeline Sprint, and Fractional GTM.',
  },
}

export default function CLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StructuredData />
      {children}
    </>
  )
}
