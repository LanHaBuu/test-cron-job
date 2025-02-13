import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const allowedOrigin = 'https://test-cron-job-mu.vercel.app'; // Thay bằng domain của bạn
  const origin = req.headers.get('origin');

  if (origin !== allowedOrigin) {
    return new NextResponse(null, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*', // Áp dụng middleware cho tất cả các API routes
};
