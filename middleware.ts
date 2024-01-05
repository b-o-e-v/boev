import { NextRequest, NextResponse } from 'next/server'

export default function withAuth (request: NextRequest) {
  const { value } = request.cookies.get('jwt') || {}
  if (!value) return NextResponse.json({ error: 'Необходима авторизация' })
}

export const config = {
  matcher: [
    '/admin',
    '/api/user/:path*'
  ]
}
