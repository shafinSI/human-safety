import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

const PUBLIC_ROUTES = ['/api/auth/register', '/api/auth/login']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  if (!pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Missing Authorization header' },
      { status: 401 }
    )
  }

  try {
    const token = authHeader.split(' ')[1]
    verifyToken(token)
    return NextResponse.next()
  } catch {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Token is invalid or expired' },
      { status: 401 }
    )
  }
}

export const config = {
  matcher: ['/api/:path*'],
}
