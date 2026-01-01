import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const username = searchParams.get('user') || 'VehanRajintha'

    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: { Accept: 'text/html' },
    })

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch' }, { status: 502 })
    }

    const text = await res.text()
    const svgMatch = text.match(/<svg[\s\S]*?<\/svg>/i)
    if (!svgMatch) return NextResponse.json({ error: 'No svg' }, { status: 502 })
    const svgOnly = svgMatch[0]

    return new Response(svgOnly, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        // cache for 5 minutes; client can re-request
        'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=60'
      }
    })
  } catch (err) {
    return NextResponse.json({ error: 'Exception' }, { status: 500 })
  }
}
