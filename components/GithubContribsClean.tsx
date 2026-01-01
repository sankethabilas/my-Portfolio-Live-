"use client"

import { useEffect, useState } from 'react'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function GithubContribsClean({ username = 'VehanRajintha', showTitle = true }: { username?: string; showTitle?: boolean }) {
  const [loading, setLoading] = useState(true)
  const [svgHtml, setSvgHtml] = useState<string | null>(null)
  const [total, setTotal] = useState<number | null>(null)
  const [legendColors, setLegendColors] = useState<string[]>(['#0b1113', '#064e3b', '#0b7a52', '#15c38b', '#39d353'])
  const [selectedYear, setSelectedYear] = useState<string>('Last Year')
  const [isLightTheme, setIsLightTheme] = useState(false)

  // Detect theme
  useEffect(() => {
    const checkTheme = () => {
      const isLight = !document.documentElement.classList.contains('dark')
      setIsLightTheme(isLight)
    }
    
    checkTheme()
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        // Set loading state when switching years
        if (mounted) setLoading(true)
        
        // Determine which SVG file to load based on selected year and theme
        let svgPath = '/contrib-pattern.svg' // default fallback
        if (isLightTheme) {
          // Use light theme SVGs
          if (selectedYear === '2025') {
            svgPath = '/lighttheme2025.svg'
          } else if (selectedYear === '2024') {
            svgPath = '/lighttheme2024.svg'
          } else if (selectedYear === '2023') {
            svgPath = '/lighttheme2023.svg'
          } else if (selectedYear === 'Last Year') {
            svgPath = '/lightthemelastyear.svg'
          }
        } else {
          // Use dark theme SVGs (original behavior)
          if (selectedYear === '2025') {
            svgPath = '/contrib-2025.svg'
          } else if (selectedYear === '2024') {
            svgPath = '/contrib-2024.svg'
          } else if (selectedYear === '2023') {
            svgPath = '/contrib-2023.svg'
          } else if (selectedYear === 'Last Year') {
            svgPath = '/contrib-pattern.svg'
          }
        }

        // Start both the SVG loading and the minimum loading time simultaneously
        const [svgResult] = await Promise.all([
          (async () => {
            try {
              const res = await fetch(svgPath)
              let text = ''
              if (res.ok) {
                text = await res.text()
              } else {
                const apiRes = await fetch(`/api/contribs?user=${encodeURIComponent(username)}`)
                if (apiRes.ok) text = await apiRes.text()
              }
              return text
            } catch (e) {
              return null
            }
          })(),
          // Ensure minimum loading time of 1.5 seconds
          new Promise(resolve => setTimeout(resolve, 1500))
        ])

        const text = svgResult
        if (!text) return

        // parse to compute totals and derive legend
        const parser = new DOMParser()
        const doc = parser.parseFromString(text, 'image/svg+xml')
        const svg = doc.querySelector('svg')

        let computedTotal = 0
        if (svg) {
          const titles = svg.querySelectorAll('title')
          titles.forEach((t) => {
            const txt = t.textContent || ''
            const m = txt.match(/(\d+[,.]?\d*)/)
            if (m) {
              const n = Number(m[0].replace(/,/g, ''))
              if (!Number.isNaN(n)) computedTotal += n
            }
          })

          const defaultLegend = ['#0b1113', '#064e3b', '#0b7a52', '#15c38b', '#39d353']
          const derived = [0, 1, 2, 3, 4].map((lvl, i) => {
            const el = svg.querySelector(`rect[data-level="${lvl}"]`)
            const f = el ? (el.getAttribute('fill') || '').trim() : ''
            return f || defaultLegend[i]
          })

          if (mounted) setLegendColors(derived)
        }

        // inject small style to remove faint strokes and make SVG background transparent
        const textColor = isLightTheme ? '#374151' : '#cbd5e1' // gray-700 for light theme, slate-300 for dark theme
        const injected = text.replace(/<svg([^>]*)>/i, (m, g1) =>
          `<svg${g1}><style>rect{stroke:none!important}svg{background:transparent!important}text{display:block!important;visibility:visible!important;opacity:1!important;fill:${textColor}!important;font-size:12px!important;font-weight:400!important}.react-activity-calendar__legend-month text{font-size:12px;fill:${textColor};}</style>`
        )

        if (mounted) {
          setSvgHtml(injected)
          setTotal(computedTotal || null)
          setLoading(false)
        }
      } catch (e) {
        // ignore error
        if (mounted) setLoading(false)
      }
    }

    load()
    return () => { mounted = false }
  }, [username, selectedYear, isLightTheme])

  return (
    <section className="w-full" role="region" aria-label="GitHub contributions">
      {showTitle && (
        <div className="flex items-center gap-2 mb-4">
          <Github className="w-6 h-6" />
          <h2 className="text-xl font-bold">Contributions</h2>
        </div>
      )}

  <div className="bg-transparent rounded-2xl p-3 border border-white/6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 items-start">
          {/* Left: graph and totals */}
          <div className="lg:col-span-4">

            {/* Mobile: Flex layout with horizontal scroll */}
            <div className="lg:hidden rounded-lg p-2 bg-transparent border border-transparent overflow-x-auto">
              <div className="flex items-start gap-4">
                {/* Contribution Chart */}
                <div className="flex-shrink-0">
                  {/* Month labels for mobile */}
                  <div className={`flex gap-3 mb-2 contrib-months ${isLightTheme ? 'text-black' : 'text-gray-300'}`} style={{ paddingLeft: '28px' }}>
                    {['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month) => (
                      <div key={month} style={{ width: '60px', textAlign: 'left' }}>
                        {month}
                      </div>
                    ))}
                  </div>

                  {loading ? (
                    <div className="contrib-graph-inner min-w-[800px]" style={{ maxHeight: 130 }}>
                      {/* Skeleton for GitHub contribution graph */}
                      <div className="flex items-center justify-center h-full">
                        <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(53, 1fr)' }}>
                          {Array.from({ length: 371 }).map((_, i) => {
                            const row = Math.floor(i / 53)
                            const col = i % 53
                            // Create diagonal wave effect: delay based on row + column
                            const diagonalDelay = (row + col) * 15
                            return (
                              <div
                                key={i}
                                className={`w-3 h-3 ${isLightTheme ? 'bg-gray-300' : 'bg-gray-700'} rounded-sm`}
                                style={{
                                  animation: `skeleton-wave 1.5s ease-in-out ${diagonalDelay}ms infinite`,
                                  animationDelay: `${diagonalDelay}ms`
                                }}
                              />
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  ) : svgHtml ? (
                    <div className="contrib-graph-inner min-w-[800px]" style={{ maxHeight: 130, overflow: 'visible' }} dangerouslySetInnerHTML={{ __html: svgHtml }} />
                  ) : (
                    <div className="contrib-graph-inner min-w-[800px]" style={{ maxHeight: 130 }}>Contributions chart will render here.</div>
                  )}
                </div>

                {/* Year buttons on mobile - after scrolling */}
                <div className="flex-shrink-0 flex flex-col gap-2">
                  {['Last Year', '2025', '2024', '2023'].map((year) => (
                    <Button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`w-[120px] h-8 border shadow-lg rounded-lg transition-all duration-200 text-sm cursor-pointer ${
                        selectedYear === year
                          ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500'
                          : `${isLightTheme ? 'bg-white hover:bg-gray-100 text-black border-gray-300 hover:border-blue-500' : 'bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white border-white/10 hover:border-blue-500'}`
                      }`}
                    >
                      {year}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop: Normal layout */}
            <div className="hidden lg:block rounded-lg p-2 bg-transparent border border-transparent">
              {/* Month labels */}
              <div className={`flex gap-3 mb-2 contrib-months ${isLightTheme ? 'text-black' : 'text-gray-300'}`} style={{ paddingLeft: '28px' }}>
                {['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'].map((month, index) => (
                  <div key={month} style={{ width: '60px', textAlign: 'left' }}>
                    {month}
                  </div>
                ))}
              </div>
              
              {loading ? (
                <div className="contrib-graph-inner" style={{ maxHeight: 130 }}>
                  {/* Skeleton for GitHub contribution graph */}
                  <div className="flex items-center justify-center h-full">
                    <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(53, 1fr)' }}>
                      {Array.from({ length: 371 }).map((_, i) => {
                        const row = Math.floor(i / 53)
                        const col = i % 53
                        // Create diagonal wave effect: delay based on row + column
                        const diagonalDelay = (row + col) * 15
                        return (
                          <div
                            key={i}
                            className="w-3 h-3 bg-gray-700 rounded-sm"
                            style={{
                              animation: `skeleton-wave 1.5s ease-in-out ${diagonalDelay}ms infinite`,
                              animationDelay: `${diagonalDelay}ms`
                            }}
                          />
                        )
                      })}
                    </div>
                  </div>
                </div>
              ) : svgHtml ? (
                <div className="contrib-graph-inner" style={{ maxHeight: 130, overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: svgHtml }} />
              ) : (
                <div className="contrib-graph-inner" style={{ maxHeight: 130 }}>Contributions chart will render here.</div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className={`text-sm ${isLightTheme ? 'text-gray-700' : 'text-gray-200'}`}>
                {loading ? (
                  <div className={`h-4 w-32 ${isLightTheme ? 'bg-gray-300' : 'bg-gray-700'} rounded`} style={{ animation: 'skeleton-wave 1.5s ease-in-out infinite' }}></div>
                ) : (
                  total ? `${total} contributions in ${selectedYear === 'Last Year' ? 'the last year' : selectedYear}` : `Contributions in ${selectedYear === 'Last Year' ? 'the last year' : selectedYear}`
                )}
              </div>

              <div className={`flex items-center gap-3 text-sm ${isLightTheme ? 'text-gray-600' : 'text-gray-300'}`}>
                <span>Less</span>
                <div className="flex gap-1 items-center">
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={`w-4 h-4 ${isLightTheme ? 'bg-gray-300' : 'bg-gray-700'} rounded-sm`} style={{ animation: `skeleton-wave 1.5s ease-in-out ${i * 200}ms infinite` }} />
                    ))
                  ) : (
                    legendColors.map((c, i) => (
                      <div key={i} className={`w-4 h-4 rounded-sm ${i === 0 ? 'border border-white/6' : ''}`} style={{ backgroundColor: c }} />
                    ))
                  )}
                </div>
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Right: year buttons - hidden on mobile, visible on desktop */}
            <div className="hidden lg:flex lg:col-span-1 flex-col gap-2 items-center pt-6 lg:pt-6">
            {/* Year filter buttons matching the exact design */}
              {['Last Year', '2025', '2024', '2023'].map((year) => (
                <Button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`w-[150px] h-8 border shadow-lg rounded-lg transition-all duration-200 cursor-pointer ${
                    selectedYear === year
                      ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-500'
                      : `${isLightTheme ? 'bg-white hover:bg-gray-100 text-black border-gray-300 hover:border-blue-500' : 'bg-[#1A1A1A] hover:bg-[#2A2A2A] text-white border-white/10 hover:border-blue-500'}`
                  }`}
                >
                  {year}
                </Button>
              ))}
            </div>
        </div>
      </div>
    </section>
  )
}
