import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

const privatePaths = ['/me', '/admin']
const authPaths = ['/login', '/register']

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get('accessToken')?.value
  // Chưa đăng nhập thì không cho vào private paths
  if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Kiểm tra role admin khi vào /admin
  if (pathname.startsWith('/admin') && accessToken) {
    try {
      const decodedAccessToken = jwt.decode(accessToken) as { role: 'admin' | 'user' }
      if (decodedAccessToken.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url))
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Đăng nhập rồi thì không cho vào login/register nữa
  if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/me', '/login', '/register', '/admin/:path*'],
}
