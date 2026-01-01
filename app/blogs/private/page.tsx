"use client"

import { useState, useEffect, useRef } from 'react'
import { Lock, Plus, Edit, Trash, Image as ImageIcon, X, LogOut, Home, User, Trophy, FolderOpen, BookOpen } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Sidebar from '@/components/sidebar'
import PageLoader from '@/components/PageLoader'
import { useTheme } from 'next-themes'
import { format, formatDistanceToNow } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  isAuthenticated,
  authenticate,
  logout,
  getAllPosts,
  savePost,
  deletePost,
  createPostId,
} from '@/lib/personal-blog-storage'
import { PersonalBlogPost } from '@/types/personal-blog'

export default function PersonalBlogPage() {
  const [mounted, setMounted] = useState(false)
  const [auth, setAuth] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [posts, setPosts] = useState<PersonalBlogPost[]>([])
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<PersonalBlogPost | null>(null)
  const [deletingPostId, setDeletingPostId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ title: '', content: '', date: '' })
  const [images, setImages] = useState<string[]>([])
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollYRef = useRef(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
    const authenticated = isAuthenticated()
    setAuth(authenticated)
    if (authenticated) {
      loadPosts()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const lastScrollY = lastScrollYRef.current
      
      if (currentScrollY < 10) {
        setIsHeaderVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setIsHeaderVisible(true)
      }
      
      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const loadPosts = () => {
    const allPosts = getAllPosts()
    setPosts(allPosts)
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordError('')
    
    if (authenticate(password)) {
      setAuth(true)
      setPassword('')
      loadPosts()
    } else {
      setPasswordError('Incorrect password. Please try again.')
    }
  }

  const handleLogout = () => {
    logout()
    setAuth(false)
    setPosts([])
    const today = new Date().toISOString().split('T')[0]
    setFormData({ title: '', content: '', date: today })
    setImages([])
    setEditingPost(null)
  }

  const openEditor = (post?: PersonalBlogPost) => {
    if (post) {
      setEditingPost(post)
      // Format date for input (YYYY-MM-DD)
      const postDate = new Date(post.createdAt)
      const formattedDate = postDate.toISOString().split('T')[0]
      setFormData({ title: post.title, content: post.content, date: formattedDate })
      setImages([...post.images])
    } else {
      setEditingPost(null)
      // Set default date to today
      const today = new Date().toISOString().split('T')[0]
      setFormData({ title: '', content: '', date: today })
      setImages([])
    }
    setIsEditorOpen(true)
  }

  const closeEditor = () => {
    setIsEditorOpen(false)
    setEditingPost(null)
    const today = new Date().toISOString().split('T')[0]
    setFormData({ title: '', content: '', date: today })
    setImages([])
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.size > 5 * 1024 * 1024) {
        alert(`Image ${file.name} is too large. Maximum size is 5MB.`)
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setImages((prev) => [...prev, base64String])
      }
      reader.readAsDataURL(file)
    })

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSavePost = () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in both title and content.')
      return
    }

    if (!formData.date) {
      alert('Please select a date.')
      return
    }

    // Convert date string to ISO string with time (set to noon to avoid timezone issues)
    const selectedDate = new Date(formData.date + 'T12:00:00')
    const dateISOString = selectedDate.toISOString()

    const post: PersonalBlogPost = editingPost
      ? {
          ...editingPost,
          title: formData.title.trim(),
          content: formData.content.trim(),
          images,
          createdAt: dateISOString, // Update the date if changed
          updatedAt: new Date().toISOString(),
        }
      : {
          id: createPostId(),
          title: formData.title.trim(),
          content: formData.content.trim(),
          images,
          createdAt: dateISOString,
        }

    try {
      savePost(post)
      loadPosts()
      closeEditor()
    } catch (error) {
      alert('Error saving post. Please try again.')
      console.error(error)
    }
  }

  const handleDeleteClick = (id: string) => {
    setDeletingPostId(id)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = () => {
    if (deletingPostId) {
      try {
        deletePost(deletingPostId)
        loadPosts()
        setIsDeleteDialogOpen(false)
        setDeletingPostId(null)
      } catch (error) {
        alert('Error deleting post. Please try again.')
        console.error(error)
      }
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'MMMM d, yyyy')
  }

  if (!mounted) {
    return <PageLoader />
  }

  // Login View
  if (!auth) {
    return (
      <>
        <PageLoader />
        <div className="min-h-screen !text-black dark:!text-white about-text bg-[#DFEFF5] dark:bg-[#2C2C2C] flex items-center justify-center p-6">
          <Card className="w-full max-w-md bg-white dark:bg-[#212121] border border-gray-300 dark:border-white/6 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-6 h-6 !text-black dark:!text-white" />
                <CardTitle className="!text-black dark:!text-white">Private Blog Access</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium mb-2 !text-black dark:!text-white">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                      setPasswordError('')
                    }}
                    placeholder="Enter password"
                    className="!text-black dark:!text-white"
                    autoFocus
                  />
                  {passwordError && (
                    <p className="mt-2 text-sm text-red-500">{passwordError}</p>
                  )}
                </div>
                <Button type="submit" className="w-full">
                  Access Blog
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  // Blog Dashboard View
  return (
    <>
      <PageLoader />
      <div className="min-h-screen !text-black dark:!text-white about-text bg-[#DFEFF5] dark:bg-[#2C2C2C]">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6 p-6">
          <Sidebar />

          {/* Main Content */}
          <div className="overflow-y-auto md:ml-68 flex-1">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lock className="w-6 h-6 !text-black dark:!text-white" />
                  <h1 className="text-2xl font-bold !text-black dark:!text-white">Personal Blog</h1>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>

              {/* Create Post Button */}
              <Button
                onClick={() => openEditor()}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Post
              </Button>

              {/* Posts List */}
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <Card className="bg-white dark:bg-[#212121] border border-gray-300 dark:border-white/6 shadow-lg">
                    <CardContent className="p-8 text-center">
                      <p className="text-gray-500 dark:text-gray-400">
                        No posts yet. Create your first post to get started!
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  posts.map((post) => (
                    <Card
                      key={post.id}
                      className="bg-white dark:bg-[#212121] border border-gray-300 dark:border-white/6 shadow-lg"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="!text-black dark:!text-white mb-2">
                              {post.title}
                            </CardTitle>
                            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                              <span>{formatDate(post.createdAt)}</span>
                              {post.updatedAt && (
                                <span className="text-xs">(Updated)</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditor(post)}
                              className="h-8 w-8"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(post.id)}
                              className="h-8 w-8 text-red-500 hover:text-red-600"
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {post.content}
                          </div>
                          {post.images.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              {post.images.map((image, index) => (
                                <div key={index} className="relative">
                                  <img
                                    src={image}
                                    alt={`Post image ${index + 1}`}
                                    className="w-full h-auto rounded-lg border border-gray-300 dark:border-white/6"
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden min-h-screen">
          {/* Mobile Header */}
          <div
            className="sticky top-0 z-40 border-b border-gray-300 dark:border-white/10 backdrop-blur-sm bg-[#DFEFF5] dark:bg-[#212121]"
            style={{
              transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-100%)',
              transition: 'transform 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
              willChange: 'transform',
            }}
          >
            <div className="flex items-center justify-between px-4 py-3">
              <button
                onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
                className="w-8 h-8 flex flex-col items-center justify-center space-y-1.5 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div
                  className={`w-4 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                    isMobileSidebarOpen ? 'rotate-45 translate-y-1' : ''
                  }`}
                ></div>
                <div
                  className={`w-4 h-0.5 bg-black dark:bg-white transition-all duration-300 ${
                    isMobileSidebarOpen ? '-rotate-45 -translate-y-1' : ''
                  }`}
                ></div>
              </button>
              <h1 className="text-lg font-bold !text-black dark:!text-white">Personal Blog</h1>
              <Button
                onClick={handleLogout}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          <div
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            style={{
              opacity: isMobileSidebarOpen ? 1 : 0,
              visibility: isMobileSidebarOpen ? 'visible' : 'hidden',
              transition: 'opacity 0.3s ease-out, visibility 0.3s ease-out',
            }}
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Mobile Sidebar */}
          <div
            className="fixed left-0 top-0 h-full w-72 z-50 bg-[#DFEFF5] dark:bg-[#212121] shadow-2xl"
            style={{
              transform: isMobileSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
              willChange: 'transform',
            }}
          >
            <div
              className="w-full h-full p-4 flex flex-col border-r border-gray-300 dark:border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Sidebar Content */}
              <div className="flex flex-col items-start mb-5 pl-2">
                <div className="w-28 h-28 mb-4 rounded-full overflow-hidden">
                  <img
                    src="https://github.com/VehanRajintha.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold !text-black dark:!text-white">Sanketh Abilas</h2>
                <p className="!text-gray-600 dark:!text-gray-400 text-sm">Full-Stack Developer</p>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-auto mb-4">
                <ul className="space-y-2">
                  {[
                    { id: 'home', icon: Home, label: 'Home', href: '/' },
                    { id: 'about', icon: User, label: 'About', href: '/about' },
                    { id: 'achievements', icon: Trophy, label: 'Achievements', href: '/achievements' },
                    { id: 'projects', icon: FolderOpen, label: 'Projects', href: '/projects' },
                    { id: 'blogs', icon: BookOpen, label: 'Blogs', href: '/blogs' },
                  ].map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        className={`w-full flex items-center px-4 py-2 rounded-xl text-left transition-colors ${
                          pathname === item.href
                            ? 'text-[#5EA0FF]'
                            : '!text-black dark:!text-white hover:!text-blue-500 dark:hover:!text-blue-400'
                        }`}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Dark Mode Toggle */}
              <div className="mt-4 mb-4">
                <button
                  data-theme-toggle
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="w-full bg-gray-200 dark:bg-[#2A2A2A] border border-gray-300 dark:border-white/8 rounded-xl px-4 py-3 flex items-center justify-between shadow-inner transition-colors hover:bg-gray-300 dark:hover:bg-[#333333]"
                >
                  <div className="flex items-center gap-3 text-gray-800 dark:text-white">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-300 dark:bg-black/30 border border-gray-400 dark:border-white/10">
                      {mounted && theme === 'dark' ? (
                        <svg
                          className="w-4 h-4 text-gray-800 dark:text-white/90"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 text-gray-800 dark:text-white/90"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="text-base text-gray-800 dark:text-white">
                      {mounted && theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      mounted && theme === 'dark' ? 'bg-[#5EA0FF]' : 'bg-gray-400'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
                        mounted && theme === 'dark' ? 'right-0.5' : 'left-0.5'
                      }`}
                    ></div>
                  </div>
                </button>
              </div>

              {/* Footer */}
              <div className="text-xs !text-gray-400 dark:!text-gray-400 leading-relaxed mt-2">
                <p>Designed & Built by Sanketh Abilas</p>
                <p>© 2025, All rights reserved.</p>
              </div>
            </div>
          </div>

          {/* Mobile Content */}
          <div className="p-4 space-y-4">
            <Button
              onClick={() => openEditor()}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Create New Post
            </Button>

            {posts.length === 0 ? (
              <Card className="bg-white dark:bg-[#212121] border border-gray-300 dark:border-white/6 shadow-lg">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    No posts yet. Create your first post to get started!
                  </p>
                </CardContent>
              </Card>
            ) : (
              posts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-white dark:bg-[#212121] border border-gray-300 dark:border-white/6 shadow-lg"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="!text-black dark:!text-white mb-2 text-lg">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <span>{formatDate(post.createdAt)}</span>
                          {post.updatedAt && (
                            <span className="text-xs">(Updated)</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditor(post)}
                          className="h-8 w-8"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(post.id)}
                          className="h-8 w-8 text-red-500 hover:text-red-600"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {post.content}
                      </div>
                      {post.images.length > 0 && (
                        <div className="grid grid-cols-1 gap-4 mt-4">
                          {post.images.map((image, index) => (
                            <div key={index} className="relative">
                              <img
                                src={image}
                                alt={`Post image ${index + 1}`}
                                className="w-full h-auto rounded-lg border border-gray-300 dark:border-white/6"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Editor Dialog */}
        <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="!text-black dark:!text-white">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </DialogTitle>
              <DialogDescription>
                {editingPost
                  ? 'Update your blog post below.'
                  : 'Fill in the details to create a new blog post.'}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium mb-2 !text-black dark:!text-white"
                >
                  Title
                </label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Enter post title"
                  className="!text-black dark:!text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block text-sm font-medium mb-2 !text-black dark:!text-white"
                >
                  Date
                </label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className="!text-black dark:!text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium mb-2 !text-black dark:!text-white"
                >
                  Content
                </label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Write your post content here..."
                  className="min-h-[200px] !text-black dark:!text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 !text-black dark:!text-white">
                  Images
                </label>
                <div className="space-y-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    Upload Images
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border border-gray-300 dark:border-white/6"
                          />
                          <button
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={closeEditor}>
                Cancel
              </Button>
              <Button onClick={handleSavePost}>
                {editingPost ? 'Update Post' : 'Create Post'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Post</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this post? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeletingPostId(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}

