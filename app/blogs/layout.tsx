import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tech Blog - Web Development & Career Insights',
  description: 'Read tech blogs by Vehan Rajintha covering web development, career insights, IEEE CS SLIIT experiences, and student life. Learn from real-world experiences.',
  keywords: [
    'Tech Blog Sri Lanka',
    'Web Development Blog',
    'SLIIT Student Blog',
    'IEEE CS SLIIT',
    'Developer Career Blog',
    'Programming Blog',
    'Student Developer Blog',
    'Google I/O Extended',
  ],
  openGraph: {
    title: 'Tech Blog - Web Development & Career Insights | Vehan Rajintha',
    description: 'Tech blogs covering web development, IEEE CS SLIIT experiences, career insights, and student developer life in Sri Lanka.',
    url: 'https://vehan.netlify.app/blogs',
    type: 'website',
    images: [
      {
        url: '/myblog1.png',
        width: 1200,
        height: 630,
        alt: 'Vehan Rajintha Tech Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Blog - Web Development & Career Insights',
    description: 'Read about web development, IEEE CS SLIIT, career tips, and student developer experiences.',
    images: ['/myblog1.png'],
  },
  alternates: {
    canonical: 'https://vehan.netlify.app/blogs',
  },
}

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

