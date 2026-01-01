import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects Portfolio - 28+ Web Development Projects',
  description: 'Explore 28+ web development projects by Vehan Rajintha including React apps, Next.js websites, PHP systems, and more. View live demos and source code on GitHub.',
  keywords: [
    'Web Development Projects',
    'React Projects Portfolio',
    'Next.js Projects',
    'Full-Stack Projects',
    'PHP Projects',
    'JavaScript Projects',
    'TypeScript Projects',
    'Student Projects SLIIT',
    'GitHub Portfolio',
    'Open Source Projects',
  ],
  openGraph: {
    title: 'Projects Portfolio - 28+ Web Development Projects | Vehan Rajintha',
    description: 'Explore 28+ web development projects: React apps, Next.js websites, PHP systems, mobile apps, and more. Live demos and source code available.',
    url: 'https://vehan.netlify.app/projects',
    type: 'website',
    images: [
      {
        url: '/hero-1.png',
        width: 1200,
        height: 630,
        alt: 'Vehan Rajintha Projects Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '28+ Web Development Projects Portfolio',
    description: 'React, Next.js, PHP, TypeScript projects with live demos and GitHub source code. Built by Vehan Rajintha.',
    images: ['/hero-1.png'],
  },
  alternates: {
    canonical: 'https://vehan.netlify.app/projects',
  },
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

