import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Certifications & Achievements - 25+ Professional Certificates',
  description: 'View 25+ professional certifications from Microsoft, LinkedIn, GitHub, and Google. Including Career Essentials in Cybersecurity, GitHub, System Administration, and more.',
  keywords: [
    'Microsoft Certifications',
    'LinkedIn Learning Certificates',
    'GitHub Professional Certificate',
    'Google Cloud Certifications',
    'Cybersecurity Certificates',
    'Developer Certifications',
    'Professional Achievements',
    'Tech Certifications Sri Lanka',
  ],
  openGraph: {
    title: 'Certifications & Achievements - 25+ Professional Certificates',
    description: '25+ certifications from Microsoft, LinkedIn, GitHub, Google Cloud. Career Essentials in Cybersecurity, GitHub Professional, System Administration.',
    url: 'https://vehan.netlify.app/achievements',
    type: 'website',
    images: [
      {
        url: '/Career Essentials in Cybersecurity by Microsoft and LinkedIn.png',
        width: 1200,
        height: 630,
        alt: 'Vehan Rajintha Certifications',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '25+ Professional Certifications & Achievements',
    description: 'Microsoft, LinkedIn, GitHub, Google Cloud certifications. View credentials and achievements.',
    images: ['/Career Essentials in Cybersecurity by Microsoft and LinkedIn.png'],
  },
  alternates: {
    canonical: 'https://vehan.netlify.app/achievements',
  },
}

export default function AchievementsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

