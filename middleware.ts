import { NextRequest, NextResponse } from 'next/server'

const allowedOrigins = ['https://test-cron-job-mu.vercel.app']

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin') ?? ''
  const referer = request.headers.get('referer') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin) || referer.startsWith(allowedOrigins[0])

  // Handle preflighted requests
  if (request.method === 'OPTIONS') {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return NextResponse.json({}, { headers: preflightHeaders })
  }

  // Block unauthorized requests
  if (!isAllowedOrigin) {
    return NextResponse.json({ message: 'Access denied: Invalid origin' }, { status: 403 })
  }

  // Allow request
  const response = NextResponse.next()
  response.headers.set('Access-Control-Allow-Origin', origin)

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: '/api/:path*',
}
