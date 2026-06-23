import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'

// Normally this requires a token with write access
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN, // Required to write documents
})

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // Since we are mocking the environment if keys aren't set, handle the demo mode
    if (!process.env.SANITY_API_WRITE_TOKEN) {
      console.log('\n[DEMO MODE] Sanity Write Token missing. Simulating Inbox CRM.')
      console.log(`[INBOX] New Inquiry from ${name} (${email}): ${message}\n`)
      return NextResponse.json({ success: true, demo: true })
    }

    // Insert document into Sanity
    await client.create({
      _type: 'inquiry',
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error creating inquiry:', error)
    return NextResponse.json({ error: 'Failed to submit inquiry' }, { status: 500 })
  }
}
