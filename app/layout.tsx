import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cyubahiro Ntwali Adore | Software Developer, Robotics Teleoperation & QA',
  description: "Portfolio of Cyubahiro Ntwali Adore — Software developer based in Rwanda with practical experience in robotics teleoperation, SOP-based video quality assurance, web development, and digital design.",
  keywords: [
    'Cyubahiro Ntwali Adore',
    'Software Developer',
    'Robotics Teleoperation',
    'Video Quality Assurance',
    'SOP Validation',
    'Neotix',
    'Web Developer Rwanda',
    'React.js',
    'Node.js',
    'UI/UX Design',
    'Kigali'
  ],
  authors: [{ name: 'Cyubahiro Ntwali Adore' }],
  creator: 'Cyubahiro Ntwali Adore',
  openGraph: {
    title: 'Cyubahiro Ntwali Adore | Software Developer, Robotics Teleoperation & QA',
    description: 'Building digital experiences and contributing to reliable AI and robotics systems.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Cyubahiro Ntwali Adore Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyubahiro Ntwali Adore | Software Developer, Robotics Teleoperation & QA',
    description: 'Building digital experiences and contributing to reliable AI and robotics systems.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className="font-sans antialiased bg-background text-foreground selection:bg-accent/30 selection:text-white"
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
