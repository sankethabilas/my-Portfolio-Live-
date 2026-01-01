// JSON-LD Structured Data for Homepage
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sanketh Abilas',
    givenName: 'Sanketh',
    familyName: 'Abilas',
    jobTitle: 'Full-Stack Developer',
    description: 'Full-Stack Developer specializing in web development, UI/UX design, and digital marketing',
    url: 'https://sanketh-abilas.netlify.app',
    image: 'https://sanketh-abilas.netlify.app/sanketh-profile.jpg',
    email: 'sankethabilas@gmail.com',
    telephone: '+94-XXX-XXX-XXX', // Add your phone if public
    
    // Social Media Profiles
    sameAs: [
      'https://github.com/SankethAbilas',
      'https://www.linkedin.com/in/sankethabilas/',
      'https://www.facebook.com/sanketh.abilas',
      'https://sanketh-abilas.netlify.app',
    ],
    
    // Skills and Expertise
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Python',
      'PHP',
      'MySQL',
      'Firebase',
      'MongoDB',
      'Tailwind CSS',
      'UI/UX Design',
      'Graphic Design',
      'Digital Marketing',
      'Web Development',
      'Full-Stack Development',
      'Frontend Development',
      'Backend Development',
    ],
    
    // Education
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Sri Lanka Institute of Information Technology',
      sameAs: 'https://www.sliit.lk',
    },
    
    // Work Experience
    worksFor: {
      '@type': 'Organization',
      name: 'IEEE Computer Society SLIIT',
      url: 'https://www.sliit.lk',
    },
    
    // Credentials and Certifications
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Career Essentials in Cybersecurity',
        credentialCategory: 'Certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Microsoft and LinkedIn',
        },
        url: 'https://www.linkedin.com/learning/certificates/4482e3e3138ad01bf8374566728e4ff00c8ce6833faf33e710903ad5482faca9',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Career Essentials in GitHub Professional Certificate',
        credentialCategory: 'Certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'GitHub and LinkedIn',
        },
        url: 'https://www.linkedin.com/learning/certificates/87afeb3eb58090ce672aafe572bc28561ff410cf69ba5b36f4f5f5dd9fba0dc8',
      },
      {
        '@type': 'EducationalOccupationalCredential',
        name: 'Career Essentials in System Administration',
        credentialCategory: 'Certificate',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Microsoft and LinkedIn',
        },
        url: 'https://www.linkedin.com/learning/certificates/1ad231bc19b715ba42f92cce77718776975c6d10fadcac5d6978e7ac1172f01c',
      },
    ],
    
    // Location
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Malabe',
      addressRegion: 'Western Province',
      addressCountry: 'LK',
    },
    
    // Nationality
    nationality: {
      '@type': 'Country',
      name: 'Sri Lanka',
    },
  }
}

// BreadcrumbList Schema
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// WebSite Schema
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sanketh Abilas Portfolio',
    alternateName: 'Sanketh Abilas - Full-Stack Developer',
    url: 'https://sanketh-abilas.netlify.app',
    description: 'Portfolio website showcasing projects, blogs, and achievements of Sanketh Abilas',
    author: {
      '@type': 'Person',
      name: 'Sanketh Abilas',
    },
    inLanguage: 'en-US',
    copyrightYear: new Date().getFullYear(),
    creator: {
      '@type': 'Person',
      name: 'Sanketh Abilas',
    },
  }
}

// ProfilePage Schema
export function generateProfilePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: generatePersonSchema(),
    breadcrumb: generateBreadcrumbSchema([
      { name: 'Home', url: 'https://sanketh-abilas.netlify.app' },
    ]),
  }
}

