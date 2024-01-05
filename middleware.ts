import { NextRequest, NextResponse } from 'next/server'

export default function withAuth (request: NextRequest) {
  const { value } = request.cookies.get('jwt') || {}
  if (!value) return NextResponse.rewrite(new URL('/404', request.url))
}

export const config = {
  matcher: [
    '/admin',
    '/api/user/:path*'
  ]
}
