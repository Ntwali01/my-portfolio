import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cyubahiro Ntwali Adore - Full-Stack Developer & Creative Technologist',
  description: 'Full-Stack Developer & Creative Technologist building smart, scalable digital experiences. Specializing in web development, AI solutions, and UI/UX design.',
  keywords: ['web developer', 'full-stack developer', 'React', 'Node.js', 'UI/UX design', 'AI solutions', 'Rwanda'],
  authors: [{ name: 'Cyubahiro Ntwali Adore' }],
  creator: 'Cyubahiro Ntwali Adore',
  openGraph: {
    title: 'Cyubahiro Ntwali Adore - Full-Stack Developer',
    description: 'Building smart, scalable digital solutions with modern technologies',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
