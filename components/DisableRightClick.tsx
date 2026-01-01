"use client"

import { useEffect } from 'react'

export default function DisableRightClick() {
  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault()
        return false
      }
      // Ctrl+Shift+I (Inspect)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault()
        return false
      }
      // Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault()
        return false
      }
      // Ctrl+U (View Source)
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault()
        return false
      }
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return null
}

