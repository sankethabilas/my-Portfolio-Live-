"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, User, Trophy, FolderOpen, BookOpen, Download, Moon, Sun } from "lucide-react"
import { createThemeRippleEffect } from "@/lib/theme-animation"

export default function Sidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const themeToggleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      console.log('Theme changed to:', theme)
      // Apply theme to document
      document.documentElement.classList.remove('dark', 'light')
      document.documentElement.classList.add(theme || 'dark')
    }
  }, [theme, mounted])

  const handleThemeToggle = (event: React.MouseEvent<HTMLDivElement>) => {
    createThemeRippleEffect(event, theme, themeToggleRef)
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    console.log('Setting theme to:', newTheme)
    setTheme(newTheme)
  }

  if (!mounted) {
    return null
  }

  const navigationItems = [
    { id: "home", icon: Home, label: "Home", href: "/" },
    { id: "about", icon: User, label: "About", href: "/about" },
    { id: "achievements", icon: Trophy, label: "Achievements", href: "/achievements" },
    { id: "projects", icon: FolderOpen, label: "Projects", href: "/projects" },
    { id: "blogs", icon: BookOpen, label: "Blogs", href: "/blogs" },
  ]

  return (
  <div className="w-64 fixed top-6 left-6 bottom-6 p-4 flex flex-col rounded-2xl border border-white/10 shadow-lg z-20 dark:bg-[#212121] bg-white">
      {/* Profile Section */}
      <div className="flex flex-col items-start mb-5 pl-2">
        <Avatar className="w-28 h-28 mb-4">
          <AvatarImage src="/sanketh-profile.jpg" alt="Sanketh Abilas" />
          <AvatarFallback>SA</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-semibold text-black dark:text-white !text-black dark:!text-white">Sanketh Abilas</h2>
        <p className="!text-gray-600 dark:!text-gray-400 text-sm">Full-Stack Developer</p>
      </div>

      {/* Resume Button */}
      <Link href="/resume">
        <Button className="w-full mb-4 bg-[#1F1F1F] dark:bg-[#1F1F1F] bg-gray-100 hover:bg-[#2A2A2A] dark:hover:bg-[#2A2A2A] hover:bg-gray-200 text-white dark:text-white text-gray-900 hover:text-[#5EA0FF] border border-white dark:border-white border-gray-300 shadow-lg rounded-xl cursor-pointer transition-colors">
          <Download className="w-4 h-4 mr-2" />
          Resume
        </Button>
      </Link>

  {/* Navigation */}
  <nav className="flex-1 overflow-auto mb-4" aria-label="Main navigation">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className={`w-full flex items-center px-4 py-2 rounded-xl text-left transition-colors ${
                  pathname === item.href ? "text-[#5EA0FF]" : "!text-black dark:!text-white hover:!text-blue-500 dark:hover:!text-blue-400"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

  {/* Theme Toggle */}
  <div className="mt-4 mb-4">
        <div 
          ref={themeToggleRef}
          className="w-full bg-gray-100 dark:bg-[#2A2A2A] border border-gray-300 dark:border-white/8 rounded-xl px-4 py-3 flex items-center justify-between shadow-inner cursor-pointer hover:bg-gray-200 dark:hover:bg-[#3A3A3A] transition-colors"
          onClick={handleThemeToggle}
        >
          <div className="flex items-center gap-3 text-black dark:text-white">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/30 dark:bg-black/30 bg-gray-200 border border-white/10 dark:border-white/10 border-gray-300">
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-black dark:text-white/90" />
              ) : (
                <Sun className="w-4 h-4 text-black dark:text-white/90" />
              )}
            </span>
            <span className="text-base text-black dark:text-white">
              {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
            </span>
          </div>
          <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${theme === 'dark' ? 'bg-[#5EA0FF]' : 'bg-gray-300'}`}>
            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${theme === 'dark' ? 'right-0.5' : 'left-0.5'}`}></div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-xs !text-gray-600 dark:!text-gray-400 leading-relaxed mt-2">
        <p>Designed & Built by Sanketh Abilas</p>
        <p>© 2025, All rights reserved.</p>
      </div>
    </div>
  )
}
