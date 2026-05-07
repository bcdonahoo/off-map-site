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
