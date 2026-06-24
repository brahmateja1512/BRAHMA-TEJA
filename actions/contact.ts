'use server'

import { supabaseAdmin as supabase } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactMessage(formData: FormData) {
  const payload = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
    subject: formData.get('subject') as string || '',
    company: formData.get('company') as string || '',
    phone: formData.get('phone') as string || '',
    project_type: formData.get('project_type') as string || '',
  }

  const { error } = await supabase.from('contact_messages').insert([payload])
  if (error) return { error: error.message }
  
  // Fetch recipient email from system settings
  const { data: settings } = await supabase.from('system_settings').select('email_address').eq('id', 1).single()
  const recipientEmail = settings?.email_address || 'jbteja1512@gmail.com'

  try {
    if (process.env.RESEND_API_KEY) {
      const timestamp = new Date().toLocaleString()
      const extraInfo = `
Subject: ${payload.subject}
Company: ${payload.company}
Phone: ${payload.phone}
Project Type: ${payload.project_type}
Submitted At: ${timestamp}
      `.trim()

      // 1. Send notification to Admin
      await resend.emails.send({
        from: 'Portfolio Contact Form <onboarding@resend.dev>',
        to: recipientEmail,
        subject: `New Inquiry: ${payload.subject || 'Contact Message'} from ${payload.name}`,
        text: `You have received a new message from your portfolio contact form.\n\nName: ${payload.name}\nEmail: ${payload.email}\n\n${extraInfo}\n\nMessage:\n${payload.message}`,
        replyTo: payload.email
      })

      // 2. Send "Thank You" confirmation back to the User
      await resend.emails.send({
        from: 'Brahma Teja <onboarding@resend.dev>',
        to: payload.email,
        subject: `Thank you for reaching out, ${payload.name}!`,
        text: `Hi ${payload.name},\n\nThank you for getting in touch through my portfolio. I've successfully received your message regarding "${payload.subject || 'your inquiry'}" and will get back to you as soon as possible.\n\nFor your records, here is a copy of your message:\n\n${payload.message}\n\nBest regards,\nBrahma Teja Jampu\nAutonomy & Robotics Engineer`
      })
    } else {
      console.warn('RESEND_API_KEY is not set in environment variables. Email notification was skipped.')
    }
  } catch (err) {
    console.error('Failed to send email:', err)
  }

  revalidatePath('/admin/messages')
  return { success: true }
}

export async function deleteContactMessage(id: string) {
  const { error } = await supabase.from('contact_messages').delete().eq('id', id)
  if (error) return { error: error.message }
  revalidatePath('/admin/messages')
  return { success: true }
}
