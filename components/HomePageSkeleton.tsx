"use client"

import { useEffect, useState } from 'react'

export default function HomePageSkeleton() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // 1.5 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="min-h-screen !text-black dark:!text-white about-text bg-[#DFEFF5] dark:bg-[#2C2C2C] animate-pulse">
      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="flex gap-6 p-6">
          {/* Sidebar Skeleton */}
          <div className="w-80 space-y-6">
            {/* Profile Card Skeleton */}
            <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 border border-gray-300 dark:border-white/6 shadow-lg">
              <div className="flex flex-col items-center mb-6">
                {/* Avatar Skeleton */}
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-700 rounded-full mb-4"></div>
                {/* Name Skeleton */}
                <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                {/* Title Skeleton */}
                <div className="w-40 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              
              {/* Navigation Links Skeleton */}
              <div className="space-y-3 mb-6">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                ))}
              </div>
              
              {/* Social Icons Skeleton */}
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                ))}
              </div>
            </div>

            {/* GitHub Contributions Skeleton */}
            <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 border border-gray-300 dark:border-white/6 shadow-lg">
              <div className="w-48 h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
              <div className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>

          {/* Main Content Skeleton */}
          <div className="flex-1 space-y-6">
            {/* Hero Section Skeleton */}
            <div className="bg-white dark:bg-[#212121] rounded-2xl p-8 border border-gray-300 dark:border-white/6 shadow-lg">
              {/* Hero Image Skeleton */}
              <div className="w-full h-96 bg-gray-300 dark:bg-gray-700 rounded-xl mb-6"></div>
              {/* Hero Text Skeleton */}
              <div className="space-y-3">
                <div className="w-3/4 h-8 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="w-full h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="w-5/6 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>

            {/* Projects Section Skeleton */}
            <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 border border-gray-300 dark:border-white/6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="w-24 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              
              {/* Project Cards Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="bg-gray-200 dark:bg-gray-800 rounded-xl p-4 space-y-3">
                    <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                    <div className="w-3/4 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Section Skeleton */}
            <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 border border-gray-300 dark:border-white/6 shadow-lg">
              <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
              
              {/* Featured Cards Skeleton */}
              <div className="flex gap-4 overflow-hidden">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex-shrink-0 w-[280px]">
                    <div className="bg-gray-200 dark:bg-gray-800 rounded-xl p-0 overflow-hidden">
                      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
                      <div className="p-4 space-y-3">
                        <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="w-3/4 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Section Skeleton */}
            <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 border border-gray-300 dark:border-white/6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="w-40 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="w-24 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
              
              {/* Achievement Cards Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-gray-200 dark:bg-gray-800 rounded-xl p-4 space-y-3">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-300 dark:bg-gray-700 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 space-y-2">
                        <div className="w-full h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar Skeleton */}
          <div className="w-96 space-y-6">
            {/* About Card Skeleton */}
            <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 border border-gray-300 dark:border-white/6 shadow-lg">
              <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="w-4/5 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            </div>

            {/* Skills Card Skeleton */}
            <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 border border-gray-300 dark:border-white/6 shadow-lg">
              <div className="w-24 h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="w-20 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                ))}
              </div>
            </div>

            {/* Contact Card Skeleton */}
            <div className="bg-white dark:bg-[#212121] rounded-2xl p-6 border border-gray-300 dark:border-white/6 shadow-lg">
              <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
              <div className="space-y-3">
                <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                <div className="w-full h-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout Skeleton */}
      <div className="md:hidden p-4 space-y-4">
        {/* Mobile Header Skeleton */}
        <div className="bg-white dark:bg-[#212121] rounded-xl p-4 border border-gray-300 dark:border-white/6">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* Mobile Hero Skeleton */}
        <div className="bg-white dark:bg-[#212121] rounded-xl p-4 border border-gray-300 dark:border-white/6">
          <div className="w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
          <div className="space-y-3">
            <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="w-5/6 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Mobile Projects Skeleton */}
        <div className="bg-white dark:bg-[#212121] rounded-xl p-4 border border-gray-300 dark:border-white/6">
          <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-200 dark:bg-gray-800 rounded-lg p-3 space-y-3">
                <div className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="w-3/4 h-5 bg-gray-300 dark:bg-gray-700 rounded"></div>
                <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Featured Skeleton */}
        <div className="bg-white dark:bg-[#212121] rounded-xl p-4 border border-gray-300 dark:border-white/6">
          <div className="w-32 h-6 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex-shrink-0 w-64">
                <div className="bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                  <div className="w-full h-40 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="p-3 space-y-2">
                    <div className="w-full h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pulsing Animation Style */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}

