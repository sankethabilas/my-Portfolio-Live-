"use client"

import { Clock, Pencil, ChevronLeft, ChevronRight, Facebook, Mail, Github, Linkedin, MessageCircle, Home, User, Trophy, FolderOpen, BookOpen } from "lucide-react"
import Sidebar from "@/components/sidebar"
import PageLoader from "@/components/PageLoader"
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { allBlogs, getRecentBlogs } from '@/lib/blogs-data'
import { useTheme } from 'next-themes'

export default function BlogsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollYRef = useRef(0)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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
  const blogPosts = allBlogs.filter(post => post.id !== 1)
  const recentPosts = getRecentBlogs()


  return (
    <>
      <PageLoader />
      <div className="min-h-screen !text-black dark:!text-white about-text bg-[#DFEFF5] dark:bg-[#2C2C2C]">
        {/* Desktop Layout */}
      <div className="hidden lg:flex gap-6 p-6">
      <Sidebar />

      {/* Main Content */}
      <div className="overflow-y-auto md:ml-68">
          <div className="flex gap-3">
          {/* Left Content */}
          <div className="flex-1 space-y-6 p-0">
            {/* Blogs Section */}
            <section 
              className="bg-white dark:bg-[#212121] p-6 border border-gray-300 dark:border-white/6 shadow-lg"
              style={{
                width: '750px',
                minHeight: '829.873px',
                borderRadius: '12px'
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Pencil className="w-6 h-6" />
                <h2 className="text-xl font-bold !text-black dark:!text-white">Blogs</h2>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 dark:text-gray-400 italic font-medium">Content cleared at user request.</p>
              </div>
            </section>

            {/* Get in Touch Section */}
            <section className="bg-white dark:bg-[#212121] rounded-2xl p-6 border border-gray-300 dark:border-white/6 shadow-lg mt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center !text-black dark:!text-white">
                <img src="/mailbox.svg" alt="Mailbox" className="w-6 h-6 mr-2 dark:brightness-0 dark:invert" />
                Get in touch
              </h3>
              <div className="flex gap-2 mb-4">
                {[
                  { 
                    icon: (
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-6 h-6">
                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                      </svg>
                    ), 
                    color: "hover:text-blue-500",
                    link: "https://web.facebook.com/sanketh.abilas.2025/"
                  },
                  { 
                    icon: (
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-6 h-6">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    ), 
                    color: "hover:text-red-500",
                    link: "mailto:sankethmarasingha@gmail.com"
                  },
                  { 
                    icon: (
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" className="w-6 h-6">
                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                      </svg>
                    ), 
                    color: "hover:text-gray-300",
                    link: "https://github.com/sankethabilas"
                  },
                  { 
                    icon: (
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-6 h-6">
                        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                      </svg>
                    ), 
                    color: "hover:text-blue-400",
                    link: "https://www.linkedin.com/in/sanketh-abilas-567569322/"
                  },
                  { 
                    icon: (
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-6 h-6">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                      </svg>
                    ), 
                    color: "hover:text-green-500",
                    link: "https://wa.me/94719604194"
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-white/10"
                    style={{
                      transition: 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease-out'
                    }}
                  >
                    <div className="text-black dark:text-white">
                      {social.icon}
                    </div>
                  </a>
                ))}
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Let's build something great together — feel free to connect with me through any of the platforms above.
              </p>
            </section>
          </div>

          {/* Right Sidebar - Recent Posts */}
          <div className="flex-shrink-0">
            <section 
              className="bg-white dark:bg-[#212121] p-6 border border-gray-300 dark:border-white/6 shadow-lg"
              style={{
                width: '386.902px',
                height: '959.194px',
                borderRadius: '12px'
              }}
            >
              <div className="flex items-center gap-2 mb-6">
                <Clock className="w-6 h-6 !text-black dark:!text-white" />
                <h2 className="text-xl font-bold !text-black dark:!text-white">Recent Posts</h2>
              </div>

              <div className="mb-6">
                <p className="text-gray-500 dark:text-gray-400 italic">Content cleared at user request.</p>
              </div>
            </section>
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
            willChange: 'transform'
          }}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <button 
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="w-8 h-8 flex flex-col items-center justify-center space-y-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className={`w-4 h-0.5 bg-black dark:bg-white transition-all duration-300 ${isMobileSidebarOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
              <div className={`w-4 h-0.5 bg-black dark:bg-white transition-all duration-300 ${isMobileSidebarOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
            </button>
            <div className="w-8 h-8 rounded-full border-2 border-white/20 overflow-hidden ring-1 ring-white/10">
              <img 
                src="https://github.com/VehanRajintha.png" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        <div 
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
          style={{
            opacity: isMobileSidebarOpen ? 1 : 0,
            visibility: isMobileSidebarOpen ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease-out, visibility 0.3s ease-out'
          }}
          onClick={() => setIsMobileSidebarOpen(false)}
        />
        
        {/* Mobile Sidebar */}
        <div 
          className="fixed left-0 top-0 h-full w-72 z-50 bg-[#DFEFF5] dark:bg-[#212121] shadow-2xl"
          style={{
            transform: isMobileSidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
            willChange: 'transform'
          }}
        >
          <div 
            className="w-full h-full p-4 flex flex-col border-r border-gray-300 dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
              {/* Mobile Sidebar Content */}
              <div className="flex flex-col items-start mb-5 pl-2">
                <div className="w-28 h-28 mb-4 rounded-full overflow-hidden">
                  <img src="https://github.com/VehanRajintha.png" alt="Vehan Rajintha" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-xl font-semibold !text-black dark:!text-white">Vehan Rajintha</h2>
                <p className="!text-gray-600 dark:!text-gray-400 text-sm">Full-Stack Developer</p>
              </div>

              {/* Resume Button */}
              <div className="mb-4 flex justify-center">
                <a
                  href="/resume"
                  className="flex items-center justify-center rounded-lg transition-colors w-full h-9 bg-gray-200 hover:bg-gray-300 dark:bg-[#141414] dark:hover:bg-[#2A2A2A] text-gray-800 dark:text-[#D9D9D9] border border-gray-300 dark:border-white/40"
                  style={{
                    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                    fontSize: '14.4px',
                    fontWeight: '400',
                    borderRadius: '8px'
                  }}
                >
                  <svg className="mr-1.5" style={{width: '14.4px', height: '14.4px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume
                </a>
              </div>

              {/* Navigation */}
              <nav className="flex-1 overflow-auto mb-4">
                <ul className="space-y-2">
                  {[
                    { id: "home", icon: Home, label: "Home", href: "/" },
                    { id: "about", icon: User, label: "About", href: "/about" },
                    { id: "achievements", icon: Trophy, label: "Achievements", href: "/achievements" },
                    { id: "projects", icon: FolderOpen, label: "Projects", href: "/projects" },
                    { id: "blogs", icon: BookOpen, label: "Blogs", href: "/blogs" },
                  ].map((item) => (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        className={`w-full flex items-center px-4 py-2 rounded-xl text-left transition-colors ${
                          pathname === item.href ? "text-[#5EA0FF]" : "!text-black dark:!text-white hover:!text-blue-500 dark:hover:!text-blue-400"
                        }`}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </a>
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
                        <svg className="w-4 h-4 text-gray-800 dark:text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-gray-800 dark:text-white/90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                    </span>
                    <span className="text-base text-gray-800 dark:text-white">
                      {mounted && theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                    </span>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-colors ${
                    mounted && theme === 'dark' ? 'bg-[#5EA0FF]' : 'bg-gray-400'
                  }`}>
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${
                      mounted && theme === 'dark' ? 'right-0.5' : 'left-0.5'
                    }`}></div>
                  </div>
                </button>
              </div>

              {/* Footer */}
              <div className="text-xs !text-gray-400 dark:!text-gray-400 leading-relaxed mt-2">
                <p>Designed & Built by Vehan Rajintha</p>
                <p>© 2025, All rights reserved.</p>
              </div>
            </div>
          </div>

        {/* Mobile Content */}
        <div className="lg:hidden space-y-4">
          {/* Mobile Blogs Section */}
          <div className="rounded-none p-6 border-x-0 border-t border-b border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
            <div className="flex items-center gap-3 mb-4">
              <Pencil className="w-5 h-5 !text-black dark:!text-white" />
              <h2 className="text-lg font-bold !text-black dark:!text-white">Blogs</h2>
            </div>

            {/* Featured Blog (Large) */}
            <div className="mb-4">
               <p className="text-gray-500 dark:text-gray-400 italic">Content cleared at user request.</p>
            </div>

            {/* Two Smaller Blogs in Grid */}
            <div className="mb-4">
              {/* Content cleared */}
            </div>
          </div>

          {/* Mobile Get in Touch */}
          <div className="rounded-none p-6 border-x-0 border-t border-b border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
            <h3 className="text-lg font-semibold mb-4 flex items-center !text-black dark:!text-white">
              <img src="/mailbox.svg" alt="Mailbox" className="w-6 h-6 mr-2 dark:brightness-0 dark:invert" />
              Get in touch
            </h3>
              <div className="flex gap-2 mb-4">
                {[
                  { 
                    icon: (
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className="w-6 h-6">
                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
                      </svg>
                    ), 
                    color: "hover:text-blue-500",
                    link: "https://web.facebook.com/sanketh.abilas.2025/"
                  },
                  { 
                    icon: (
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-6 h-6">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    ), 
                    color: "hover:text-red-500",
                    link: "mailto:sankethmarasingha@gmail.com"
                  },
                  { 
                    icon: (
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" className="w-6 h-6">
                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                      </svg>
                    ), 
                    color: "hover:text-gray-300",
                    link: "https://github.com/sankethabilas"
                  },
                  { 
                    icon: (
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-6 h-6">
                        <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                      </svg>
                    ), 
                    color: "hover:text-blue-400",
                    link: "https://www.linkedin.com/in/sanketh-abilas-567569322/"
                  },
                  { 
                    icon: (
                      <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-6 h-6">
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                      </svg>
                    ), 
                    color: "hover:text-green-500",
                    link: "https://wa.me/94719604194"
                  },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-white/10"
                    style={{
                      transition: 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s ease-out'
                    }}
                  >
                    <div className="text-black dark:text-white">
                      {social.icon}
                    </div>
                  </a>
                ))}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Let's build something great together — feel free to connect with me through any of the platforms above.
            </p>
          </div>

          {/* Mobile Recent Posts */}
          <div className="rounded-none p-6 border-x-0 border-t border-b border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 !text-black dark:!text-white" />
              <h2 className="text-lg font-bold !text-black dark:!text-white">Recent Posts</h2>
            </div>

            <div className="space-y-4">
              {recentPosts.map((post) => (
                <Link 
                  key={post.id} 
                  href={(post as any).slug ? `/blogs/${(post as any).slug}` : '#'}
                >
                  <div className="cursor-pointer group" style={{ borderRadius: '16px' }}>
                    {/* Full-width Image */}
                    <div className="relative overflow-hidden w-full aspect-[4/3]" style={{ borderRadius: '16px' }}>
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover will-change-transform"
                        style={{ 
                          borderRadius: '16px',
                          transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                          willChange: 'transform'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.08)';
                          e.currentTarget.style.filter = 'brightness(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.filter = 'brightness(1)';
                        }}
                      />
                    </div>
                  
                    {/* Content Below Image */}
                    <div className="mt-3">
                        <div className="flex items-center gap-1 mb-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-gray-400 text-xs">{post.date}</span>
                        </div>
                        <h3 
                          className="!text-black dark:!text-white line-clamp-2"
                        style={{ 
                          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                          fontSize: '16px',
                          lineHeight: '22px',
                          fontWeight: '700',
                          letterSpacing: 'normal'
                        }}
                      >
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Mobile Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6">
              <button 
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#2a2a2a]"
                style={{ transition: 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <ChevronLeft className="w-4 h-4 !text-black dark:!text-gray-400" />
              </button>
              
              <div className="flex gap-2">
                <button 
                  className="w-10 h-10 rounded-lg bg-transparent border-2 border-blue-500 !text-black dark:!text-white font-medium flex items-center justify-center text-sm hover:bg-blue-500/10"
                  style={{ transition: 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                >
                  1
                </button>
                <button 
                  className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#1a1a1a] !text-black dark:!text-gray-400 font-medium flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#2a2a2a] text-sm"
                  style={{ transition: 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                >
                  2
                </button>
                <button 
                  className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#1a1a1a] !text-black dark:!text-gray-400 font-medium flex items-center justify-center hover:bg-gray-200 dark:hover:bg-[#2a2a2a] text-sm"
                  style={{ transition: 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
                >
                  3
                </button>
              </div>
              
              <button 
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-[#1a1a1a] hover:bg-gray-200 dark:hover:bg-[#2a2a2a]"
                style={{ transition: 'background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                <ChevronRight className="w-4 h-4 !text-black dark:!text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}