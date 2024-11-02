"use client"

import { Header } from '@/components/Layout/Header'
import './globals.scss'
import './login.scss'
import '@/styles/_ui.scss'
import { Footer } from '@/components/Layout/Footer'
import { Providers } from '@/redux/provider'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <Providers>
            <Header />
              {children}
            <Footer />
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}
