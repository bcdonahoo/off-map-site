import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { PostHogProviderWrapper } from '@/components/posthog-provider'

const inter = localFont({
  src: [
    { path: '../public/fonts/Inter-VariableFont_opsz_wght.ttf', style: 'normal' },
    { path: '../public/fonts/Inter-Italic-VariableFont_opsz_wght.ttf', style: 'italic' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Modern Client Acquisition for Law Firms | Off-Map',
  description:
    'Off-Map helps law firms grow matter volume without adding partners. AI-powered intake, productized offers, and business development systems built for how lawyers actually work.',
  openGraph: {
    title: 'Modern Client Acquisition for Law Firms | Off-Map',
    description:
      'Off-Map helps law firms grow matter volume without adding partners. AI-powered intake, productized offers, and business development systems built for how lawyers actually work.',
  },
  twitter: {
    title: 'Modern Client Acquisition for Law Firms | Off-Map',
    description:
      'Off-Map helps law firms grow matter volume without adding partners. AI-powered intake, productized offers, and business development systems built for how lawyers actually work.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <PostHogProviderWrapper>
          <Nav />
          {children}
          <Footer />
        </PostHogProviderWrapper>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://mcp.figma.com/mcp/html-to-design/capture.js" async></script>
      </body>
    </html>
  )
}
