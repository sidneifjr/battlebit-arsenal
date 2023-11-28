import type { Metadata } from 'next'

import { GeistSans } from 'geist/font/sans'

import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | Battlebit Arsenal',
    default: 'Battlebit Arsenal',
  },
  description: 'Create & share your build with your friends.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} relative`}>
        {/* <Menu /> */}

        <main>{children}</main>
      </body>
    </html>
  )
}
