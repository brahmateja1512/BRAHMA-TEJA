import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    // Hardcode allowed admin email to prevent abuse
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'jbteja1512@gmail.com'
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ error: 'Unauthorized email' }, { status: 401 })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 mins

    // Save to DB
    const { error: dbError } = await supabase
      .from('otp_sessions')
      .insert([{ email, otp_hash: otp, expires_at: expiresAt }]) 

    if (dbError) {
      console.error('DB Error:', dbError)
      // Allow local demo if Supabase isn't configured yet
      if (dbError.message?.includes('fetch failed') || String(dbError).includes('ENOTFOUND')) {
        console.log('\n[DEMO MODE ACTIVATED] Bypassing Supabase connection error.')
      } else {
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }
    }

    // Send via Resend
    if (resend) {
      await resend.emails.send({
        from: 'Portfolio Admin <onboarding@resend.dev>',
        to: email,
        subject: `Your Admin OTP Code: ${otp}`,
        text: `Your login code is ${otp}. It will expire in 10 minutes.`
      })
    } else {
      // For local testing without Resend API Key:
      console.log(`\n\n[MOCK EMAIL] OTP for ${email} is: ${otp}\n\n`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
