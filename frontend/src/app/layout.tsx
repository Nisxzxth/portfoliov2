import type { Metadata } from 'next'
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  title: 'Nishanthan Perumal — Portfolio',
  description: 'Full Stack Developer passionate about crafting exceptional digital experiences. Specializing in React, Node.js, and modern web technologies.',
  keywords: ['Nishanthan Perumal', 'Full Stack Developer', 'React', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Nishanthan Perumal' }],
  openGraph: { title: 'Nishanthan Perumal — Portfolio', description: 'Full Stack Developer crafting exceptional digital experiences.', type: 'website' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      <body style={{ fontFamily: 'var(--font-display)' }}>
        {children}
        <Toaster position="bottom-right" toastOptions={{
          style: { background: 'var(--bg-card)', color: 'var(--ink)', border: '1px solid var(--border)', borderRadius: '12px', fontFamily: 'var(--font-display)', fontSize: '13px' },
          success: { iconTheme: { primary: 'var(--accent)', secondary: '#fff' } },
        }} />
      </body>
    </html>
  )
}
