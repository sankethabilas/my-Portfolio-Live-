import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { ThemeProvider } from '../components/theme-provider'
import ThemeTransition from '../components/ThemeTransition'
import DisableRightClick from '../components/DisableRightClick'

export const metadata: Metadata = {
  metadataBase: new URL('https://sanketh-abilas.netlify.app'),
  title: {
    default: 'Sanketh Abilas | Full-Stack Developer & UI/UX Designer',
    template: '%s | Sanketh Abilas',
  },
  description: 'Explore Sanketh Abilas\'s portfolio: Full-Stack Developer specializing in React, Next.js, and Data Science. Proven ability to design, deploy, and maintain live production systems.',
  keywords: [
    'Sanketh Abilas',
    'Full-Stack Developer',
    'Web Developer Sri Lanka',
    'React Developer',
    'Next.js Developer',
    'Data Science',
    'UI/UX Designer',
    'SLIIT',
    'IEEE CS SLIIT',
    'Web Development Portfolio',
    'Frontend Developer',
    'Backend Developer',
    'JavaScript Developer',
    'Node.js Developer',
    'Python Developer',
    'MERN Stack',
    'Software Engineer',
  ],
  authors: [{ name: 'Sanketh Abilas', url: 'https://sanketh-abilas.netlify.app' }],
    creator: 'Sanketh Abilas',
  publisher: 'Sanketh Abilas',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: 'Next.js',
  applicationName: 'Sanketh Abilas Portfolio',
  referrer: 'origin-when-cross-origin',
  classification: 'Portfolio, Web Development, Software Engineering, Data Science',
  
  // Open Graph metadata
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sanketh-abilas.netlify.app',
    siteName: 'Sanketh Abilas - Full-Stack Developer Portfolio',
    title: 'Sanketh Abilas | Full-Stack Developer & UI/UX Designer',
    description: 'Explore Sanketh Abilas\'s portfolio: Full-Stack Developer specializing in React, Next.js, and Data Science.',
    images: [
      {
        url: '/sanketh-profile.jpg',
        width: 1200,
        height: 630,
        alt: 'Sanketh Abilas - Full-Stack Developer Portfolio',
        type: 'image/jpeg',
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: 'summary_large_image',
    site: '@sankethabilas',
    creator: '@sankethabilas',
    title: 'Sanketh Abilas | Full-Stack Developer',
    description: 'Full-Stack Developer specializing in React, Next.js, and Data Science. View my portfolio!',
    images: ['/sanketh-profile.jpg'],
  },
  
  // Icons
  icons: {
    icon: '/sanketh-profile.jpg',
    shortcut: '/sanketh-profile.jpg',
    apple: '/sanketh-profile.jpg',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/sanketh-profile.jpg',
    },
  },
  
  // Manifest
  manifest: '/manifest.json',
  
  // Robots
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  
  // Verification
  verification: {
    google: '', 
  },
  
  // Alternate languages
  alternates: {
    canonical: 'https://sankethmarasingha.netlify.app',
  },
  
  // Category
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // JSON-LD Structured Data
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sanketh Abilas',
    jobTitle: 'Full-Stack Developer',
    url: 'https://vehan.netlify.app',
    sameAs: [
      'https://github.com/SankethAbilas',
      'https://www.linkedin.com/in/sankethabilas/',
      'https://www.facebook.com/sanketh.abilas',
    ],
    alumniOf: 'Sri Lanka Institute of Information Technology',
    knowsAbout: ['React', 'Next.js', 'TypeScript', 'Web Development'],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sanketh Abilas Portfolio',
    url: 'https://vehan.netlify.app',
    author: {
      '@type': 'Person',
      name: 'Sanketh Abilas',
    },
  }

  return (
    <html lang="en" className="transparent-site dark" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Y3513G55Z3"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Y3513G55Z3');
            `,
          }}
        />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <DisableRightClick />
          <ThemeTransition />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
