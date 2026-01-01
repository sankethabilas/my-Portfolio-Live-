"use client"

"use client"

import React from 'react'

export default function GithubContribs({ username = 'VehanRajintha', showTitle = true }: { username?: string; showTitle?: boolean }) {
  // Minimal stub component to restore a clean build.
  return (
    <section className="w-full" role="region" aria-label="GitHub contributions">
      {showTitle && <h2 className="text-xl font-bold mb-2">Contributions</h2>}
      <div className="contrib-card">
        <div className="contrib-graph-inner">Contributions chart will render here.</div>
      </div>
    "use client"

    import React from 'react'

    export default function GithubContribs({ username = 'VehanRajintha', showTitle = true }: { username?: string; showTitle?: boolean }) {
      // Minimal stub component to restore a clean build.
      return (
        <section className="w-full" role="region" aria-label="GitHub contributions">
          {showTitle && <h2 className="text-xl font-bold mb-2">Contributions</h2>}
          <div className="contrib-card">
            <div className="contrib-graph-inner">Contributions chart will render here.</div>
          </div>
        </section>
      )
    }

