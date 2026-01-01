"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, ChevronDown, Facebook, Mail, Github, Linkedin, MessageCircle, LineChart, Pin, ArrowRight, Home, User, Trophy, FolderOpen, BookOpen } from "lucide-react"
import Sidebar from "@/components/sidebar"
import HomePageSkeleton from "@/components/HomePageSkeleton"
import { Audiowide } from "next/font/google"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { allBlogs } from '@/lib/blogs-data'
import { useTheme } from 'next-themes'
import { createThemeRippleEffect } from '@/lib/theme-animation'

const heroFont = Audiowide({ subsets: ["latin"], weight: "400" })

function HeroSlider({ images, interval = 4500 }: { images: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (timerRef.current) window.clearInterval(timerRef.current)
    timerRef.current = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, interval)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
  }, [images.length, interval])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div
        className="h-full flex"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: 'transform 700ms cubic-bezier(.22,.9,.3,1)'
        }}
      >
        {images.map((src, i) => (
          <div
            key={i}
            style={{ flex: '0 0 100%', width: '100%', height: '100%' }}
            aria-hidden={i !== index}
          >
            <img src={src} alt={`slide-${i}`} loading="lazy" className="w-full h-full object-cover block" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [statsCount, setStatsCount] = useState({
    experience: 0,
    certificates: 0,
    projects: 0,
    technologies: 0
  })
  const [startCounting, setStartCounting] = useState(false)
  const [expandedExpertise, setExpandedExpertise] = useState<string[]>([])
  const [timeGreeting, setTimeGreeting] = useState("Hello")
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [featuredScrollPosition, setFeaturedScrollPosition] = useState(0)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollYRef = useRef(0)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const mobileThemeToggleRef = useRef<HTMLButtonElement>(null)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Start counting after page load animation (2 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartCounting(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  // Counting animation effect
  useEffect(() => {
    if (!startCounting) return

    const targetValues = {
      experience: 2,
      certificates: 0,
      projects: 4,
      technologies: 14
    }

    const duration = 1200 // 1.2 seconds for faster counting animation
    const steps = 50 // 50 steps for smooth animation
    const interval = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const progress = currentStep / steps

      setStatsCount({
        experience: Math.floor(targetValues.experience * progress),
        certificates: Math.floor(targetValues.certificates * progress),
        projects: Math.floor(targetValues.projects * progress),
        technologies: Math.floor(targetValues.technologies * progress)
      })

      if (currentStep >= steps) {
        setStatsCount(targetValues)
        clearInterval(timer)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [startCounting])
  
  useEffect(() => {
    const hour = new Date().getHours()
    const greeting =
      hour < 5 || hour >= 18
        ? "Hello, good evening"
        : hour < 12
          ? "Good morning"
          : "Good afternoon"
    setTimeGreeting(greeting)
  }, [])

  // Scroll detection for mobile header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const lastScrollY = lastScrollYRef.current
      
      if (currentScrollY < 10) {
        // At the top, always show header
        setIsHeaderVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past 100px, hide header
        setIsHeaderVisible(false)
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up, show header
        setIsHeaderVisible(true)
      }
      
      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Theme toggle with ripple animation
  const handleMobileThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    createThemeRippleEffect(event, theme, mobileThemeToggleRef)
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const typingMessages = useMemo(
    () => [timeGreeting, "Welcome to my codebase", "I am Sanketh Abilas"],
    [timeGreeting]
  )
  const [typingIndex, setTypingIndex] = useState(0)
  const [typingDirection, setTypingDirection] = useState<"forward" | "backward">("forward")
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const currentMessage = typingMessages[messageIndex]
    const atStart = typingIndex === 0
    const atEnd = typingIndex === currentMessage.length
    const delay = atStart || atEnd ? 1200 : 80

    const timeout = setTimeout(() => {
      if (typingDirection === "forward") {
        if (typingIndex < currentMessage.length) {
          setTypingIndex(typingIndex + 1)
        } else {
          setTypingDirection("backward")
        }
      } else {
        if (typingIndex > 0) {
          setTypingIndex(typingIndex - 1)
        } else {
          setTypingDirection("forward")
          setMessageIndex((messageIndex + 1) % typingMessages.length)
        }
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [typingIndex, typingDirection, messageIndex, typingMessages])

  const toggleExpertise = (id: string) => {
    setExpandedExpertise((prev) => {
      // If clicking on an already expanded section, collapse it
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      }
      // If clicking on a new section, collapse all others and expand only this one
      return [id]
    })
  }

  const scrollFeatured = (direction: 'left' | 'right') => {
    const container = document.getElementById('featured-container')
    if (container) {
      const scrollAmount = 340 // Card width + gap
      const newPosition = direction === 'left' 
        ? Math.max(0, featuredScrollPosition - scrollAmount)
        : featuredScrollPosition + scrollAmount
      
      container.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      })
      setFeaturedScrollPosition(newPosition)
    }
  }

  return (
    <>
      <HomePageSkeleton />
      <div className="min-h-screen !text-black dark:!text-white about-text bg-[#DFEFF5] dark:bg-[#2C2C2C]">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden md:block">
        <Sidebar />
        </div>

      {/* Mobile Layout */}
      <div className="block md:hidden min-h-screen">
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
            <div className="w-8 h-8 rounded-full border-2 border-black/20 dark:border-white/20 overflow-hidden ring-1 ring-black/10 dark:ring-white/10">
              <img 
                src="/sanketh-profile.jpg" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            style={{
              animation: 'fadeIn 0.3s ease-out'
            }}
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
        
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
                  <img src="/sanketh-profile.jpg" alt="Sanketh Abilas" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-xl font-semibold !text-black dark:!text-white">Sanketh Abilas</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Full-Stack Developer</p>
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
                          pathname === item.href ? "text-[#5EA0FF]" : "!text-black dark:!text-white hover:text-[#5EA0FF]"
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
                  ref={mobileThemeToggleRef}
                  data-theme-toggle
                  onClick={handleMobileThemeToggle}
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
              <div className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
                <p>Designed & Built by Sanketh Abilas</p>
                <p>© 2025, All rights reserved.</p>
              </div>
            </div>
          </div>

        {/* Mobile Content */}
        <div className="px-6 pt-6 space-y-6">
          {/* Mobile Hero Banner */}
          <Card className="relative overflow-hidden rounded-2xl border-x-0 border-t border-b border-white/10 shadow-2xl bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] h-80 -mx-2" style={{width: 'calc(100% + 16px)', marginLeft: '-8px', marginRight: '-8px'}}>
              <HeroSlider images={["/hero-1.webp", "/hero-2.webp", "/hero-3.webp"]} interval={4800} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />
            <div className="relative z-10 p-6 h-full flex flex-col">
              <div className={`flex items-center gap-2 !text-white dark:!text-white/80 text-sm font-medium ${heroFont.className} -mt-2`}>
                <Calendar className="w-4 h-4" />
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className="mt-auto">
                <h1 className={`!text-white dark:!text-white text-2xl font-bold tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] ${heroFont.className} flex items-center about-heading`}>
                  <span>{typingMessages[messageIndex].slice(0, typingIndex)}</span>
                  <span className="ml-1 h-[1.2em] border-r-2 border-white/90 animate-pulse" />
                </h1>
              </div>
            </div>
          </Card>

          {/* Mobile Career Stats Section */}
          <div className="rounded-none px-4 py-4 border-x-0 border-t border-b border-gray-300 dark:border-white/10 shadow-lg -mx-6 bg-white dark:bg-[#212121]">
            <h2 className="text-xl font-semibold mb-4 flex items-center !text-black dark:!text-white about-heading">
              <LineChart className="w-7 h-7 mr-3" />
              Career Stats
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  icon: (
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 !text-white dark:!text-white">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  ),
                  value: statsCount.experience,
                  label: "Experience",
                  unit: "years",
                  color: "bg-gradient-to-br from-[#E9D5FF] to-[#8B5CF6]",
                },
                {
                  icon: (
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 !text-white dark:!text-white">
                      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>
                      <circle cx="12" cy="8" r="6"/>
                    </svg>
                  ),
                  value: statsCount.certificates,
                  label: "Certificates",
                  unit: "",
                  color: "bg-gradient-to-br from-[#FFD6A5] to-[#FF8C5A]",
                },
                {
                  icon: (
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 !text-white dark:!text-white">
                      <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"/>
                      <circle cx="13" cy="12" r="2"/>
                      <path d="M18 19c-2.8 0-5-2.2-5-5v8"/>
                      <circle cx="20" cy="19" r="2"/>
                    </svg>
                  ),
                  value: statsCount.projects,
                  label: "Projects",
                  unit: "",
                  color: "bg-gradient-to-br from-[#00D5C5] to-[#02B5E1]",
                },
                {
                  icon: (
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 !text-white dark:!text-white">
                      <polyline points="16 18 22 12 16 6"/>
                      <polyline points="8 6 2 12 8 18"/>
                    </svg>
                  ),
                  value: statsCount.technologies,
                  label: "Technologies",
                  unit: "",
                  color: "bg-gradient-to-br from-[#00C6FF] to-[#4A00E0]",
                },
              ].map((stat, index) => (
                <Card key={index} className="bg-[#F5F5F5] dark:bg-[#313131] p-3.5 text-left border border-gray-300 dark:border-white/10 rounded-2xl shadow-lg h-28 flex flex-col">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-lg` }>
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold !text-black dark:!text-white">
                      {stat.value} <span className="text-base font-normal">{stat.unit}</span>
                    </div>
                  </div>
                  <div className="mt-auto text-black dark:text-gray-300 text-base font-medium">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>



          {/* Mobile Skill Set */}
          <div className="rounded-none p-4 border-x-0 border-t border-b border-gray-300 dark:border-white/10 shadow-lg -mx-6 bg-white dark:bg-[#212121]">
            <h3 className="text-lg font-semibold mb-3 flex items-center !text-black dark:!text-white">
              <svg className="w-6 h-6 mr-2 !text-black dark:!text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="8" r="2"/>
                <circle cx="6" cy="16" r="2"/>
                <circle cx="18" cy="12" r="2"/>
                <line x1="6" y1="8" x2="6" y2="16"/>
                <line x1="6" y1="8" x2="18" y2="12"/>
              </svg>
              Skill Set
            </h3>
            <div className="space-y-3">
              {(() => {
                const iconUrl = (name: string) =>
                  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`

                const rows: string[][] = [
                  [
                    "html5",
                    "css3",
                    "javascript",
                    "typescript",
                    "react",
                    "nextjs",
                    "vuejs",
                    "tailwindcss",
                    "nodejs",
                  ],
                  [
                    "java",
                    "python",
                    "docker",
                    "git",
                    "github",
                    "mongodb",
                    "firebase",
                    "figma",
                    "sass",
                  ],
                ]

                return rows.map((row, i) => (
                  <div key={i} className="overflow-hidden py-2">
                    <div className={`marquee-track ${i % 2 === 0 ? "animate-marquee-left" : "animate-marquee-right"} gap-6`}> 
                      {[...row, ...row, ...row].map((name, idx) => (
                        <div key={idx} className="px-1 py-1 shrink-0">
                          <img src={iconUrl(name)} alt={name} className="h-10 w-auto object-contain" />
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              })()}
            </div>
          </div>

          {/* Mobile Expertise */}
          <div className="rounded-none p-6 border-x-0 border-t border-b border-gray-300 dark:border-white/10 shadow-lg -mx-6 -mt-2 bg-white dark:bg-[#212121]">
            <h3 className="text-lg font-semibold mb-4 flex items-center !text-black dark:!text-white">
              <svg className="w-6 h-6 mr-2 !text-black dark:!text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
                <path d="m9 12 2 2 4-4"/>
              </svg>
              Expertise
            </h3>
            <div className="space-y-3">
              {[
                { 
                  id: "web-dev", 
                  label: "Web Development", 
                  description: "I build modern web applications using React and full-stack JavaScript technologies. From responsive landing pages to scalable platforms, I focus on clean code, performance, and reliability to deliver applications that look great and work seamlessly.",
                  icon: (
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <text x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold">&lt;&gt;</text>
                    </svg>
                  ), 
                  color: "bg-gradient-to-br from-[#E0BBE4] to-[#957DAD]" 
                },
                { 
                  id: "graphic", 
                  label: "Graphic Design", 
                  description: "I create clean, visually appealing designs that clearly communicate a brand’s identity. From logos and social media creatives to marketing materials, I combine creativity with consistency and professionalism.",
                  icon: (
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 21l9-9 9 9"/>
                      <path d="M12 3v18"/>
                      <path d="M3 12h18"/>
                    </svg>
                  ), 
                  color: "bg-gradient-to-br from-[#FFD1A0] to-[#FFA07A]"  
                },
                { 
                  id: "marketing", 
                  label: "Digital Marketing", 
                  description: "I provide result-driven digital marketing solutions to improve online visibility and engagement. From SEO basics to social media strategy, I help businesses connect with the right audience and grow their digital presence.",
                  icon: (
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                  ), 
                  color: "bg-gradient-to-br from-[#66D9EF] to-[#3498DB]"  
                },
                { 
                  id: "ui-ux", 
                  label: "UI / UX Design", 
                  description: "I design user-centered interfaces that are intuitive, accessible, and visually balanced. My focus is on usability and smooth user journeys, ensuring every interaction feels simple, clear, and engaging.",
                  icon: (
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="6" cy="8" r="2"/>
                      <circle cx="6" cy="16" r="2"/>
                      <circle cx="18" cy="12" r="2"/>
                      <circle cx="12" cy="20" r="2"/>
                      <line x1="6" y1="8" x2="6" y2="16"/>
                      <line x1="6" y1="8" x2="18" y2="12"/>
                      <line x1="6" y1="8" x2="12" y2="20"/>
                    </svg>
                  ), 
                  color: "bg-gradient-to-br from-[#4A90E2] to-[#6A5ACD]"  
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F5F5F5] dark:bg-[#202020] rounded-xl transition-all duration-300 cursor-pointer border-b border-gray-300 dark:border-white/10 shadow-sm hover:shadow-md"
                  onClick={() => toggleExpertise(item.id)}
                >
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mr-3`}
                      >
                        {item.icon}
                      </div>
                      <span className="!text-black dark:!text-white font-medium">{item.label}</span>
                    </div>
                    <ChevronDown 
                      className={`w-4 h-4 text-gray-400 transition-transform ${expandedExpertise.includes(item.id) ? 'rotate-180' : ''}`}
                      style={{
                        transitionDuration: '0.6s',
                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                  </div>
                  <div 
                    className={`overflow-hidden ${expandedExpertise.includes(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                    style={{
                      transition: 'max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                  >
                    <div className="px-4 pb-4">
                      <p className="!text-black dark:!text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Get in Touch */}
          <div className="rounded-none p-6 border-x-0 border-t border-b border-white/10 dark:border-white/10 border-gray-300 shadow-lg -mx-6 dark:bg-[#212121] bg-white">
            <h3 className="text-lg font-semibold mb-4 flex items-center !text-black dark:!text-white">
              <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2 !text-black dark:!text-white">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
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
                  className="w-14 h-14 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="!text-black dark:!text-white">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Let's build something great together — feel free to connect with me through any of the platforms above.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block ml-72 p-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Hero Banner */}
            <Card className="relative mb-3 overflow-hidden rounded-2xl p-0 border border-gray-300 dark:border-white/10 shadow-lg bg-[#DFEFF5] dark:bg-[#212121] h-60 md:h-72 lg:h-80">
              <HeroSlider images={["/hero-1.webp", "/hero-2.webp", "/hero-3.webp"]} interval={4800} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />
              <div className="relative z-10 p-5 h-full flex flex-col">
                <div className={`flex items-center gap-2 !text-white dark:!text-white/90 text-base md:text-lg ${heroFont.className}`}>
                  <Calendar className="w-5 h-5" />
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'short', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="mt-auto">
                  <h1 className={`!text-white dark:!text-white text-2xl md:text-3xl lg:text-4xl font-bold tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] ${heroFont.className} flex items-center`}>
                    <span>{typingMessages[messageIndex].slice(0, typingIndex)}</span>
                    <span className="ml-1 h-[1.2em] border-r-2 border-white/80 animate-pulse" />
                  </h1>
                </div>
              </div>
            </Card>

            {/* Career Stats */}
            <div className="mb-3 rounded-2xl p-4 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
              <h2 className="text-xl font-semibold mb-4 flex items-center !text-black dark:!text-white">
                <LineChart className="w-7 h-7 mr-3" />
                Career Stats
              </h2>
              <div className="grid grid-cols-4 gap-3">
                {[
                  {
                icon: (
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 !text-white dark:!text-white">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
                value: statsCount.experience,
                label: "Experience",
                unit: "years",
                color: "bg-gradient-to-br from-[#E9D5FF] to-[#8B5CF6]",
              },
              {
                icon: (
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 !text-white dark:!text-white">
                    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"/>
                    <circle cx="12" cy="8" r="6"/>
                  </svg>
                ),
                value: statsCount.certificates,
                label: "Certificates",
                unit: "",
                color: "bg-gradient-to-br from-[#FFD6A5] to-[#FF8C5A]",
              },
              {
                icon: (
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 !text-white dark:!text-white">
                    <path d="M9 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v5"/>
                    <circle cx="13" cy="12" r="2"/>
                    <path d="M18 19c-2.8 0-5-2.2-5-5v8"/>
                    <circle cx="20" cy="19" r="2"/>
                  </svg>
                ),
                value: statsCount.projects,
                label: "Projects",
                unit: "",
                color: "bg-gradient-to-br from-[#00D5C5] to-[#02B5E1]",
              },
              {
                icon: (
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 !text-white dark:!text-white">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                ),
                value: statsCount.technologies,
                label: "Technologies",
                unit: "",
                color: "bg-gradient-to-br from-[#00C6FF] to-[#4A00E0]",
              },
            ].map((stat, index) => (
              <Card key={index} className="bg-[#F5F5F5] dark:bg-[#313131] p-3.5 text-left border border-gray-300 dark:border-white/10 rounded-2xl shadow-lg h-28 flex flex-col">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 ${stat.color} rounded-xl flex items-center justify-center shadow-lg` }>
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold !text-black dark:!text-white">
                    {stat.value} <span className="text-sm font-normal">{stat.unit}</span>
                  </div>
                </div>
                <div className="mt-auto text-black dark:text-gray-300 text-base font-medium">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>


          </div>

          {/* Right Sidebar */}
          <div className="w-96 space-y-6">
            <div className="rounded-2xl p-4 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
              <h3 className="text-lg font-semibold mb-3 flex items-center !text-black dark:!text-white">
                <svg className="w-6 h-6 mr-2 !text-black dark:!text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="6" cy="8" r="2"/>
                  <circle cx="6" cy="16" r="2"/>
                  <circle cx="18" cy="12" r="2"/>
                  <line x1="6" y1="8" x2="6" y2="16"/>
                  <line x1="6" y1="8" x2="18" y2="12"/>
                </svg>
                Skill Set
              </h3>
          <div className="space-y-3">
            {(() => {
              const iconUrl = (name: string) =>
                `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-original.svg`

              const rows: string[][] = [
                [
                  "html5",
                  "css3",
                  "javascript",
                  "typescript",
                  "react",
                  "nextjs",
                  "vuejs",
                  "tailwindcss",
                  "nodejs",
                ],
                [
                  "java",
                  "python",
                  "docker",
                  "git",
                  "github",
                  "mongodb",
                  "firebase",
                  "figma",
                  "sass",
                ],
              ]

              return rows.map((row, i) => (
                <div key={i} className="overflow-hidden py-2">
                  <div className={`marquee-track ${i % 2 === 0 ? "animate-marquee-left" : "animate-marquee-right"} gap-6`}> 
                    {[...row, ...row, ...row].map((name, idx) => (
                      <div key={idx} className="px-1 py-1 shrink-0">
                        <img src={iconUrl(name)} alt={name} className="h-10 w-auto object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            })()}
          </div>
        </div>

        <div className="rounded-2xl p-6 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
          <h3 className="text-lg font-semibold mb-4 flex items-center !text-black dark:!text-white">
            <svg className="w-6 h-6 mr-2 !text-black dark:!text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            Expertise
          </h3>
          <div className="space-y-0">
            {[
              { 
                id: "web-dev", 
                label: "Web Development", 
                description: "I build web apps from scratch using React – clean, responsive, and built to perform. Whether it's a landing page or a full-scale platform, I make sure it looks great and works even better.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <text fill="white" x="12" y="16" textAnchor="middle" fontSize="12" fontWeight="bold">&lt;&gt;</text>
                  </svg>
                ), 
                color: "bg-gradient-to-br from-[#E0BBE4] to-[#957DAD]" 
              },
              { 
                id: "graphic", 
                label: "Graphic Design", 
                description: "Creating visually stunning designs that communicate your brand's message effectively. From logos to marketing materials, I bring creativity and professionalism to every project.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path stroke="white" d="M3 21l9-9 9 9"/>
                    <path stroke="white" d="M12 3v18"/>
                    <path stroke="white" d="M3 12h18"/>
                  </svg>
                ), 
                color: "bg-gradient-to-br from-[#FFD1A0] to-[#FFA07A]" 
              },
              { 
                id: "marketing", 
                label: "Digital Marketing", 
                description: "Strategic digital marketing solutions that drive growth and engagement. From SEO optimization to social media campaigns, I help businesses reach their target audience effectively.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle stroke="white" cx="11" cy="11" r="8"/>
                    <path stroke="white" d="m21 21-4.35-4.35"/>
                  </svg>
                ), 
                color: "bg-gradient-to-br from-[#66D9EF] to-[#3498DB]" 
              },
              { 
                id: "ui-ux", 
                label: "UI / UX Design", 
                description: "User-centered design that creates intuitive and engaging experiences. I focus on usability, accessibility, and visual appeal to deliver interfaces that users love to interact with.",
                icon: (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle stroke="white" cx="6" cy="8" r="2"/>
                    <circle stroke="white" cx="6" cy="16" r="2"/>
                    <circle stroke="white" cx="18" cy="12" r="2"/>
                    <circle stroke="white" cx="12" cy="20" r="2"/>
                    <line stroke="white" x1="6" y1="8" x2="6" y2="16"/>
                    <line stroke="white" x1="6" y1="8" x2="18" y2="12"/>
                    <line stroke="white" x1="6" y1="8" x2="12" y2="20"/>
                  </svg>
                ), 
                color: "bg-gradient-to-br from-[#4A90E2] to-[#6A5ACD]" 
              },
            ].map((item) => (
              <div
                key={item.id}
                className="bg-[#F5F5F5] dark:bg-[#202020] rounded-lg transition-all duration-300 cursor-pointer border-b border-gray-300 dark:border-[#333333] last:border-b-0 hover:shadow-md"
                onClick={() => toggleExpertise(item.id)}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center mr-3`}
                    >
                      {item.icon}
                    </div>
                    <span className="!text-black dark:!text-white font-medium">{item.label}</span>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedExpertise.includes(item.id) ? 'rotate-180' : ''}`}
                    style={{
                      transitionDuration: '0.6s',
                      transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  />
                </div>
                <div 
                  className={`overflow-hidden ${expandedExpertise.includes(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                  style={{
                    transition: 'max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div className="px-4 pb-4">
                    <p className="!text-black dark:!text-gray-300 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

  <div className="rounded-2xl p-6 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
          <h3 className="text-lg font-semibold mb-4 flex items-center !text-black dark:!text-white">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mr-2 !text-black dark:!text-white">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
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
                link: "https://www.facebook.com/rajintha.vehan"
              },
              { 
                icon: (
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="w-6 h-6">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                ), 
                color: "hover:text-red-500",
                link: "mailto:vehanrajintha17@gmail.com"
              },
              { 
                icon: (
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 496 512" className="w-6 h-6">
                    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                  </svg>
                ), 
                color: "hover:text-gray-300",
                link: "https://github.com/VehanRajintha"
              },
              { 
                icon: (
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-6 h-6">
                    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
                  </svg>
                ), 
                color: "hover:text-blue-400",
                link: "https://www.linkedin.com/in/vehanrajintha/"
              },
              { 
                icon: (
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" className="w-6 h-6">
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                  </svg>
                ), 
                color: "hover:text-green-500",
                link: "https://wa.link/690up4"
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-white/10 transition-colors"
              >
                <div className="!text-black dark:!text-white">
                  {social.icon}
                </div>
              </a>
            ))}
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Let's build something great together — feel free to connect with me through any of the platforms above.
          </p>
        </div>
        </div>
        </div>
      </div>
      </div>
    </>
  )
}
