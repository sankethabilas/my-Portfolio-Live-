import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vehan.netlify.app'
  
  // Ensure proper date format
  const now = new Date().toISOString()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/achievements`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Dynamic project pages
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Dynamic blog pages
  const blogSlugs = [
    'presenting-ieee-cs-sliit-web-dev-team',
    'csne-inauguration-sliit',
    'google-io-extended-sri-lanka',
    'spymic-project-attention',
  ]
  
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...projectPages, ...blogPages]
}

