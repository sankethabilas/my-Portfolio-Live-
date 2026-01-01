'use client'

import { useEffect } from 'react'

export default function ThemeTransition() {
  useEffect(() => {
    const handleThemeToggle = (event: CustomEvent) => {
      const { x, y, newTheme } = event.detail
      
      // Calculate the maximum distance to cover the entire screen
      const maxDistance = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
      const maxSize = maxDistance * 2.5 // Extra size for complete coverage
      
      // Theme background colors matching your design
      const themeColors = {
        dark: '#2C2C2C',  // Dark theme background
        light: '#DFEFF5'  // Light theme background
      }
      
      // Create the water drop element
      const waterDrop = document.createElement('div')
      waterDrop.className = 'theme-water-drop'
      waterDrop.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        background: ${themeColors[newTheme as 'dark' | 'light']};
        --max-size: ${maxSize}px;
      `
      
      // Add to body
      document.body.appendChild(waterDrop)
      
      // Remove after animation completes
      setTimeout(() => {
        if (document.body.contains(waterDrop)) {
          document.body.removeChild(waterDrop)
        }
      }, 950)
    }

    // Listen for theme toggle events
    window.addEventListener('theme-toggle', handleThemeToggle as EventListener)
    
    return () => {
      window.removeEventListener('theme-toggle', handleThemeToggle as EventListener)
    }
  }, [])

  return null
}
