import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'TODAH - Taibat & Oluwasegun Wedding',
  description: 'Join us as we celebrate our love on June 18th & July 4th, 2026',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
