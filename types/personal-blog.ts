export interface PersonalBlogPost {
  id: string // UUID or timestamp-based
  title: string
  content: string
  images: string[] // Base64 encoded images
  createdAt: string // ISO date string
  updatedAt?: string // ISO date string for edits
}

