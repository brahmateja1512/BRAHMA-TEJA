import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'jbteja1512@gmail.com'
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD

    if (!ADMIN_PASSWORD) {
      console.error('ADMIN_PASSWORD environment variable is not set!')
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 })
    }

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // Set secure cookie
      const cookieStore = await cookies()
      cookieStore.set('admin_token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      })

      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
