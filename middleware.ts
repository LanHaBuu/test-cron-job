import { NextRequest, NextResponse } from 'next/server'

const allowedReferers = ['http://localhost:3000']

const corsOptions = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(request: NextRequest) {
  const referer = request.headers.get('referer') ?? ''

  // Check if referer is allowed
  const isAllowedReferer = allowedReferers.some((allowed) => referer.startsWith(allowed))

  console.log('Referer:', referer)
  console.log('Allowed:', isAllowedReferer)

  // Handle preflight CORS requests (OPTIONS)
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsOptions }) // ✅ Fixed: Use `new Response()`
  }

  // Block unauthorized requests
  if (!isAllowedReferer) {
    return new Response(JSON.stringify({ message: 'Access denied: Invalid referer' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    }) // ✅ Fixed: Use `new Response()`
  }

  // Allow request
  const response = NextResponse.next()

  // Apply CORS headers
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: '/api/:path*',
}
