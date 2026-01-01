import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume - Full-Stack Developer CV',
  description: 'View and download the professional resume of Vehan Rajintha - Full-Stack Developer with expertise in React, Next.js, TypeScript, and modern web technologies.',
  keywords: [
    'Vehan Rajintha Resume',
    'Full-Stack Developer CV',
    'Developer Resume Sri Lanka',
    'Web Developer CV',
    'Software Engineer Resume',
  ],
  openGraph: {
    title: 'Resume - Vehan Rajintha Full-Stack Developer CV',
    description: 'Professional resume showcasing skills, experience, education, and certifications of Full-Stack Developer Vehan Rajintha.',
    url: 'https://vehan.netlify.app/resume',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Resume - Vehan Rajintha Full-Stack Developer',
    description: 'View professional resume with skills, experience, and certifications.',
  },
  alternates: {
    canonical: 'https://vehan.netlify.app/resume',
  },
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

