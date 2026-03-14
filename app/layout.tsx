import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'sonner'

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
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(12px)',
              border: '1px solid #fce7f3',
              borderRadius: '1.5rem',
              fontFamily: 'var(--font-serif)',
            },
          }}
        />
      </body>
    </html>
  )
}
