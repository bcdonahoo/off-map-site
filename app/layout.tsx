import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PostHogProviderWrapper } from '@/components/posthog-provider'

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Off-Map | GTM Engineering',
  description:
    'Off-Map builds and operates AI-powered outbound systems that generate qualified pipeline for B2B companies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body>
        <PostHogProviderWrapper>
          <Nav />
          {children}
          <Footer />
        </PostHogProviderWrapper>
      </body>
    </html>
  )
}
