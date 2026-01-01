"use client"

import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000) // 2 seconds loading time

    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-md">
      <div className="loader"></div>
      
      <style jsx>{`
        .loader {
          width: 45px;
          aspect-ratio: .75;
          --c: no-repeat linear-gradient(#ffffff 0 0);
          background: 
            var(--c) 0%   50%,
            var(--c) 50%  50%,
            var(--c) 100% 50%;
          animation: l7 1s infinite linear alternate;
        }
        
        @keyframes l7 {
          0%  {background-size: 20% 50% ,20% 50% ,20% 50% }
          20% {background-size: 20% 20% ,20% 50% ,20% 50% }
          40% {background-size: 20% 100%,20% 20% ,20% 50% }
          60% {background-size: 20% 50% ,20% 100%,20% 20% }
          80% {background-size: 20% 50% ,20% 50% ,20% 100%}
          100%{background-size: 20% 50% ,20% 50% ,20% 50% }
        }
      `}</style>
    </div>
  )
}

