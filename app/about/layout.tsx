import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me - Full-Stack Developer & UI/UX Designer',
  description: 'Learn about Vehan Rajintha - a motivated Full-Stack Developer from SLIIT specializing in React, Next.js, and modern web technologies. View my education, experience, and certifications.',
  keywords: [
    'Vehan Rajintha About',
    'Full-Stack Developer SLIIT',
    'SLIIT Computer Science',
    'Web Developer Bio',
    'Sri Lanka Developer',
    'IEEE CS SLIIT',
    'Software Engineer Profile',
  ],
  openGraph: {
    title: 'About Vehan Rajintha - Full-Stack Developer & UI/UX Designer',
    description: 'Learn about Vehan Rajintha - Full-Stack Developer from SLIIT with 25+ certifications, 30+ projects, and experience with IEEE CS SLIIT.',
    url: 'https://vehan.netlify.app/about',
    type: 'profile',
    images: [
      {
        url: 'https://github.com/VehanRajintha.png',
        width: 400,
        height: 400,
        alt: 'Vehan Rajintha Profile Picture',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'About Vehan Rajintha - Full-Stack Developer',
    description: 'Full-Stack Developer from SLIIT. 25+ certifications, 30+ projects. Specializing in React, Next.js, TypeScript.',
    images: ['https://github.com/VehanRajintha.png'],
  },
  alternates: {
    canonical: 'https://vehan.netlify.app/about',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

