import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Check if the user is trying to access a protected route
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    // Check for the admin session cookie
    const session = request.cookies.get('admin_session')
    
    if (!session || session.value !== 'authenticated') {
      // Redirect to login if not authenticated
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  return NextResponse.next()
}

// Configure the matcher to run only on admin routes
export const config = {
  matcher: '/admin/:path*',
}
