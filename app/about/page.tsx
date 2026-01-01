"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ExternalLink, MapPin, GraduationCap, Award, Briefcase, Mail, User, Facebook, Github, Linkedin, MessageCircle, Menu, Pin, Clock, ArrowRight, Home, Trophy, FolderOpen, BookOpen } from "lucide-react"
import Sidebar from "@/components/sidebar"
import PageLoader from "@/components/PageLoader"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { certifications } from "@/lib/certifications-data"
import { allBlogs } from '@/lib/blogs-data'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { createThemeRippleEffect } from '@/lib/theme-animation'

export default function AboutPage() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isZoomOpen, setIsZoomOpen] = useState(false)
  const [isZoomVisible, setIsZoomVisible] = useState(false)
  const [startTx, setStartTx] = useState(0)
  const [startTy, setStartTy] = useState(0)
  const [startScale, setStartScale] = useState(0.9)
  const [featuredScrollPosition, setFeaturedScrollPosition] = useState(0)
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const lastScrollYRef = useRef(0)
  const [expandedEducation, setExpandedEducation] = useState<{[key: string]: boolean}>({
    sliit: false,
    al: false,
    ol: false
  })
  const [expandedExperience, setExpandedExperience] = useState<{[key: string]: boolean}>({
    ieee: false,
    cypsolab: false,
    girlscript: false
  })
  const avatarRef = useRef<HTMLDivElement | null>(null)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const themeToggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsZoomOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
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

  // When modal opens, defer setting `isZoomVisible` to allow transition to run
  useEffect(() => {
    let t: number | undefined
    if (isZoomOpen) {
      // small delay to ensure initial styles are rendered before transition
      t = window.setTimeout(() => setIsZoomVisible(true), 10)
    } else {
      setIsZoomVisible(false)
    }
    return () => { if (t) clearTimeout(t) }
  }, [isZoomOpen])

  // Close helper: animate out then unmount
  const closeZoom = () => {
    setIsZoomVisible(false)
    // wait for animation out to finish before unmounting
    setTimeout(() => setIsZoomOpen(false), 380)
  }

  const shortContent = "I am a motivated and versatile individual, always eager to take on new challenges. With a passion for learning I am dedicated to delivering high-quality results."

  const fullContent = (
    <>
      I am a motivated and versatile individual, always eager to take on new challenges. With a passion for learning I am dedicated to delivering high-quality results. With a positive attitude and a growth mindset, I am ready to make a meaningful contribution and achieve great things.
    </>
  )

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

  const toggleEducationExpansion = (key: string) => {
    setExpandedEducation(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const toggleExperienceExpansion = (key: string) => {
    setExpandedExperience(prev => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  return (
    <>
      <PageLoader />
      <div className="min-h-screen text-black dark:text-white about-text bg-[#DFEFF5] dark:bg-[#2C2C2C]">
        {/* Mobile Header */}
        <div 
          className="lg:hidden sticky top-0 z-40 border-b border-gray-300 dark:border-white/10 backdrop-blur-sm bg-[#DFEFF5] dark:bg-[#212121]"
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
            className="lg:hidden fixed inset-0 z-50 bg-black/20 backdrop-blur-sm"
            style={{
              animation: 'fadeIn 0.3s ease-out'
            }}
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
        
        {/* Mobile Sidebar */}
        <div 
          className="lg:hidden fixed left-0 top-0 h-full w-72 z-50 bg-[#DFEFF5] dark:bg-[#212121] shadow-2xl"
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
              <h2 className="text-xl font-semibold text-black dark:text-white">Sanketh Abilas</h2>
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
                        pathname === item.href ? "text-[#5EA0FF]" : "text-black dark:text-white hover:text-[#5EA0FF]"
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
                ref={themeToggleRef}
                data-theme-toggle
                onClick={(e) => {
                  createThemeRippleEffect(e, theme, themeToggleRef)
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                }}
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

        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-6 p-6">
          <Sidebar />
          <main className="flex-1 overflow-y-auto ml-68">
            {/* Hero (updated to match screenshot) */}
            <section className="relative h-72 rounded-2xl overflow-hidden mb-6 max-w-4xl ml-4 border border-white/10 shadow-lg">
          {/* Split banner: top half image, bottom half solid background */}
          <div className="absolute inset-0 flex flex-col">
            {/* Top: image (50%) */}
            <div className="w-full h-1/2 relative">
              <Image src="/about-hero.png" alt="banner" width={3763} height={2508} className="object-cover w-full h-full opacity-100" />
            </div>

            {/* Bottom: solid background matching Education card - contains the content so text sits fully on dark area */}
            <div className="w-full h-1/2 bg-white dark:bg-[#212121] rounded-b-2xl border-t border-gray-300 dark:border-white/6 relative">
              <div className="absolute left-40 right-6 top-2">
                  <h1 className="text-xl font-bold !text-black dark:!text-white">Sanketh Abilas</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">Full-Stack Developer</p>

                <div className="mt-4">
                  <Button size="sm" style={{ width: '117.26px', height: '36.2484px' }} className="mb-4 bg-gray-100 dark:bg-[#1F1F1F] hover:bg-gray-200 dark:hover:bg-[#2A2A2A] text-black dark:text-white border border-gray-300 dark:border-white shadow-lg rounded-xl flex items-center justify-center gap-2">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" className=""/>
                      <path d="m21.854 2.147-10.94 10.939" className=""/>
                    </svg>
                    <span className="select-none">Message</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar overlapping the split (click to zoom) */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 -translate-y-10">
            <div
              role="button"
              ref={avatarRef}
              tabIndex={0}
              onClick={() => {
                const rect = avatarRef.current?.getBoundingClientRect()
                if (rect) {
                    setStartTx(rect.left + rect.width / 2)
                    setStartTy(rect.top + rect.height / 2)
                    setStartScale(rect.width / 640)
                }
                setIsZoomOpen(true)
              }}
                className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-black shadow-lg bg-gray-800 cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <Image src="/sanketh-profile.jpg" alt="Sanketh Abilas" width={112} height={112} className="object-cover" />
            </div>
          </div>
        </section>

        {/* About card (matches screenshot) */}
        <section className="mb-6 ml-4 max-w-4xl">
          <div className="rounded-2xl p-4 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
            <h3 className="text-xl font-semibold mb-2 flex items-center !text-black dark:!text-white about-heading"><User className="w-5 h-5 mr-3 !text-black dark:!text-white" /> About</h3>
            <div className="!text-black dark:!text-white">
              <p className="!text-black dark:!text-white about-text leading-relaxed">
                {isExpanded ? fullContent : shortContent}
                {!isExpanded && (
                  <span>... </span>
                )}
              </p>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors mt-2 inline-block"
              >
                {isExpanded ? 'View less' : 'View more'}
              </button>
            </div>
          </div>
        </section>
        {/* Featured Projects */}
        <div className="mb-6 ml-4 rounded-2xl p-5 border border-gray-300 dark:border-white/10 shadow-lg relative bg-white dark:bg-[#212121]">
          <h2 className="text-xl font-semibold mb-5 flex items-center !text-black dark:!text-white">
            <Pin className="w-7 h-7 mr-3 !text-black dark:!text-white" />
            Featured
          </h2>
          
          <div className="!text-black dark:!text-white p-4 text-center text-sm text-gray-500">
            Content cleared at user request.
          </div>
            </div>

        {/* Certificates */}
        <section className="mb-8 ml-4">
          <div
            className="rounded-2xl p-4 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]"
            style={{
              borderRadius: '12px',
              fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
              fontSize: '16px',
              lineHeight: 'normal',
              fontWeight: 400,
            }}
          >
            <div className="flex items-center mb-3">
              <GraduationCap className="w-5 h-5 mr-2 !text-black dark:!text-white" />
              <h3 className="text-xl font-bold !text-black dark:!text-white">Certificates</h3>
            </div>

          </div>
        </section>

        {/* Contact (moved into aside) */}

      </main>

      <aside className="w-[35rem] p-6 pl-0.5 pr-0.5 ml-1 -mt-8">
        {/* Education card */}
  <div className="mb-4 rounded-2xl p-6 mt-2 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
          <h3 className="font-bold mb-2 flex items-center !text-black dark:!text-white about-heading">
            <svg className="w-5 h-5 mr-2 !text-black dark:!text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Education
          </h3>
          <div className="mb-0 py-4">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <Image src="/sliit.png" alt="SLIIT logo" width={48} height={48} className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold !text-black dark:!text-white mb-1 main-heading">Bachelor of Science (BSc) in Information Technology</h4>
                <p className="!text-black dark:!text-white mb-1 subheading">Sri Lanka Institute of Information Technology (SLIIT), Malabe</p>
                <p className="!text-black dark:!text-white mb-1 subheading">Specialization: Data Science</p>
                <div className="flex items-center mb-1 about-text time-text" style={{ color: '#999999' }}><Calendar className="w-4 h-4 mr-1" /> Nov 2023 – 2026</div>
                <p className="!text-black dark:!text-white mb-1 description">
                  {expandedEducation.sliit ? (
                    <>
                      Currently pursuing a Bachelor’s degree in Information Technology with a specialization in Data Science at SLIIT, Malabe. The program provides a strong foundation in core IT disciplines, including computer networks, system administration, cybersecurity, software development, and data-driven technologies. Completed the first semester with strong academic performance while maintaining a good GPA. The curriculum emphasizes hands-on learning through practical projects, laboratory sessions, and industry-relevant coursework. Actively involved in technical clubs and academic projects that enhance practical skills and complement theoretical knowledge, preparing for a career in IT and data-oriented roles.
                    </>
                  ) : (
                    <>
                      Currently pursuing a Bachelor’s degree in Information Technology with a specialization in Data Science at SLIIT, Malabe. The program provides a strong foundation in core IT disciplines...
                    </>
                  )}
                </p>
                <button 
                  onClick={() => toggleEducationExpansion('sliit')}
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm transition-all duration-200 px-2 py-1 rounded-md cursor-pointer"
                >
                  {expandedEducation.sliit ? 'See less' : 'See more'}
                </button>
              </div>
            </div>

            {/* A/L entry */}
            <div className="mt-4 flex items-start space-x-3">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <Image src="/central-college-logo.jpg" alt="Central College logo" width={48} height={48} className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold !text-black dark:!text-white mb-1 main-heading">G.C.E. Advanced Level (Physical Science Stream)</h4>
                <p className="!text-black dark:!text-white mb-1 subheading">Central College, Bandarawela</p>
                <p className="!text-black dark:!text-white mb-1 subheading">Results: 3C</p>
                <div className="flex items-center mb-1 about-text time-text" style={{ color: '#999999' }}><Calendar className="w-4 h-4 mr-1" /> Apr 2018 – Apr 2021</div>
                <p className="!text-black dark:!text-white mt-1 description">
                  {expandedEducation.al ? (
                    <>
                      Completed G.C.E. Advanced Level examinations in the Physical Science stream, studying Mathematics, Physics, and Chemistry. Developed strong analytical and problem-solving skills through structured coursework and practical learning. Actively participated in school computer clubs and science exhibitions, gaining early exposure to computational thinking and basic programming concepts. This academic foundation supports current studies in Information Technology and Data Science.
                    </>
                  ) : (
                    <>
                      Completed G.C.E. Advanced Level examinations in the Physical Science stream, studying Mathematics, Physics, and Chemistry. Developed strong analytical and problem-solving skills...
                    </>
                  )}
                </p>
                <button 
                  onClick={() => toggleEducationExpansion('al')}
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm mt-1 transition-all duration-200 px-2 py-1 rounded-md cursor-pointer"
                >
                  {expandedEducation.al ? 'See less' : 'See more'}
                </button>
              </div>
            </div>

            {/* O/L entry */}
            <div className="mt-4 flex items-start space-x-3">
               <div className="w-12 h-12 rounded-lg overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <Image src="/st-josephs-logo.jpg" alt="St. Joseph's College logo" width={48} height={48} className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold !text-black dark:!text-white mb-1 main-heading">G.C.E. Ordinary Level (O/L)</h4>
                <p className="!text-black dark:!text-white mb-1 subheading">St. Joseph’s College, Bandarawela</p>
                <p className="!text-black dark:!text-white mb-1 subheading">Results: 9A Passes</p>
                <div className="flex items-center mb-1 about-text time-text" style={{ color: '#999999' }}><Calendar className="w-4 h-4 mr-1" /> Apr 2017</div>
                <p className="!text-black dark:!text-white mt-1 description">
                  {expandedEducation.ol ? (
                    <>
                      Successfully completed the G.C.E. Ordinary Level examination at St. Joseph’s College, Bandarawela, achieving 9 A passes. Studied a broad range of subjects including Mathematics, Science, English, Sinhala, History, Geography, Buddhism, and Information & Communication Technology. This strong academic foundation developed solid analytical thinking and study skills. Excellent performance in Mathematics and Science sparked a strong interest in technology and computing, which led to pursuing Information Technology in higher education.
                    </>
                  ) : (
                    <>
                      Successfully completed the G.C.E. Ordinary Level examination at St. Joseph’s College, Bandarawela, achieving 9 A passes. Studied a broad range of subjects including Mathematics...
                    </>
                  )}
                </p>
                <button 
                  onClick={() => toggleEducationExpansion('ol')}
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm mt-1 transition-all duration-200 px-2 py-1 rounded-md cursor-pointer"
                >
                  {expandedEducation.ol ? 'See less' : 'See more'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Experience card - separated container */}
        <div className="mt-6 rounded-2xl p-6 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
          <h3 className="font-semibold mb-4 flex items-center !text-black dark:!text-white about-heading"><Briefcase className="w-4 h-4 mr-2 !text-black dark:!text-white" /> Experience</h3>


        </div>

  {/* Get in touch card (reused from homepage) */}
  <div className="mt-8 rounded-2xl p-6 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
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
                className="w-12 h-12 rounded-lg flex items-center justify-center hover:bg-gray-300 dark:hover:bg-white/10 transition-colors"
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
      </aside>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden overflow-x-hidden">
        {/* Mobile Hero Section */}
        <section className="relative h-72 overflow-hidden mb-3 border border-white/10 shadow-lg">
          {/* Split banner: top half image, bottom half solid background */}
          <div className="absolute inset-0 flex flex-col">
            {/* Top: image (50%) */}
            <div className="w-full h-1/2 relative">
              <Image src="/about-hero.png" alt="banner" width={3763} height={2508} className="object-cover w-full h-full opacity-100" />
            </div>

            {/* Bottom: solid background matching Education card - contains the content so text sits fully on dark area */}
            <div className="w-full h-1/2 bg-white dark:bg-[#212121] border-t border-gray-300 dark:border-white/6 relative">
              <div className="absolute left-40 right-6 top-2">
                <h1 className="text-xl font-bold !text-black dark:!text-white">Vehan Rajintha</h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">Full-Stack Developer</p>

                <div className="mt-4">
                  <Button size="sm" style={{ width: '117.26px', height: '36.2484px' }} className="mb-4 bg-gray-100 dark:bg-[#1F1F1F] hover:bg-gray-200 dark:hover:bg-[#2A2A2A] text-black dark:text-white border border-gray-300 dark:border-white shadow-lg rounded-xl flex items-center justify-center gap-2">
                    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" className=""/>
                      <path d="m21.854 2.147-10.94 10.939" className=""/>
                    </svg>
                    <span className="select-none">Message</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Avatar overlapping the split (click to zoom) */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 -translate-y-10">
            <div
              role="button"
              ref={avatarRef}
              tabIndex={0}
              onClick={() => {
                const rect = avatarRef.current?.getBoundingClientRect()
                if (rect) {
                  setStartTx(rect.left + rect.width / 2)
                  setStartTy(rect.top + rect.height / 2)
                  setStartScale(rect.width / 640)
                }
                setIsZoomOpen(true)
              }}
              className="w-28 h-28 rounded-full overflow-hidden border-4 border-black shadow-lg bg-gray-800 cursor-pointer hover:scale-105 transition-transform duration-200"
            >
              <Image src="https://github.com/VehanRajintha.png" alt="Vehan Rajintha" width={112} height={112} className="object-cover" />
            </div>
          </div>
        </section>

        {/* Mobile About Section */}
        <section className="mb-3">
          <div className="p-4 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
            <h3 className="text-xl font-bold mb-3 flex items-center !text-black dark:!text-white">
              <User className="w-5 h-5 mr-3 !text-black dark:!text-white" /> 
              About
            </h3>
            <div className="!text-black dark:!text-white">
              <p className="!text-black dark:!text-white leading-relaxed" style={{ fontSize: '14.4px' }}>
                {isExpanded ? fullContent : shortContent}
                {!isExpanded && <span>...</span>}
              </p>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors mt-2 inline-block"
              >
                {isExpanded ? 'View less' : 'View more'}
              </button>
            </div>
          </div>
        </section>

          {/* Mobile Featured Section */}
          <div className="mb-3 p-5 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
            <h2 className="text-xl font-semibold mb-4 flex items-center !text-black dark:!text-white about-heading">
              <Pin className="w-6 h-6 mr-3 !text-black dark:!text-white" />
              Featured
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {allBlogs.map((blog, index) => (
                <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                  <Card
                    className="relative bg-[#F5F5F5] dark:bg-[#262626] overflow-hidden border border-gray-300 dark:border-white/10 shadow-lg flex-shrink-0 p-0 cursor-pointer"
                    style={{
                      width: '280px',
                      height: '295px',
                      borderRadius: '16px'
                    }}
                  >
                    <div className="h-48 relative overflow-hidden cursor-pointer group" style={{borderRadius: '16px 16px 0 0'}}>
                      <img
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        className="absolute inset-0 w-full h-full object-cover will-change-transform"
                        style={{
                          borderRadius: '16px 16px 0 0',
                          transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
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
                      <button className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 w-10 h-10 rounded-full bg-black/60 backdrop-blur flex items-center justify-center border border-white/20">
                        <ArrowRight className="w-5 h-5 !text-white dark:!text-white" />
                      </button>
                    </div>
                    <div className="p-2 pt-1">
                      <h3 
                        className="mb-1 line-clamp-2 leading-snug !text-black dark:!text-white"
                        style={{
                          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
                          fontSize: '16px',
                          fontWeight: '600'
                        }}
                      >
                        {blog.title}
                      </h3>
                      <div className="flex items-center text-xs !text-black dark:!text-gray-300 time-text">
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/5 mr-2">
                          <Clock className="w-3 h-3 !text-white dark:!text-white/80" />
                        </span>
                        <span className="time-text">{blog.date}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

        {/* Mobile Certificates Section */}
        <section className="mb-3">
          <div className="p-4 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
            <div className="flex items-center mb-4">
              <GraduationCap className="w-5 h-5 mr-2 !text-black dark:!text-white" />
              <h3 className="text-xl font-bold !text-black dark:!text-white">Certificates</h3>
            </div>
            <div className="space-y-3">
              {certifications.slice(0, 8).map((c, i) => (
                <div key={i} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md flex items-center justify-center bg-white p-1.5">
                      {c.org.includes('Microsoft') ? (
                        <svg viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <path d="M0 0h11v11H0V0zm12 0h11v11H12V0zM0 12h11v11H0V12zm12 0h11v11H12V12z" fill="#F25022"/>
                          <path d="M12 0h11v11H12V0z" fill="#7FBA00"/>
                          <path d="M0 12h11v11H0V12z" fill="#00A4EF"/>
                          <path d="M12 12h11v11H12V12z" fill="#FFB900"/>
                        </svg>
                      ) : c.org.includes('GitHub') ? (
                        <svg viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" fill="#000"/>
                        </svg>
                      ) : (
                        <img 
                          src="/linkedinlearning.png" 
                          alt={c.org} 
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div>
                      <div className="!text-black dark:!text-white font-semibold text-sm">{c.title}</div>
                      <div className="text-xs text-gray-300">{c.org}</div>
                      <div className="flex items-center text-xs mt-1" style={{ color: '#999999' }}>
                        <Calendar className="w-3 h-3 mr-1" />
                        <span>Issued {c.issued}</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => c.credentialUrl && window.open(c.credentialUrl, '_blank')}
                    className="text-gray-400 hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer p-2 rounded-md hover:shadow-md transform hover:scale-110"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/6 flex justify-center">
              <a href="/achievements" className="text-blue-400 flex items-center gap-2 text-sm">
                <ExternalLink className="w-4 h-4" />
                <span>Show all licenses & certifications</span>
              </a>
            </div>
          </div>
        </section>

        {/* Mobile Education Section */}
        <section className="mb-3">
          <div className="p-4 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
            <h3 className="font-bold mb-4 flex items-center !text-black dark:!text-white">
              <svg className="w-5 h-5 mr-2 !text-black dark:!text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Education
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image src="/sliit.png" alt="SLIIT logo" width={48} height={48} className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold !text-black dark:!text-white mb-1">Bachelor of Technology - BTech, Computer Systems and Network Engineering</h4>
                  <p className="!text-black dark:!text-white mb-1 text-sm">Sri Lanka Institute of Information Technology, Malabe</p>
                  <p className="!text-black dark:!text-white mb-1 text-sm">Good GPA</p>
                  <div className="flex items-center mb-1 text-sm" style={{ color: '#999999' }}>
                    <Calendar className="w-4 h-4 mr-1" /> 
                    Nov 2023 - 2026
                  </div>
                  <p className="!text-black dark:!text-white mb-1 text-sm">
                    {expandedEducation.sliit ? (
                      <>
                        I am currently pursuing a Bachelor's degree in Computer Systems and Network Engineering at Sri Lanka Institute of Information Technology, Malabe. This comprehensive program covers essential areas including computer networks, system administration, cybersecurity, and software development. I have completed 1 semester with excellent academic performance and maintain a good GPA. The curriculum includes hands-on projects, laboratory work, and industry-relevant coursework that prepares students for careers in IT infrastructure, network engineering, and system administration. I am actively involved in various technical clubs and projects that complement my academic learning.
                      </>
                    ) : (
                      <>
                        I am currently pursuing a Bachelor's degree in Computer Systems and Network Engineering at Sri Lanka Institute of Information Technology, Malabe. I have completed 1 semester and have a good GPA...
                      </>
                    )}
                  </p>
                  <button 
                    onClick={() => toggleEducationExpansion('sliit')}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm transition-all duration-200 px-2 py-1 rounded-md cursor-pointer"
                  >
                    {expandedEducation.sliit ? 'See less' : 'See more'}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image src="https://firebasestorage.googleapis.com/v0/b/my-portfallio-website.appspot.com/o/dvp.png?alt=media&token=a7706893-4be0-4c3c-a59f-5355aacc3851" alt="Dharmapala logo" width={48} height={48} className="object-cover" />
                  </div>
                <div className="flex-1">
                  <h4 className="font-semibold !text-black dark:!text-white mb-1">ISC(XII), Science with Computer</h4>
                  <p className="!text-black dark:!text-white mb-1 text-sm">Dharmapala College, Pannipitiya</p>
                  <p className="!text-black dark:!text-white mb-1 text-sm">2S & 1C</p>
                  <div className="flex items-center mb-1 text-sm" style={{ color: '#999999' }}>
                    <Calendar className="w-4 h-4 mr-1" /> 
                    Apr 2019 - Apr 2023
                  </div>
                  <p className="!text-black dark:!text-white mt-1 text-sm">
                    {expandedEducation.al ? (
                      <>
                        I completed my GCO A/L Examination at Dharmapala College, Pannipitiya, achieving 2S passes and 1C pass. My subjects included Mathematics, Physics, and Computer Science. During my A/L studies, I developed strong analytical and problem-solving skills through rigorous coursework and practical applications. I was actively involved in school computer clubs and participated in various science exhibitions, which helped me develop a deep understanding of computational thinking and programming fundamentals. This foundation prepared me well for my current studies in Computer Systems and Network Engineering.
                      </>
                    ) : (
                      <>
                        I completed my GCO A/L Examination at Dharmapala College, Pannipitiya, With 2S passes and 1C pass.
                      </>
                    )}
                  </p>
                  <button 
                    onClick={() => toggleEducationExpansion('al')}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm mt-1 transition-all duration-200 px-2 py-1 rounded-md cursor-pointer"
                  >
                    {expandedEducation.al ? 'See less' : 'See more'}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image src="https://firebasestorage.googleapis.com/v0/b/my-portfallio-website.appspot.com/o/dvp.png?alt=media&token=a7706893-4be0-4c3c-a59f-5355aacc3851" alt="Dharmapala logo" width={48} height={48} className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold !text-black dark:!text-white mb-1">ICSC(X), Science with Computer</h4>
                  <p className="!text-black dark:!text-white mb-1 text-sm">Dharmapala College, Pannipitiya</p>
                  <p className="!text-black dark:!text-white mb-1 text-sm">7A & 2B Passes</p>
                  <div className="flex items-center mb-1 text-sm" style={{ color: '#999999' }}>
                    <Calendar className="w-4 h-4 mr-1" /> 
                    Apr 2017 - Apr 2019
                  </div>
                  <p className="!text-black dark:!text-white mt-1 text-sm">
                    {expandedEducation.ol ? (
                      <>
                        I completed my GCO O/L Examination at Dharmapala College, Pannipitiya, achieving 7A passes and 2B passes. My subjects included Mathematics, Science, English, Sinhala, History, Geography, Buddhism, and Information & Communication Technology. This strong academic foundation in O/Ls provided me with essential knowledge across various disciplines and helped develop my analytical thinking and study skills. The excellent results in Mathematics and Science subjects particularly sparked my interest in technology and computing, leading me to pursue Computer Science in A/Ls and eventually Computer Systems and Network Engineering at university level.
                      </>
                    ) : (
                      <>
                        I completed my GCO O/L Examination at Dharmapala College, Pannipitiya, With 7A passes and 2B passes.
                      </>
                    )}
                  </p>
                  <button 
                    onClick={() => toggleEducationExpansion('ol')}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm mt-1 transition-all duration-200 px-2 py-1 rounded-md cursor-pointer"
                  >
                    {expandedEducation.ol ? 'See less' : 'See more'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Experience Section */}
        <section className="mb-3">
          <div className="p-4 border border-gray-300 dark:border-white/10 shadow-lg bg-white dark:bg-[#212121]">
            <h3 className="font-semibold mb-4 flex items-center !text-black dark:!text-white">
              <Briefcase className="w-4 h-4 mr-2 !text-black dark:!text-white" /> 
              Experience
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                  <Image src="/sliitstudentbranch.png" alt="IEEE Computer Society SLIIT logo" width={48} height={48} className="object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold !text-black dark:!text-white">Web Developer (Volunteering)</h4>
                  <p className="text-black dark:text-gray-300 text-sm">IEEE Computer Society of SLIIT</p>
                  <p className="text-black dark:text-gray-300 text-sm">Science and Technology</p>
                  <div className="flex items-center mt-1 text-sm" style={{ color: '#999999' }}>
                    <Calendar className="w-4 h-4 mr-1" /> 
                    Aug 2025 - Present
                  </div>
                  <p className="!text-black dark:!text-white mt-2 text-sm">
                    {expandedExperience.ieee ? (
                      <>
                        Volunteering as a Web Developer at the IEEE Computer Society of SLIIT, contributing to designing and maintaining web platforms, improving user experience, and supporting digital initiatives that promote science and technology. In this role, I work on developing responsive web applications, implementing modern UI/UX designs, and ensuring optimal performance across different devices. I collaborate with fellow developers and designers to create engaging digital experiences for the society's events, workshops, and community outreach programs. This position allows me to apply my technical skills while contributing to educational initiatives that inspire the next generation of computer scientists and engineers.
                      </>
                    ) : (
                      <>
                        Volunteering as a Web Developer at the IEEE Computer Society of SLIIT, contributing to designing and maintaining web platforms, improving user experience, and supporting digital initiatives that promote science and technology.
                      </>
                    )}
                  </p>
                  <button 
                    onClick={() => toggleExperienceExpansion('ieee')}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm mt-2 transition-all duration-200 px-2 py-1 rounded-md cursor-pointer"
                  >
                    {expandedExperience.ieee ? 'See less' : 'See more'}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                  <Image src="/cypsolabs.png" alt="Cypsolab logo" width={48} height={48} className="object-contain" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold !text-black dark:!text-white">Intern Software Engineer</h4>
                  <p className="text-black dark:text-gray-300 text-sm">Cypsolab Pvt Ltd</p>
                  <div className="flex items-center mt-1 text-sm" style={{ color: '#999999' }}>
                    <Calendar className="w-4 h-4 mr-1" /> 
                    Dec 2023 - Jun 2024
                  </div>
                  <p className="!text-black dark:!text-white mt-2 text-sm">
                    {expandedExperience.cypsolab ? (
                      <>
                        Worked as an intern software engineer at Cypsolab Pvt Ltd, contributing to software development projects and gaining hands-on experience in the industry. During this internship, I was involved in developing web applications using modern technologies including React, Node.js, and various cloud services. I participated in agile development processes, collaborated with senior developers on complex projects, and learned industry best practices for code quality, testing, and deployment. This experience provided valuable insights into real-world software development workflows, client requirements, and the importance of teamwork in delivering high-quality software solutions.
                      </>
                    ) : (
                      <>
                        Worked as an intern software engineer, contributing to software development projects and gaining hands-on experience in the industry.
                      </>
                    )}
                  </p>
                  <button 
                    onClick={() => toggleExperienceExpansion('cypsolab')}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm mt-2 transition-all duration-200 px-2 py-1 rounded-md cursor-pointer"
                  >
                    {expandedExperience.cypsolab ? 'See less' : 'See more'}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image src="/GirlScript Summer of Code.png" alt="GirlScript logo" width={48} height={48} className="object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold !text-black dark:!text-white">Open Source Contributor</h4>
                  <p className="text-black dark:text-gray-300 text-sm">GirlScript Summer of Code</p>
                  <div className="flex items-center mt-1 text-sm" style={{ color: '#999999' }}>
                    <Calendar className="w-4 h-4 mr-1" /> 
                    May 2023 - Present
                  </div>
                  <p className="!text-black dark:!text-white mt-2 text-sm">
                    {expandedExperience.girlscript ? (
                      <>
                        Contributed to different open-source projects and learned from industry experts through GirlScript Summer of Code. This program provided me with opportunities to work on real-world projects, collaborate with developers from around the world, and contribute to meaningful open-source initiatives. I have worked on various projects involving web development, documentation, bug fixes, and feature implementations. Through this experience, I've gained valuable insights into version control, code review processes, and the collaborative nature of open-source development. This ongoing participation has helped me build a strong portfolio and network within the developer community.
                      </>
                    ) : (
                      <>
                        Contributed to different open-source projects and learn from industry experts.
                      </>
                    )}
                  </p>
                  <button 
                    onClick={() => toggleExperienceExpansion('girlscript')}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-sm mt-2 transition-all duration-200 px-2 py-1 rounded-md cursor-pointer"
                  >
                    {expandedExperience.girlscript ? 'See less' : 'See more'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

          {/* Mobile Get in Touch */}
          <div className="rounded-none p-6 border-x-0 border-t border-b border-gray-300 dark:border-white/10 shadow-lg -mx-6 bg-white dark:bg-[#212121]">
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

      {/* Avatar zoom modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 backdrop-blur-md"
          onClick={() => closeZoom()}
        >
          <div
            className="absolute inset-0 p-4"
            onClick={() => closeZoom()}
          >
            <div
              className="absolute"
              onClick={(e) => e.stopPropagation()}
              style={{
                left: isZoomVisible ? '50%' : `${startTx}px`,
                top: isZoomVisible ? '50%' : `${startTy}px`,
                transform: isZoomVisible 
                  ? 'translate(-50%, -50%) scale(1)' 
                  : 'translate(-50%, -50%) scale(0.1)',
                opacity: isZoomVisible ? 1 : 0,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                width: 'min(90vw, 400px)',
                height: 'min(90vw, 400px)',
                maxWidth: '90vw',
                maxHeight: '90vw'
              }}
            >
              <Image 
                src="https://github.com/VehanRajintha.png" 
                alt="Vehan Rajintha" 
                width={800} 
                height={800} 
                className="w-full h-full object-cover rounded-2xl shadow-2xl" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  )
}
