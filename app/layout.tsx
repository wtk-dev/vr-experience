import type { Metadata } from 'next'
import { Space_Grotesk, Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { TrackingProvider } from '@/components/TrackingProvider'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Move VR | Interactive Team Experiences',
  description: 'Step into the future of entertainment. Experience fully immersive VR adventures with friends, colleagues, and teams. Book your session today.',
  keywords: 'VR experience, virtual reality, team building, corporate events, VR games, immersive entertainment, Move VR',
  icons: {
    icon: '/movevr_icon.svg',
  },
  openGraph: {
    title: 'Move VR | Interactive Team Experiences',
    description: 'Step into the future of entertainment. Experience fully immersive VR adventures with friends, colleagues, and teams.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Move VR | Interactive Team Experiences',
    description: 'Step into the future of entertainment. Experience fully immersive VR adventures with friends, colleagues, and teams.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${outfit.variable}`}>
      <body className="font-body antialiased">
        <TrackingProvider>
          {children}
        </TrackingProvider>
        <Analytics />
      </body>
    </html>
  )
}

