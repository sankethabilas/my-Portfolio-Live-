import { PersonalBlogPost } from '@/types/personal-blog'

const STORAGE_KEY_POSTS = 'personalBlogPosts'
const STORAGE_KEY_AUTH = 'personalBlogAuth'
const PASSWORD = 'SNK123'

// Authentication functions
export function isAuthenticated(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY_AUTH) === 'true'
}

export function authenticate(password: string): boolean {
  if (password === PASSWORD) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_AUTH, 'true')
    }
    return true
  }
  return false
}

export function logout(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_AUTH)
  }
}

// Blog post functions
export function getAllPosts(): PersonalBlogPost[] {
  if (typeof window === 'undefined') return []
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY_POSTS)
    if (!stored) return []
    
    const posts: PersonalBlogPost[] = JSON.parse(stored)
    // Sort by createdAt descending (latest first)
    return posts.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  } catch (error) {
    console.error('Error loading posts from localStorage:', error)
    return []
  }
}

export function getPostById(id: string): PersonalBlogPost | null {
  const posts = getAllPosts()
  return posts.find(post => post.id === id) || null
}

export function savePost(post: PersonalBlogPost): void {
  if (typeof window === 'undefined') return
  
  try {
    const posts = getAllPosts()
    const existingIndex = posts.findIndex(p => p.id === post.id)
    
    if (existingIndex >= 0) {
      // Update existing post
      posts[existingIndex] = { ...post, updatedAt: new Date().toISOString() }
    } else {
      // Add new post
      posts.push(post)
    }
    
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(posts))
  } catch (error) {
    console.error('Error saving post to localStorage:', error)
    throw error
  }
}

export function deletePost(id: string): void {
  if (typeof window === 'undefined') return
  
  try {
    const posts = getAllPosts()
    const filtered = posts.filter(post => post.id !== id)
    localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(filtered))
  } catch (error) {
    console.error('Error deleting post from localStorage:', error)
    throw error
  }
}

export function createPostId(): string {
  return `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

