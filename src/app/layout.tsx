import type { Metadata } from 'next'

import { GeistSans } from 'geist/font/sans'

import { LoadoutShortcut } from '@/components/loadout-shortcut'

import { LoadoutProvider } from '@/contexts/loadout-context'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Battlebit Arsenal',
    default: 'Battlebit Arsenal',
  },
  description: 'Create & share your build with your friends.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/shortcut-icon.png',
    apple: '/icon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/apple-touch-icon-precomposed.png',
    },
  },
  // themeColor: '#000000',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#fff" />
      </head>

      <body className={`${GeistSans.className} relative`}>
        <LoadoutProvider>
          <main>{children}</main>

          <LoadoutShortcut />
        </LoadoutProvider>
      </body>
    </html>
  )
}
