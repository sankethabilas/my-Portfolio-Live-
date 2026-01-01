/**
 * Creates a water drop spreading animation effect when toggling themes
 * @param event - The click event from the toggle button
 * @param currentTheme - The current theme ('dark' or 'light')
 * @param buttonRef - Optional ref to the toggle button for pulse animation
 */
export function createThemeRippleEffect<T extends HTMLElement>(
  event: React.MouseEvent<HTMLElement>,
  currentTheme: string | undefined,
  buttonRef?: React.RefObject<T | null>
): void {
  const rect = event.currentTarget.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  
  // Determine the new theme (opposite of current)
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  
  // Add transitioning class to disable transitions temporarily
  document.documentElement.classList.add('theme-transitioning')
  
  // Dispatch custom event with position and theme info
  const themeToggleEvent = new CustomEvent('theme-toggle', {
    detail: { x, y, newTheme }
  })
  window.dispatchEvent(themeToggleEvent)
  
  // Add pulse animation to toggle button
  if (buttonRef?.current) {
    buttonRef.current.classList.add('theme-toggle-pulse')
    setTimeout(() => {
      buttonRef.current?.classList.remove('theme-toggle-pulse')
    }, 600)
  }
  
  // Remove transitioning class after animation completes
  setTimeout(() => {
    document.documentElement.classList.remove('theme-transitioning')
  }, 950)
}

